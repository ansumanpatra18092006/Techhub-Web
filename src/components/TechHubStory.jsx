import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowRight, ArrowDown, Sparkles, Users, Rocket, Target, Lightbulb,
    Code2, BrainCircuit, ShieldCheck, Trophy, GitBranch, Briefcase,
    GraduationCap, Globe2, Handshake, X, ChevronLeft, ChevronRight, Flag,
    PartyPopper, Layers, Compass, MessagesSquare, Building2, ArrowUpRight, Quote,
} from 'lucide-react'

import Aurora from './reactbits/Aurora'
import Magnet from '../../components/Magnet'
import SpotlightCard from '../../components/SpotlightCard'
import CountUp from '../../components/CountUp'
import DotField from '../../components/DotField'
import ScrollReveal from './ScrollReveal'

import techhubLogo from '../assets/techhub-logo.png'

// Reused member photos — same roster as RefinedHome. Swap any of these
// for real founder / early-team / hall-of-fame photos as they come in;
// every place a photo is used below reads from the arrays further down,
// so replacing an import here is all that's needed.
import adityaParida from '../assets/builders/aditya-parida.jpeg'
import ansuman from '../assets/builders/ansuman.jpeg'
import arati from '../assets/builders/arati.jpeg'
import deepti from '../assets/builders/deepti.png'
import biswajeet from '../assets/builders/biswajeet.png'
import pratikshya from '../assets/builders/pratikshya.png'
import asish from '../assets/builders/asish.png'
import debasish from '../assets/builders/debasish.jpeg'
import tapas from '../assets/builders/tapas.png'
import mayank from '../assets/builders/mayank.jpeg'
import sandeep from '../assets/builders/sandeep.jpeg'
import adhiraj from '../assets/builders/adhiraj.png'
import adityaVajpayee from '../assets/builders/aditya-vajpayee.png'
import ashutosh from '../assets/builders/ashutosh.jpeg'

// Reused gallery photos — same set as RefinedHome's DriftWall.
import p1 from '../assets/gallery/p1.jpeg'
import p2 from '../assets/gallery/p2.jpeg'
import p3 from '../assets/gallery/p3.jpeg'
import p4 from '../assets/gallery/p4.jpeg'
import p5 from '../assets/gallery/p5.jpeg'
import p6 from '../assets/gallery/p6.jpeg'
import p7 from '../assets/gallery/p7.jpeg'
import p8 from '../assets/gallery/p8.jpeg'
import p9 from '../assets/gallery/p9.jpeg'
import p10 from '../assets/gallery/p10.jpeg'
import p11 from '../assets/gallery/p11.jpeg'
import p12 from '../assets/gallery/p12.jpeg'

// ---------------------------------------------------------------------------
// DESIGN PLAN — "Our Story" (Orientation keynote)
// ---------------------------------------------------------------------------
// Brief: this is a talk given from a stage during orientation, not a page
// someone scrolls through alone. Same dark canvas as RefinedHome (#030712
// base, Aurora, glass surfaces, blue/violet accents) so it still reads as
// one site — but now built as eleven full-height slides, one idea each,
// with a numbered slide rail on the right so a presenter (or a curious
// student) always knows where they are in the talk. Content and data are
// unchanged from the previous version; only pacing, scale, and structure
// were redesigned.
// ---------------------------------------------------------------------------

const REGISTRATION_LINK = 'https://docs.google.com/forms/d/1LvSepXGPgNEVKmITQlpbEOX0YLIQty0ar_Zv7MNhjTg/edit'
// TODO: swap in the live TechHub WhatsApp community invite link.
const WHATSAPP_LINK = '#'

// Every slide in the talk, in order. This single list drives the numbered
// "03 / 11" labels on each section AND the slide-rail navigation on the
// right, so the two can never drift out of sync.
const SLIDES = [
    { id: 'hero', label: 'Opening' },
    { id: 'problem', label: 'The Problem' },
    { id: 'realization', label: 'The Realization' },
    { id: 'beginning', label: 'The Beginning' },
    { id: 'first-steps', label: 'First Steps' },
    { id: 'growth', label: 'Growth' },
    { id: 'hall-of-fame', label: 'Hall Of Fame' },
    { id: 'different', label: 'What Makes Us Different' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'vision', label: 'Vision' },
    { id: 'final', label: 'The Next Chapter' },
]
const slideNumber = (id) => SLIDES.findIndex((s) => s.id === id) + 1

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Subtle scroll-linked drift, used only on hero decoration layers.
// Mirrors the CursorGlow rAF pattern already used on the Home page.
function useParallax(speed = 0.15) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        let raf = null
        function update() {
            raf = null
            const rect = el.getBoundingClientRect()
            el.style.transform = `translateY(${rect.top * speed}px)`
        }
        function onScroll() {
            if (raf) return
            raf = requestAnimationFrame(update)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        update()
        return () => window.removeEventListener('scroll', onScroll)
    }, [speed])
    return ref
}

// Tracks which slide is centered in the viewport, so the slide rail and
// (eventually) any other "current position" UI stay in sync while scrolling.
function useActiveSlide() {
    const [activeId, setActiveId] = useState('hero')
    useEffect(() => {
        const sections = SLIDES.map((s) => document.getElementById(s.id)).filter(Boolean)
        if (!sections.length) return
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id)
                })
            },
            { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
        )
        sections.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])
    return activeId
}

// "03 / 11" — the small presenter-facing counter that opens every slide,
// so the talk always feels like a sequence rather than an endless scroll.
function SlideNumber({ id }) {
    const n = slideNumber(id)
    return (
        <div className="mb-5 flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.35em] text-slate-500">
            <span className="h-px w-6 bg-slate-700" />
            {String(n).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            <span className="h-px w-6 bg-slate-700" />
        </div>
    )
}

// Fixed right-edge slide rail — click any dot to jump straight to that
// slide. This is the one signature interaction that makes the page feel
// like it's being driven from a clicker, not scrolled past.
function SlideRail({ activeId }) {
    return (
        <div className="pointer-events-none fixed inset-y-0 right-5 z-40 hidden items-center lg:flex xl:right-8">
            <div className="pointer-events-auto flex flex-col items-end gap-3.5">
                {SLIDES.map((s) => {
                    const active = s.id === activeId
                    return (
                        <button
                            key={s.id}
                            onClick={() => scrollToSection(s.id)}
                            aria-label={`Go to slide: ${s.label}`}
                            aria-current={active}
                            className="group flex items-center gap-3"
                        >
                            <span
                                className={`whitespace-nowrap text-[11px] font-medium uppercase tracking-wider transition-all duration-300 ${active
                                    ? 'translate-x-0 text-white opacity-100'
                                    : 'translate-x-2 text-slate-500 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                    }`}
                            >
                                {s.label}
                            </span>
                            <span
                                className={`block rounded-full transition-all duration-300 ${active ? 'h-6 w-1.5 bg-blue-400' : 'h-1.5 w-1.5 bg-slate-600 group-hover:bg-slate-400'
                                    }`}
                            />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

function SectionTitle({ id, eyebrow, title, text, align = 'center' }) {
    const wrap = align === 'left' ? 'mb-14 max-w-2xl text-left' : 'mx-auto mb-14 max-w-3xl text-center'
    return (
        <div className={wrap}>
            {id && <SlideNumber id={id} />}
            <div className="eyebrow mb-5">{eyebrow}</div>
            <h2 className="section-title-glow relative text-4xl font-semibold text-balance text-white sm:text-6xl">
                <span className="section-title-shimmer">{title}</span>
            </h2>
            {text && <p className="muted mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg">{text}</p>}
        </div>
    )
}

function Reveal({ children, className = '' }) {
    return <div className={`animate-[rise_.7s_cubic-bezier(.16,1,.3,1)_both] ${className}`}>{children}</div>
}

// A full-height "slide" wrapper. Every act of the talk gets one of these:
// generous top/bottom breathing room, a floor on height so nothing feels
// cramped on a projector, and a slot for the usual ambient decoration.
function Slide({ id, className = '', innerClassName = '', children }) {
    return (
        <section
            id={id}
            className={`section relative flex min-h-[100dvh] items-center overflow-hidden py-24 sm:py-28 ${className}`}
        >
            <div className={`container relative z-10 w-full ${innerClassName}`}>{children}</div>
        </section>
    )
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const heroStats = [
    { value: 3, suffix: '+', label: 'years building together' },
    { value: 40, suffix: '+', label: 'projects shipped' },
    { value: 20, suffix: '+', label: 'active builders' },
]

const problemBefore = [
    { icon: Compass, text: 'Random tutorials with no clear direction' },
    { icon: Users, text: 'No senior around to ask "is this normal?"' },
    { icon: Code2, text: 'No community built around real frameworks and tools' },
    { icon: Target, text: 'Students learning the same lessons alone, one at a time' },
]
const problemAfter = [
    { icon: GraduationCap, text: 'Structured learning paths, built by people who\u2019ve done it' },
    { icon: Handshake, text: 'Mentorship from seniors who remember being lost too' },
    { icon: Rocket, text: 'Real projects from week one, not just theory' },
    { icon: Users, text: 'A community that builds in public, together' },
]

const realizationLine = 'What if students didn\u2019t have to learn alone?'

const originStory = [
    {
        tag: 'The Observation',
        title: 'Everyone was learning the same things — completely alone.',
        text: 'Every year, hundreds of first-years arrived curious about code, but with nowhere to point that curiosity. YouTube had answers. No one had a hand to hold.',
    },
    {
        tag: 'The Question',
        title: 'What if curiosity had a community around it?',
        text: 'A few students kept running into the same people at the same late-night debugging sessions. The question wasn\u2019t whether to start something — it was why no one had yet.',
    },
    {
        tag: 'The Belief',
        title: 'Guidance, collaboration, and real work beat theory alone.',
        text: 'We believed students didn\u2019t need another syllabus. They needed people slightly ahead of them, a room to build in, and permission to be bad at something before getting good at it.',
    },
    {
        tag: 'The Decision',
        title: 'So instead of waiting for it, we built it.',
        text: 'No department budget, no head start — just a shared login, a WhatsApp group, and a plan to meet every week. That plan became TechHub.',
    },
]

const founder = {
    name: 'Aditya Kumar Parida',
    role: 'Founding Lead, TechHub',
    photo: adityaParida,
    quote: 'We didn\u2019t set out to build a club. We set out to build the community we wished existed on our first day.',
}

const earlyTeam = [
    { name: 'Debasish Dash', role: 'Early core team', photo: debasish },
    { name: 'Biswajeet Senapati', role: 'Early core team', photo: biswajeet },
    { name: 'M Deepti', role: 'Early core team', photo: deepti },
    { name: 'Tapas Ranjan', role: 'Early core team', photo: tapas },
]

const traditionalApproach = [
    'Theory first, projects much later (if ever)',
    'Progress measured mostly by exams',
    'Learning happens alone, at your own desk',
]
const techhubApproach = [
    'Build first — understanding follows naturally',
    'Progress measured by what you\u2019ve shipped',
    'Learning happens in a room full of people doing the same thing',
]

const milestones = [
    { year: '2023', title: 'Club Founded', desc: 'A small group of students decided to stop waiting for a community and start one.', icon: Flag },
    { year: '2023', title: 'First Team Formed', desc: 'Core roles across development, design, and management came together.', icon: Users },
    { year: '2024', title: 'First Workshop', desc: 'A packed room, a whiteboard, and a promise to keep it hands-on.', icon: Lightbulb },
    { year: '2024', title: 'First Orientation', desc: 'The first batch of first-years met the club that would shape their four years.', icon: GraduationCap },
    { year: '2025', title: 'First Major Event', desc: 'TechHub outgrew a classroom and moved into an auditorium.', icon: PartyPopper },
    { year: '2025', title: 'First Hackathon Squad', desc: 'TechHub builders competed as a team for the first time — and kept doing it.', icon: Trophy },
]

const hallOfFame = [
    { name: 'Ansuman Patra', photo: ansuman, tag: 'Hackathon Finalist', icon: Trophy, desc: 'Took a machine-learning idea from a TechHub workshop all the way to a national finals stage.' },
    { name: 'Mayank Mishra', photo: mayank, tag: 'Security Researcher', icon: ShieldCheck, desc: 'Turned a curiosity spark from a TechHub cybersecurity session into a real specialization.' },
    { name: 'Arati Patra', photo: arati, tag: 'Open Source Contributor', icon: GitBranch, desc: 'Merged pull requests into projects used well beyond campus — started with a TechHub build night.' },
    { name: 'Asish Kumar Dhal', photo: asish, tag: 'Internship, Landed Early', icon: Briefcase, desc: 'Walked into interviews with a portfolio of real, shipped projects instead of a blank resume.' },
    { name: 'R Adhiraj', photo: adhiraj, tag: 'Project Builder', icon: Rocket, desc: 'Shipped more prototypes in one year than most people ship in four.' },
    { name: 'Pratikshya Panda', photo: pratikshya, tag: 'Team Lead', icon: Users, desc: 'Went from first-year attendee to leading the design team that runs every TechHub event today.' },
]

const galleryPhotos = [
    { image: p1, title: 'Workshop night' },
    { image: p2, title: 'Orientation day' },
    { image: p3, title: 'Team meeting' },
    { image: p4, title: 'Hackathon prep' },
    { image: p5, title: 'Build session' },
    { image: p6, title: 'Club activity' },
    { image: p7, title: 'Workshop night' },
    { image: p8, title: 'Team meeting' },
    { image: p9, title: 'Orientation day' },
    { image: p10, title: 'Build session' },
    { image: p11, title: 'Hackathon prep' },
    { image: p12, title: 'Club activity' },
]

const visionCards = [
    { title: 'Placement Support', text: 'Helping students prepare for careers.', icon: Briefcase },
    { title: 'Technical Workshops', text: 'Hands-on learning experiences.', icon: Lightbulb },
    { title: 'Industry Mentorship', text: 'Connecting students with professionals.', icon: Handshake },
    { title: 'Open Source Culture', text: 'Building in public.', icon: GitBranch },
    { title: 'Alumni Network', text: 'Connecting generations of builders.', icon: Building2 },
    { title: 'Bigger Events', text: 'Scaling impact across campus.', icon: Globe2 },
]

// Rotation classes used to give the "First Steps" team photos a taped-up,
// scrapbook feel instead of a tidy grid — reused cyclically per index.
const polaroidTilts = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3']

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function ComparisonList({ items, tone }) {
    const toneClass = tone === 'after'
        ? 'bg-emerald-500/10 text-emerald-300'
        : 'bg-slate-500/10 text-slate-400'
    return (
        <ul className="space-y-5">
            {items.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3.5">
                    <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${toneClass}`}>
                        <Icon size={17} />
                    </span>
                    <span className="muted pt-2 text-base leading-7">{text}</span>
                </li>
            ))}
        </ul>
    )
}

// One member at a time, presented big — a spotlight moment rather than a
// resume grid. Arrows and dots let a presenter click through live.
function HallOfFameSpotlight({ items }) {
    const [i, setI] = useState(0)
    const item = items[i]
    function step(dir) {
        setI((prev) => (prev + dir + items.length) % items.length)
    }
    return (
        <div className="mx-auto max-w-4xl">
            <div className="relative">
                <SpotlightCard
                    className="surface surface-elevated overflow-hidden rounded-[28px] p-0"
                    spotlightColor="rgba(99,102,241,0.18)"
                >
                    <div className="grid gap-0 sm:grid-cols-[minmax(0,320px)_1fr]">
                        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-auto">
                            <img
                                key={item.name}
                                src={item.photo}
                                alt={item.name}
                                loading="lazy"
                                className="size-full animate-[rise_.5s_cubic-bezier(.16,1,.3,1)_both] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent" />
                        </div>
                        <div className="flex flex-col justify-center p-8 sm:p-12">
                            <span className="eyebrow mb-5 inline-flex w-fit items-center gap-2">
                                <item.icon size={14} />
                                {item.tag}
                            </span>
                            <span className="story-quote-mark text-5xl leading-none text-blue-400/40">&ldquo;</span>
                            <p className="-mt-4 text-xl leading-8 text-slate-100 sm:text-2xl">{item.desc}</p>
                            <div className="mt-7 border-t border-white/[.08] pt-5 text-base font-semibold text-white">{item.name}</div>
                        </div>
                    </div>
                </SpotlightCard>
                <button
                    onClick={() => step(-1)}
                    aria-label="Previous builder"
                    className="absolute left-2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-slate-950/85 text-slate-200 backdrop-blur transition-colors hover:bg-slate-900 sm:-left-5"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={() => step(1)}
                    aria-label="Next builder"
                    className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-white/15 bg-slate-950/85 text-slate-200 backdrop-blur transition-colors hover:bg-slate-900 sm:-right-5"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
            <div className="mt-9 flex items-center justify-center gap-2">
                {items.map((m, idx) => (
                    <button
                        key={m.name}
                        onClick={() => setI(idx)}
                        aria-label={`Show ${m.name}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? 'w-8 bg-blue-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

function GalleryLightbox({ items, index, onClose, onStep }) {
    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onStep(-1)
            if (e.key === 'ArrowRight') onStep(1)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose, onStep])

    if (index === null) return null
    const item = items[index]

    return (
        <div
            className="story-lightbox-overlay fixed inset-0 z-[100] flex items-center justify-center bg-[#030712]/92 p-4 backdrop-blur-md"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
        >
            <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition-colors hover:bg-white/10"
            >
                <X size={20} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onStep(-1) }}
                aria-label="Previous photo"
                className="absolute left-3 grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition-colors hover:bg-white/10 sm:left-8"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onStep(1) }}
                aria-label="Next photo"
                className="absolute right-3 grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition-colors hover:bg-white/10 sm:right-8"
            >
                <ChevronRight size={20} />
            </button>
            <figure className="max-w-full" onClick={(e) => e.stopPropagation()}>
                <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-[78vh] max-w-full rounded-2xl border border-white/10 object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)]"
                />
                <figcaption className="muted mt-3 text-center text-sm">{item.title}</figcaption>
            </figure>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TechHubStory() {
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const heroParallax = useParallax(0.12)
    const logoParallax = useParallax(0.22)
    const activeSlide = useActiveSlide()

    function stepLightbox(dir) {
        setLightboxIndex((i) => {
            if (i === null) return i
            const next = (i + dir + galleryPhotos.length) % galleryPhotos.length
            return next
        })
    }

    return (
        <div className="min-h-screen bg-[#030712] text-slate-100">
            {/* Minimal presentation header — brand + a way back, nothing else to
          compete with the story on a projector. */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.08] bg-[#030712]/80 backdrop-blur-xl animate-[navFade_.6s_cubic-bezier(.16,1,.3,1)_both]">
                <div className="header-shimmer" />
                <div className="container flex h-[4.5rem] items-center justify-between">
                    <Link to="/" className="brand-mark group relative flex items-center gap-3" aria-label="TechHub home">
                        <span className="brand-badge relative grid place-items-center rounded-xl">
                            <img
                                src={techhubLogo}
                                alt="TechHub Logo"
                                className="h-11 w-11 object-contain transition-transform duration-500 ease-out group-hover:-rotate-[10deg] group-hover:scale-110"
                            />
                        </span>
                        <span className="font-heading text-lg font-semibold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-white">
                            TECH<span className="text-blue-400">'HUB</span>
                        </span>
                    </Link>
                    <Link to="/" className="hidden text-sm text-slate-400 transition-colors hover:text-white sm:block">
                        &larr; Back to Home
                    </Link>
                    <Magnet padding={50} magnetStrength={10}>
                        <a
                            href={REGISTRATION_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-shine relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-500 px-4 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(59,130,246,.9)] transition-all duration-300 hover:scale-[1.03] hover:bg-blue-400"
                        >
                            Join Orientation <ArrowRight size={15} />
                        </a>
                    </Magnet>
                </div>
            </header>

            {/* Numbered dot rail — the "remote clicker" for the talk. */}
            <SlideRail activeId={activeSlide} />

            <main>
                {/* -------------------------------------------------------------- */}
                {/* 1. HERO                                                         */}
                {/* -------------------------------------------------------------- */}
                <section id="hero" className="section relative isolate flex min-h-[100dvh] items-center overflow-hidden pt-28">
                    <div ref={heroParallax} className="absolute inset-0 -z-10">
                        <Aurora colorStops={['#7cff67', '#B497CF', '#5227FF']} amplitude={0.9} blend={0.4} speed={0.25} />
                    </div>
                    <div className="grid-bg absolute inset-0 -z-10 opacity-40" />
                    <div
                        className="pointer-events-none absolute inset-0 -z-10"
                        style={{
                            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, #000 35%, transparent 85%)',
                            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, #000 35%, transparent 85%)',
                        }}
                    >
                        <DotField dotRadius={1.5} dotSpacing={18} bulgeStrength={40} glowRadius={160} sparkle waveAmplitude={5} />
                    </div>

                    <div className="container relative z-10 text-center">
                        <Reveal className="[animation-delay:.05s]">
                            <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                                <Link to="/" className="inline-flex items-center gap-1.5 font-semibold text-slate-400 transition-colors hover:text-white">
                                    &larr; Back to Home
                                </Link>
                                <Link to="/roadmaps" className="inline-flex items-center gap-1.5 font-semibold text-blue-300 transition-colors hover:text-blue-200">
                                    Open B.Tech Survival Guide <ArrowRight size={15} />
                                </Link>
                            </div>
                        </Reveal>
                        <Reveal className="[animation-delay:.15s]">
                            <div ref={logoParallax} className="story-float mx-auto mb-8 grid size-20 place-items-center rounded-3xl border border-white/10 bg-white/[.03] backdrop-blur-sm sm:size-24">
                                <img src={techhubLogo} alt="TechHub logo" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
                            </div>
                        </Reveal>

                        <Reveal className="[animation-delay:.3s]">
                            <div className="eyebrow mb-5 justify-center gap-2 sm:flex">Our Story &middot; Orientation Edition</div>
                        </Reveal>

                        <Reveal className="[animation-delay:.45s]">
                            <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-.05em] text-white sm:text-7xl lg:text-8xl">
                                We Built The Community <span className="text-blue-400">We Wish We Had</span>
                            </h1>
                        </Reveal>

                        <Reveal className="[animation-delay:.6s]">
                            <p className="muted mx-auto mt-8 max-w-xl text-base leading-7 sm:text-lg">
                                TechHub started with a simple observation: students were learning technologies alone
                                when they should have been building together.
                            </p>
                        </Reveal>

                        <Reveal className="[animation-delay:.75s]">
                            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <button
                                    onClick={() => scrollToSection('problem')}
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/30 px-6 text-sm font-semibold text-slate-200 transition-all hover:border-blue-400/70 hover:bg-slate-900"
                                >
                                    Explore Our Story <ArrowDown size={16} />
                                </button>
                                <Magnet padding={60} magnetStrength={8}>
                                    <a
                                        href={REGISTRATION_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-shine relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(59,130,246,.9)] transition-all duration-300 hover:scale-[1.03] hover:bg-blue-400"
                                    >
                                        Join Orientation <ArrowRight size={16} />
                                    </a>
                                </Magnet>
                            </div>
                        </Reveal>

                        <Reveal className="[animation-delay:.9s]">
                            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-white/[.07] border-y border-white/[.07] py-6">
                                {heroStats.map((s) => (
                                    <div key={s.label} className="px-3 text-center">
                                        <div className="bg-gradient-to-b from-white to-slate-300 bg-clip-text font-heading text-2xl font-semibold text-transparent sm:text-3xl">
                                            <CountUp from={0} to={s.value} duration={2} />{s.suffix}
                                        </div>
                                        <div className="mt-1.5 text-[11px] uppercase tracking-wider text-slate-500 sm:text-xs">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* -------------------------------------------------------------- */}
                {/* 2. THE PROBLEM                                                  */}
                {/* -------------------------------------------------------------- */}
                <Slide id="problem" className="border-y border-white/[.07] bg-slate-950/30">
                    <div className="ambient-blobs"><span className="blob blob-blue blob-1" /><span className="blob blob-violet blob-2" /></div>
                    <SectionTitle id="problem" eyebrow="The gap we saw" title="Learning alone doesn't build careers." />
                    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
                        <ScrollReveal delay={0}>
                            <SpotlightCard className="surface h-full rounded-2xl p-6 sm:p-8" spotlightColor="rgba(148,163,184,0.08)">
                                <span className="eyebrow mb-6 inline-block !text-slate-400">Before</span>
                                <ComparisonList items={problemBefore} tone="before" />
                            </SpotlightCard>
                        </ScrollReveal>

                        <div className="hidden items-center justify-center lg:flex">
                            <span className="story-arrow-nudge grid size-12 place-items-center rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300">
                                <ArrowRight size={20} />
                            </span>
                        </div>

                        <ScrollReveal delay={140}>
                            <SpotlightCard
                                className="surface surface-elevated h-full rounded-2xl p-6 sm:p-8"
                                spotlightColor="rgba(16,185,129,0.14)"
                                style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)' }}
                            >
                                <span className="eyebrow mb-6 inline-block !text-emerald-300">After TechHub</span>
                                <ComparisonList items={problemAfter} tone="after" />
                            </SpotlightCard>
                        </ScrollReveal>
                    </div>
                </Slide>

                {/* -------------------------------------------------------------- */}
                {/* 3. THE REALIZATION                                              */}
                {/* -------------------------------------------------------------- */}
                <Slide id="realization" className="section-fade-top">
                    <div className="ambient-blobs"><span className="blob blob-violet blob-3" /></div>
                    <div className="mx-auto max-w-4xl text-center">
                        <SlideNumber id="realization" />
                        <div className="eyebrow mb-8 justify-center gap-2 sm:flex">So we asked a question</div>
                        <Quote size={30} className="mx-auto mb-8 rotate-180 text-blue-400/50" />
                        <ScrollReveal>
                            <p className="font-heading text-4xl font-medium leading-tight tracking-[-.03em] text-white sm:text-6xl lg:text-7xl">
                                &ldquo;{realizationLine}&rdquo;
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={150}>
                            <p className="muted mx-auto mt-9 max-w-lg text-base leading-7 sm:text-lg">
                                That single question, asked in a hallway between classes, is where TechHub actually began.
                            </p>
                        </ScrollReveal>
                    </div>
                </Slide>

                {/* -------------------------------------------------------------- */}
                {/* 4. THE BEGINNING                                                */}
                {/* -------------------------------------------------------------- */}
                <Slide id="beginning" className="border-y border-white/[.07] bg-slate-950/25">
                    <div className="ambient-blobs"><span className="blob blob-blue blob-2" /></div>
                    <SectionTitle id="beginning" eyebrow="The beginning" title="That's how TechHub started." />
                    <div className="relative mx-auto max-w-3xl">
                        <div className="absolute left-[15px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-blue-400/50 via-violet-400/40 to-transparent sm:block" />
                        <div className="space-y-12">
                            {originStory.map((beat, i) => (
                                <ScrollReveal key={beat.tag} delay={i * 100}>
                                    <div className="relative pl-0 sm:pl-12">
                                        <span className="absolute left-0 top-1 hidden size-8 place-items-center rounded-full border border-blue-400/40 bg-[#030712] font-mono text-[11px] text-blue-300 sm:grid">
                                            {i + 1}
                                        </span>
                                        <div className="eyebrow mb-2">{beat.tag}</div>
                                        <h3 className="font-heading text-2xl font-semibold text-white sm:text-3xl">{beat.title}</h3>
                                        <p className="muted mt-3 max-w-xl text-base leading-7">{beat.text}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </Slide>

                {/* -------------------------------------------------------------- */}
                {/* 5. FIRST STEPS                                                  */}
                {/* -------------------------------------------------------------- */}
                <Slide id="first-steps" className="section-fade-top">
                    <div className="ambient-blobs"><span className="blob blob-blue blob-3" /></div>
                    <SectionTitle
                        id="first-steps"
                        eyebrow="First steps"
                        title="One idea. One team. One mission."
                        text="No department budget, no head start — just the people who showed up first."
                    />

                    <ScrollReveal>
                        <SpotlightCard className="surface surface-elevated mx-auto mb-14 max-w-3xl overflow-hidden rounded-2xl p-0" spotlightColor="rgba(59,130,246,0.14)">
                            <div className="grid gap-0 sm:grid-cols-[240px_1fr]">
                                <div className="aspect-square sm:aspect-auto">
                                    <img src={founder.photo} alt={founder.name} loading="lazy" className="size-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-center p-7 sm:p-9">
                                    <span className="eyebrow mb-3 inline-block">{founder.role}</span>
                                    <p className="font-heading text-xl font-medium leading-8 text-white sm:text-2xl">
                                        &ldquo;{founder.quote}&rdquo;
                                    </p>
                                    <div className="mt-5 text-sm font-semibold text-slate-300">{founder.name}</div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </ScrollReveal>

                    <div className="mx-auto flex max-w-3xl flex-wrap items-start justify-center gap-x-6 gap-y-10 sm:gap-x-10">
                        {earlyTeam.map((m, i) => (
                            <ScrollReveal key={m.name} delay={i * 80}>
                                <div
                                    className={`w-32 shrink-0 rounded-lg border-4 border-white bg-white p-2 pb-4 shadow-[0_20px_45px_-18px_rgba(0,0,0,.6)] transition-transform duration-300 hover:rotate-0 hover:scale-105 sm:w-36 ${polaroidTilts[i % polaroidTilts.length]}`}
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img src={m.photo} alt={m.name} loading="lazy" className="size-full object-cover" />
                                    </div>
                                    <div className="mt-2 text-center font-heading text-[11px] font-semibold leading-tight text-slate-900">{m.name}</div>
                                    <div className="mt-0.5 text-center text-[10px] text-slate-500">{m.role}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </Slide>

                {/* -------------------------------------------------------------- */}
                {/* 6. GROWTH                                                       */}
                {/* -------------------------------------------------------------- */}
                <Slide id="growth" className="border-y border-white/[.07] bg-slate-950/30">
                    <div className="ambient-blobs"><span className="blob blob-blue blob-1" /><span className="blob blob-violet blob-3" /></div>
                    <SectionTitle id="growth" eyebrow="Growth" title="Then things started growing." />

                    <ScrollReveal>
                        <div className="mx-auto mb-16 grid max-w-2xl grid-cols-3 divide-x divide-white/[.07] border-y border-white/[.07] py-6">
                            {heroStats.map((s) => (
                                <div key={s.label} className="px-3 text-center">
                                    <div className="bg-gradient-to-b from-white to-slate-300 bg-clip-text font-heading text-3xl font-semibold text-transparent sm:text-4xl">
                                        <CountUp from={0} to={s.value} duration={2} />{s.suffix}
                                    </div>
                                    <div className="mt-1.5 text-[11px] uppercase tracking-wider text-slate-500 sm:text-xs">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    <div className="story-timeline-track relative h-px w-full" />
                    <div className="-mt-px grid gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
                        {milestones.map((m, i) => (
                            <ScrollReveal key={m.title} delay={i * 90}>
                                <div className="story-timeline-node text-center">
                                    <span className="story-timeline-dot relative mx-auto -mt-[7px] mb-5 grid size-3.5 place-items-center rounded-full bg-blue-400" />
                                    <span className="mx-auto grid size-12 place-items-center rounded-xl bg-blue-500/10 text-blue-300">
                                        <m.icon size={20} />
                                    </span>
                                    <div className="mt-4 font-mono text-xs text-blue-300">{m.year}</div>
                                    <h3 className="mt-1 font-heading text-sm font-semibold text-white">{m.title}</h3>
                                    <p className="muted mt-2 text-xs leading-5">{m.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </Slide>

                {/* -------------------------------------------------------------- */}
                {/* 7. HALL OF FAME                                                 */}
                {/* -------------------------------------------------------------- */}
                <Slide id="hall-of-fame" className="section-fade-top">
                    <div className="ambient-blobs"><span className="blob blob-emerald blob-2" /></div>
                    <SectionTitle
                        id="hall-of-fame"
                        eyebrow="Hall of fame"
                        title="Every senior was once a fresher."
                        text="These are the people who showed up, kept building, and turned TechHub into a launchpad."
                    />
                    <HallOfFameSpotlight items={hallOfFame} />
                </Slide>

                {/* -------------------------------------------------------------- */}
                {/* 8. WHAT MAKES TECHHUB DIFFERENT                                 */}
                {/* -------------------------------------------------------------- */}
                <Slide id="different" className="border-y border-white/[.07] bg-slate-950/30">
                    <SectionTitle id="different" eyebrow="What makes TechHub different" title="Build first. Understand as you go." />
                    <div className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-white/10">
                        <ScrollReveal delay={0}>
                            <div className="sm:pr-12">
                                <div className="mb-8 flex items-center gap-3 text-slate-400">
                                    <Layers size={22} />
                                    <h3 className="font-heading text-base font-semibold uppercase tracking-widest">Traditional Path</h3>
                                </div>
                                <ul className="space-y-6">
                                    {traditionalApproach.map((t) => (
                                        <li key={t} className="text-lg leading-8 text-slate-500 decoration-slate-600 sm:text-xl">
                                            <span className="line-through decoration-2">{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={120}>
                            <div className="sm:pl-12">
                                <div className="mb-8 flex items-center gap-3 text-blue-300">
                                    <Rocket size={22} />
                                    <h3 className="font-heading text-base font-semibold uppercase tracking-widest text-white">TechHub Path</h3>
                                </div>
                                <ul className="space-y-6">
                                    {techhubApproach.map((t) => (
                                        <li key={t} className="text-lg leading-8 text-slate-100 sm:text-xl">{t}</li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </Slide>

                {/* -------------------------------------------------------------- */}
                {/* 9. GALLERY OF MEMORIES                                          */}
                {/* -------------------------------------------------------------- */}
                <Slide id="gallery" className="section-fade-top">
                    <SectionTitle id="gallery" eyebrow="Gallery of memories" title="Workshops, events, and everything between." />
                    <div className="story-masonry">
                        {galleryPhotos.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setLightboxIndex(i)}
                                className="group relative block w-full overflow-hidden rounded-2xl border border-white/10"
                                style={{ aspectRatio: i % 3 === 0 ? '4 / 5' : i % 3 === 1 ? '1 / 1' : '4 / 3' }}
                                aria-label={`Open photo: ${item.title}`}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <span className="text-sm font-medium text-white">{item.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </Slide>

                <GalleryLightbox
                    items={galleryPhotos}
                    index={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onStep={stepLightbox}
                />

                {/* -------------------------------------------------------------- */}
                {/* 10. VISION 2030                                                 */}
                {/* -------------------------------------------------------------- */}
                <Slide id="vision" className="border-t border-white/[.07]">
                    <div className="ambient-blobs"><span className="blob blob-blue blob-2" /><span className="blob blob-violet blob-1" /></div>
                    <SectionTitle id="vision" eyebrow="Vision 2030" title="This is only the beginning." />
                    <div className="bento-grid mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
                        {visionCards.map((v, i) => (
                            <ScrollReveal key={v.title} delay={i * 70}>
                                <SpotlightCard className="surface bento-card group h-full rounded-2xl p-7" spotlightColor="rgba(139,92,246,0.14)">
                                    <span className="grid size-13 place-items-center rounded-xl bg-violet-500/10 text-violet-300">
                                        <v.icon size={24} />
                                    </span>
                                    <h3 className="mt-6 font-heading text-xl font-semibold text-white">{v.title}</h3>
                                    <p className="muted mt-2 text-base leading-7">{v.text}</p>
                                </SpotlightCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </Slide>

                {/* -------------------------------------------------------------- */}
                {/* 11. FINAL CTA                                                   */}
                {/* -------------------------------------------------------------- */}
                <section id="final" className="section relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 -z-10">
                        <Aurora colorStops={['#5227FF', '#B497CF', '#7cff67']} amplitude={0.6} blend={0.45} speed={0.2} />
                    </div>
                    <div className="absolute inset-0 -z-10 bg-[#030712]/60" />
                    <div className="container relative z-10 text-center">
                        <ScrollReveal>
                            <SlideNumber id="final" />
                            <MessagesSquare size={32} className="mx-auto mb-6 text-blue-300" />
                            <h2 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-.04em] text-white sm:text-7xl">
                                The Next Chapter <span className="text-blue-400">Starts With You</span>
                            </h2>
                            <p className="muted mx-auto mt-7 max-w-lg text-base leading-7 sm:text-lg">
                                Every senior was once a fresher. Every builder started somewhere.
                                <br className="hidden sm:block" />
                                Maybe your story starts here too.
                            </p>
                            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Magnet padding={60} magnetStrength={8}>
                                    <a
                                        href={REGISTRATION_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-shine relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(59,130,246,.9)] transition-all duration-300 hover:scale-[1.03] hover:bg-blue-400"
                                    >
                                        Join Orientation <ArrowRight size={16} />
                                    </a>
                                </Magnet>
                                <Magnet padding={60} magnetStrength={8}>
                                    <a
                                        href={WHATSAPP_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/30 px-6 text-sm font-semibold text-slate-200 transition-all hover:border-blue-400/70 hover:bg-slate-900"
                                    >
                                        Join WhatsApp Community <ArrowUpRight size={16} />
                                    </a>
                                </Magnet>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/[.08] py-10">
                <div className="container flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link to="/" className="font-heading text-lg font-semibold">
                            TECH<span className="text-blue-400">'HUB</span>
                        </Link>
                        <p className="muted mt-2 text-sm">Build beyond the classroom.</p>
                    </div>
                    <Link to="/" className="text-sm text-slate-400 transition-colors hover:text-white">
                        &larr; Back to Home
                    </Link>
                </div>
            </footer>
        </div>
    )
}