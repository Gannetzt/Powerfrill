import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Hero.css";


// --- Sections Data ---

const sections = [
    {
        id: "01",
        label: "BESS",
        title: "BESS",
        subtitle: "GRID-SCALE STORAGE · WHAT & HOW",
        description: "Advanced energy storage systems that capture power from renewables or the grid and redeploy it during peak demand. Our BESS solutions balance fluctuating loads, provide mission-critical backup, and ensure a stable frequency for utility networks worldwide.",
        accent: "#ff6600",
        stats: [
            { val: "800V", unit: "ARCH" },
            { val: "2.5MW+", unit: "DENSITY" },
            { val: "98%", unit: "EFF" },
        ],
        route: '/hub/bess-info',
        actionLabel: 'CHECK BESS PRODUCTS',
        bgVideo: '/assets/hero-bg.mp4',
        isLight: false
    },
    {
        id: "02",
        label: "PRODUCTS",
        title: "PRODUCTS",
        subtitle: "MANUFACTURING · SALES · RENTALS",
        description: "From ISO-certified cell manufacturing to global hardware sales and flexible fleet rental programs, we provide the industrial backbone for EV infrastructure and mission-critical power delivery.",
        accent: "#00ccff",
        stats: [
            { val: "50K+", unit: "UNITS" },
            { val: "42", unit: "REGIONS" },
            { val: "FLEX", unit: "RENTAL" },
        ],
        route: '/products',
        actionLabel: 'EXPLORE PRODUCTS',
        isLight: false
    },
    {
        id: "03",
        label: "APPLICATION",
        title: "APPLICATION",
        subtitle: "ENGINEERING SERVICES · CUSTOM SOLUTIONS",
        description: "Beyond hardware, we offer specialized engineering services: custom power module development, full-scale site maintenance, and deep-sea application consulting for extreme environments.",
        accent: "#ffcc00",
        stats: [
            { val: "IP67", unit: "RATING" },
            { val: "-40C", unit: "TEMP" },
            { val: "20Y", unit: "LIFE" },
        ],
        route: '/hub/application',
        actionLabel: 'OUR SERVICES',
        bgVideo: '/assets/application-bg.mp4',
        isLight: false
    },
    {
        id: "04",
        label: "INNOVATION",
        title: "INNOVATION",
        subtitle: "FUTURE SCOPE · R&D ROADMAP",
        description: "Our future scope includes Gen-4 Silicon Carbide (SiC) power stacks, solid-state cell integration, and real-time AI grid balancing for the next decade of decentralized energy.",
        accent: "#00ffcc",
        stats: [
            { val: "18", unit: "PATENTS" },
            { val: "24/7", unit: "R&D" },
            { val: "GEN-3", unit: "SiC" },
            { val: "GEN-4", unit: "SiC" },
            { val: "SOLID", unit: "STATE" },
        ],
        route: '/hub/innovation',
        actionLabel: 'FUTURE TECH',
        bgVideo: '/assets/innovation-bg.mp4',
        isLight: false
    },
    {
        id: "05",
        label: "ABOUT",
        title: "ABOUT",
        subtitle: "MISSION · CONTACT INFORMATION",
        description: "Mission: To digitize the world's energy grid through vertically integrated hardware. Contact us at info@powerfrill.tech or visit our Global HQ for strategic partnerships.",
        accent: "#ff0066",
        stats: [
            { val: "EST", unit: "2018" },
            { val: "GLOBAL", unit: "AUTH" },
            { val: "24/7", unit: "SUPP" },
        ],
        route: '/hub/about',
        actionLabel: 'GET IN TOUCH',
        bgVideo: '/assets/about-bg.mp4',
        isLight: false
    },
];


const Hero: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(0);
    const [hoveredSection, setHoveredSection] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);


    // Emit event for Navbar color adjustment
    useEffect(() => {
        const event = new CustomEvent('heroThemeChange', {
            detail: { isLight: sections[activeSection].isLight }
        });
        window.dispatchEvent(event);
    }, [activeSection]);

    useEffect(() => {
        let lastScrollTime = 0;
        const throttleInterval = 100; // ms

        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime < throttleInterval) return;
            lastScrollTime = now;

            const container = containerRef.current;
            if (!container) return;

            const vh = window.innerHeight;
            const scrollPos = container.scrollTop;
            const index = Math.round(scrollPos / vh);

            if (index !== activeSection && index < sections.length) {
                setActiveSection(index);
            }
        };

        const el = containerRef.current;
        if (el) el.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            if (el) el.removeEventListener("scroll", handleScroll);
        };
    }, [activeSection]);

    const goToSection = (index: number) => {
        const container = containerRef.current;
        if (!container) return;
        container.scrollTo({
            top: index * window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div
            ref={containerRef}
            className="hero-page-rimac-v2"
            style={{ overflowY: 'auto', scrollSnapType: 'y mandatory' }}
        >
            {/* Ambient Background Videos - Fixed */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                {sections.map((s, i) => {
                    // Performance: Only render the active video to save CPU/GPU decode cycles
                    // Browsers struggle with playing 5+ 1080p videos even if opacity is 0
                    if (activeSection !== i && s.bgVideo) return null;

                    return s.bgVideo && (
                        <video
                            key={`bg-video-${i}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="hero-video-background"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: activeSection === i ? 0.95 : 0,
                                filter: 'none',
                                transition: 'opacity 1s ease-in-out',
                            }}
                        >
                            <source src={s.bgVideo} type="video/mp4" />
                        </video>
                    );
                })}
            </div>

            {/* Scrollable Content Layers */}
            {sections.map((s, i) => (
                <div
                    key={`scroll-sec-${i}`}
                    className="hero-scroll-section"
                    style={{ height: '100vh', scrollSnapAlign: 'start', position: 'relative' }}
                >
                    <motion.div
                        className={`rimac-content-container ${i === 2 || i === 4 ? 'layout-bottom-right' : 'layout-center'}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {!(i === 2 || i === 4) && (
                            <>
                                <div className="rimac-eyebrow">0{i + 1} {s.label}</div>
                                <h2 className="rimac-title">{s.title}</h2>
                                <p className="rimac-description">{s.description}</p>

                                {s.stats && (
                                    <div className="rimac-stats">
                                        {s.stats.map((st, si) => (
                                            <div key={si} className="rimac-stat">
                                                <span className="rimac-stat-val">{st.val}</span>
                                                <span className="rimac-stat-unit">{st.unit}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        <div className="rimac-cta-wrapper">
                            <button
                                className="rimac-explore-btn"
                                onClick={() => navigate(s.route)}
                            >
                                <span className="btn-line left" />
                                <span className="btn-text">EXPLORE</span>
                                <span className="btn-line right" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            ))}

            <div className="hero-grid-overlay" style={{ zIndex: 1, position: 'fixed' }} />


            {/* Static UI - Fixed */}
            <nav className="hero-side-scroller-nav" style={{ position: 'fixed' }}>
                {sections.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => goToSection(i)}
                        onMouseEnter={() => setHoveredSection(i)}
                        onMouseLeave={() => setHoveredSection(null)}
                        className={`hero-nav-dot-item ${activeSection === i ? 'is-active' : ''} ${hoveredSection === i ? 'is-hovered' : ''}`}
                    >
                        <div className="hero-nav-dot-line" style={{ background: activeSection === i || hoveredSection === i ? s.accent : 'var(--text-secondary)', opacity: activeSection === i || hoveredSection === i ? 1 : 0.5 }} />
                        <span className="hero-nav-dot-label" style={{ color: activeSection === i ? s.accent : hoveredSection === i ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                            {s.id} {s.label}
                        </span>
                    </button>
                ))}
            </nav>


            {/* Scroll Indicator */}
            <div className="rimac-scroll-indicator">
                <div className="scroll-line" />
            </div>

            {/* Social Media Icons (Directly Black as requested) */}
            <div className="hero-social-dock is-black-text">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hsd-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hsd-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                </a>
                <div className="hsd-scroll-text">SCROLL TO DISCOVER</div>
            </div>

            <div className="hero-bottom-navigator" style={{ position: 'fixed' }}>
                <div className="hero-nav-bullets">
                    {sections.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSection(i)}
                            className="hero-nav-bullet"
                            style={{
                                width: activeSection === i ? 24 : 6,
                                background: activeSection === i ? sections[activeSection].accent : "rgba(255,255,255,0.15)"
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Hero;
