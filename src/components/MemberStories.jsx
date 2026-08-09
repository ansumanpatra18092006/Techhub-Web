import { useEffect, useState } from 'react'
import { Quote } from 'lucide-react'
import { useInView } from '../hooks/useInView'

/**
 * MemberStories — premium infinite-scroll testimonial columns.
 * Inspired by Linear / Stripe / ReactBits DriftWall, tuned to stay readable.
 *
 * Usage:
 *   <MemberStories stories={myStories} />
 *
 * Each story: { quote, name, role, initials, theme }
 * theme is one of 'blue' | 'violet' | 'emerald' | 'amber' (matches the
 * existing accent palette used elsewhere on the page).
 */

const THEMES = {
    blue: { icon: 'text-blue-400', ring: 'hover:border-blue-400/30', chip: 'bg-blue-500/20 text-blue-200', glow: 'rgba(59,130,246,0.28)' },
    violet: { icon: 'text-violet-400', ring: 'hover:border-violet-400/30', chip: 'bg-violet-500/20 text-violet-200', glow: 'rgba(139,92,246,0.28)' },
    emerald: { icon: 'text-emerald-400', ring: 'hover:border-emerald-400/30', chip: 'bg-emerald-500/20 text-emerald-200', glow: 'rgba(16,185,129,0.28)' },
    amber: { icon: 'text-amber-400', ring: 'hover:border-amber-400/30', chip: 'bg-amber-500/20 text-amber-200', glow: 'rgba(245,158,11,0.28)' },
}

const DEFAULT_STORIES = [
    { quote: 'TechHub gave me the confidence to stop waiting until I was ready. I shipped my first real product with people who became my closest friends.', name: 'Aditya Kumar Parida', role: 'Frontend team · 3rd year', initials: 'AKP', theme: 'blue' },
    { quote: 'The best part is the culture of sharing. Every workshop feels like someone opening a door and saying, come build with us.', name: 'M Deepti', role: 'Non-Technical team · 3rd year', initials: 'MD', theme: 'violet' },
    { quote: 'I walked in knowing nothing about security and walked out running my own CTF practice sessions for juniors.', name: 'Biswajeet Sahu', role: 'Web Development team · 3rd year', initials: 'BS', theme: 'emerald' },
    { quote: 'Open source felt intimidating until TechHub made my first pull request a group activity instead of a solo leap.', name: 'Pratikshya Panda', role: 'Graphics Design · 3rd year', initials: 'PP', theme: 'amber' },
    { quote: 'Every teammate here treats "I don\u2019t know yet" as the start of a good conversation, not a weakness.', name: 'Asish Mishra', role: 'Backend team · 3rd year', initials: 'AM', theme: 'blue' },
    { quote: 'We shipped a hackathon project in 30 hours that turned into an actual internship offer. Wild.', name: 'Dipesh Jha', role: 'Fullstack · 3rd year', initials: 'DJ', theme: 'violet' },
    { quote: 'Mentorship here isn\u2019t a program, it\u2019s just how seniors treat new members from day one.', name: 'Debasish Dash', role: 'Management team · 4th year', initials: 'DD', theme: 'emerald' },
    { quote: 'I found my co-founders in a workshop breakout room. Still building with them two years later.', name: 'Tapas Ranjan', role: 'UI/UX team · 3rd year', initials: 'TR', theme: 'amber' },
    { quote: 'The domain teams gave structure to what used to be scattered late-night YouTube tutorials.', name: 'Smruti Ranjan', role: 'Technical team · 4th year', initials: 'SR', theme: 'blue' },
    { quote: 'Leading a workshop for the first time taught me more than the three months I spent preparing for it.', name: 'Mayank Mishra', role: 'Cybersecurity · 3rd year', initials: 'MM', theme: 'violet' },
    { quote: 'TechHub is the rare place where "let\u2019s just try it" is actually encouraged, not just said.', name: 'Ansuman Patra', role: 'Machine Learning · 3rd year', initials: 'AP', theme: 'emerald' },
    { quote: 'The portfolio I built through club projects got me more interview callbacks than my resume did.', name: 'Arati Patra', role: 'Technical team · 3rd year', initials: 'AP', theme: 'amber' },
    {
        quote: 'The first event I attended felt overwhelming. By the second one, I was volunteering. By the third, I was leading a team.',
        name: 'Adhiraj Panigrahi',
        role: 'ML Team · 3rd year',
        initials: 'AP',
        theme: 'blue'
    },
    {
        quote: 'What surprised me most was how accessible everyone was. Seniors reviewed my work, shared resources, and genuinely wanted me to succeed.',
        name: 'Aditya Vajpayee',
        role: 'UI/UX Team · 3rd year',
        initials: 'PD',
        theme: 'violet'
    },
    {
        quote: 'Before joining TechHub, I learned technologies. After joining, I learned how to build products, collaborate, and solve real problems.',
        name: 'Ashutosh Sahu',
        role: 'App Development · 2nd year',
        initials: 'RM',
        theme: 'emerald'
    }
]

function chunkRoundRobin(arr, n) {
    const cols = Array.from({ length: n }, () => [])
    arr.forEach((item, i) => cols[i % n].push(item))
    return cols.filter((c) => c.length > 0)
}

function StoryCard({ story }) {
    const t = THEMES[story.theme] || THEMES.blue
    return (
        <figure
            className={`surface bento-card testimonial-card ms-card group rounded-2xl p-6 transition-all duration-300 ${t.ring} sm:p-7`}
            style={{ '--ms-glow': t.glow }}
        >
            <Quote className={t.icon} size={20} />
            <blockquote className="mt-5 text-[15px] leading-7 text-slate-200">{story.quote}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[.08] pt-4">
                <div className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold ${t.chip}`}>{story.initials}</div>
                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{story.name}</div>
                    <div className="truncate text-xs text-slate-500">{story.role}</div>
                </div>
            </figcaption>
        </figure>
    )
}

function MarqueeColumn({ items, direction, duration, playing, height }) {
    // Duplicate the column content once so the loop can seamlessly wrap at the 50% mark.
    const doubled = [...items, ...items]
    return (
        <div className="ms-col relative overflow-hidden" style={{ height }}>
            <div
                className="ms-track flex flex-col gap-4"
                style={{
                    animationName: direction === 'up' ? 'ms-scroll-up' : 'ms-scroll-down',
                    animationDuration: `${duration}s`,
                    animationPlayState: playing ? 'running' : 'paused',
                }}
            >
                {doubled.map((s, i) => (
                    <StoryCard key={i} story={s} />
                ))}
            </div>
        </div>
    )
}

export default function MemberStories({ stories = DEFAULT_STORIES, columnHeight = 600 }) {
    const [sectionRef, sectionInView] = useInView()
    const [reducedMotion, setReducedMotion] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    const cols4 = chunkRoundRobin(stories, 4)
    while (cols4.length < 4) cols4.push([])
    const cols2 = [
        [...cols4[0], ...cols4[2]],
        [...cols4[1], ...cols4[3]],
    ]
    const directions = ['up', 'down', 'up', 'down']
    const durations = [38, 45, 34, 49] // seconds — all inside the 30–50s "slow and elegant" range
    const playing = sectionInView && !reducedMotion
    const height = `${columnHeight}px`

    return (
        <div ref={sectionRef} className="ms-wrap">
            {/* Desktop: 4 alternating columns */}
            <div className="hidden gap-4 lg:grid lg:grid-cols-4">
                {cols4.map((col, i) => (
                    <MarqueeColumn key={i} items={col} direction={directions[i]} duration={durations[i]} playing={playing} height={height} />
                ))}
            </div>

            {/* Tablet: 2 alternating columns */}
            <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:hidden">
                {cols2.map((col, i) => (
                    <MarqueeColumn key={i} items={col} direction={directions[i * 2]} duration={durations[i * 2]} playing={playing} height={height} />
                ))}
            </div>

            {/* Mobile: static stack, marquee disabled entirely */}
            <div className="grid gap-4 sm:hidden">
                {stories.map((s, i) => (
                    <StoryCard key={i} story={s} />
                ))}
            </div>

            <style>{`
        @keyframes ms-scroll-up {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(0, -50%, 0); }
        }
        @keyframes ms-scroll-down {
          from { transform: translate3d(0, -50%, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        .ms-track {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .ms-col {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0, black 8%, black 92%, transparent 100%);
        }
        /* Hovering the column (or any card inside it, via bubbling) pauses that column only. */
        .ms-col:hover .ms-track {
          animation-play-state: paused !important;
        }
        .ms-card {
          position: relative;
          isolation: isolate;
        }
        .ms-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
          transition: opacity 0.3s ease;
          background: radial-gradient(220px circle at 50% 0%, var(--ms-glow), transparent 70%);
        }
        .ms-card:hover::after {
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .ms-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
        </div>
    )
}