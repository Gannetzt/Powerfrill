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

    // Tracking scroll progress of the main container for real-time indicator
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    // Smoothing the progress for the indicator movement
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    });

    // Map progress (0-1) to the vertical position. 
    // Total line height is (navItems.length - 1) * 3.5rem (matches CSS gap)
    const indicatorTop = useTransform(smoothProgress, [0, 1], ["0rem", `${(navItems.length - 1) * 3.5}rem`]);


    // Determine active section based on progress ranges
    const [activeSection, setActiveSection] = useState('bess');

    useEffect(() => {
        return scrollYProgress.onChange((v) => {
            const index = Math.round(v * (navItems.length - 1));
            if (navItems[index]) {
                setActiveSection(navItems[index].id);
            }
        });
    }, [scrollYProgress]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="side-nav-wrapper">
            <div className="side-nav-content">
                {/* Continuous Vertical Line */}
                <div className="nav-vertical-line">
                    <motion.div
                        className="nav-active-indicator"
                        style={{ top: indicatorTop }}
                    />
                </div>

                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(item.id)}
                        >
                            <span className="nav-label">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideNav;
