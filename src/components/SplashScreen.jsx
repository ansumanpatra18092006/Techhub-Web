import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import techhubLogo from '../assets/techhub-logo.png'
import './SplashScreen.css'

/**
 * TechHub intro splash screen.
 * Plays on every page load/reload — it's a fixed full-screen overlay on
 * top of the app, and the real page underneath mounts immediately and is
 * never delayed, so this never blocks page rendering.
 *
 * All three major animations are independently timed and OVERLAP — none
 * of them waits for another to finish (boot-screen feel, not a slideshow):
 *
 *   0.00s  Overlay visible. Logo fades in + starts its breathing glow loop.
 *   0.15s  "TECHHUB" begins its letter-by-letter cascade — now paced to
 *          span roughly the same window as the progress bar fill, so the
 *          title settles in step with the bar instead of popping in early.
 *   0.25s  Quote begins fading in — simultaneously, not after the title.
 *   0.35s  Progress bar starts filling immediately, independent of both.
 *
 * When the bar hits 100% it holds briefly, then the whole overlay fades
 * + blurs out to reveal the site.
 */

const LINES = ['TECHHUB']

// Timeline, in ms, all relative to mount. Each animation is scheduled off
// this shared origin independently — nothing is chained off another
// animation's completion.
const LINES_AT = 150
const QUOTE_AT = 250
const BAR_AT = 350

const LINE_STAGGER = 600 // delay between each line's letter-cascade starting
// Letter-cascade pacing: tuned so the full "TECHHUB" reveal (6 gaps +
// 1 letter duration) spans roughly the same ~3.6s window as the bar fill
// (BAR_AT -> BAR_AT + BAR_DURATION), instead of finishing in ~0.6s.
const LETTER_STAGGER = 0.42 // seconds between each letter within a line
const LETTER_DURATION = 1.1 // seconds, single letter's rise+fade

const BAR_DURATION = 3600 // 3.2-3.8s window
const BAR_HOLD = 200 // hold at 100% before exiting

const EXIT_AT = BAR_AT + BAR_DURATION + BAR_HOLD
const EXIT_DURATION = 700
const DONE_AT = EXIT_AT + EXIT_DURATION

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: ((i * 37) % 100),
    top: ((i * 53) % 100),
    size: 1.5 + ((i * 7) % 5) * 0.4,
    duration: 9 + ((i * 11) % 10),
    delay: -((i * 5) % 12),
}))

// Parent (per-line) variants — each line gets its own start delay via
// `custom`, then staggers its own letters in.
const lineContainerVariants = {
    hidden: {},
    show: (i) => ({
        transition: { staggerChildren: LETTER_STAGGER, delayChildren: (i * LINE_STAGGER) / 1000 },
    }),
}

// Softer rise + heavier blur, held over a longer duration — reads as a
// slow, smooth materialization rather than a quick snap-into-place.
const letterVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: LETTER_DURATION, ease: [0.16, 1, 0.3, 1] } },
}

export default function SplashScreen() {
    const [visible, setVisible] = useState(false)
    const [linesOn, setLinesOn] = useState(false)
    const [quoteOn, setQuoteOn] = useState(false)
    const [progressOn, setProgressOn] = useState(false)
    const [exiting, setExiting] = useState(false)
    const barFillRef = useRef(null)
    const percentRef = useRef(null)
    const rafRef = useRef(null)

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

        // Reduced motion: skip the cinematic sequence entirely, don't show splash.
        if (mq.matches) return

        setVisible(true)
        document.body.style.overflow = 'hidden'

        // Independent timers — each animation is scheduled off mount time
        // directly, so none of them is gated on another finishing.
        const timers = [
            setTimeout(() => setLinesOn(true), LINES_AT),
            setTimeout(() => setQuoteOn(true), QUOTE_AT),
            setTimeout(() => setProgressOn(true), BAR_AT),
            setTimeout(() => setExiting(true), EXIT_AT),
            setTimeout(() => {
                setVisible(false)
                document.body.style.overflow = ''
            }, DONE_AT),
        ]

        return () => {
            timers.forEach(clearTimeout)
            document.body.style.overflow = ''
        }
    }, [])

    // Progress bar — driven entirely via rAF + direct DOM writes so the
    // fill/percentage update every frame without triggering React renders.
    useEffect(() => {
        if (!progressOn) return
        const start = performance.now()

        function tick(now) {
            const elapsed = now - start
            const t = Math.min(1, elapsed / BAR_DURATION)
            // ease-out for a smoother finish
            const eased = 1 - Math.pow(1 - t, 2)
            if (barFillRef.current) barFillRef.current.style.width = `${eased * 100}%`
            if (percentRef.current) percentRef.current.textContent = `${Math.round(eased * 100)}%`
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick)
            }
        }

        rafRef.current = requestAnimationFrame(tick)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [progressOn])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="splash-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: EXIT_DURATION / 1000, ease: [0.16, 1, 0.3, 1] } }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                >
                    <div className="splash-grid" />
                    <div className="splash-glow" />

                    <div className="splash-particles">
                        {PARTICLES.map((p) => (
                            <span
                                key={p.id}
                                className="splash-particle"
                                style={{
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                    width: `${p.size}px`,
                                    height: `${p.size}px`,
                                    animationDuration: `${p.duration}s`,
                                    animationDelay: `${p.delay}s`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="splash-content">
                        <motion.div
                            className="splash-logo-wrap"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="splash-logo-glow" />
                            <div className="splash-logo-badge">
                                <img src={techhubLogo} alt="TechHub" className="splash-logo-img" />
                            </div>
                        </motion.div>

                        <div className="splash-lines">
                            {LINES.map((line, i) => (
                                <motion.span
                                    key={line}
                                    className={`splash-line${i === 0 ? ' splash-line-brand' : ''}`}
                                    custom={i}
                                    variants={lineContainerVariants}
                                    initial="hidden"
                                    animate={linesOn ? 'show' : 'hidden'}
                                >
                                    {line.split('').map((ch, ci) => (
                                        <motion.span key={ci} className="splash-letter" variants={letterVariants}>
                                            {ch}
                                        </motion.span>
                                    ))}
                                </motion.span>
                            ))}
                        </div>

                        <motion.p
                            className="splash-quote"
                            initial={{ opacity: 0 }}
                            animate={quoteOn ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 1.3, ease: 'easeOut' }}
                        >
                            &ldquo;Build beyond the classroom.&rdquo;
                        </motion.p>

                        <motion.div
                            className="splash-bar-wrap"
                            initial={{ opacity: 0 }}
                            animate={progressOn || exiting ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="splash-bar-track">
                                <div ref={barFillRef} className="splash-bar-fill" />
                            </div>
                            <span ref={percentRef} className="splash-percent">0%</span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}