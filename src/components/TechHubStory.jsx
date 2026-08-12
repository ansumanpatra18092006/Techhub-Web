import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

// --- ALUMNI ASSETS (SUPER SENIORS) ---
import lallu from '../assets/builders/lallu.jpeg';
import aparajita from '../assets/builders/aparajita.jpeg';
import arvind from '../assets/builders/arvind.jpeg';
import akankshya from '../assets/builders/akankshya.jpeg';
import rashmita from '../assets/builders/rashmita.jpeg';
import kanhu from '../assets/builders/kanhu.jpeg';
import rashmi from '../assets/builders/rashmi.jpeg';

// --- ACHIEVEMENT BUILDER ASSETS ---
import ansuman from '../assets/builders/ansuman.jpeg';
import mayank from '../assets/builders/mayank.jpeg';
import arati from '../assets/builders/arati.jpeg';
import asish from '../assets/builders/asish.png';
import adityaParida from '../assets/builders/aditya-parida.jpeg';

// --- GALLERY ASSETS ---
import p1 from '../assets/gallery/p1.jpeg';
import p2 from '../assets/gallery/p2.jpeg';
import p3 from '../assets/gallery/p3.jpeg';
import p4 from '../assets/gallery/p4.jpeg';
import p5 from '../assets/gallery/p5.jpeg';
import p7 from '../assets/gallery/p7.jpeg';
import p12 from '../assets/gallery/p12.jpeg';
import p15 from '../assets/gallery/p15.jpeg';
import p18 from '../assets/gallery/p18.jpeg';
import p22 from '../assets/gallery/p22.jpeg';
import p25 from '../assets/gallery/p25.jpeg';
import p9 from '../assets/gallery/p9.jpeg';
import p11 from '../assets/gallery/p11.jpeg';
import p14 from '../assets/gallery/p14.jpeg';
import p17 from '../assets/gallery/p17.jpeg';
import p24 from '../assets/gallery/p24.jpeg';
import p23 from '../assets/gallery/p23.jpeg';

// ============================================================
// DATA DRIVEN ARCHITECTURE
// ============================================================

// 0. SUPER SENIORS (Section 6)
const superSeniors = [
    {
        name: 'Lallu Prasad Panda',
        role: 'Founder',
        photo: lallu,
        company: 'TCS',
        designation: 'System Engineer',
        wrapperClass: 'flex justify-center items-center md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2 z-30',
        cardClass: 'bg-white p-4 lg:p-5 shadow-2xl rotate-[-1deg] relative border border-gray-100 transition-all duration-300 hover:rotate-0 hover:scale-[1.04] hover:shadow-[0_30px_60px_-10px_rgba(20,22,43,0.3)] hover:z-50 w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[340px] xl:max-w-[360px] mx-auto',
        tapeClass: 'top-[-12px] left-1/2 -translate-x-1/2 rotate-[2deg] w-28 lg:w-32',
        imgClass: 'w-full h-[300px] lg:h-[340px] xl:h-[380px] object-cover bg-gray-100 mb-4'
    },
    {
        name: 'Aparajita Bharati',
        role: 'Early Team',
        photo: aparajita,
        company: 'Omega Healthcare Solutions',
        designation: '',
        wrapperClass: 'flex justify-center lg:justify-end items-end lg:col-start-1 lg:row-start-1 z-20',
        cardClass: 'bg-white p-3 shadow-xl rotate-[3deg] border border-gray-100 relative transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-50 w-full max-w-[280px] lg:max-w-[240px] xl:max-w-[270px]',
        tapeClass: 'top-[-10px] left-8 rotate-[-3deg] w-16 lg:w-20',
        imgClass: 'w-full h-56 lg:h-52 xl:h-60 object-cover bg-gray-100 mb-4 filter contrast-125 grayscale-[20%]',
        textClass: 'text-[#00B39B]'
    },
    {
        name: 'Arvind Padhi',
        role: 'Early Team',
        photo: arvind,
        company: 'Omega Healthcare Management Services',
        designation: '',
        wrapperClass: 'flex justify-center lg:justify-end items-start lg:col-start-1 lg:row-start-3 z-20',
        cardClass: 'bg-white p-3 shadow-xl rotate-[-3deg] border border-gray-100 relative transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-50 w-full max-w-[280px] lg:max-w-[240px] xl:max-w-[270px]',
        tapeClass: 'top-[-10px] right-8 rotate-[4deg] w-20 lg:w-24',
        imgClass: 'w-full h-56 lg:h-52 xl:h-56 object-cover bg-gray-100 mb-4',
        textClass: 'text-[#4C6FFF]'
    },
    {
        name: 'Rashmi Ranjan Badjena',
        role: 'Early Team',
        photo: rashmi,
        company: 'TCS',
        designation: '',
        wrapperClass: 'flex justify-center lg:justify-end items-center lg:col-start-1 lg:row-start-2 z-10',
        cardClass: 'bg-white p-3 shadow-xl rotate-[2deg] border border-gray-100 relative transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-50 w-full max-w-[280px] lg:max-w-[240px] xl:max-w-[270px]',
        tapeClass: 'top-[-8px] left-1/2 -translate-x-1/2 rotate-[-2deg] w-16 lg:w-20',
        imgClass: 'w-full h-52 lg:h-48 xl:h-52 object-cover bg-gray-100 mb-4',
        textClass: 'text-[#FFD23F]'
    },
    {
        name: 'Akankshya Jena',
        role: 'Early Team',
        photo: akankshya,
        company: 'Ipsos',
        designation: 'Market Research Analyst',
        wrapperClass: 'flex justify-center lg:justify-start items-end lg:col-start-3 lg:row-start-1 z-20',
        cardClass: 'bg-white p-3 shadow-xl rotate-[-2deg] border border-gray-100 relative transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-50 w-full max-w-[280px] lg:max-w-[240px] xl:max-w-[270px]',
        tapeClass: 'top-[-8px] left-4 rotate-[-2deg] w-16 lg:w-20',
        imgClass: 'w-full h-60 lg:h-56 xl:h-60 object-cover bg-gray-100 mb-4',
        textClass: 'text-[#FF5D5D]'
    },
    {
        name: 'Simadri Rashmita',
        role: 'Early Team',
        photo: rashmita,
        company: 'Sambal Infratech',
        designation: '',
        wrapperClass: 'flex justify-center lg:justify-start items-center lg:col-start-3 lg:row-start-2 z-10',
        cardClass: 'bg-white p-3 shadow-xl rotate-[4deg] border border-gray-100 relative transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-50 w-full max-w-[280px] lg:max-w-[240px] xl:max-w-[270px]',
        tapeClass: 'top-[-10px] left-1/2 -translate-x-1/2 rotate-[-4deg] w-20 lg:w-24',
        imgClass: 'w-full h-52 lg:h-48 xl:h-52 object-cover bg-gray-100 mb-4',
        textClass: 'text-[#7C5CFF]'
    },
    {
        name: 'Kanhu',
        role: 'Early Team',
        photo: kanhu,
        company: 'Upgrad',
        designation: '',
        wrapperClass: 'flex justify-center lg:justify-start items-start lg:col-start-3 lg:row-start-3 z-20',
        cardClass: 'bg-white p-3 shadow-xl rotate-[-4deg] border border-gray-100 relative transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-50 w-full max-w-[280px] lg:max-w-[240px] xl:max-w-[270px]',
        tapeClass: 'top-[-5px] right-4 rotate-[5deg] w-16 lg:w-20',
        imgClass: 'w-full h-56 lg:h-52 xl:h-56 object-cover bg-gray-100 mb-4',
        textClass: 'text-[#00B39B] drop-shadow-sm'
    }
];

// 1. GAP IDEAS
const gapIdeas = [
    {
        title: "Community",
        description: "Learning alone is brutal. We realized students needed a tribe—a space where you can share bugs, celebrate small wins, and build momentum together.",
        colorClass: "bg-[#00B39B] text-white",
        rotation: "rotate-[-3deg]",
        annotation: "Find your people"
    },
    {
        title: "Mentorship",
        description: "Textbooks don't teach you production environments. We created a system where seniors actively guide juniors through real-world tech stacks.",
        colorClass: "bg-[#4C6FFF] text-white",
        rotation: "rotate-[2deg]",
        annotation: "Skip the trial & error"
    },
    {
        title: "Practical Learning",
        description: "Tutorial hell is real. We shifted the focus from passively watching videos to actively building, breaking, and fixing actual software.",
        colorClass: "bg-[#FF5D5D] text-white",
        rotation: "rotate-[-1deg]",
        annotation: "Build things"
    },
    {
        title: "Building Together",
        description: "Engineering is a team sport. Through hackathons and weekend sprints, we learned how to collaborate, use Git properly, and ship products.",
        colorClass: "bg-white text-primary",
        rotation: "rotate-[3deg]",
        annotation: "Teamwork > Solo"
    }
];

// 2. STATS
const growthStats = [
    { value: "2+", label: "Years building", caption: "From an idea to a community.", color: "#FFD23F" },
    { value: "40+", label: "Projects shipped", caption: "Things people actually built.", color: "#00B39B" },
    { value: "15+", label: "Active builders", caption: "And still growing.", color: "#4C6FFF" }
];

// 3. FUTURE VISION PATH
const visionPath = [
    { title: "Technical Workshops", text: "Technical Workshops", description: "Deep dives into cutting-edge frameworks, version control, and system design, led by students who have mastered them.", color: "mint" },
    { title: "Industry Mentorship", text: "Industry Mentorship", description: "Connecting our current builders with alumni working in top tech companies for portfolio reviews and 1-on-1 guidance.", color: "coral" },
    { title: "Placement Support", text: "Placement Support", description: "Mock interviews, DSA sprints, and resume building sessions tailored specifically for tech roles.", color: "yellow" },
    { title: "Open Source Culture", text: "Open Source Culture", description: "Fostering an environment where members contribute to real-world OSS projects and build public credibility.", color: "blue" },
    { title: "Alumni Network", text: "Alumni Network", description: "A lifelong professional network of TechHub graduates helping each other navigate the tech industry.", color: "white" }
];

// 4. GALLERY (Data Driven Scrapbook)
const galleryImages = [
    {
        src: p1,
        caption: "The people behind TechHub.",
        rotation: "rotate-[-2deg]",
        wrapperClass:
            "col-span-1 sm:col-span-2 md:col-start-2 md:col-span-2 lg:col-start-3 lg:col-span-4 lg:row-start-1 lg:row-span-2 flex justify-center items-center relative z-20 hover:z-50",
        imgClass:
            "w-full h-[300px] md:h-[400px] lg:h-[480px] object-cover",
        tapeClass:
            "top-[-12px] left-1/2 -translate-x-1/2 rotate-[2deg] w-28 lg:w-32",
        delay: 100,
        doodle: {
            type: "text",
            text: "Where it all comes together.",
            className:
                "absolute -bottom-8 -right-8 font-handwriting text-[#7C5CFF] text-xl hidden lg:block rotate-[-5deg] opacity-80 z-[-1]",
        },
    },
    {
        src: p7,
        caption: "One of those days.",
        rotation: "rotate-[3deg]",
        wrapperClass:
            "col-span-1 md:col-start-1 md:col-span-2 lg:col-start-1 lg:col-span-2 lg:row-start-1 flex justify-center lg:justify-end items-end relative z-10 hover:z-50 lg:translate-x-6 lg:translate-y-12",
        imgClass:
            "w-full h-48 md:h-56 lg:h-64 object-cover",
        tapeClass:
            "top-[-8px] right-8 rotate-[4deg] w-16 lg:w-20",
        delay: 200,
    },
    {
        src: p23,
        caption: "Sharing what we know.",
        rotation: "rotate-[-4deg]",
        wrapperClass:
            "col-span-1 md:col-start-3 md:col-span-2 lg:col-start-7 lg:col-span-2 lg:row-start-1 flex justify-center lg:justify-start items-start relative z-10 hover:z-50 lg:-translate-x-4 lg:translate-y-4",
        imgClass:
            "w-full h-40 md:h-48 lg:h-52 object-cover",
        tapeClass:
            "top-[-8px] left-6 rotate-[-3deg] w-16 lg:w-20",
        delay: 300,
        doodle: {
            type: "text",
            text: "Teach. Learn. Repeat.",
            className:
                "absolute -top-8 -right-10 font-handwriting text-[#4C6FFF] text-lg hidden lg:block rotate-6 opacity-75",
        },
    },
    {
        src: p14,
        caption: "Learn it. Explain it. Build it.",
        rotation: "rotate-[2deg]",
        wrapperClass:
            "col-span-1 md:col-start-1 md:col-span-2 lg:col-start-1 lg:col-span-2 lg:row-start-2 flex justify-center lg:justify-center items-start relative z-10 hover:z-50 lg:translate-x-4 lg:-translate-y-8",
        imgClass:
            "w-full h-40 md:h-48 lg:h-48 object-cover",
        tapeClass:
            "top-[-8px] left-1/2 -translate-x-1/2 rotate-[1deg] w-12 lg:w-16",
        delay: 400,
    },
    {
        src: p17,
        caption: "Nobody builds alone.",
        rotation: "rotate-[-2deg]",
        wrapperClass:
            "col-span-1 md:col-start-3 md:col-span-2 lg:col-start-7 lg:col-span-2 lg:row-start-2 flex justify-center lg:justify-start items-center relative z-10 hover:z-50 lg:-translate-x-8 lg:-translate-y-6",
        imgClass:
            "w-full h-48 md:h-56 lg:h-60 object-cover",
        tapeClass:
            "top-[-10px] left-10 rotate-[-2deg] w-16 lg:w-20",
        delay: 500,
        doodle: {
            type: "text",
            text: "Helping each other figure it out.",
            className:
                "absolute -bottom-7 -right-8 font-handwriting text-[#FF5D5D] text-lg hidden lg:block rotate-6 opacity-80",
        },
    },
    {
        src: p11,
        caption: "Celebrating our builders.",
        rotation: "rotate-[4deg]",
        wrapperClass:
            "col-span-1 md:col-start-1 md:col-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-3 flex justify-center lg:justify-center items-start relative z-10 hover:z-50 lg:translate-x-8 lg:-translate-y-12",
        imgClass:
            "w-full h-40 md:h-48 object-cover",
        tapeClass:
            "top-[-8px] right-6 rotate-[5deg] w-16 lg:w-20",
        delay: 600,
    },
    {
        src: p5,
        caption: "A room full of builders.",
        rotation: "rotate-[-3deg]",
        wrapperClass:
            "col-span-1 sm:col-span-2 md:col-start-2 md:col-span-2 lg:col-start-4 lg:col-span-3 lg:row-start-3 flex justify-center lg:justify-center items-start relative z-10 hover:z-50 lg:-translate-y-14",
        imgClass:
            "w-full h-48 md:h-64 object-cover",
        tapeClass:
            "top-[-8px] left-1/2 -translate-x-1/2 rotate-[-4deg] w-20 lg:w-24",
        delay: 700,
        doodle: {
            type: "text",
            text: "Still growing.",
            className:
                "absolute -bottom-8 left-4 font-handwriting text-[#00B39B] text-xl hidden lg:block rotate-[-8deg] opacity-80",
        },
    },
    {
        src: p24,
        caption: "Helping each other build.",
        rotation: "rotate-[1deg]",
        wrapperClass:
            "col-span-1 md:col-start-3 md:col-span-2 lg:col-start-7 lg:col-span-2 lg:row-start-3 flex justify-center lg:justify-start items-center relative z-10 hover:z-50 lg:-translate-x-6 lg:-translate-y-4",
        imgClass:
            "w-full h-40 md:h-48 object-cover",
        tapeClass:
            "top-[-8px] right-10 rotate-[2deg] w-16 lg:w-20",
        delay: 800,
    },
    {
        src: p25,
        caption: "The best learning happens together.",
        rotation: "rotate-[-3deg]",
        wrapperClass:
            "col-span-1 md:col-start-1 md:col-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-4 flex justify-center items-start relative z-10 hover:z-50 lg:translate-x-2 lg:-translate-y-6",
        imgClass:
            "w-full h-44 md:h-52 lg:h-56 object-cover",
        tapeClass:
            "top-[-8px] left-8 rotate-[-3deg] w-16 lg:w-20",
        delay: 900,
    },
    {
        src: p9,
        caption: "And somehow, the team kept growing.",
        rotation: "rotate-[3deg]",
        wrapperClass:
            "col-span-1 md:col-start-3 md:col-span-2 lg:col-start-5 lg:col-span-3 lg:row-start-4 flex justify-center items-start relative z-10 hover:z-50 lg:translate-y-[-10px]",
        imgClass:
            "w-full h-44 md:h-52 lg:h-56 object-cover",
        tapeClass:
            "top-[-8px] left-1/2 -translate-x-1/2 rotate-[2deg] w-20 lg:w-24",
        delay: 1000,
    },
];


// --- CUSTOM STYLES & ANIMATIONS ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Inter:wght@400;600;800;900&display=swap');

  .font-sans { font-family: 'Inter', sans-serif; }
  .font-handwriting { font-family: 'Caveat', cursive; }

  /* Premium Light Theme Colors */
  .bg-paper { background-color: #FDFCF8; }
  .bg-cream { background-color: #F4F2EB; }
  .text-primary { color: #14162B; }
  .text-secondary { color: #4B4D63; }

  /* Highlighter Effects */
  .highlight-blue {
    background: linear-gradient(104deg, transparent 0%, rgba(76, 111, 255, 0.2) 2%, rgba(76, 111, 255, 0.3) 98%, transparent 100%);
    border-radius: 4px;
  }
  .highlight-mint {
    background: linear-gradient(104deg, transparent 0%, rgba(0, 179, 155, 0.2) 2%, rgba(0, 179, 155, 0.3) 98%, transparent 100%);
  }

  /* Section anchor offset */
  section[id] { scroll-margin-top: 92px; }

  /* Animations */
  @keyframes float1 {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-15px) rotate(1deg); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0) rotate(3deg); }
    50% { transform: translateY(-10px) rotate(-1deg); }
  }
  @keyframes floatOrbit {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes modalPop {
    0% { opacity: 0; transform: scale(0.95) translateY(10px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes overlayFade {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .animate-float-1 { animation: float1 6s ease-in-out infinite; }
  .animate-float-2 { animation: float2 8s ease-in-out infinite; }
  .animate-float-orbit { animation: floatOrbit 5s ease-in-out infinite; }
  .animate-modal-pop { animation: modalPop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-overlay-fade { animation: overlayFade 0.3s ease-out forwards; }

  /* Paper Shadows & Textures */
  .shadow-paper {
    box-shadow: 0 10px 25px -5px rgba(20, 22, 43, 0.05), 0 4px 10px -5px rgba(20, 22, 43, 0.02);
  }
  .shadow-polaroid {
    box-shadow: 0 15px 35px -5px rgba(20, 22, 43, 0.1), 0 5px 15px rgba(0,0,0,0.05);
  }

  /* Grid Background */
  .bg-grid-pattern {
    background-image: radial-gradient(#d1d1d1 1px, transparent 1px);
    background-size: 32px 32px;
  }

  /* Smooth Scrolling */
  html { scroll-behavior: smooth; }

  /* Scroll reveal */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Visible keyboard focus */
  a:focus-visible, button:focus-visible {
    outline: 3px solid #4C6FFF;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
    .animate-float-1, .animate-float-2, .animate-float-orbit { animation: none !important; }
    * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
`;

// --- SCROLL REVEAL HOOK ---
const useInView = (threshold = 0.15) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, visible];
};

// --- REUSABLE SCRAPBOOK COMPONENTS ---

// 1. Story Trigger (Handles the click interaction)
const StoryTrigger = ({ children, onClick, baseRotation = "", className = "" }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAnimating(true);
        setTimeout(() => {
            onClick();
            setIsAnimating(false);
        }, 300); // 300ms matches the transition duration
    };

    return (
        <button
            onClick={handleClick}
            className={`text-left outline-none transition-all duration-300 ease-out focus-visible:ring-4 focus-visible:ring-[#4C6FFF] ${isAnimating ? 'scale-110 rotate-0 shadow-2xl -translate-y-2 z-50' : `${baseRotation} hover:scale-105 hover:rotate-0 hover:z-40`} ${className}`}
            aria-haspopup="dialog"
        >
            {children}
        </button>
    );
};

// 2. Story Modal (The detailed Scrapbook Popover)
const StoryModal = ({ isOpen, onClose, data }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="story-modal-title">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#14162B]/30 backdrop-blur-sm animate-overlay-fade cursor-pointer"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-paper p-8 md:p-10 shadow-polaroid border border-gray-200 animate-modal-pop cursor-default">
                <Tape className="top-[-12px] left-1/2 -translate-x-1/2 rotate-2 w-32" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100/80 text-gray-500 rounded-full hover:bg-[#FF5D5D] hover:text-white transition-colors z-10 font-bold text-xl focus-visible:ring-4 focus-visible:ring-[#14162B]"
                    aria-label="Close"
                >
                    &times;
                </button>

                {data.annotation && (
                    <div className="font-handwriting text-2xl text-[#7C5CFF] mb-3 -rotate-2">
                        {data.annotation}
                    </div>
                )}

                <h3 id="story-modal-title" className="text-3xl md:text-4xl font-black text-primary mb-4 leading-tight">
                    {data.title || data.achievement}
                </h3>

                <div className="w-12 h-1 bg-[#00B39B] mb-5" />

                <p className="text-lg md:text-xl text-secondary font-medium leading-relaxed font-sans">
                    {data.description}
                </p>
            </div>
        </div>
    );
};

const Reveal = ({ children, className = "", delay = 0, as: Tag = "div" }) => {
    const [ref, visible] = useInView(0.15);
    return (
        <Tag
            ref={ref}
            className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
            style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </Tag>
    );
};

const AnimatedHighlight = ({ children, color = "highlight-blue" }) => {
    const [ref, visible] = useInView(0.6);
    return (
        <span ref={ref} className="relative inline-block whitespace-normal">
            <span
                className={`absolute inset-y-0 left-0 -z-10 ${color} origin-left transition-transform duration-[1100ms] ease-out`}
                style={{ width: '100%', transform: visible ? 'scaleX(1)' : 'scaleX(0)' }}
                aria-hidden="true"
            />
            <span className="relative px-2">{children}</span>
        </span>
    );
};

const CountUp = ({ value, duration = 1400 }) => {
    const [ref, visible] = useInView(0.5);
    const [display, setDisplay] = useState(null);
    const numericMatch = String(value).match(/[0-9]+/);
    const numeric = numericMatch ? parseInt(numericMatch[0], 10) : null;
    const prefix = numericMatch ? String(value).slice(0, numericMatch.index) : '';
    const suffix = numericMatch ? String(value).slice(numericMatch.index + numericMatch[0].length) : '';

    useEffect(() => {
        if (!visible || numeric === null) return;
        const start = performance.now();
        let raf;
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setDisplay(Math.floor(progress * numeric));
            if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [visible, numeric, duration]);

    if (numeric === null) {
        return <span ref={ref}>{value}</span>;
    }

    return <span ref={ref}>{prefix}{display === null ? 0 : display}{suffix}</span>;
};

const Tape = ({ className = "" }) => (
    <div className={`absolute w-12 h-4 bg-white/60 backdrop-blur-md shadow-sm opacity-80 z-10 pointer-events-none ${className}`} style={{ mixBlendMode: 'screen' }} />
);

const StickyNote = ({ text, color, rotation, className = "", floatClass = "", hoverable = true }) => {
    const colors = {
        yellow: "bg-[#FFD23F] text-[#14162B]",
        mint: "bg-[#00B39B] text-white",
        coral: "bg-[#FF5D5D] text-white",
        blue: "bg-[#4C6FFF] text-white",
        white: "bg-white text-[#14162B]"
    };

    return (
        <div
            className={`p-4 shadow-paper flex items-center justify-center text-center font-handwriting text-2xl leading-tight transition-all duration-300 ease-out ${hoverable ? 'hover:rotate-0 hover:scale-[1.04] hover:shadow-2xl hover:-translate-y-1' : ''} ${colors[color]} ${rotation} ${floatClass} ${className}`}
        >
            {text}
        </div>
    );
};

const DoodleArrow = ({ className }) => (
    <svg className={`overflow-visible ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10,90 Q50,10 90,50" />
        <path d="M75,35 L90,50 L75,65" />
    </svg>
);

const TutorialOverloadDoodle = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="10" width="90" height="60" rx="4" transform="rotate(-6 10 10)" opacity="0.5" />
        <rect x="22" y="24" width="90" height="60" rx="4" transform="rotate(3 22 24)" opacity="0.75" />
        <rect x="16" y="42" width="90" height="60" rx="4" />
        <polygon points="52,62 52,92 78,77" fill="currentColor" stroke="none" />
        <path d="M120,30 Q140,45 122,58" opacity="0.7" />
        <path d="M130,20 Q150,20 148,38" opacity="0.4" />
    </svg>
);

const Lightbox = ({ src, onClose }) => {
    if (!src) return null;
    return (
        <div
            className="fixed inset-0 z-[100] bg-[#14162B]/90 flex items-center justify-center p-6 cursor-zoom-out"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <button
                onClick={onClose}
                aria-label="Close image"
                className="absolute top-6 right-6 text-white text-4xl leading-none font-black hover:text-[#FFD23F] transition-colors"
            >
                &times;
            </button>
            <img
                src={src}
                alt="Memory wall enlarged"
                className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl cursor-default"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const TechHubStory = () => {
    const [lightboxSrc, setLightboxSrc] = useState(null);
    const [storyModalData, setStoryModalData] = useState(null); // Story modal state

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-paper font-sans text-primary overflow-x-hidden selection:bg-[#4C6FFF] selection:text-white">
            <style>{styles}</style>

            <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

            {/* Interactive Storytelling Modal */}
            <StoryModal
                isOpen={!!storyModalData}
                onClose={() => setStoryModalData(null)}
                data={storyModalData}
            />

            {/* HEADER NAVIGATION */}
            <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-paper/80 backdrop-blur-md border-b border-gray-100">
                <Link to="/" className="text-2xl font-black tracking-tighter text-primary flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#4C6FFF] text-white rounded-lg flex items-center justify-center text-sm">TH</span>
                    TechHub
                </Link>
                <div className="flex gap-4 items-center">
                    <Link to="/" className="px-4 py-2 font-semibold text-secondary hover:text-primary transition-colors hidden sm:block">Back to Home</Link>
                    <a href="#registration-url" className="px-6 py-2 bg-[#14162B] text-white font-semibold rounded-full hover:bg-[#4C6FFF] transition-colors shadow-lg shadow-[#4C6FFF]/20">
                        Join Orientation
                    </a>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-24 bg-grid-pattern pb-20">
                <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-auto text-[#4C6FFF] opacity-[0.06] pointer-events-none"
                    viewBox="0 0 400 200" fill="none" stroke="currentColor" strokeWidth="3"
                >
                    <rect x="30" y="90" width="50" height="50" />
                    <rect x="90" y="60" width="50" height="80" />
                    <rect x="150" y="100" width="50" height="40" />
                    <path d="M55,90 L55,50 M115,60 L115,20 M175,100 L175,70" strokeDasharray="4 6" />
                    <path d="M220,140 Q260,60 320,110" strokeDasharray="4 6" />
                    <circle cx="320" cy="110" r="6" fill="currentColor" stroke="none" />
                </svg>

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="pointer-events-auto">
                        <StickyNote text="Where do I even start?" color="yellow" rotation="-rotate-6" className="absolute top-[20%] left-[10%] max-w-[200px]" floatClass="animate-float-1" />
                    </div>
                    <div className="pointer-events-auto">
                        <StickyNote text="Too many tutorials 😭" color="white" rotation="rotate-3" className="absolute top-[30%] right-[10%] max-w-[180px] scale-90" floatClass="animate-float-2" />
                    </div>
                    <div className="pointer-events-auto">
                        <StickyNote text="CGPA panic." color="coral" rotation="rotate-6" className="absolute bottom-[20%] right-[20%] max-w-[140px] scale-95" floatClass="animate-float-1" />
                    </div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center mt-12">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] mb-8 text-primary">
                        We Built The Community <br />
                        <span className="text-[#4C6FFF] inline-block mt-2">We Wish We Had.</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-secondary max-w-3xl mx-auto leading-relaxed font-medium mb-12">
                        TechHub started with a simple observation: students were learning technologies alone when they should have been <span className="highlight-blue font-bold text-primary">building together.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <a
                            href="#why"
                            className="px-8 py-4 bg-[#14162B] text-white text-lg font-bold rounded-full hover:bg-[#4C6FFF] transition-all hover:scale-105 shadow-xl shadow-[#4C6FFF]/20 w-full sm:w-auto"
                        >
                            Explore Our Story ↓
                        </a>
                        <Link
                            to="/roadmaps"
                            className="px-8 py-4 bg-white border-2 border-gray-200 text-primary text-lg font-bold rounded-full hover:border-[#00B39B] hover:text-[#00B39B] transition-colors w-full sm:w-auto"
                        >
                            Open B.Tech Survival Guide →
                        </Link>
                    </div>
                </div>
            </section>

            {/* 1. WHY TECHHUB EXISTED */}
            <section id="why" className="py-32 px-6 bg-cream relative overflow-hidden border-t border-gray-200">
                <div className="max-w-6xl mx-auto relative flex flex-col md:flex-row items-center justify-between gap-16">
                    <Reveal className="w-full md:w-5/12 relative">
                        <div className="absolute -top-12 -left-12 font-handwriting text-4xl text-secondary rotate-[-10deg]">The Gap</div>
                        <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">Learning Alone Doesn't Build Careers.</h2>

                        <div className="relative h-[300px] w-full mt-12">
                            <div className="absolute top-0 left-0 bg-white p-6 shadow-md border border-gray-200 rotate-[-4deg] w-64 z-10">
                                <Tape className="top-[-8px] left-10 rotate-3" />
                                <p className="font-mono text-sm text-gray-500 mb-2">Error: Module not found</p>
                                <div className="h-2 bg-red-100 rounded w-full mb-2"></div>
                                <div className="h-2 bg-red-100 rounded w-3/4"></div>
                            </div>
                            <StickyNote text="Python installation entered boss fight." color="yellow" rotation="rotate-6" className="absolute top-20 left-32 z-20 max-w-[220px]" />
                            <TutorialOverloadDoodle className="absolute bottom-0 right-0 w-24 h-24 text-secondary opacity-70" />
                        </div>
                    </Reveal>

                    <div className="hidden md:block w-2/12 relative">
                        <div className="font-handwriting text-lg text-[#7C5CFF] absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rotate-[-4deg]">CHAOS</div>
                        <DoodleArrow className="w-32 h-32 text-[#7C5CFF]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-handwriting text-3xl text-[#7C5CFF] whitespace-nowrap mt-16 -rotate-6">
                            What we wanted instead
                        </div>
                    </div>

                    <Reveal delay={150} className="w-full md:w-5/12 relative flex flex-wrap gap-5 justify-center md:justify-start items-start">
                        {gapIdeas.map((item, i) => (
                            <StoryTrigger
                                key={i}
                                onClick={() => setStoryModalData(item)}
                                baseRotation={item.rotation}
                                className="block relative focus-visible:outline-none"
                            >
                                <div className={`relative px-6 py-4 shadow-paper border border-gray-100 font-bold text-xl ${item.colorClass}`}>
                                    <Tape className="top-[-8px] left-1/2 -translate-x-1/2 rotate-2 w-16" />
                                    {item.title}
                                </div>
                            </StoryTrigger>
                        ))}
                    </Reveal>
                </div>
            </section>

            {/* 2. THE IDEA */}
            <section id="idea" className="py-40 px-6 flex flex-col justify-center items-center text-center bg-paper relative">
                <div className="max-w-5xl relative z-10 mb-20">
                    <div className="absolute -top-16 left-0 font-handwriting text-4xl text-[#FF5D5D] -rotate-6">
                        The Realization
                        <svg className="w-16 h-16 absolute top-full left-1/2 -translate-x-1/2 text-[#FF5D5D]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                            <path d="M50,10 L50,80 M30,60 L50,80 L70,60" />
                        </svg>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
                        What if students <br />
                        didn't have to <br />
                        <AnimatedHighlight><span className="text-[#14162B]">learn alone?</span></AnimatedHighlight>
                    </h2>
                    <p className="font-handwriting text-3xl text-secondary mt-10 rotate-[-1deg]">That was the whole idea.</p>
                </div>

                <Reveal delay={200} className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 relative z-10 scale-95 opacity-90">
                    <div className="bg-white p-7 max-w-sm shadow-paper rotate-[-2deg] border border-gray-100 relative text-left">
                        <Tape className="top-[-8px] right-8 rotate-3" />
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">The Question</h3>
                        <p className="text-xl font-semibold leading-snug">How do we bridge the gap between college theory and the actual industry?</p>
                    </div>
                    <div className="bg-[#F4F2EB] p-7 max-w-sm shadow-sm border-l-4 border-[#14162B] rotate-[1deg] text-left">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">The Decision</h3>
                        <p className="text-xl font-medium font-serif italic text-secondary">
                            Create a space where seniors mentor juniors, and we build live projects together.
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* 3. ONE IDEA. ONE TEAM. ONE MISSION. */}
            <section id="team" className="py-32 px-6 bg-grid-pattern border-y border-gray-100 overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <Reveal className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">One Idea.<br />One Team.<br />One Mission.</h2>
                        <p className="text-2xl text-secondary max-w-2xl mx-auto">It started with a founder's vision and a core team who believed in it enough to build the foundation.</p>
                    </Reveal>

                    <Reveal delay={150} className="relative w-full max-w-4xl min-h-[460px] flex items-center justify-center py-10">
                        <svg className="absolute inset-0 w-full h-full text-gray-300" viewBox="0 0 800 460" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="7 9" preserveAspectRatio="xMidYMid meet">
                            <path d="M400,230 C320,150 200,100 150,70" />
                            <path d="M400,230 C300,280 200,340 160,370" />
                            <path d="M400,230 C280,230 160,210 80,220" />
                            <path d="M400,230 C480,150 600,100 650,70" />
                            <path d="M400,230 C500,280 600,340 640,370" />
                            <path d="M400,230 C520,230 640,210 720,220" />
                        </svg>

                        <div className="z-10 text-center bg-white p-8 rounded-full shadow-xl border-4 border-[#4C6FFF] rotate-[-2deg] transition-transform duration-300 hover:rotate-0 hover:scale-105">
                            <h3 className="text-4xl font-black text-primary mb-1">Lallu</h3>
                            <span className="bg-[#FFD23F] px-4 py-1 font-bold text-sm uppercase tracking-wider rounded-full">Founder</span>
                            <div className="font-handwriting text-lg text-secondary mt-2 -rotate-1">Day 1</div>
                        </div>

                        <StickyNote text="Aparajita" color="white" rotation="rotate-[6deg]" className="absolute top-6 left-[18%] md:left-[12%] z-20 font-bold !text-xl px-6 py-2" />
                        <div className="absolute top-0 left-[24%] font-handwriting text-lg text-secondary rotate-[-6deg] z-20 hidden md:block">First team</div>

                        <StickyNote text="Arvind" color="white" rotation="rotate-[-4deg]" className="absolute bottom-12 left-[15%] md:left-[18%] z-20 font-bold !text-xl px-6 py-2" />

                        <StickyNote text="Rashmi" color="white" rotation="rotate-[5deg]" className="absolute top-1/2 -translate-y-1/2 left-[5%] md:left-[8%] z-20 font-bold !text-xl px-6 py-2" />

                        <StickyNote text="Akankshya" color="white" rotation="rotate-[3deg]" className="absolute top-10 right-[18%] md:right-[15%] z-20 font-bold !text-xl px-6 py-2" />
                        <div className="absolute top-4 right-[25%] font-handwriting text-lg text-secondary rotate-[6deg] z-20 hidden md:block">Built from scratch</div>

                        <StickyNote text="Rashmita" color="white" rotation="rotate-[-5deg]" className="absolute bottom-12 right-[15%] md:right-[18%] z-20 font-bold !text-xl px-6 py-2" />

                        <StickyNote text="Kanhu" color="white" rotation="rotate-[8deg]" className="absolute top-1/2 -translate-y-1/2 right-[5%] md:right-[8%] z-20 font-bold !text-xl px-6 py-2" />

                        <div className="absolute top-[-10px] right-1/2 translate-x-[40%] font-handwriting text-3xl text-[#00B39B] rotate-[-12deg]">The Original Squad!</div>
                    </Reveal>
                </div>
            </section>

            {/* 4. HOW TECHHUB GREW */}
            <section id="grow" className="py-32 px-6 bg-white overflow-hidden relative border-b border-gray-100">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#4C6FFF]/10 to-transparent rounded-full blur-3xl"></div>
                <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start gap-16">
                    {growthStats.map((stat, i) => (
                        <Reveal key={i} delay={i * 150} className="text-center flex-1">
                            <div className="text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter" style={{ color: stat.color }}>
                                <CountUp value={stat.value} />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold font-handwriting text-secondary -mt-4 rotate-[-1deg]">{stat.label}</div>
                            <p className="text-secondary font-medium mt-3 max-w-[220px] mx-auto">{stat.caption}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* 5. FROM TECHHUB TO THE INDUSTRY */}
            <section id="industry" className="py-32 px-6 bg-cream border-y border-gray-200 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <Reveal className="text-center mb-20 md:mb-28 lg:mb-32">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">From TechHub<br />To The Industry</h2>
                        <p className="text-2xl text-secondary max-w-2xl mx-auto">Different paths. Different companies. One community that helped them get there.</p>
                    </Reveal>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-10 md:gap-12 lg:gap-x-4 lg:gap-y-10 xl:gap-x-8 xl:gap-y-12 items-center">
                        {superSeniors.map((person, index) => {
                            if (person.role === 'Founder') {
                                return (
                                    <div key={index} className={person.wrapperClass}>
                                        <div className={person.cardClass}>
                                            <Tape className={person.tapeClass} />
                                            <div className="absolute -top-6 -right-6 bg-[#7C5CFF] text-white text-xs font-black uppercase px-4 py-2 tracking-widest shadow-lg rotate-12">{person.role}</div>
                                            <img src={person.photo} alt={person.name} className={person.imgClass} />
                                            <div className="text-center">
                                                <h3 className="text-3xl font-black text-primary mb-1">{person.name}</h3>
                                                <p className="text-lg font-bold text-secondary mb-3">{person.role}</p>
                                                <div className="inline-block bg-[#14162B] text-white px-4 py-2 rounded font-mono text-sm shadow-sm transition-all duration-300 group-hover:bg-[#4C6FFF] group-hover:px-6">
                                                    {person.company} {person.designation ? `• ${person.designation}` : ''}
                                                </div>
                                                <div className="font-handwriting text-lg text-[#7C5CFF] mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Started it all.</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={index} className={person.wrapperClass}>
                                    <div className={person.cardClass}>
                                        <Tape className={person.tapeClass} />
                                        <img src={person.photo} alt={person.name} className={person.imgClass} />
                                        <div>
                                            <h3 className="text-2xl font-black text-primary">{person.name}</h3>
                                            <div className="text-sm font-semibold text-gray-500 mb-2">{person.role}</div>
                                            <div className={`${person.textClass} font-bold text-sm transition-all duration-300 group-hover:text-base`}>
                                                {person.company} {person.designation ? `• ${person.designation}` : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 6. THE MEMORY WALL */}
            <section id="gallery" className="py-32 px-6 bg-grid-pattern overflow-hidden border-t border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <Reveal className="text-center mb-16 md:mb-24">
                        <h2 className="text-5xl md:text-7xl font-black text-primary mb-6">The Memory Wall</h2>
                        <p className="text-xl md:text-2xl text-secondary font-medium max-w-2xl mx-auto">
                            Some moments don't belong in a report. They belong on the wall.
                        </p>
                    </Reveal>

                    <div className="relative w-full">
                        {/* Decorative background tape/paper elements */}
                        <div className="absolute top-[10%] right-[5%] w-24 h-8 bg-[#FFD23F]/20 -rotate-12 blur-sm hidden lg:block rounded-sm"></div>
                        <div className="absolute bottom-[20%] left-[2%] w-32 h-10 bg-[#00B39B]/10 rotate-6 blur-md hidden lg:block rounded-sm"></div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 md:gap-6 lg:gap-4 xl:gap-8 items-center">
                            {galleryImages.map((image, index) => (
                                <Reveal key={index} delay={image.delay} className={image.wrapperClass}>
                                    <div className="relative group w-full max-w-[320px] sm:max-w-sm lg:max-w-none mx-auto">
                                        <button
                                            type="button"
                                            onClick={() => setLightboxSrc(image.src)}
                                            className={`block w-full bg-white p-3 lg:p-4 shadow-polaroid border border-gray-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:rotate-0 hover:scale-[1.05] hover:shadow-[0_25px_50px_-12px_rgba(20,22,43,0.25)] hover:z-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4C6FFF] ${image.rotation} z-30 relative`}
                                            aria-label={image.caption ? `View memory: ${image.caption}` : "View memory"}
                                        >
                                            <Tape className={image.tapeClass} />
                                            <img src={image.src} alt={image.caption || "Memory wall snapshot"} className={`${image.imgClass} bg-gray-100 filter transition-all duration-500 group-hover:brightness-105`} loading="lazy" />
                                            {image.caption && (
                                                <div className="mt-4 mb-2 text-center font-handwriting text-2xl md:text-3xl text-secondary group-hover:text-primary transition-colors">
                                                    {image.caption}
                                                </div>
                                            )}
                                        </button>

                                        {/* Ambient Doodles rendering */}
                                        {image.doodle && image.doodle.type === 'arrow' && (
                                            <DoodleArrow className={image.doodle.className} />
                                        )}
                                        {image.doodle && image.doodle.type === 'text' && (
                                            <div className={image.doodle.className}>{image.doodle.text}</div>
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. THE FUTURE VISION */}
            <section id="future" className="py-40 px-6 bg-cream relative overflow-hidden border-t border-gray-200">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <Reveal>
                        <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-none text-primary">
                            This Is Only <br />
                            <span className="text-[#4C6FFF]">The Beginning.</span>
                        </h2>
                    </Reveal>

                    <div className="relative max-w-md mx-auto mt-20">
                        {/* Interactive Hint Annotation (Desktop) */}
                        <div className="absolute top-[15%] right-full mr-6 lg:mr-10 hidden md:flex flex-col items-end rotate-[-6deg] opacity-90 pointer-events-none w-48 z-20">
                            <span className="font-handwriting text-2xl text-[#7C5CFF] text-right leading-tight">
                                Curious?<br />Click a note for the full story
                            </span>
                            <DoodleArrow className="w-12 h-12 text-[#7C5CFF] rotate-[20deg] mt-1 mr-8" />
                        </div>

                        {/* Interactive Hint Annotation (Mobile) */}
                        <div className="md:hidden flex flex-col items-center mb-10 -mt-6 rotate-[-3deg] opacity-90 pointer-events-none">
                            <span className="font-handwriting text-xl text-[#7C5CFF]">Curious? Click a note for the full story ↓</span>
                        </div>

                        <div className="font-handwriting text-2xl text-[#4C6FFF] mb-2">NOW</div>
                        <svg className="w-full h-8 text-gray-300 mx-auto" viewBox="0 0 20 40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5">
                            <path d="M10,0 L10,40" />
                        </svg>

                        <div className="flex flex-col items-center gap-6 relative">
                            {visionPath.map((item, i) => {
                                const rotation = i % 2 === 0 ? 'rotate-[-4deg]' : 'rotate-[4deg]';
                                return (
                                    <React.Fragment key={i}>
                                        <Reveal delay={i * 120}>
                                            <StoryTrigger
                                                onClick={() => setStoryModalData({ ...item, annotation: "Where we're headed" })}
                                                baseRotation={rotation}
                                                className="inline-block"
                                            >
                                                {/* Passing hoverable={false} since StoryTrigger handles interaction */}
                                                <StickyNote
                                                    text={item.text}
                                                    color={item.color}
                                                    rotation=""
                                                    floatClass="animate-float-orbit"
                                                    hoverable={false}
                                                    className="px-6 py-3 !text-xl shadow-md"
                                                />
                                            </StoryTrigger>
                                        </Reveal>
                                        {i < visionPath.length - 1 && (
                                            <svg className="w-6 h-8 text-gray-300" viewBox="0 0 20 40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5">
                                                <path d="M10,0 L10,40" />
                                            </svg>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        <svg className="w-full h-8 text-gray-300 mx-auto" viewBox="0 0 20 40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5">
                            <path d="M10,0 L10,40" />
                        </svg>
                        <div className="font-handwriting text-2xl text-[#7C5CFF] mt-2">Bigger Events</div>
                    </div>

                    <p className="font-handwriting text-3xl text-secondary mt-16">Our roadmap for the future.</p>
                </div>
            </section>

            {/* 8. THE NEXT CHAPTER */}
            <section id="next" className="py-40 px-6 bg-paper border-t-8 border-[#4C6FFF] relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-transparent opacity-50"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <StickyNote text="Your turn!" color="yellow" rotation="rotate-12" className="absolute -top-12 -left-12 z-20 hidden md:flex" hoverable={false} />

                    <Reveal>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
                            The Next Chapter <br />
                            <span className="relative inline-block mt-2">
                                Starts With You
                                <svg className="absolute w-full h-4 -bottom-2 left-0 text-[#7C5CFF]" viewBox="0 0 100 10" preserveAspectRatio="none" stroke="currentColor" strokeWidth="3" fill="none">
                                    <path d="M0,5 Q50,9 100,2" />
                                </svg>
                            </span>
                        </h2>
                    </Reveal>

                    <div className="space-y-2 text-2xl md:text-3xl text-secondary font-medium mb-6 mt-12 leading-relaxed">
                        <p>Every senior was once a fresher.</p>
                        <p>Every builder started somewhere.</p>
                        <p className="text-primary font-bold">Maybe your story starts here too.</p>
                    </div>

                    <p className="font-handwriting text-2xl text-[#4C6FFF] mb-12 rotate-[-1deg]">Go on. Start somewhere.</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a href="#registration-url" className="px-10 py-5 bg-[#14162B] text-white text-2xl font-bold rounded-full hover:bg-[#4C6FFF] transition-all hover:scale-105 shadow-2xl shadow-[#4C6FFF]/20 w-full sm:w-auto">
                            Join Orientation
                        </a>
                        <Link to="/roadmaps" className="px-8 py-4 bg-white border-2 border-gray-200 text-primary text-lg font-semibold rounded-full hover:border-[#00B39B] hover:text-[#00B39B] transition-colors w-full sm:w-auto">
                            Open B.Tech Survival Guide
                        </Link>
                    </div>

                    <DoodleArrow className="w-24 h-24 text-[#FFD23F] absolute -bottom-16 right-10 rotate-45 hidden md:block" />
                </div>
            </section>
        </div>
    );
};

export default TechHubStory;