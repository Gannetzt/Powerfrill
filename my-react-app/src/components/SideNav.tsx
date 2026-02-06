import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './SideNav.css';

const defaultNavItems = [
    { id: 'bess', label: 'BESS' },
    { id: 'application', label: 'Application' },
    { id: 'innovation', label: 'Innovation' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
];

interface SideNavProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    customItems?: { id: string; label: string }[];
}

const RIMAC_EASE = [0.4, 0, 0.2, 1];

const SideNav: React.FC<SideNavProps> = ({ containerRef, customItems }) => {
    const navItems = customItems || defaultNavItems;
    const [activeSection, setActiveSection] = useState(navItems[0].id);

    // Track scroll progress for the continuous indicator line
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 25,
        restDelta: 0.001
    });

    const steps = navItems.length - 1;
    const totalHeightRem = steps * 4;
    const indicatorTop = useTransform(smoothProgress, [0, 1], ["0rem", `${totalHeightRem}rem`]);

    // Scrubbed Expansion Keyframes
    const range: number[] = [];
    const heightMap: number[] = [];
    for (let i = 0; i <= steps; i++) {
        range.push(i / steps);
        heightMap.push(1); // Settled height
        if (i < steps) {
            range.push((i + 0.5) / steps);
            heightMap.push(1.6); // Expanded height during transition
        }
    }

    const dynamicScaleY = useTransform(smoothProgress, range, heightMap);

    // Precise Active Highlighting using scrollTop
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, clientHeight } = container;
            const index = Math.round(scrollTop / clientHeight);
            const activeIndex = index % navItems.length;
            if (navItems[activeIndex]) {
                setActiveSection(navItems[activeIndex].id);
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [containerRef, navItems]);

    const scrollToSection = (index: number) => {
        const container = containerRef.current;
        if (container) {
            container.scrollTo({
                top: index * container.clientHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="side-nav-wrapper">
            <div className="side-nav-content">
                <div className="nav-vertical-line-container" style={{ height: `${totalHeightRem}rem` }}>
                    <div className="nav-base-line" />
                    <motion.div
                        className="nav-active-indicator"
                        style={{
                            top: indicatorTop,
                            scaleY: dynamicScaleY,
                            originY: 0
                        }}
                    />
                </div>

                <ul className="nav-list">
                    {navItems.map((item, index) => {
                        const segmentProgress = index / steps;

                        // Active range for item scrub
                        const r1 = Math.max(0, segmentProgress - 0.15);
                        const r2 = segmentProgress;
                        const r3 = Math.min(1, segmentProgress + 0.15);

                        return (
                            <li
                                key={item.id}
                                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(index)}
                            >
                                <ItemIndicator smoothProgress={smoothProgress} range={[r1, r2, r3]} />
                                <div className="nav-text-content">
                                    <ItemNumber smoothProgress={smoothProgress} range={[r1, r2, r3]} index={index} />
                                    <ItemLabel smoothProgress={smoothProgress} range={[r1, r2, r3]} label={item.label} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

// Sub-components to avoid useTransform in loop issues if needed
// (Though useTransform is fine if handled correctly, but this is cleaner)
const ItemIndicator = ({ smoothProgress, range }: { smoothProgress: any, range: number[] }) => {
    const width = useTransform(smoothProgress, range, ["12px", "32px", "12px"], { ease: RIMAC_EASE as any });
    const bg = useTransform(smoothProgress, range, ["rgba(255,255,255,0.2)", "#ffffff", "rgba(255,255,255,0.2)"], { ease: RIMAC_EASE as any });
    return <motion.div className="nav-item-indicator-expand" style={{ width, backgroundColor: bg }} />;
};

const ItemNumber = ({ smoothProgress, range, index }: { smoothProgress: any, range: number[], index: number }) => {
    const scale = useTransform(smoothProgress, range, [1, 1.25, 1], { ease: RIMAC_EASE as any });
    const opacity = useTransform(smoothProgress, range, [0.4, 1, 0.4], { ease: RIMAC_EASE as any });
    return (
        <motion.span className="nav-number" style={{ scale, opacity }}>
            {(index + 1).toString().padStart(2, '0')}
        </motion.span>
    );
};

const ItemLabel = ({ smoothProgress, range, label }: { smoothProgress: any, range: number[], label: string }) => {
    const x = useTransform(smoothProgress, range, [0, 8, 0], { ease: RIMAC_EASE as any });
    const opacity = useTransform(smoothProgress, range, [0.3, 1, 0.3], { ease: RIMAC_EASE as any });
    const color = useTransform(smoothProgress, range, ["rgba(255,255,255,0.3)", "#ffffff", "rgba(255,255,255,0.3)"], { ease: RIMAC_EASE as any });
    return (
        <motion.span className="nav-label" style={{ x, opacity, color }}>
            {label}
        </motion.span>
    );
};

export default SideNav;
