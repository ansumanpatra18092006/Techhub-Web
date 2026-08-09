import { useId, useState } from 'react'
import './WhatsAppFloat.css'

// TODO: replace with your real TechHub WhatsApp community/group invite link
const COMMUNITY_LINK = 'https://chat.whatsapp.com/FHmSNZ1sXjeLCmX5icI8VO?utm_source=chatgpt.com'

const RING_TEXT = 'JOIN THE WHATSAPP COMMUNITY • '

function WhatsAppIcon() {
    return (
        <svg viewBox="0 0 32 32" className="waf-icon" aria-hidden="true" focusable="false">
            <path
                fill="currentColor"
                d="M16.004 3C9.377 3 4 8.373 4 15c0 2.36.687 4.56 1.872 6.41L4 29l7.78-1.84A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818a9.77 9.77 0 0 1-4.98-1.36l-.357-.212-4.617 1.092 1.126-4.5-.233-.37A9.76 9.76 0 0 1 5.2 15c0-5.965 4.855-10.818 10.804-10.818 5.948 0 10.803 4.853 10.803 10.818 0 5.964-4.855 10.818-10.803 10.818Zm5.94-8.096c-.325-.163-1.923-.95-2.222-1.058-.298-.108-.515-.163-.732.163-.217.325-.84 1.058-1.03 1.276-.19.217-.38.244-.705.081-.325-.163-1.372-.505-2.613-1.611-.966-.86-1.618-1.923-1.808-2.248-.19-.325-.02-.5.143-.663.147-.146.325-.38.488-.57.163-.19.217-.325.325-.542.109-.217.055-.407-.027-.57-.081-.163-.732-1.762-1.003-2.414-.264-.635-.532-.55-.732-.56l-.624-.011c-.217 0-.57.081-.868.407-.298.325-1.138 1.112-1.138 2.71 0 1.6 1.165 3.145 1.328 3.362.163.217 2.293 3.5 5.556 4.91.776.335 1.382.535 1.854.685.779.248 1.487.213 2.047.13.624-.093 1.923-.786 2.194-1.545.27-.76.27-1.41.19-1.545-.082-.135-.299-.217-.624-.38Z"
            />
        </svg>
    )
}

/**
 * Floating WhatsApp community button.
 * Fixed to the bottom-right corner, rendered above all page content.
 * Mount once near the root (e.g. in App.jsx) so it persists across routes/sections.
 */
export default function WhatsAppFloat() {
    const [showTooltip, setShowTooltip] = useState(false)
    const pathId = useId()

    return (
        <div className="waf-container" aria-hidden={false}>
            <div className="waf-floater">
                <svg className="waf-ring" viewBox="0 0 140 140" aria-hidden="true" focusable="false">
                    <path id={pathId} d="M 70,70 m -54,0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0" fill="none" />
                    <text className="waf-ring-text">
                        <textPath href={`#${pathId}`} startOffset="0%">
                            {RING_TEXT.repeat(2)}
                        </textPath>
                    </text>
                </svg>

                <a
                    href={COMMUNITY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waf-btn"
                    aria-label="Join TechHub WhatsApp Community"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onFocus={() => setShowTooltip(true)}
                    onBlur={() => setShowTooltip(false)}
                >
                    <span className="waf-pulse" aria-hidden="true" />
                    <span className="waf-glass" aria-hidden="true" />
                    <WhatsAppIcon />
                </a>

                <span className={`waf-tooltip${showTooltip ? ' waf-tooltip-visible' : ''}`} role="tooltip">
                    Join TechHub Community
                </span>
            </div>
        </div>
    )
}