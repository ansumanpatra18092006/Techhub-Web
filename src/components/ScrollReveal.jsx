import { useInView } from '../hooks/useInView'

export default function ScrollReveal({ children, delay = 0, className = '' }) {
    const [ref, inView] = useInView()

    return (
        <div
            ref={ref}
            className={`h-full transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${className}`}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    )
}