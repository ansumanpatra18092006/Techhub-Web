import { useEffect, useRef } from 'react';

// Native keyboard scrolling (holding Arrow Down, Page Down, Space) is
// fundamentally discrete — the browser jumps the scroll position by a
// fixed amount at the OS key-repeat interval. That's true on every site,
// regardless of how well-optimized the page is; it's not something CSS
// or animation cleanup can fix. Sites like Linear/Stripe/Apple get a
// smooth feel by intercepting the key input and driving the scroll
// themselves with an eased interpolation instead of letting the browser
// jump directly. This hook does that — for keyboard input only. Wheel,
// trackpad, and touch scrolling are left completely native/untouched,
// since those were already reported as feeling fine.
export default function useSmoothScroll({
    keyStep = 40,
    pageStep = 0.7,  // fraction of viewport height
    tau = 0.3,      // seconds; time constant for the ease — NOT a per-frame fraction
} = {}) {
    const targetRef = useRef(0);
    const currentRef = useRef(0);
    const rafRef = useRef(null);
    const runningRef = useRef(false);
    const lastTsRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        // Respect the user's OS-level motion preference — fall back to
        // fully native behavior rather than force an animation on them.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const getMax = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

        targetRef.current = window.scrollY;
        currentRef.current = window.scrollY;

        function isEditableTarget(el) {
            if (!el) return false;
            const tag = el.tagName;
            return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
        }

        function clampTarget() {
            targetRef.current = Math.min(Math.max(targetRef.current, 0), getMax());
        }

        function tick(ts) {
            // Delta-time correction is the actual fix here. Aurora
            // (WebGL), DotField, and DriftWall all run their own rAF
            // loops on this page, so the frame rate available to THIS
            // loop is not guaranteed to be a steady 60fps — it dips
            // under load. A fixed `diff * fraction` per frame closes
            // less of the gap per real second when frames are dropped,
            // while the target keeps growing from key-repeat events
            // roughly every 30-40ms regardless of fps. The gap silently
            // grows during the hold (looks like "barely moving"), then
            // drains in one visible burst once keyup stops competing
            // for the main thread. Scaling the close-factor by actual
            // elapsed time (dt) makes convergence speed depend on real
            // time, not frame count, so it can't fall behind like this.
            if (lastTsRef.current === null) lastTsRef.current = ts;
            const dt = Math.min(0.1, Math.max(0, ts - lastTsRef.current) / 1000); // clamp guards against huge dt after tab-switch/throttle
            lastTsRef.current = ts;

            const diff = targetRef.current - currentRef.current;
            if (Math.abs(diff) < 0.5) {
                currentRef.current = targetRef.current;
                window.scrollTo({ top: currentRef.current, left: window.scrollX, behavior: 'instant' });
                runningRef.current = false;
                rafRef.current = null;
                lastTsRef.current = null;
                return;
            }
            const closeFactor = 1 - Math.exp(-dt / tau);
            currentRef.current += diff * closeFactor;
            window.scrollTo({ top: currentRef.current, left: window.scrollX, behavior: 'instant' });
            rafRef.current = requestAnimationFrame(tick);
        }

        function start() {
            if (runningRef.current) return;
            runningRef.current = true;
            rafRef.current = requestAnimationFrame(tick);
        }

        function onKeyDown(e) {
            // Don't hijack arrow/space/page keys while the user is typing or
            // interacting with a form control, select, or contenteditable —
            // those need native key behavior (cursor movement, selection, etc).
            if (isEditableTarget(document.activeElement)) return;

            const vh = window.innerHeight;
            switch (e.key) {
                case 'ArrowDown':
                    targetRef.current += keyStep;
                    break;
                case 'ArrowUp':
                    targetRef.current -= keyStep;
                    break;
                case 'PageDown':
                    targetRef.current += vh * pageStep;
                    break;
                case 'PageUp':
                    targetRef.current -= vh * pageStep;
                    break;
                case ' ':
                    targetRef.current += e.shiftKey ? -vh * pageStep : vh * pageStep;
                    break;
                case 'Home':
                    targetRef.current = 0;
                    break;
                case 'End':
                    targetRef.current = getMax();
                    break;
                default:
                    return; // not a scroll key — let it fall through untouched
            }
            e.preventDefault(); // stop the native, discrete jump for this key
            clampTarget();
            start();
        }

        // If the position changes via a path we don't drive ourselves
        // (wheel, trackpad, touch, scrollbar drag, anchor-link jump), keep
        // our target in sync so the next key press continues smoothly from
        // wherever the user actually is, instead of snapping back to a
        // stale target.
        let syncTimer = null;
        function onNativeScroll() {
            if (runningRef.current) return;
            clearTimeout(syncTimer);
            syncTimer = setTimeout(() => {
                targetRef.current = window.scrollY;
                currentRef.current = window.scrollY;
            }, 50);
        }

        function onResize() {
            clampTarget();
        }

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('scroll', onNativeScroll, { passive: true });
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('scroll', onNativeScroll);
            window.removeEventListener('resize', onResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            clearTimeout(syncTimer);
        };
    }, [keyStep, pageStep, tau]);
}