import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
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

const Hero: React.FC = () => {
    const rawProgress = useMotionValue(0);
    const touchYRef = useRef<number | null>(null);

    // Momentum Easing for the premium feel
    // Matches the "resistant, not free-flowing" requirement
    const smoothProgress = useSpring(rawProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.0001
    });

    const [activeIndex, setActiveIndex] = useState(0);

    // Track active index based on smooth progress
    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (v) => {
            const index = Math.round(v * (sectionsData.length - 1));
            setActiveIndex(index);
        });
        return unsubscribe;
    }, [smoothProgress]);

    // Handle Wheel & Touch events to drive the virtual timeline
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            // Resistant scroll
            const delta = e.deltaY * 0.0008;
            const newProgress = Math.max(0, Math.min(1, rawProgress.get() + delta));
            rawProgress.set(newProgress);
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchYRef.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (touchYRef.current === null) return;
            e.preventDefault();

            const currentY = e.touches[0].clientY;
            const deltaY = touchYRef.current - currentY;
            touchYRef.current = currentY;

            const delta = deltaY * 0.0015;
            const newProgress = Math.max(0, Math.min(1, rawProgress.get() + delta));
            rawProgress.set(newProgress);
        };

        const handleTouchEnd = () => {
            touchYRef.current = null;
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [rawProgress]);

    const scrollToSection = (index: number) => {
        const target = index / (sectionsData.length - 1);
        animate(rawProgress, target, {
            duration: 1.2,
            ease: [0.33, 1, 0.68, 1] // Specified premium easing
        });
    };

    // Map sections for SideNav compatibility
    const navItems = sectionsData.map(s => ({ id: s.id, label: s.title }));

    return (
        <div className="hero-wrapper" style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
            <SideNav
                customItems={navItems}
                activeProgress={smoothProgress}
                onSectionClick={scrollToSection}
            />

            <div className="hero-container-main">
                {sectionsData.map((section, index) => (
                    <AnimatedSection
                        key={section.id}
                        section={section}
                        index={index}
                        total={sectionsData.length}
                        progress={smoothProgress}
                    />
                ))}
            </div>
        </div>
    );
};

interface AnimatedSectionProps {
    section: typeof sectionsData[0];
    index: number;
    total: number;
    progress: any;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ section, index, total, progress }) => {
    const focalPoint = index / (total - 1);
    const segmentWidth = 1 / (total - 1);

    // 40% Overlap Rule:
    // Stability = 60%, Transition = 40%
    const transHalf = (segmentWidth * 0.4) / 2; // 20% of segmentWidth for transition
    const stableHalf = (segmentWidth * 0.6) / 2; // 30% of segmentWidth for stability

    // Calculate key points for transitions
    // A section is fully stable when progress is within [focalPoint - stableHalf, focalPoint + stableHalf]
    // It transitions in from (focalPoint - stableHalf - transHalf) to (focalPoint - stableHalf)
    // It transitions out from (focalPoint + stableHalf) to (focalPoint + stableHalf + transHalf)

    const enterStart = focalPoint - stableHalf - transHalf;
    const enterEnd = focalPoint - stableHalf;

    const exitStart = focalPoint + stableHalf;
    const exitEnd = focalPoint + stableHalf + transHalf;

    // Opacity Mapping
    const opacity = useTransform(progress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [0, 1, 1, 0]
    );

    // Scale Mapping: Incoming (1.12 -> 1.0), Outgoing (1.0 -> 0.92)
    const scale = useTransform(progress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [1.12, 1.0, 1.0, 0.92]
    );

    // Z Mapping: Incoming (400 -> 0), Outgoing (0 -> -400)
    const z = useTransform(progress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [400, 0, 0, -400]
    );

    // Text Animation: Center-aligned, delayed fade-in, early fade-out
    // Text should fully appear ONLY when section is stable
    const textOpacity = useTransform(progress,
        [enterEnd, focalPoint, exitStart],
        [0, 1, 0]
    );
    const textY = useTransform(progress,
        [enterEnd, focalPoint, exitStart],
        [20, 0, -20]
    );

    return (
        <motion.section
            className="hero-sub-section"
            style={{
                opacity,
                z,
                scale,
                display: useTransform(opacity, (v) => v > 0 ? 'flex' : 'none')
            }}
        >
            <div
                className="section-bg-parallax"
                style={{ backgroundImage: `url(${section.image})` }}
            />
            <div className="section-overlay" />

            <div className="hero-content">
                <motion.div style={{ opacity: textOpacity, y: textY }}>
                    <h1 className="hero-title">{section.title}</h1>
                    <p className="hero-subtitle">{section.subtitle}</p>
                    <div className="hero-actions">
                        <button className="btn btn-primary btn-lg">Explore</button>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Hero;
