import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

/**
 * Custom cursor system — inner dot (instant) + outer ring (eased),
 * inspired by Linear / Stripe / Cuberto.
 *
 * Mount once, near the root of the app:
 *   <Cursor />
 *
 * Desktop-only: disabled entirely on coarse/touch pointers and when
 * prefers-reduced-motion is set. Uses a single requestAnimationFrame
 * loop for the ring's eased follow; the dot is set directly on
 * pointermove (it has no easing, so it doesn't need the loop).
 * Both only ever touch `transform`, never top/left.
 */

// Elements that should trigger the "interactive" ring-expand state.
// Extend this if the app introduces new interactive components —
// e.g. add '.magnet-target' or a data-cursor="interactive" hook.
const INTERACTIVE_SELECTOR = [
    'a',
    'button',
    'input',
    'textarea',
    'select',
    'label',
    'summary',
    '[role="button"]',
    '[tabindex]:not([tabindex="-1"])',

    '.surface',
    '.bento-card',

    '.group',
    '.card',
    '.spotlight-card',

    'article',

    '[data-cursor="interactive"]',
].join(', ')

// Plain reading content — cursor should just dim slightly, not expand.
const TEXT_SELECTOR = 'p, h1, h2, h3, h4, h5, h6, span, blockquote, li, figcaption, label'

function getCapabilities() {
    if (typeof window === 'undefined') return { fine: false, reducedMotion: false }
    return {
        fine: window.matchMedia('(pointer: fine)').matches,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    }
}

export default function Cursor() {
    const rootRef = useRef(null)
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const [enabled, setEnabled] = useState(() => {
        const { fine, reducedMotion } = getCapabilities()
        return fine && !reducedMotion
    })

    // Keep the enabled state in sync if capabilities change at runtime
    // (e.g. a mouse is connected/disconnected, or the OS motion setting
    // changes mid-session). Cheap to listen for, and avoids a stuck state.
    useEffect(() => {
        if (typeof window === 'undefined') return
        const pointerMq = window.matchMedia('(pointer: fine)')
        const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
        const update = () => setEnabled(pointerMq.matches && !motionMq.matches)
        pointerMq.addEventListener('change', update)
        motionMq.addEventListener('change', update)
        return () => {
            pointerMq.removeEventListener('change', update)
            motionMq.removeEventListener('change', update)
        }
    }, [])

    useEffect(() => {
        if (!enabled) return

        const dot = dotRef.current
        const ring = ringRef.current
        const root = rootRef.current
        if (!dot || !ring || !root) return

        let mouseX = window.innerWidth / 2
        let mouseY = window.innerHeight / 2
        let dotX = mouseX
        let dotY = mouseY
        let ringX = mouseX
        let ringY = mouseY
        let rafId = null
        let visible = false
        let hoverState = 'default' // 'default' | 'interactive' | 'text'

        // Easing factors: higher = snappier/faster catch-up, lower = more
        // lag. The native cursor leads at all times (it's the real OS
        // pointer, drawn instantly by the browser); the dot stays close
        // behind it, and the ring trails the dot with a bit more lag for
        // a "premium" weighted feel — without ever falling far behind.
        const DOT_EASE = 0.22
        const RING_EASE = 0.06

        function show() {
            if (visible) return
            visible = true
            dot.style.opacity = '1'
            ring.style.opacity = '1'
        }

        function hide() {
            visible = false
            dot.style.opacity = '0'
            ring.style.opacity = '0'
        }

        // Dot and ring both ease toward the pointer, at different speeds —
        // see tick() below. This handler only records where the pointer
        // actually is.
        function onPointerMove(e) {
            mouseX = e.clientX
            mouseY = e.clientY
            show()
        }

        function setHoverState(next) {
            if (hoverState === next) return
            hoverState = next
            root.dataset.cursorHover = next
        }

        function onPointerOver(e) {
            const target = e.target
            if (!(target instanceof Element)) return
            if (target.closest(INTERACTIVE_SELECTOR)) {
                setHoverState('interactive')
            } else if (target.closest(TEXT_SELECTOR)) {
                setHoverState('text')
            } else {
                setHoverState('default')
            }
        }

        function onPointerDown() {
            root.dataset.cursorPressed = 'true'
        }
        function onPointerUp() {
            delete root.dataset.cursorPressed
        }

        function onLeaveWindow() {
            hide()
        }
        function onEnterWindow() {
            show()
        }

        // Single rAF loop drives both elements — dot eases in quickly,
        // ring eases in slowly, so the ring visibly trails the dot.
        function tick() {
            dotX += (mouseX - dotX) * DOT_EASE
            dotY += (mouseY - dotY) * DOT_EASE
            ringX += (mouseX - ringX) * RING_EASE
            ringY += (mouseY - ringY) * RING_EASE
            dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
            rafId = requestAnimationFrame(tick)
        }

        window.addEventListener('pointermove', onPointerMove, { passive: true })
        window.addEventListener('pointerover', onPointerOver, { passive: true })
        window.addEventListener('pointerdown', onPointerDown, { passive: true })
        window.addEventListener('pointerup', onPointerUp, { passive: true })
        document.addEventListener('mouseleave', onLeaveWindow)
        document.addEventListener('mouseenter', onEnterWindow)
        rafId = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerover', onPointerOver)
            window.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('pointerup', onPointerUp)
            document.removeEventListener('mouseleave', onLeaveWindow)
            document.removeEventListener('mouseenter', onEnterWindow)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [enabled])

    if (!enabled) return null

    return (
        <div ref={rootRef} className="cursor-root" aria-hidden="true">
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </div>
    )
}