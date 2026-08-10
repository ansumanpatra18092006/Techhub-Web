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
    {
        quote: 'My first TechHub project failed completely. That experience taught me more about development, teamwork, and debugging than any classroom assignment ever could.',
        name: 'Aditya Kumar Parida',
        role: 'Frontend Team · 3rd Year',
        initials: 'AKP',
        theme: 'blue'
    },
    {
        quote: 'Being part of the non-technical team showed me that great events are built through planning, communication, and countless small details behind the scenes.',
        name: 'M Deepti',
        role: 'Non-Technical Team · 3rd Year',
        initials: 'MD',
        theme: 'violet'
    },
    {
        quote: 'Building websites for club projects gave me practical experience that tutorials alone never could. Seeing people use something I built felt incredible.',
        name: 'Biswajeet Senapati',
        role: 'Web Development Team · 3rd Year',
        initials: 'BS',
        theme: 'emerald'
    },
    {
        quote: 'Design reviews from seniors completely changed how I approach creativity. I learned that good design is solving problems, not just making things look beautiful.',
        name: 'Pratikshya Panda',
        role: 'Graphics Design Team · 3rd Year',
        initials: 'PP',
        theme: 'amber'
    },
    {
        quote: 'The backend team taught me how systems actually work behind the interface. APIs, databases, and architecture finally started making sense.',
        name: 'Asish Kumar Dhal',
        role: 'Backend Team · 3rd Year',
        initials: 'AKD',
        theme: 'blue'
    },
    {
        quote: 'Late-night hackathon sessions with the team pushed me further than any individual project. We learned, built, failed, and shipped together.',
        name: 'Dipesh Jha',
        role: 'Fullstack Developer · 3rd Year',
        initials: 'DJ',
        theme: 'violet'
    },
    {
        quote: 'Managing teams and coordinating events taught me leadership in a way no textbook ever could. Every event was a lesson in responsibility.',
        name: 'Debasish Dash',
        role: 'Management Team · 4th Year',
        initials: 'DD',
        theme: 'emerald'
    },
    {
        quote: 'Working on UI/UX projects helped me understand how people interact with technology. Good design starts with empathy, not software.',
        name: 'Tapas Ranjan',
        role: 'UI/UX Team · 3rd Year',
        initials: 'TR',
        theme: 'amber'
    },
    {
        quote: 'The technical team gave me structure and direction. Instead of randomly learning online, I finally had mentors and a roadmap to follow.',
        name: 'Smruti Ranjan Kabi',
        role: 'Technical Team · 4th Year',
        initials: 'SRK',
        theme: 'blue'
    },
    {
        quote: 'CTFs and security workshops introduced me to a completely different side of technology. Cybersecurity went from curiosity to passion.',
        name: 'Mayank Mishra',
        role: 'Cybersecurity Team · 3rd Year',
        initials: 'MM',
        theme: 'violet'
    },
    {
        quote: 'Training machine learning models is exciting, but learning how to turn them into useful solutions is what TechHub really taught me.',
        name: 'Ansuman Patra',
        role: 'Machine Learning Team · 3rd Year',
        initials: 'AP',
        theme: 'emerald'
    },
    {
        quote: 'The projects I worked on through the club became the strongest part of my portfolio. They gave me real stories to talk about in interviews.',
        name: 'Arati Patra',
        role: 'Technical Team · 3rd Year',
        initials: 'ARP',
        theme: 'amber'
    },
    {
        quote: 'Joining the ML team exposed me to practical applications of AI. Building models with teammates was far more rewarding than learning alone.',
        name: 'Adhiraj',
        role: 'ML Team · 3rd Year',
        initials: 'AD',
        theme: 'blue'
    },
    {
        quote: 'Every design critique helped me improve faster than I imagined. The feedback culture here pushes you to become better with every project.',
        name: 'Aditya Vajpayee',
        role: 'UI/UX Team · 3rd Year',
        initials: 'AV',
        theme: 'violet'
    },
    {
        quote: 'Developing applications for real users taught me to think beyond features and focus on reliability, usability, and impact.',
        name: 'Ashutosh Sahu',
        role: 'App Development Team · 2nd Year',
        initials: 'AS',
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
            data-cursor="interactive"
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