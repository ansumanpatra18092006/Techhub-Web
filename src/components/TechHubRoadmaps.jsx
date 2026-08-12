import { Link } from 'react-router-dom'
import {
    ArrowRight, ArrowDown, Code2, BrainCircuit, BarChart3, ShieldCheck, Palette, Briefcase,
    MessageCircle, Network, Users, Sparkles, Hammer, HelpCircle, Hourglass, Shuffle,
    MonitorPlay, GitBranch, Rocket, Flag, Trophy, Repeat, TrendingUp, Award, PlayCircle,
    GraduationCap, Flame, CheckCircle2, XCircle, PartyPopper, Layers,
} from 'lucide-react'
import Magnet from '../../components/Magnet'
import SpotlightCard from '../../components/SpotlightCard'
import ScrollReveal from './ScrollReveal'
import techhubLogo from '../assets/techhub-logo.png'

// ---------------------------------------------------------------------------
// DESIGN PLAN — TechHub Orientation Edition
// ---------------------------------------------------------------------------
// Brief: not a dashboard, not a learning platform, not a game. This is a
// senior talking to 100+ first-years from a stage — so the page is built to
// read like a deck, not a product.
//
// Palette  ink #14162B (text) · paper #FFFFFF / #F7F5EF (bg)
//          sun #FFD23F · coral #FF5D5D · mint #00B39B · sky #4C6FFF
//          — a "highlighter on paper" system: sticky-note colors doing the
//          talking, instead of the cream+terracotta or dark+neon defaults.
// Type     Space Grotesk (display, headlines) · Inter (body) ·
//          Kalam (handwritten marker, used only for tiny labels/tags)
// Layout   Big, single-column, presentation-paced sections. Every section
//          is legible from the back row: oversized headlines, short lines,
//          sticky-note cards instead of dense text blocks.
// Signature  The "sticky note" — a rotated, taped card used for every
//          Expectation vs Reality beat. It's the one visual idea that
//          repeats and holds the whole page together, like a senior's
//          whiteboard covered in Post-its.
// ---------------------------------------------------------------------------

const tones = {
    sun: { bg: 'bg-[#FFF3C4]', border: 'border-[#F0C339]', text: 'text-[#8A6D0B]', dot: 'bg-[#FFD23F]', chip: 'bg-[#FFF3C4] text-[#8A6D0B] border-[#F0C339]' },
    coral: { bg: 'bg-[#FFE1DC]', border: 'border-[#FF8F84]', text: 'text-[#B23A2E]', dot: 'bg-[#FF5D5D]', chip: 'bg-[#FFE1DC] text-[#B23A2E] border-[#FF8F84]' },
    mint: { bg: 'bg-[#D6F5EE]', border: 'border-[#5FD9C4]', text: 'text-[#0A7A68]', dot: 'bg-[#00B39B]', chip: 'bg-[#D6F5EE] text-[#0A7A68] border-[#5FD9C4]' },
    sky: { bg: 'bg-[#E3E9FF]', border: 'border-[#A6B6FF]', text: 'text-[#33449E]', dot: 'bg-[#4C6FFF]', chip: 'bg-[#E3E9FF] text-[#33449E] border-[#A6B6FF]' },
    paper: { bg: 'bg-white', border: 'border-[#E7E2D4]', text: 'text-ink/70', dot: 'bg-ink/30', chip: 'bg-white text-ink/70 border-[#E7E2D4]' },
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const overloadChips = [
    { label: 'YouTube Roadmaps', icon: PlayCircle, tone: 'coral', pos: 'left-[2%] top-[6%] sm:left-[6%]' },
    { label: 'AI Hype', icon: Sparkles, tone: 'sky', pos: 'right-[0%] top-[2%] sm:right-[4%]' },
    { label: 'Coding Tutorials', icon: MonitorPlay, tone: 'mint', pos: 'left-[0%] bottom-[26%] sm:left-[2%]' },
    { label: 'CGPA Pressure', icon: GraduationCap, tone: 'sun', pos: 'right-[2%] bottom-[30%] sm:right-[0%]' },
    { label: 'Hackathons', icon: Flame, tone: 'coral', pos: 'left-[10%] bottom-[2%] sm:left-[14%]' },
    { label: 'Placement Videos', icon: Briefcase, tone: 'sky', pos: 'right-[8%] bottom-[0%] sm:right-[12%]' },
]

const firstYearThoughts = [
    { expectation: 'I’ll build the next Instagram by second semester.', reality: 'Spent 4 hours fixing one CSS bug.', tone: 'coral', rotate: '-rotate-2' },
    { expectation: 'I’ll learn AI.', reality: 'First battle: installing Python.', tone: 'sun', rotate: 'rotate-1' },
    { expectation: 'I’ll start coding tomorrow.', reality: 'Tomorrow never came.', tone: 'mint', rotate: '-rotate-1' },
    { expectation: 'My sleep schedule will stay intact.', reality: 'Sleep becomes a rumor a friend told you about.', tone: 'sky', rotate: 'rotate-2' },
]

const branches = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Biotechnology', 'Any Branch, Honestly']
const opportunities = [
    { label: 'Development', icon: Code2 },
    { label: 'AI / ML', icon: BrainCircuit },
    { label: 'Cybersecurity', icon: ShieldCheck },
    { label: 'Design', icon: Palette },
    { label: 'Data Science', icon: BarChart3 },
    { label: 'Product', icon: Layers },
    { label: 'Entrepreneurship', icon: Rocket },
]

const domains = [
    { title: 'Web Development', icon: Code2, tone: 'sky', expectation: 'I’ll build the next Instagram.', reality: 'Still centering a div.' },
    { title: 'AI / ML', icon: BrainCircuit, tone: 'coral', expectation: 'I’ll build Jarvis.', reality: 'Training a model 8 hours for +0.3% accuracy.' },
    { title: 'Cybersecurity', icon: ShieldCheck, tone: 'mint', expectation: 'I’ll become a hacker.', reality: 'First, learn networking. All of it.' },
    { title: 'Data Science', icon: BarChart3, tone: 'sun', expectation: 'AI magic.', reality: 'Cleaning Excel sheets. So much cleaning.' },
    { title: 'UI / UX', icon: Palette, tone: 'sky', expectation: 'Designing the future.', reality: 'Choosing between two shades of blue.' },
    { title: 'Management', icon: Briefcase, tone: 'coral', expectation: 'Leadership.', reality: 'Convincing people to reply in the group.' },
]

const cgpaProfiles = [
    { name: 'Student A', tone: 'coral', cgpa: '9.8', skills: 'None', line: 'Interviewer: “So what have you built?”', mood: 'facepalm' },
    { name: 'Student B', tone: 'sun', cgpa: '5.5', skills: 'Excellent', line: 'Placement Cell: “Minimum 7 CGPA required.”', mood: 'shrug' },
    { name: 'Student C', tone: 'mint', cgpa: '8+', skills: 'Strong', line: 'Outcome: best balance. Clears every filter.', mood: 'proud', winner: true },
]

const regrets = [
    { title: 'Learning 15 things at once', icon: Shuffle, tone: 'coral' },
    { title: 'Watching tutorials without building', icon: MonitorPlay, tone: 'sun' },
    { title: 'Ignoring communication skills', icon: MessageCircle, tone: 'mint' },
    { title: 'Waiting until final year', icon: Hourglass, tone: 'sky' },
    { title: 'Never joining communities', icon: Users, tone: 'coral' },
    { title: 'Never asking questions', icon: HelpCircle, tone: 'sun' },
]

const mattersYes = [
    { title: 'Consistency', icon: Repeat },
    { title: 'Projects', icon: Hammer },
    { title: 'Curiosity', icon: Sparkles },
    { title: 'Communication', icon: MessageCircle },
    { title: 'Networking', icon: Network },
    { title: 'Community', icon: Users },
]
const mattersNo = [
    { title: 'Following every trend', icon: TrendingUp },
    { title: 'Comparing yourself daily', icon: BarChart3 },
    { title: 'Collecting certificates', icon: Award },
]

const stories = [
    { title: 'Hackathons Won', icon: Trophy, tone: 'sun', line: 'Late nights, free t-shirts, and a surprising number of trophies.' },
    { title: 'Internships Landed', icon: Briefcase, tone: 'sky', line: 'Yes, as first- and second-years. It happens more than you think.' },
    { title: 'Projects Shipped', icon: Hammer, tone: 'mint', line: 'Real, ugly, working projects — the kind recruiters actually ask about.' },
    { title: 'Leadership Taken On', icon: Flag, tone: 'coral', line: 'Running events, teams, and budgets before anyone “qualified” them to.' },
    { title: 'Open Source Merged', icon: GitBranch, tone: 'sun', line: 'Pull requests accepted into projects used by strangers worldwide.' },
    { title: 'Startups Started', icon: Rocket, tone: 'sky', line: 'From hostel-room idea to an actual thing people signed up for.' },
]

// ---------------------------------------------------------------------------
// Buddy — a small original student mascot (no stock art / no meme templates,
// those can't be legally embedded). One SVG, recolored per section, a
// handful of expressions doing the emotional labor the copy sets up.
// ---------------------------------------------------------------------------
function Buddy({ mood = 'overwhelmed', size = 150, rotate = 0, className = '' }) {
    const hex = { coral: '#FF5D5D', sun: '#F0C339', mint: '#00B39B', sky: '#4C6FFF', ink: '#14162B' }
    const c = { coral: hex.coral, sun: hex.sun, mint: hex.mint, sky: hex.sky }[mood === 'proud' ? 'mint' : mood === 'facepalm' ? 'coral' : mood === 'shrug' ? 'sun' : 'sky']
    return (
        <svg viewBox="0 0 140 168" width={size} height={size} className={className} style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
            {/* torso */}
            <rect x="35" y="96" width="70" height="58" rx="22" fill={c} fillOpacity="0.16" stroke={c} strokeWidth="3" />
            {/* head */}
            <circle cx="70" cy="56" r="34" fill="#FFFFFF" stroke={c} strokeWidth="3" />
            {/* hair swoop */}
            <path d="M40 46 q6 -26 30 -26 q26 0 30 24 q-8 -8 -30 -8 q-20 0 -30 10z" fill={hex.ink} />
            {mood === 'overwhelmed' && (
                <>
                    <circle cx="58" cy="58" r="4.5" fill={hex.ink} />
                    <circle cx="82" cy="58" r="4.5" fill={hex.ink} />
                    <path d="M56 76 q14 -8 28 0" stroke={hex.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
                    <line x1="8" y1="120" x2="35" y2="112" stroke={c} strokeWidth="5" strokeLinecap="round" />
                    <line x1="132" y1="120" x2="105" y2="112" stroke={c} strokeWidth="5" strokeLinecap="round" />
                </>
            )}
            {mood === 'facepalm' && (
                <>
                    <path d="M50 54 q8 6 16 0" stroke={hex.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M74 54 q8 6 16 0" stroke={hex.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M58 78 q12 6 24 0" stroke={hex.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
                    <line x1="98" y1="118" x2="72" y2="50" stroke={c} strokeWidth="5" strokeLinecap="round" />
                    <line x1="42" y1="118" x2="38" y2="108" stroke={c} strokeWidth="5" strokeLinecap="round" />
                </>
            )}
            {mood === 'shrug' && (
                <>
                    <circle cx="58" cy="58" r="4" fill={hex.ink} />
                    <circle cx="82" cy="58" r="4" fill={hex.ink} />
                    <line x1="58" y1="78" x2="82" y2="78" stroke={hex.ink} strokeWidth="3" strokeLinecap="round" />
                    <line x1="8" y1="104" x2="35" y2="116" stroke={c} strokeWidth="5" strokeLinecap="round" />
                    <line x1="132" y1="104" x2="105" y2="116" stroke={c} strokeWidth="5" strokeLinecap="round" />
                </>
            )}
            {mood === 'proud' && (
                <>
                    <path d="M56 58 q2 -5 6 0" stroke={hex.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M78 58 q2 -5 6 0" stroke={hex.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M54 74 q16 14 32 0" stroke={hex.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
                    <line x1="18" y1="96" x2="38" y2="112" stroke={c} strokeWidth="5" strokeLinecap="round" />
                    <line x1="122" y1="96" x2="102" y2="112" stroke={c} strokeWidth="5" strokeLinecap="round" />
                    <path d="M62 18 l4 8 8 1 -6 6 1.5 8 -7.5 -4 -7.5 4 1.5 -8 -6 -6 8 -1z" fill={hex.sun} />
                </>
            )}
            {mood === 'wave' && (
                <>
                    <circle cx="58" cy="58" r="4" fill={hex.ink} />
                    <circle cx="82" cy="58" r="4" fill={hex.ink} />
                    <path d="M56 74 q14 10 28 0" stroke={hex.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
                    <line x1="105" y1="112" x2="128" y2="86" stroke={c} strokeWidth="5" strokeLinecap="round" />
                    <line x1="35" y1="112" x2="18" y2="120" stroke={c} strokeWidth="5" strokeLinecap="round" />
                </>
            )}
            <rect x="46" y="136" width="16" height="16" rx="6" fill={c} fillOpacity="0.5" />
            <rect x="78" y="136" width="16" height="16" rx="6" fill={c} fillOpacity="0.5" />
        </svg>
    )
}

function Eyebrow({ children, tone = 'ink' }) {
    return (
        <span className="font-hand inline-block -rotate-1 rounded-full border border-ink/15 bg-white px-4 py-1.5 text-sm text-ink/70 shadow-[3px_3px_0_0_rgba(20,22,43,0.06)]">
            {children}
        </span>
    )
}

function SectionTitle({ eyebrow, title, text, align = 'center' }) {
    const alignCls = align === 'center' ? 'mx-auto text-center' : ''
    return (
        <div className={`mb-14 max-w-3xl ${alignCls}`}>
            {eyebrow && <div className="mb-5"><Eyebrow>{eyebrow}</Eyebrow></div>}
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">{title}</h2>
            {text && <p className="mt-5 text-lg leading-8 text-ink/60 sm:text-xl">{text}</p>}
        </div>
    )
}

// The signature element: a rotated, taped sticky note used everywhere an
// Expectation-vs-Reality beat (or any punchline) shows up.
function StickyNote({ tone = 'sun', rotate = '-rotate-1', className = '', children }) {
    const t = tones[tone]
    return (
        <div className={`relative rounded-[20px] border-2 ${t.bg} ${t.border} ${rotate} shadow-[7px_7px_0_0_rgba(20,22,43,0.08)] transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 ${className}`}>
            <span className="absolute -top-3 left-8 h-5 w-16 -rotate-2 rounded-[3px] bg-white/80 shadow-sm ring-1 ring-ink/5" aria-hidden="true" />
            {children}
        </div>
    )
}

function MemeCard({ expectation, reality, tone, rotate }) {
    const t = tones[tone]
    return (
        <StickyNote tone={tone} rotate={rotate}>
            <div className="p-6 sm:p-7">
                <p className="font-hand text-sm font-bold uppercase tracking-wide text-ink/45">Expectation</p>
                <p className="mt-1.5 font-display text-xl font-semibold leading-snug text-ink">{expectation}</p>
                <div className={`my-4 flex items-center gap-2 ${t.text}`}>
                    <ArrowDown size={16} />
                    <span className="font-hand text-xs font-bold uppercase tracking-widest">reality check</span>
                </div>
                <p className="font-hand text-sm font-bold uppercase tracking-wide text-ink/45">Reality</p>
                <p className="mt-1.5 text-base leading-7 text-ink/75">{reality}</p>
            </div>
        </StickyNote>
    )
}

function Chip({ label, icon: Icon, tone = 'paper' }) {
    const t = tones[tone]
    return (
        <span className={`inline-flex items-center gap-2 rounded-full border ${t.chip} px-4 py-2 text-sm font-semibold`}>
            {Icon && <Icon size={15} />} {label}
        </span>
    )
}

export default function TechHubRoadmaps() {
    return (
        <div className="min-h-screen bg-paper font-body text-ink antialiased">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Kalam:wght@400;700&display=swap');
                html { scroll-behavior: smooth; }
                .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
                .font-hand { font-family: 'Kalam', 'Comic Sans MS', cursive; }
                .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
                .bg-paper { background-color: #FFFFFF; }
                .bg-paper-dim { background-color: #F7F5EF; }
                .text-ink { color: #14162B; }
                .bg-ink { background-color: #14162B; }
                .border-ink\\/15 { border-color: rgba(20,22,43,.15); }
                .notebook-lines {
                    background-image: repeating-linear-gradient(to bottom, transparent, transparent 43px, rgba(20,22,43,0.06) 44px);
                }
                @media (prefers-reduced-motion: reduce) {
                    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
                }
            `}</style>

            {/* ---------------------------------------------------------- Top bar */}
            <header className="sticky top-0 z-30 border-b border-ink/[.07] bg-paper/85 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
                    <Link to="/" className="flex items-center gap-2.5">
                        <img src={techhubLogo} alt="TechHub logo" className="h-8 w-8 object-contain" />
                        <span className="font-display text-base font-bold tracking-tight text-ink">TECH<span className="text-[#4C6FFF]">'HUB</span></span>
                    </Link>
                    <Magnet padding={40} magnetStrength={10}>
                        <a href="/#contact" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]">
                            Join TechHub <ArrowRight size={15} />
                        </a>
                    </Magnet>
                </div>
            </header>

            <main>
                {/* ------------------------------------------------------ Section 1: Reality Check (Hero) */}
                <section className="notebook-lines relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
                    <div className="mx-auto max-w-5xl text-center">
                        <ScrollReveal delay={0}>
                            <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                                <Link to="/" className="inline-flex items-center gap-1.5 font-semibold text-ink/50 transition-colors hover:text-ink">
                                    &larr; Back to Home
                                </Link>
                                <Link to="/story" className="inline-flex items-center gap-1.5 font-semibold text-[#4C6FFF] transition-colors hover:text-[#3a5ae0]">
                                    Explore TechHub Story <ArrowRight size={15} />
                                </Link>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0}><Eyebrow>TechHub Orientation · A Senior Special</Eyebrow></ScrollReveal>
                        <ScrollReveal delay={80}>
                            <h1 className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-8xl">
                                Nobody Tells You<br /><span className="text-[#4C6FFF]">This</span> About Engineering
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={160}>
                            <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-ink/60 sm:text-xl">
                                A senior-to-junior guide for surviving, learning, growing, and not losing your mind.
                            </p>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal delay={240}>
                        <div className="relative mx-auto mt-16 h-[420px] max-w-3xl sm:h-[460px]">
                            {overloadChips.map((c) => (
                                <div key={c.label} className={`absolute ${c.pos}`}>
                                    <Chip label={c.label} icon={c.icon} tone={c.tone} />
                                </div>
                            ))}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Buddy mood="overwhelmed" size={190} />
                            </div>
                        </div>
                    </ScrollReveal>
                </section>

                {/* ------------------------------------------------------ Section 2: Things Every First Year Thinks */}
                <section className="border-t border-ink/[.07] bg-paper-dim px-5 py-20 sm:px-8 sm:py-28">
                    <div className="mx-auto max-w-6xl">
                        <SectionTitle eyebrow="Every single batch, every single year" title="Things Every First-Year Thinks" />
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {firstYearThoughts.map((f, i) => (
                                <ScrollReveal key={f.expectation} delay={i * 90}>
                                    <MemeCard {...f} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------ Section 3: Branch Doesn't Decide Your Future */}
                <section className="border-t border-ink/[.07] px-5 py-20 sm:px-8 sm:py-28">
                    <div className="mx-auto max-w-5xl text-center">
                        <SectionTitle eyebrow="Say it louder for the back row" title="Your Branch Doesn’t Decide Your Future" align="center" />
                        <ScrollReveal delay={80}>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {branches.map((b) => <Chip key={b} label={b} tone="sky" />)}
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={140}>
                            <div className="mx-auto my-8 flex w-fit items-center gap-3 text-ink/35">
                                <span className="h-px w-16 bg-ink/15 sm:w-28" />
                                <ArrowDown size={22} />
                                <span className="h-px w-16 bg-ink/15 sm:w-28" />
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {opportunities.map((o) => <Chip key={o.label} label={o.label} icon={o.icon} tone="mint" />)}
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={260}>
                            <p className="mx-auto mt-12 max-w-lg font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                                Your branch gives you subjects.<br />Your skills create opportunities.
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ------------------------------------------------------ Section 4: Explore Domains */}
                <section id="domains" className="border-t border-ink/[.07] bg-paper-dim px-5 py-20 sm:px-8 sm:py-28">
                    <div className="mx-auto max-w-6xl">
                        <SectionTitle eyebrow="Pick a lane, any lane" title="Explore the Domains" text="Same punchline every time: what you imagine vs. what you actually spend your Tuesday doing." />
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {domains.map((d, i) => {
                                const t = tones[d.tone]
                                return (
                                    <ScrollReveal key={d.title} delay={i * 80}>
                                        <SpotlightCard className={`h-full rounded-[22px] border-2 ${t.border} bg-white p-6 sm:p-7`} spotlightColor="rgba(76,111,255,0.10)">
                                            <span className={`grid size-12 place-items-center rounded-2xl ${t.bg} ${t.text}`}>
                                                <d.icon size={22} />
                                            </span>
                                            <h3 className="mt-5 font-display text-xl font-bold text-ink">{d.title}</h3>
                                            <p className="mt-4 font-hand text-xs font-bold uppercase tracking-wide text-ink/40">Expectation</p>
                                            <p className="mt-1 text-base font-medium text-ink/80">{d.expectation}</p>
                                            <p className={`mt-3 font-hand text-xs font-bold uppercase tracking-wide ${t.text}`}>Reality</p>
                                            <p className="mt-1 text-base text-ink/60">{d.reality}</p>
                                        </SpotlightCard>
                                    </ScrollReveal>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------ Section 5: The CGPA Debate */}
                <section className="border-t border-ink/[.07] px-5 py-20 sm:px-8 sm:py-28">
                    <div className="mx-auto max-w-6xl">
                        <SectionTitle eyebrow="The argument every mess hall has had" title="The CGPA Debate" />
                        <div className="grid gap-8 sm:grid-cols-3">
                            {cgpaProfiles.map((s, i) => (
                                <ScrollReveal key={s.name} delay={i * 100}>
                                    <StickyNote tone={s.tone} rotate={i % 2 ? 'rotate-1' : '-rotate-1'} className="h-full">
                                        <div className="flex h-full flex-col items-center p-6 text-center sm:p-7">
                                            {s.winner && <span className="font-hand mb-2 -rotate-2 rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">the balanced one</span>}
                                            <Buddy mood={s.mood} size={100} />
                                            <h3 className="mt-3 font-display text-lg font-bold text-ink">{s.name}</h3>
                                            <div className="mt-3 flex gap-2">
                                                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-ink/70">CGPA {s.cgpa}</span>
                                                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-ink/70">Skills: {s.skills}</span>
                                            </div>
                                            <p className="mt-4 text-sm leading-6 text-ink/70">{s.line}</p>
                                        </div>
                                    </StickyNote>
                                </ScrollReveal>
                            ))}
                        </div>
                        <ScrollReveal delay={280}>
                            <p className="mx-auto mt-12 max-w-md text-center font-display text-2xl font-semibold text-ink">
                                Don’t ignore academics. Don’t ignore skills.<br /><span className="text-[#00B39B]">Balance wins.</span>
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ------------------------------------------------------ Section 6: Things Seniors Regret */}
                <section className="border-t border-ink/[.07] bg-ink px-5 py-20 sm:px-8 sm:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-14 max-w-3xl">
                            <Eyebrow>Straight from people who’ve lived it</Eyebrow>
                            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">Things Seniors Regret</h2>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {regrets.map((r, i) => {
                                const t = tones[r.tone]
                                return (
                                    <ScrollReveal key={r.title} delay={i * 70}>
                                        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-5">
                                            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${t.bg} ${t.text}`}>
                                                <r.icon size={19} />
                                            </span>
                                            <p className="text-base font-medium leading-6 text-white/85">{r.title}</p>
                                        </div>
                                    </ScrollReveal>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------ Section 7: What Actually Matters */}
                <section className="border-t border-ink/[.07] px-5 py-20 sm:px-8 sm:py-28">
                    <div className="mx-auto max-w-5xl">
                        <SectionTitle eyebrow="Ignore the noise, focus here" title="What Actually Matters" />
                        <div className="grid gap-8 sm:grid-cols-2">
                            <ScrollReveal delay={0}>
                                <div className="h-full rounded-[22px] border-2 border-[#5FD9C4] bg-[#D6F5EE] p-6 sm:p-8">
                                    <div className="flex items-center gap-2.5">
                                        <CheckCircle2 size={20} className="text-[#0A7A68]" />
                                        <h3 className="font-display text-lg font-bold text-ink">This</h3>
                                    </div>
                                    <ul className="mt-5 space-y-4">
                                        {mattersYes.map((m) => (
                                            <li key={m.title} className="flex items-center gap-3">
                                                <span className="grid size-9 place-items-center rounded-lg bg-white/70 text-[#0A7A68]"><m.icon size={16} /></span>
                                                <span className="text-base font-medium text-ink/80">{m.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={100}>
                                <div className="h-full rounded-[22px] border-2 border-[#FF8F84] bg-[#FFE1DC] p-6 sm:p-8">
                                    <div className="flex items-center gap-2.5">
                                        <XCircle size={20} className="text-[#B23A2E]" />
                                        <h3 className="font-display text-lg font-bold text-ink">Not This</h3>
                                    </div>
                                    <ul className="mt-5 space-y-4">
                                        {mattersNo.map((m) => (
                                            <li key={m.title} className="flex items-center gap-3">
                                                <span className="grid size-9 place-items-center rounded-lg bg-white/70 text-[#B23A2E]"><m.icon size={16} /></span>
                                                <span className="text-base font-medium text-ink/70 line-through decoration-2">{m.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------ Section 8: TechHub Success Stories */}
                <section className="border-t border-ink/[.07] bg-paper-dim px-5 py-20 sm:px-8 sm:py-28">
                    <div className="mx-auto max-w-6xl">
                        <SectionTitle eyebrow="Real people, one year ahead of you" title="TechHub Success Stories" text="If they did it, you can too." />
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {stories.map((s, i) => {
                                const t = tones[s.tone]
                                return (
                                    <ScrollReveal key={s.title} delay={i * 80}>
                                        <div className="h-full rounded-[22px] border border-ink/10 bg-white p-6 sm:p-7">
                                            <span className={`grid size-12 place-items-center rounded-2xl ${t.bg} ${t.text}`}>
                                                <s.icon size={22} />
                                            </span>
                                            <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.title}</h3>
                                            <p className="mt-2 text-sm leading-6 text-ink/60">{s.line}</p>
                                        </div>
                                    </ScrollReveal>
                                )
                            })}
                        </div>
                        <p className="mt-6 text-center text-xs text-ink/35">Swap these placeholders for real photos and names from the club’s achievement wall.</p>
                    </div>
                </section>

                {/* ------------------------------------------------------ Section 9: Final Message */}
                <section className="border-t border-ink/[.07] px-5 py-24 text-center sm:px-8 sm:py-32">
                    <div className="mx-auto max-w-2xl">
                        <ScrollReveal delay={0}>
                            <div className="mx-auto mb-4 flex justify-center"><Buddy mood="wave" size={130} /></div>
                        </ScrollReveal>
                        <ScrollReveal delay={80}>
                            <div className="mb-6 flex justify-center"><Eyebrow>One last thing before you go</Eyebrow></div>
                        </ScrollReveal>
                        <ScrollReveal delay={140}>
                            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                                Start Small.<br />Stay Consistent.
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-ink/60">
                                You do not need to know everything today. You only need to start.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={260}>
                            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Magnet padding={50} magnetStrength={8}>
                                    <a href="/#contact" className="inline-flex h-13 min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-base font-semibold text-white shadow-[0_12px_30px_-12px_rgba(20,22,43,.5)] transition-transform hover:scale-[1.03]">
                                        Join TechHub Orientation <PartyPopper size={17} />
                                    </a>
                                </Magnet>
                                <Link to="/" className="inline-flex h-13 min-h-12 items-center justify-center gap-2 rounded-full border-2 border-ink/15 bg-white px-7 text-base font-semibold text-ink transition-colors hover:border-ink/30">
                                    Back to TechHub
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </main>

            <footer className="border-t border-ink/[.08] py-10">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <div>
                        <Link to="/" className="font-display text-lg font-bold text-ink">TECH<span className="text-[#4C6FFF]">'HUB</span></Link>
                        <p className="mt-2 text-sm text-ink/50">Build beyond the classroom.</p>
                    </div>
                    <Link to="/" className="text-sm font-medium text-ink/50 transition-colors hover:text-ink">Back to TechHub home</Link>
                </div>
            </footer>
        </div>
    )
}