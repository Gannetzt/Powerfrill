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

    // Track scroll progress purely for the indicator line animation
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    });

    const totalHeight = (navItems.length - 1) * 3.5;
    const indicatorTop = useTransform(smoothProgress, [0, 1], ["0rem", `${totalHeight}rem`]);

    // Precise Active Highlighting using scrollTop
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, clientHeight } = container;
            // Get index by rounding current scroll position
            const index = Math.round(scrollTop / clientHeight);
            // Map index to nav items (handles cloned sections)
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
            // Precise pixel-based scroll for sticky layout
            const targetTop = index * container.clientHeight;
            container.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="side-nav-wrapper">
            <div className="side-nav-content">
                <div className="nav-vertical-line" style={{ height: `${totalHeight}rem` }}>
                    <motion.div
                        className="nav-active-indicator"
                        style={{ top: indicatorTop }}
                    />
                </div>

                <ul className="nav-list">
                    {navItems.map((item, index) => (
                        <li
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(index)}
                        >
                            <span className="nav-number">{(index + 1).toString().padStart(2, '0')}</span>
                            <span className="nav-label">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideNav;

