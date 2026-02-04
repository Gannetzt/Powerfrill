import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SideNav from './SideNav';
import './Hero.css';

const sections = [
    {
        id: 'bess',
        title: 'BESS',
        subtitle: 'Battery Energy Storage System',
        content: 'Grid-scale battery solutions for reliable, sustainable energy storage and distribution.',
        image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1920'
    },
    {
        id: 'application',
        title: 'Application',
        subtitle: 'Power Solutions',
        content: 'From renewable integration to peak shaving, our batteries power diverse applications.',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1920'
    },
    {
        id: 'innovation',
        title: 'Innovation',
        subtitle: 'Next-Gen Technology',
        content: 'Cutting-edge lithium-ion and solid-state battery innovations for maximum efficiency.',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920'
    },
    {
        id: 'about',
        title: 'About',
        subtitle: 'Our Mission',
        content: 'Powering a cleaner future through advanced energy storage technology.',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920'
    },
    {
        id: 'contact',
        title: 'Contact',
        subtitle: 'Get Connected',
        content: 'Partner with us to transform your energy infrastructure.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920'
    }
];

interface AnimatedSectionProps {
    section: typeof sections[0];
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ section, containerRef }) => {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        container: containerRef,
        offset: ["start end", "end start"]
    });

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 45,
        damping: 15,
        restDelta: 0.001
    });

    // ZOOM-OUT & EXPANSION LOGIC
    // When in focus (0.5), scale is 1 (Full screen)
    // When entering/exiting (0 or 1), scale is 0.85 (Zoomed out/Layered)
    const scale = useTransform(springProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
    const opacity = useTransform(springProgress, [0, 0.45, 0.55, 1], [0.4, 1, 1, 0.4]);
    const blurValue = useTransform(springProgress, [0, 0.5, 1], [8, 0, 8]);
    const blur = useTransform(blurValue, (v) => `blur(${v}px)`);

    // Continuous vertical flow with parallax
    const bgScale = useTransform(springProgress, [0, 0.5, 1], [1.3, 1, 1.3]);
    const yOffset = useTransform(springProgress, [0, 0.5, 1], ["5vh", "0vh", "-5vh"]);

    return (
        <section
            id={section.id}
            ref={ref}
            className="hero-sub-section"
        >
            <motion.div
                className="section-container-expanding"
                style={{
                    scale,
                    opacity,
                    filter: blur,
                    y: yOffset,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: useTransform(springProgress, [0, 0.5, 1], [0, 10, 0])
                }}

            >
                {/* Full-Width Background Visual */}
                <motion.div
                    className="section-bg-overlay"
                    style={{
                        backgroundImage: `url(${section.image})`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                        opacity: 0.4,
                        scale: bgScale /* Parallax zoom sync */
                    }}
                />


                {/* Centered Storytelling Content */}
                <div className="container centered-content">
                    <motion.div
                        className="hero-content"
                        style={{
                            opacity: useTransform(springProgress, [0.3, 0.5, 0.7], [0, 1, 0]),
                            scale: useTransform(springProgress, [0.4, 0.5, 0.6], [0.95, 1, 0.95]),
                            textAlign: 'center'
                        }}
                    >
                        <h1 className="hero-title">
                            <span className="gradient-text">{section.subtitle}</span>
                        </h1>

                        <p className="hero-subtitle">
                            {section.content}
                        </p>
                        <div className="hero-actions">
                            <button className="btn btn-primary btn-lg">Learn More</button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="hero-container-main" ref={containerRef}>
            <SideNav containerRef={containerRef} />
            {sections.map((section) => (
                <AnimatedSection
                    key={section.id}
                    section={section}
                    containerRef={containerRef}
                />
            ))}
        </div>
    );
};

export default Hero;
