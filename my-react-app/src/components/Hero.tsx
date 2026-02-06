import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SideNav from './SideNav';
import './Hero.css';

const sectionsData = [
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

// Combine with clone for loop
const allSections = [...sectionsData, { ...sectionsData[0], id: 'bess-clone' }];

interface AnimatedSectionProps {
    section: typeof sectionsData[0];
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
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // CINEMATIC FADE-SCALE LOGIC
    const contentOpacity = useTransform(springProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
    const contentScale = useTransform(springProgress, [0.4, 0.5, 0.6], [0.95, 1, 0.95]);

    // Parallax background: Slower movement
    const bgY = useTransform(springProgress, [0, 1], ["-10%", "10%"]);
    const bgScale = useTransform(springProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    // Transition effects: Blur and Overlay
    const blurAmount = useTransform(springProgress, [0.3, 0.5, 0.7], [10, 0, 10]);
    const blur = useTransform(blurAmount, (v) => `blur(${v}px)`);
    const overlayOpacity = useTransform(springProgress, [0, 0.5, 1], [0.8, 0.4, 0.8]);

    return (
        <section
            id={section.id}
            ref={ref}
            className="hero-sub-section"
        >
            {/* Parallax Background Layer */}
            <motion.div
                className="section-bg-parallax"
                style={{
                    backgroundImage: `url(${section.image})`,
                    y: bgY,
                    scale: bgScale,
                    filter: blur,
                    position: 'absolute',
                    inset: '-10%', // Bleed for parallax
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0
                }}
            />

            {/* Cross-fade Overlay */}
            <motion.div
                className="section-overlay"
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#000',
                    opacity: overlayOpacity,
                    zIndex: 1
                }}
            />

            {/* Cinematic Center Content */}
            <div className="container centered-content">
                <motion.div
                    className="hero-content"
                    style={{
                        opacity: contentOpacity,
                        scale: contentScale,
                        zIndex: 10,
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
                        <button className="btn btn-primary btn-lg">Explore Solution</button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;

            // If we reach the bottom (the start of the cloned section)
            // silently jump back to top.
            // Using a threshold to account for snap points
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                container.scrollTo({ top: 0, behavior: 'instant' as any });
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="hero-container-main" ref={containerRef}>
            <SideNav containerRef={containerRef} />
            {allSections.map((section) => (
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
