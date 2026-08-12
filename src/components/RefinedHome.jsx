import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, ArrowRight, BrainCircuit, Calendar, CheckCircle2, ChevronDown, Code2, Globe2, Landmark, Mail, Map, MapPin, Menu, Phone, Rocket, Send, ShieldCheck, Sparkles, Target, Trophy, Users, X, Zap } from 'lucide-react'
import Aurora from "./reactbits/Aurora";
import Magnet from "../../components/Magnet";
import CountUp from "../../components/CountUp";
import SpotlightCard from "../../components/SpotlightCard";
import DriftWall from "../../components/DriftWall";
import DotField from "../../components/DotField";
import ScrollReveal from "./ScrollReveal";
import MemberStories from "./MemberStories";
import useSmoothScroll from "../hooks/useSmoothScroll";
import orientationImg from "../assets/events/orientation.png";
import p1 from "../assets/gallery/p1.jpeg";
import p2 from "../assets/gallery/p2.jpeg";
import p3 from "../assets/gallery/p3.jpeg";
import p4 from "../assets/gallery/p4.jpeg";
import p5 from "../assets/gallery/p5.jpeg";
import p6 from "../assets/gallery/p6.jpeg";
import p7 from "../assets/gallery/p7.jpeg";
import p8 from "../assets/gallery/p8.jpeg";
import p9 from "../assets/gallery/p9.jpeg";
import p10 from "../assets/gallery/p10.jpeg";
import p11 from "../assets/gallery/p11.jpeg";
import p12 from "../assets/gallery/p12.jpeg";
import p13 from "../assets/gallery/p13.jpeg";
import p14 from "../assets/gallery/p14.jpeg";
import p15 from "../assets/gallery/p15.jpeg";
import p16 from "../assets/gallery/p16.jpeg";
import p17 from "../assets/gallery/p17.jpeg";
import p18 from "../assets/gallery/p18.jpeg";
import p19 from "../assets/gallery/p19.jpeg";
import p20 from "../assets/gallery/p20.jpeg";
import p21 from "../assets/gallery/p21.jpeg";
import p22 from "../assets/gallery/p22.jpeg";
import p23 from "../assets/gallery/p23.jpeg";
import p24 from "../assets/gallery/p24.jpeg";
import p25 from "../assets/gallery/p25.jpeg";
import p26 from "../assets/gallery/p26.jpeg";
import techhubLogo from "../assets/techhub-logo.png";
import ansuman from "../assets/builders/ansuman.jpeg";
import arati from "../assets/builders/arati.jpeg";
import adityaParida from "../assets/builders/aditya-parida.jpeg";
import deepti from "../assets/builders/deepti.png";
import biswajeet from "../assets/builders/biswajeet.png";
import pratikshya from "../assets/builders/pratikshya.png";
import asish from "../assets/builders/asish.png";
import debasish from "../assets/builders/debasish.jpeg";
import tapas from "../assets/builders/tapas.png";
import smruti from "../assets/builders/smruti.png";
import mayank from "../assets/builders/mayank.jpeg";
import sandeep from "../assets/builders/sandeep.jpeg";
import adhiraj from "../assets/builders/adhiraj.png";
import adityaVajpayee from "../assets/builders/aditya-vajpayee.png";
import ashutosh from "../assets/builders/ashutosh.jpeg";

// lucide-react 1.0 removed brand/logo icons (Instagram, Linkedin, etc).
// Lightweight stand-ins in the same stroke style, matching the lucide props API (size, className).
const Instagram = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.4a4 4 0 1 1-3.4-3.4 4 4 0 0 1 3.4 3.4z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const Linkedin = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.5A6 6 0 0 1 16 8z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

// `route: true` entries use React Router navigation (Link) to a dedicated
// presentation page. Everything else is an in-page anchor that scrolls to a
// section on the homepage.
const nav = [
  ['About', '#about'],
  ['Story', '/story', true],
  ['Roadmaps', '/roadmaps', true],
  ['Domains', '#domains'],
  ['Builders', '#builders'],
  ['Events', '#events'],
  ['Gallery', '#gallery'],
]
const stats = [
  [20, '+', 'active members', Users],
  [40, '+', 'projects shipped', Rocket],
  [100, '%', 'student-led', ShieldCheck]
]

const domains = [['01', 'Web & App Development', 'From first commit to production-ready products.', Code2], ['02', 'AI & Machine Learning', 'Explore intelligent systems with practical experiments.', BrainCircuit], ['03', 'Cybersecurity', 'Learn to build resilient systems and think defensively.', ShieldCheck], ['04', 'UI/UX Design', 'Craft intuitive interfaces and experiences people love to use.', Sparkles]]

// "Start Your Journey" — the two presentation entry points used live during
// orientation. Each card is a full route (React Router), not a scroll link.
const journeyCards = [
  {
    to: '/story',
    icon: Rocket,
    accent: 'blue',
    title: 'Our Story',
    description: "Discover why TechHub was created, how it started, the milestones we've achieved, and the vision we're building toward.",
    cta: 'Explore Story',
  },
  {
    to: '/roadmaps',
    icon: Map,
    accent: 'violet',
    title: 'B.Tech Survival Guide',
    description: 'A fun and practical roadmap covering domains, CGPA, internships, projects, placements, and mistakes to avoid during engineering.',
    cta: 'Open Guide',
  },
]
const journeyAccent = {
  blue: { glow: 'from-blue-500/50 via-blue-400/20', chip: 'bg-blue-500/10 text-blue-400', cta: 'text-blue-300 group-hover:text-blue-200', spotlight: 'rgba(59,130,246,0.2)' },
  violet: { glow: 'from-violet-500/50 via-violet-400/20', chip: 'bg-violet-500/10 text-violet-400', cta: 'text-violet-300 group-hover:text-violet-200', spotlight: 'rgba(139,92,246,0.2)' },
}

// "Meet The Builders" — clicking a Domains card above scrolls here and
// auto-selects the matching filter pill. Keys are the Domains section
// titles; values are the corresponding builder-filter label.
const domainFilterMap = {
  'Web & App Development': 'Web Development',
  'AI & Machine Learning': 'Machine Learning',
  'Cybersecurity': 'Cybersecurity',
}
const builderFilters = ['All', 'Web Development', 'Machine Learning', 'Graphics Design', 'Management', 'Technical', 'Non-Technical', 'Cybersecurity']
const domainAccent = {
  'Web Development': { text: 'text-blue-300', bg: 'bg-blue-500/15', ring: 'ring-blue-400/30', dot: 'bg-blue-400/70' },
  'Machine Learning': { text: 'text-violet-300', bg: 'bg-violet-500/15', ring: 'ring-violet-400/30', dot: 'bg-violet-400/70' },
  'Cybersecurity': { text: 'text-rose-300', bg: 'bg-rose-500/15', ring: 'ring-rose-400/30', dot: 'bg-rose-400/70' },
  'Graphics Design': { text: 'text-pink-300', bg: 'bg-pink-500/15', ring: 'ring-pink-400/30', dot: 'bg-pink-400/70' },
  'Management': { text: 'text-amber-300', bg: 'bg-amber-500/15', ring: 'ring-amber-400/30', dot: 'bg-amber-400/70' },
  'Technical': { text: 'text-cyan-300', bg: 'bg-cyan-500/15', ring: 'ring-cyan-400/30', dot: 'bg-cyan-400/70' },
  'Non-Technical': { text: 'text-teal-300', bg: 'bg-teal-500/15', ring: 'ring-teal-400/30', dot: 'bg-teal-400/70' },
}
// Real TechHub roster (from MemberStories). Skills and featured-work lines
// are inferred from each member's team, since only name/role/quote were
// available — swap these two fields in for the real specifics, and add
// github/linkedin links once you have them.
const builders = [
  { name: 'Aditya Kumar Parida', domain: 'Management', year: '3rd Year', tagline: 'Bringing people together to make every event actually happen.', photo: adityaParida },
  { name: 'M Deepti', domain: 'Non-Technical', year: '3rd Year', tagline: 'Turning small details into events people genuinely enjoy.', photo: deepti },
  { name: 'Biswajeet Senapati', domain: 'Web Development', year: '3rd Year', tagline: 'Building modern web experiences, one shipped project at a time.', photo: biswajeet },
  { name: 'Pratikshya Panda', domain: 'Graphics Design', year: '3rd Year', tagline: 'Designing with purpose, not just making things look pretty.', photo: pratikshya },
  { name: 'Asish Kumar Dhal', domain: 'Technical', year: '3rd Year', tagline: 'Curious about what happens behind every interface you use.', photo: asish },
  { name: 'Debasish Dash', domain: 'Management', year: '4th Year', tagline: 'Leading teams and keeping every event running smoothly.', photo: debasish },
  { name: 'Tapas Ranjan', domain: 'Graphics Design', year: '3rd Year', tagline: 'Designing experiences that start with empathy, not software.', photo: tapas },
  { name: 'Smruti Ranjan Kabi', domain: 'Technical', year: '4th Year', tagline: 'Building with structure, mentorship, and a clear roadmap.', photo: smruti },
  { name: 'Mayank Mishra', domain: 'Cybersecurity', year: '3rd Year', tagline: 'Turning curiosity about security into a real passion.', photo: mayank },
  { name: 'Ansuman Patra', domain: 'Machine Learning', year: '3rd Year', tagline: 'Training models and turning them into real, working solutions.', photo: ansuman },
  { name: 'Arati Patra', domain: 'Technical', year: '3rd Year', tagline: 'Building real experience, one club project at a time.', photo: arati },
  { name: 'R Adhiraj', domain: 'Machine Learning', year: '3rd Year', tagline: 'Exploring AI, one model and one teammate at a time.', photo: adhiraj },
  { name: 'Aditya Vajpayee', domain: 'Graphics Design', year: '3rd Year', tagline: 'Getting better with every design critique and every project.', photo: adityaVajpayee },
  { name: 'Ashutosh Sahu', domain: 'Web Development', year: '3rd Year', tagline: 'Building applications that real people actually enjoy using.', photo: ashutosh },
  { name: 'Sandeep', domain: 'Management', year: '3rd Year', tagline: 'Keeping plans on track and every event running like clockwork.', photo: sandeep },
]
function getInitials(name) {
  return name.split(' ').filter(Boolean).slice(0, 3).map((p) => p[0]).join('').toUpperCase()
}
const REGISTRATION_LINK = "https://docs.google.com/forms/d/1LvSepXGPgNEVKmITQlpbEOX0YLIQty0ar_Zv7MNhjTg/edit"
const featuredEvent = {
  title: 'TECH IGNITE',
  date: '13 August 2026',
  audience: 'First Year Students',
  location: 'GIET University',
  description: 'Welcome to TechHub and discover every domain, meet seniors, explore projects, and begin your journey with the community.',
  image: orientationImg
}
const contactInfo = [['Location', MapPin, 'GIET University, Gunupur, Odisha', null], ['Email', Mail, '24cse181.ansumanpatra@giet.edu', 'mailto:24cse181.ansumanpatra@giet.edu'], ['Phone', Phone, '+91 6371690323', null]]
const socialLinks = [['Instagram', Instagram, 'https://www.instagram.com/techub_gietu?igsh=d3FkdWEyNjE0dzM='], ['LinkedIn', Linkedin, 'https://www.linkedin.com/company/tech-hub-gietclub/']]
const CONTACT_EMAIL = '24cse181.ansumanpatra@giet.edu'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// All 26 local TechHub gallery photos, in import order. DriftWall assigns
// items to its columns internally, so keeping this flat and in-order lets
// its own column-fill logic (round-robin across `columns`) spread the mix
// evenly — e.g. with columns=4 that lands p1/p5/p9... in column 1,
// p2/p6/p10... in column 2, and so on.
const galleryImages = [
  p1, p2, p3, p4, p5,
  p6, p7, p8, p9, p10,
  p11, p12, p13, p14, p15,
  p16, p17, p18, p19, p20,
  p21, p22, p23, p24, p25,
  p26,
];

const galleryItems = galleryImages.map((image, i) => ({
  image,
  title: `TechHub Moment ${i + 1}`,
}));

function Button({ children, outline = false, href = '#contact', to }) {
  const className = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all ${outline ? 'border border-slate-700 bg-slate-950/30 text-slate-200 hover:border-blue-400/70 hover:bg-slate-900' : 'bg-blue-500 text-white shadow-[0_12px_30px_-12px_rgba(59,130,246,.9)] hover:bg-blue-400'}`
  // `to` -> internal SPA route (react-router Link, no full page reload).
  // otherwise -> plain anchor, unchanged, for in-page hashes / external links.
  if (to) return <Link to={to} className={className}>{children}</Link>
  return <a href={href} className={className}>{children}</a>
}
function SectionTitle({ eyebrow, title, text }) { return <div className="mx-auto mb-12 max-w-2xl text-center"><div className="eyebrow mb-4">{eyebrow}</div><h2 className="section-title-glow relative text-3xl font-semibold text-balance text-white sm:text-5xl"><span className="section-title-shimmer">{title}</span></h2>{text && <p className="muted mt-5 text-base leading-7">{text}</p>}</div> }
function Reveal({ children, className = '' }) { return <div className={`animate-[rise_.7s_cubic-bezier(.16,1,.3,1)_both] ${className}`}>{children}</div> }

// Scrolls to a section by id, accounting for the fixed header via CSS
// scroll-margin-top on the target (see .section[id] rule in globals.css).
// Falls back silently if the target isn't present.
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Faint cursor-following glow, desktop only. Purely visual, sits behind
// content (no z-index above sections), pointer-events disabled throughout.
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = null
    function handleMove(e) {
      if (raf) return
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--cursor-x', `${e.clientX}px`)
        el.style.setProperty('--cursor-y', `${e.clientY}px`)
        raf = null
      })
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])
  return <div ref={ref} className="cursor-glow hidden lg:block" aria-hidden="true" />
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | success

  function validate(v) {
    const e = {}
    if (!v.name.trim()) e.name = 'Please enter your name.'
    if (!v.email.trim()) e.email = 'Please enter your email.'
    else if (!emailPattern.test(v.email.trim())) e.email = 'Enter a valid email address.'
    if (!v.subject.trim()) e.subject = 'Please add a subject.'
    if (!v.message.trim()) e.message = 'Please write a message.'
    return e
  }

  function handleChange(field) {
    return (ev) => setValues((v) => ({ ...v, [field]: ev.target.value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) { setStatus('idle'); return }

    // --- Send integration point -------------------------------------------------
    // Option A (current, no backend required): open the user's email client
    // with a pre-filled draft addressed to the club inbox.
    const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`

    // Option B (future, no backend required): swap the two lines above for an
    // EmailJS call using the same `values` object, e.g.
    // emailjs.send('SERVICE_ID', 'TEMPLATE_ID', values, 'PUBLIC_KEY')
    //   .then(() => setStatus('success'))
    //   .catch(() => setErrors({ form: 'Something went wrong. Please try again.' }))
    // -----------------------------------------------------------------------------

    setStatus('success')
    setValues({ name: '', email: '', subject: '', message: '' })
  }

  const inputClass = (field) => `w-full rounded-xl border bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/20 ${errors[field] ? 'border-red-500/60 focus:border-red-400' : 'border-slate-700 focus:border-blue-400/70'}`

  return (
    <form noValidate onSubmit={handleSubmit} className="surface space-y-5 rounded-2xl p-6 sm:p-8">
      <div>
        <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" value={values.name} onChange={handleChange('name')} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-error' : undefined} className={inputClass('name')} placeholder="Your full name" />
        {errors.name && <p id="cf-name-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"><AlertCircle size={13} />{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange('email')} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-error' : undefined} className={inputClass('email')} placeholder="you@example.com" />
        {errors.email && <p id="cf-email-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"><AlertCircle size={13} />{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="cf-subject" className="mb-2 block text-sm font-medium text-slate-300">Subject</label>
        <input id="cf-subject" name="subject" type="text" value={values.subject} onChange={handleChange('subject')} aria-required="true" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'cf-subject-error' : undefined} className={inputClass('subject')} placeholder="What's this about?" />
        {errors.subject && <p id="cf-subject-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"><AlertCircle size={13} />{errors.subject}</p>}
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-slate-300">Message</label>
        <textarea id="cf-message" name="message" rows={5} value={values.message} onChange={handleChange('message')} aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-error' : undefined} className={`${inputClass('message')} resize-none`} placeholder="Tell us a bit about why you're reaching out..." />
        {errors.message && <p id="cf-message-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"><AlertCircle size={13} />{errors.message}</p>}
      </div>
      <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(59,130,246,.9)] transition-all hover:bg-blue-400 sm:w-auto">
        Send Message <Send size={16} />
      </button>
      {status === 'success' && <p role="status" className="flex items-center gap-2 text-sm text-emerald-400"><CheckCircle2 size={16} />Your email client is opening with the message ready to send.</p>}
    </form>
  )
}

export default function RefinedHome() {
  useSmoothScroll()
  const [open, setOpen] = useState(false)
  const [activeDomain, setActiveDomain] = useState('All')
  const aboutSpotlightRef = useRef(null)
  function handleAboutMouseMove(e) {
    const el = aboutSpotlightRef.current
    if (!el) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--spot-x', `${x}%`)
    el.style.setProperty('--spot-y', `${y}%`)
  }
  // Domains card -> Meet The Builders: activate the matching filter, then
  // smooth-scroll down to the section instead of navigating away.
  function handleDomainClick(title) {
    setActiveDomain(domainFilterMap[title] || 'All')
    scrollToSection('builders')
  }
  const filteredBuilders = activeDomain === 'All' ? builders : builders.filter((b) => b.domain === activeDomain)
  return <div className="min-h-screen bg-[#030712] text-slate-100">
    <CursorGlow />
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.08] bg-[#030712]/80 backdrop-blur-xl animate-[navFade_.6s_cubic-bezier(.16,1,.3,1)_both] [animation-delay:.2s]">
      <div className="header-shimmer" />
      <div className="container flex h-[4.5rem] items-center justify-between">
        <a href="#top" className="brand-mark group relative flex items-center gap-3" aria-label="TechHub home"><span className="brand-badge relative grid place-items-center rounded-xl"><img
          src={techhubLogo}
          alt="TechHub Logo"
          className="h-11 w-11 object-contain transition-transform duration-500 ease-out group-hover:-rotate-[10deg] group-hover:scale-110"
        /></span><span className="font-heading text-lg font-semibold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-white">TECH<span className="text-blue-400">'HUB</span></span></a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">{nav.map(([label, href, isRoute]) => isRoute ? <Link key={label} to={href} className="text-sm text-slate-400 transition-colors hover:text-white">{label}</Link> : <a key={label} href={href} className="text-sm text-slate-400 transition-colors hover:text-white">{label}</a>)}</nav>
        <div className="hidden md:block"><Magnet
          padding={50}
          magnetStrength={10}
        >
          <Button href="#contact">
            Join TechHub
            <ArrowRight size={16} />
          </Button>
        </Magnet></div>
        <button className="rounded-lg p-2 text-slate-300 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="container border-t border-white/[.08] py-4 md:hidden">{nav.map(([label, href, isRoute]) => isRoute ? <Link onClick={() => setOpen(false)} key={label} to={href} className="block rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/[.04]">{label}</Link> : <a onClick={() => setOpen(false)} key={label} href={href} className="block rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/[.04]">{label}</a>)}<a onClick={() => setOpen(false)} href="#contact" className="mt-2 block"><Button href="#contact">Query <ArrowRight size={16} /></Button></a></nav>}
    </header>

    <main id="top">
      <section className="relative isolate flex min-h-[760px] items-center overflow-hidden pt-28 sm:min-h-[820px] lg:pt-20">
        <div className="absolute inset-0 -z-10">
          <Aurora
            colorStops={["#7cff67", "#B497CF", "#5227FF"]}
            amplitude={0.7}
            blend={0.35}
            speed={0.3}
          />
        </div>
        <div className="grid-bg absolute inset-0 opacity-50" /><div className="absolute left-1/4 top-32 size-80 rounded-full bg-blue-600/10 blur-3xl" /><div className="absolute right-1/4 top-48 size-72 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="container relative grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-20"><div><Reveal className="[animation-delay:.5s]"><h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.065em] text-white sm:text-7xl">Build <span className="text-blue-400">beyond</span><br className="hidden sm:block" /> the classroom.</h1></Reveal><Reveal className="[animation-delay:.7s]"><p className="muted mt-7 max-w-xl text-base leading-7 sm:text-lg">Join the university&apos;s premier technical community. <span className="text-slate-100">Build real-world software</span>, compete in hackathons, learn from seniors, and create projects that matter.</p></Reveal><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Reveal className="[animation-delay:.9s]"><Magnet
          padding={60}
          magnetStrength={8}
        >
          <Button href="#events">
            Explore Orientation
            <ArrowRight size={17} />
          </Button>
        </Magnet></Reveal>
          <Reveal className="[animation-delay:.98s]"><Button outline href="#about"><Sparkles size={16} className="text-blue-300" /> Explore our work</Button></Reveal>
          <Reveal className="[animation-delay:1.05s]"><Magnet
            padding={60}
            magnetStrength={8}
          >
            <Button to="/roadmaps">Plan Your 4 Years (No Panic) 🗺️ <ArrowRight size={16} /></Button>
          </Magnet></Reveal></div><Reveal className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-500 [animation-delay:1.1s]"><span className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-400" />student-led</span></Reveal></div>
          <Reveal className="[animation-delay:1.1s]"><div className="surface overflow-hidden rounded-2xl"><div className="flex items-center justify-between border-b border-white/[.08] bg-slate-950/70 px-4 py-3"><div className="flex gap-1.5"><i className="size-2 rounded-full bg-slate-700" /><i className="size-2 rounded-full bg-slate-700" /><i className="size-2 rounded-full bg-slate-700" /></div><span className="font-mono text-[11px] text-slate-500">techhub.jsx</span><span className="size-8" /></div><div className="space-y-3 p-5 font-mono text-xs leading-6 text-slate-400 sm:p-7 sm:text-sm"><div><span className="text-violet-400">import</span> {'{ TechHub }'} <span className="text-violet-400">from</span> <span className="text-blue-400">&apos;@techhub/core&apos;</span>;</div><div className="h-2" /><div><span className="text-violet-400">const</span> <span className="text-white">club</span> = <span className="text-violet-400">new</span> <span className="text-white">TechHub</span>();</div><div className="pl-4 text-blue-300">await club.<span className="text-white">learn</span>();</div><div className="pl-4 text-blue-300">await club.<span className="text-white">build</span>();</div><div className="pl-4 text-blue-300">await club.<span className="text-white">compete</span>();</div><div className="pl-4 text-blue-300">await club.<span className="text-white">mentor</span>();</div><div className="h-2" /><div className="flex items-center justify-between border-t border-white/[.08] pt-4"><span className="flex items-center gap-2 text-emerald-400"><Zap size={14} />techhub.join()</span><span className="text-slate-600">ready</span></div></div></div></Reveal></div><div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[.2em] text-slate-600 lg:flex"><span>Scroll to explore</span><ChevronDown size={15} /></div>
      </section>

      <section
        id="journey"
        className="section relative overflow-hidden section-fade-top lighting-journey-start"
      >
        <div className="ambient-blobs"><span className="blob blob-blue blob-1" /><span className="blob blob-violet blob-2" /></div>
        <div className="container relative z-10">
          <SectionTitle eyebrow="Start Your Journey" title="Choose what you want to explore first." />
          <div className="grid gap-6 lg:grid-cols-2">
            {journeyCards.map(({ to, icon: Icon, accent, title, description, cta }, i) => {
              const a = journeyAccent[accent]
              return (
                <ScrollReveal key={to} delay={i * 120}>
                  <Magnet padding={80} magnetStrength={16}>
                    <Link to={to} className="journey-card group relative block h-full rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60">
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br ${a.glow} to-transparent opacity-60 blur-[1px] transition-opacity duration-500 group-hover:opacity-100`}
                      />
                      <SpotlightCard
                        className="surface surface-elevated relative h-full overflow-hidden rounded-3xl p-8 transition-all duration-500 group-hover:-translate-y-1.5 sm:p-10"
                        spotlightColor={a.spotlight}
                        style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                      >
                        <span className={`grid size-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${a.chip}`}>
                          <Icon size={26} />
                        </span>
                        <h3 className="mt-8 font-heading text-2xl font-semibold text-white sm:text-3xl">{title}</h3>
                        <p className="muted mt-4 max-w-md text-sm leading-7 sm:text-base">{description}</p>
                        <span className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3 ${a.cta}`}>
                          {cta} <ArrowRight size={16} />
                        </span>
                      </SpotlightCard>
                    </Link>
                  </Magnet>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-slate-950/30"><div className="container grid grid-cols-3 divide-x divide-white/[.07]">{stats.map(([num, suffix, label, Icon]) => (
        <div
          key={label}
          data-cursor="interactive"
          className="group px-4 py-8 text-center transition-colors duration-300 hover:bg-white/[.02] sm:py-10"
        >
          <Icon size={18} className="mx-auto mb-3 text-blue-400/70 transition-colors duration-300 group-hover:text-blue-300" />
          <div className="bg-gradient-to-b from-white to-slate-300 bg-clip-text font-heading text-3xl font-semibold text-transparent sm:text-4xl">
            <CountUp
              from={0}
              to={num}
              duration={2}
            />
            {suffix}
          </div>

          <div className="mt-2 text-xs uppercase tracking-wider text-slate-500">
            {label}
          </div>
        </div>
      ))}</div></section>

      <section
        id="about"
        onMouseMove={handleAboutMouseMove}
        className="section relative overflow-hidden section-fade-top lighting-about"
      >
        <div className="ambient-blobs"><span className="blob blob-blue blob-1" /><span className="blob blob-violet blob-2" /></div>

        {/* 6. Floating particle/dot background — very low opacity, behind all content */}
        <div
          className="about-particles pointer-events-none absolute inset-0 z-0"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 45%, #000 40%, transparent 88%)',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 45%, #000 40%, transparent 88%)',
          }}
        >
          <DotField dotRadius={1.6} dotSpacing={16} bulgeStrength={45} glowRadius={175} sparkle={false} waveAmplitude={6} />
        </div>

        {/* 4. Mouse-follow spotlight — extremely subtle, never affects text contrast */}
        <div
          ref={aboutSpotlightRef}
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: 'radial-gradient(420px circle at var(--spot-x,50%) var(--spot-y,40%), rgba(59,130,246,0.05), transparent 70%)' }}
        />

        <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]"><div className="relative">
          {/* 1. Ambient glow behind heading — opacity always under 10% */}
          <span className="about-heading-glow about-heading-glow-blue" aria-hidden="true" />
          <span className="about-heading-glow about-heading-glow-violet" aria-hidden="true" />

          <ScrollReveal delay={0}><div className="eyebrow mb-4">About TechHub</div></ScrollReveal>
          <ScrollReveal delay={80}><h2 className="max-w-lg text-3xl font-semibold text-white sm:text-5xl">The place where curiosity becomes capability.</h2></ScrollReveal>
          <ScrollReveal delay={160}><p className="muted mt-6 max-w-lg leading-7">TechHub is a student-led community for builders, designers, problem solvers, and anyone who wants to understand how technology can move the world forward.</p></ScrollReveal>
          <ScrollReveal delay={240}><p className="muted mt-4 max-w-lg leading-7">No matter where you start, you&apos;ll find people to learn with, projects to contribute to, and a stage to share what you&apos;ve made.</p></ScrollReveal>
          <ScrollReveal delay={320}><a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200">Meet the community <ArrowRight size={16} /></a></ScrollReveal>
        </div>
          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            {/* 3. Animated connector lines between the cards — thin, low-opacity, with a traveling light */}
            <svg className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full sm:block" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="about-connector-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <path id="about-line-left" d="M100,62 L50,104" stroke="url(#about-connector-grad)" strokeWidth="1" fill="none" />
              <path id="about-line-right" d="M100,62 L150,104" stroke="url(#about-connector-grad)" strokeWidth="1" fill="none" />
              <circle r="2.2" fill="#93c5fd">
                <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#about-line-left" />
                </animateMotion>
                <animate attributeName="opacity" values="0;0.9;0" dur="5s" repeatCount="indefinite" />
              </circle>
              <circle r="2.2" fill="#c4b5fd">
                <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" begin="1s">
                  <mpath href="#about-line-right" />
                </animateMotion>
                <animate attributeName="opacity" values="0;0.9;0" dur="6s" begin="1s" repeatCount="indefinite" />
              </circle>
            </svg>

            <ScrollReveal delay={0} className="relative z-10 col-span-2">
              <SpotlightCard
                className="surface about-card group h-full rounded-2xl p-5 sm:p-7"
                spotlightColor="rgba(99,102,241,0.15)"
              >
                <span className="mb-8 grid size-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-[1.08]"><Rocket size={22} /></span>
                <div className="font-heading text-xl font-semibold text-white">
                  Learn in public
                </div>
                <p className="muted mt-2 text-sm leading-6">
                  Workshops, study jams, and honest conversations about the craft.
                </p>
              </SpotlightCard>
            </ScrollReveal>
            <ScrollReveal delay={150} className="relative z-10">
              <SpotlightCard
                className="surface about-card group h-full rounded-2xl p-5 sm:p-7"
                spotlightColor="rgba(99,102,241,0.15)"
              >
                <span className="mb-8 grid size-11 place-items-center rounded-xl bg-violet-500/10 text-violet-400 transition-transform duration-300 group-hover:scale-[1.08]"><Users size={22} /></span>
                <div className="font-heading text-lg font-semibold text-white">Find your people</div>
              </SpotlightCard>
            </ScrollReveal>
            <ScrollReveal delay={300} className="relative z-10">
              <SpotlightCard
                className="surface about-card group h-full rounded-2xl p-5 sm:p-7"
                spotlightColor="rgba(99,102,241,0.15)"
              >
                <span className="mb-8 grid size-11 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-[1.08]"><Trophy size={22} /></span>
                <div className="font-heading text-lg font-semibold text-white">Ship together</div>
              </SpotlightCard>
            </ScrollReveal>
          </div></div></section>

      <section
        id="domains"
        className="section relative overflow-hidden bg-slate-950/25 section-fade-top lighting-domains"
      >
        <div className="ambient-blobs z-0"><span className="blob blob-emerald blob-2" /><span className="blob blob-blue blob-3" /></div>
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            opacity: 1.0,
            WebkitMaskImage: 'radial-gradient(ellipse 78% 78% at 50% 50%, #000 50%, transparent 92%)',
            maskImage: 'radial-gradient(ellipse 78% 78% at 50% 50%, #000 50%, transparent 92%)',
          }}
        >
          <DotField
            dotRadius={2}
            dotSpacing={14}
            bulgeStrength={105}
            glowRadius={320}
            sparkle={true}
            waveAmplitude={0}
          />
        </div>
        <div className="container relative z-10"><SectionTitle eyebrow="Explore your edge" title="A domain for every kind of builder" text="Start with what excites you. Build the skills and confidence to go further." /><div className="bento-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{domains.map(([number, title, text, Icon], i) => <ScrollReveal key={title} delay={i * 80}><div role="button" tabIndex={0} onClick={() => handleDomainClick(title)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDomainClick(title) } }} aria-label={`Meet the ${title} builders`} className="surface bento-card domain-card group h-full cursor-pointer rounded-2xl p-5 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 sm:p-6"><div className="flex items-start justify-between"><Icon size={23} className="domain-icon text-blue-400" /><span className="font-mono text-xs text-slate-600">{number}</span></div><h3 className="mt-12 font-heading text-lg font-semibold text-white">{title}</h3><p className="muted mt-2 text-sm leading-6">{text}</p><ArrowRight size={16} className="mt-5 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-blue-300" /></div></ScrollReveal>)}</div></div></section>

      <section
        id="builders"
        className="section relative overflow-hidden bg-slate-950/25 section-fade-top lighting-builders"
      >
        <div className="ambient-blobs z-0"><span className="blob blob-emerald blob-1" /><span className="blob blob-blue blob-3" /></div>

        <div className="container relative z-10">
          <SectionTitle
            eyebrow="Meet the builders"
            title="The people behind TechHub."
            text="Real seniors, real domains — put a face to the community you're about to join."
          />

          <ScrollReveal>
            <div role="tablist" aria-label="Filter builders by domain" className="mb-10 flex flex-wrap justify-center gap-2.5">
              {builderFilters.map((filter) => <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeDomain === filter}
                onClick={() => setActiveDomain(filter)}
                className={`filter-pill rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm ${activeDomain === filter ? 'border-blue-400/50 bg-blue-500/15 text-blue-200 shadow-[0_0_20px_-6px_rgba(59,130,246,.6)]' : 'border-white/10 bg-white/[.03] text-slate-400 hover:border-white/20 hover:bg-white/[.06] hover:text-slate-200'}`}
              >{filter}</button>)}
            </div>
          </ScrollReveal>

          {/* Remounting the grid on activeDomain change replays each card's
              rise-in animation, giving the filter switch a smooth transition
              without any extra animation library. */}
          <div key={activeDomain} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBuilders.map((member, i) => {
              const accent = domainAccent[member.domain] ?? domainAccent['Web Development']
              return <div
                key={member.name}
                tabIndex={0}
                className="builder-card group relative rounded-[22px] animate-[rise_.6s_cubic-bezier(.16,1,.3,1)_both] focus-visible:outline-none"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Ambient blue/violet glow — sits behind the card, never moves it, only fades in */}
                <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-blue-500/25 via-violet-500/15 to-transparent opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100" />

                {/* Card frame — static, never translates or scales; only its contents animate */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] ring-1 ring-white/[.08] transition-shadow duration-500 ease-out group-hover:ring-white/[.14] group-focus-within:ring-2 group-focus-within:ring-blue-400/60">

                  {/* Portrait photo — fills the frame, gently zooms on hover */}
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="absolute inset-0 size-full origin-center object-cover transition-transform duration-[600ms] ease-out will-change-transform group-hover:scale-[1.05] group-focus-within:scale-[1.05]"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 flex items-center justify-center font-heading text-5xl font-semibold ${accent.bg} ${accent.text} transition-transform duration-[600ms] ease-out will-change-transform group-hover:scale-[1.05] group-focus-within:scale-[1.05]`}
                    >
                      {getInitials(member.name)}
                    </div>
                  )}

                  {/* Base gradient — always on, keeps name/domain legible over any photo */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Dark glass overlay — fades in on hover to seat the revealed copy */}
                  <div className="pointer-events-none absolute inset-0 bg-slate-950/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100" />

                  {/* Bottom content — name/domain always visible, anchored to the base of the frame */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                    <h3 className="font-heading text-lg font-semibold leading-tight text-white">
                      {member.name}
                    </h3>
                    <p className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${accent.text}`}>
                      {member.domain}
                    </p>
                  </div>

                  {/* Secondary section — year + tagline, clearly separated from identity block above,
                      revealed with a subtle upward fade (opacity + translateY only) */}
                  <div className="pointer-events-none absolute inset-x-6 bottom-[5.25rem] flex flex-col items-center gap-3 text-center opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
                    <span className="h-px w-8 bg-white/20" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.18em] text-slate-400">
                        {member.year}
                      </p>
                      {member.tagline && (
                        <p className="mt-3 line-clamp-3 text-sm italic leading-7 text-slate-100">
                          "{member.tagline}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>

          {filteredBuilders.length === 0 && <p className="muted mt-12 text-center text-sm">No builders listed in this domain yet — check back soon.</p>}
        </div>
      </section>

      <section className="section relative overflow-hidden section-fade-top lighting-whyjoin">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            opacity: 1,
            WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 45%, #000 35%, transparent 88%)',
            maskImage: 'radial-gradient(ellipse 75% 75% at 50% 45%, #000 35%, transparent 88%)',
          }}
        >
          <DotField
            dotRadius={2}
            dotSpacing={14}
            bulgeStrength={105}
            glowRadius={320}
            sparkle={true}
            waveAmplitude={0}
          />
        </div>
        <div className="ambient-blobs z-[1]" style={{ opacity: 0.5 }}><span className="blob blob-violet blob-1" /><span className="blob blob-emerald blob-3" /></div>
        <div className="container relative z-10"><SectionTitle eyebrow="Why join" title="More than a club. A launchpad." text="The fastest way to grow is to build alongside people who make you want to raise your bar." /><div className="bento-grid grid gap-4 md:grid-cols-3">
          <ScrollReveal delay={0} className="md:col-span-2">
            <SpotlightCard
              className="surface surface-elevated bento-card group h-full rounded-2xl p-6 transition-transform duration-300"
              spotlightColor="rgba(59,130,246,0.12)"
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            ><span className="grid size-12 place-items-center rounded-xl bg-blue-500/10 text-blue-400"><Sparkles size={22} /></span><h3 className="mt-12 font-heading text-2xl font-semibold">Learn by doing</h3><p className="muted mt-3 max-w-xl leading-7">Forget passive tutorials. Pair with peers, get feedback from mentors, and turn every idea into a small, shippable experiment.</p></SpotlightCard>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <SpotlightCard
              className="surface bento-card group h-full rounded-2xl p-6 transition-transform duration-300"
              spotlightColor="rgba(99,102,241,0.12)"
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <span className="grid size-12 place-items-center rounded-xl bg-violet-500/10 text-violet-400"><BrainCircuit size={22} /></span>

              <h3 className="mt-12 font-heading text-xl font-semibold">
                Mentorship that moves
              </h3>

              <p className="muted mt-3 text-sm leading-6">
                Clear guidance from seniors who have been there.
              </p>
            </SpotlightCard>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <SpotlightCard
              className="surface bento-card group h-full rounded-2xl p-6 transition-transform duration-300"
              spotlightColor="rgba(99,102,241,0.12)"
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            ><span className="grid size-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400"><Globe2 size={22} /></span><h3 className="mt-12 font-heading text-xl font-semibold">A wider world</h3><p className="muted mt-3 text-sm leading-6">Connect with teams, communities, and opportunities beyond campus.</p></SpotlightCard>
          </ScrollReveal>
          <ScrollReveal delay={240} className="md:col-span-2">
            <SpotlightCard
              className="surface surface-elevated bento-card group h-full rounded-2xl p-6 transition-transform duration-300"
              spotlightColor="rgba(16,185,129,0.12)"
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            ><span className="grid size-12 place-items-center rounded-xl bg-blue-500/10 text-blue-400"><Code2 size={22} /></span><h3 className="mt-12 font-heading text-xl font-semibold">A portfolio with proof</h3><p className="muted mt-3 max-w-xl text-sm leading-6">Leave with work you can show, talk about, and be proud of.</p></SpotlightCard>
          </ScrollReveal>
        </div></div></section>

      <section className="section relative overflow-hidden border-y border-white/[.07] bg-slate-950/30 lighting-journey"><div className="ambient-blobs"><span className="blob blob-blue blob-1" /><span className="blob blob-violet blob-3" /></div><div className="container relative z-10"><SectionTitle eyebrow="Your journey" title="Start small. Grow boldly." /><div className="bento-grid grid gap-4 md:grid-cols-4">{[['01', 'Discover', 'Find a domain and meet your people.'], ['02', 'Build', 'Turn a problem into a working prototype.'], ['03', 'Compete', 'Put your skills to the test with a team.'], ['04', 'Lead', 'Share what you know and shape what comes next.']].map(([n, t, d], i) => <ScrollReveal key={n} delay={i * 80}><div className="surface bento-card group relative h-full rounded-2xl p-5 transition-transform duration-300 sm:p-6"><span className="grid size-10 place-items-center rounded-lg bg-blue-500/10 font-mono text-xs text-blue-400">{n}</span><h3 className="mt-6 font-heading text-lg font-semibold">{t}</h3><p className="muted mt-2 text-sm leading-6">{d}</p></div></ScrollReveal>)}</div></div></section>

      <section className="section relative overflow-hidden bg-slate-950/25 section-fade-top lighting-achievements"><div className="ambient-blobs"><span className="blob blob-blue blob-2" /><span className="blob blob-violet blob-3" /></div><div className="container relative z-10"><SectionTitle eyebrow="Achievements" title="Small teams. Big momentum." /><div className="bento-grid grid gap-4 sm:grid-cols-2">{[['40+', 'Products shipped', 'From campus ideas to public launches', Rocket, 'surface surface-elevated bento-card group h-full rounded-2xl p-6 transition-transform duration-300', 'grid size-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400'], ['12', 'Active chapters', 'A growing network of builders', Globe2, 'surface surface-elevated bento-card group h-full rounded-2xl p-6 transition-transform duration-300', 'grid size-11 place-items-center rounded-xl bg-violet-500/10 text-violet-400']].map(([n, t, d, Icon, cardClass, chipClass], i) => <ScrollReveal key={t} delay={i * 80}><div className={cardClass}><span className={chipClass}><Icon size={20} /></span><div className="mt-6 font-heading text-4xl font-semibold text-blue-300">{n}</div><div className="mt-2 font-heading text-lg font-semibold">{t}</div><p className="muted mt-2 text-sm leading-6">{d}</p></div></ScrollReveal>)}</div></div></section>

      <section id="events" className="section"><div className="container"><SectionTitle eyebrow="Upcoming event" title="Don't miss what's next." text="One event worth clearing your calendar for." /><div className="mx-auto max-w-[900px]"><ScrollReveal><SpotlightCard
        className="surface featured-event-glow group overflow-hidden rounded-2xl p-0"
        spotlightColor="rgba(59,130,246,0.18)"
      ><div className="relative aspect-[16/9] overflow-hidden"><img src={featuredEvent.image} alt={featuredEvent.title} loading="lazy" className="event-image-float size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" /><div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-transparent to-transparent" /><span className="absolute left-4 top-4 rounded-md border border-white/15 bg-slate-950/75 px-2.5 py-1 font-mono text-[10px] tracking-widest text-blue-200">UPCOMING</span><span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] tracking-widest text-emerald-300"><span className="live-pulse-dot" />LIVE REGISTRATION</span></div><div className="p-6 sm:p-8"><h3 className="font-heading text-2xl font-semibold text-white sm:text-3xl">{featuredEvent.title}</h3><p className="muted mt-3 max-w-xl leading-7">{featuredEvent.description}</p><div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[.08] pt-5 text-sm text-slate-300"><span className="flex items-center gap-2"><Calendar size={16} className="text-blue-400" />{featuredEvent.date}</span><span className="flex items-center gap-2"><Target size={16} className="text-blue-400" />{featuredEvent.audience}</span><span className="flex items-center gap-2"><Landmark size={16} className="text-blue-400" />{featuredEvent.location}</span></div><div className="mt-7 flex flex-wrap items-center gap-5"><Magnet padding={40} magnetStrength={10}><a
        href={REGISTRATION_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-shine relative overflow-hidden inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(59,130,246,.9)] transition-all duration-300 hover:scale-[1.03] hover:bg-blue-400 hover:shadow-[0_16px_36px_-10px_rgba(59,130,246,1)]"
      >Register Now <ArrowRight size={16} /></a></Magnet><a href="#events" className="text-sm font-semibold text-blue-300 hover:text-blue-200">View All Events</a></div></div></SpotlightCard></ScrollReveal></div></div></section>

      <section
        id="gallery"
        className="section border-y border-white/[.07] bg-slate-950/30 lighting-gallery"
      >
        <div className="container">

          <SectionTitle
            eyebrow="Inside TechHub"
            title="Built in good company"
            text="Hackathons, workshops, coding nights, and unforgettable memories."
          />

          <div className="mt-14 h-[650px] overflow-hidden rounded-3xl border border-white/10">

            <DriftWall
              items={galleryItems}
              columns={4}
              tileWidth={230}
              tileHeight={155}
              gap={16}
              speed={18}
              direction="up"
              tilt={8}
              turn={-6}
              lift={35}
              parallax={0.25}
              fade={0.4}
              dim={0.85}

            />

          </div>

        </div>
      </section>

      <section className="section"><div className="container"><SectionTitle eyebrow="Member stories" title="The people make the place" /><MemberStories /></div></section>

      <section id="contact" className="section border-t border-white/[.07]"><div className="container"><SectionTitle eyebrow="Contact us" title="Let&apos;s Build Something Amazing Together" text="Have questions about TechHub? Interested in joining, collaborating, sponsoring an event, or simply want to know more? We&apos;d love to hear from you." /><div className="grid gap-5 lg:grid-cols-2 lg:gap-8"><div className="space-y-5"><Reveal className="space-y-4">{contactInfo.map(([label, Icon, value, href]) => <div key={label} className="surface group flex items-start gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 hover:border-blue-400/30 sm:p-6"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-500/15 text-blue-300 ring-1 ring-inset ring-blue-400/30"><Icon size={19} /></span><div className="min-w-0"><div className="font-heading text-sm font-semibold text-white">{label}</div>{href ? <a href={href} className="muted mt-1 block truncate text-sm hover:text-blue-300">{value}</a> : <p className="muted mt-1 text-sm leading-6">{value}</p>}</div></div>)}<div className="surface rounded-2xl p-5 sm:p-6"><div className="font-heading text-sm font-semibold text-white">Follow us</div><div className="mt-4 flex items-center gap-3">{socialLinks.map(([label, Icon, href]) => <a key={label} href={href} aria-label={label} className="grid size-11 place-items-center rounded-xl bg-blue-500/10 text-blue-300 transition-colors hover:bg-blue-500/20 hover:text-blue-200"><Icon size={18} /></a>)}</div></div></Reveal></div><Reveal><ContactForm /></Reveal></div></div></section>
    </main>
    <footer className="border-t border-white/[.08] py-10 lighting-footer"><div className="container flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"><div><a href="#top" className="font-heading text-lg font-semibold">TECH<span className="text-blue-400">'HUB</span></a><p className="muted mt-2 text-sm">Build beyond the classroom.</p></div><div className="flex items-center gap-3 text-slate-500"><a href="#contact" aria-label="Community" className="grid size-9 place-items-center rounded-lg transition-colors duration-300 hover:bg-white/[.06] hover:text-white"><Users size={18} /></a><span className="ml-2 text-xs">© 2024 TechHub</span></div></div></footer>
  </div>
}