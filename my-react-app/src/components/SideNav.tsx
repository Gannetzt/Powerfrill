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

    const totalHeight = (navItems.length - 1) * 4; // Adjusted for larger item gap
    const indicatorTop = useTransform(smoothProgress, [0, 1], ["0rem", `${totalHeight}rem`]);

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
                <div className="nav-vertical-line-container" style={{ height: `${totalHeight}rem` }}>
                    <div className="nav-base-line" />
                    <motion.div
                        className="nav-active-indicator"
                        style={{ top: indicatorTop }}
                    />
                </div>

                <ul className="nav-list">
                    {navItems.map((item, index) => {
                        const isActive = activeSection === item.id;
                        return (
                            <li
                                key={item.id}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => scrollToSection(index)}
                            >
                                <motion.div
                                    className="nav-item-indicator-expand"
                                    animate={{
                                        width: isActive ? "32px" : "12px",
                                        backgroundColor: isActive ? "#ffffff" : "rgba(255,255,255,0.2)"
                                    }}
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                />
                                <div className="nav-text-content">
                                    <motion.span
                                        className="nav-number"
                                        animate={{
                                            scale: isActive ? 1.1 : 1,
                                            opacity: isActive ? 1 : 0.5
                                        }}
                                    >
                                        {(index + 1).toString().padStart(2, '0')}
                                    </motion.span>
                                    <motion.span
                                        className="nav-label"
                                        animate={{
                                            x: isActive ? 8 : 0,
                                            opacity: isActive ? 1 : 0.4,
                                            fontWeight: isActive ? 700 : 400
                                        }}
                                    >
                                        {item.label}
                                    </motion.span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SideNav;

