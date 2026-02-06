import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './SideNav.css';

const defaultNavItems = [
    { id: 'bess', label: 'BESS', num: '01' },
    { id: 'application', label: 'APPLICATION', num: '02' },
    { id: 'innovation', label: 'INNOVATION', num: '03' },
    { id: 'about', label: 'ABOUT', num: '04' },
    { id: 'contact', label: 'CONTACT', num: '05' }
];

interface SideNavProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    customItems?: { id: string; label: string; num: string }[];
}

const SideNav: React.FC<SideNavProps> = ({ containerRef }) => {
    const navItems = defaultNavItems;

    // Track horizontal scroll progress
    const { scrollXProgress } = useScroll({
        container: containerRef,
    });

    const smoothProgress = useSpring(scrollXProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    });

    const totalHeight = (navItems.length - 1) * 4; // Increased gap for LUX theme
    const indicatorTop = useTransform(smoothProgress, [0, 1], ["0rem", `${totalHeight}rem`]);

    const [activeSection, setActiveSection] = useState(navItems[0].id);

    useEffect(() => {
        return scrollXProgress.onChange((v) => {
            const index = Math.round(v * (navItems.length - 1));
            if (navItems[index]) {
                setActiveSection(navItems[index].id);
            }
        });
    }, [scrollXProgress]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    };

    return (
        <div className="side-nav-wrapper luxury-theme">
            <div className="side-nav-content">
                <div className="nav-vertical-line" style={{ height: `${totalHeight}rem` }}>
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
                            <span className="nav-number">{item.num}</span>
                            <span className="nav-label">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideNav;

