import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './SideNav.css';

interface NavItem {
    id: string;
    label: string;
}

interface SideNavProps {
    customItems?: NavItem[];
    gsapTimeline: React.MutableRefObject<gsap.core.Timeline | null>;
    onSectionClick: (index: number) => void;
}

const SideNav: React.FC<SideNavProps> = ({ customItems, gsapTimeline, onSectionClick }) => {
    const navItems = customItems || [];
    const [activeSectionId, setActiveSectionId] = useState(navItems[0]?.id);
    const [progress, setProgress] = useState(0);

    const steps = navItems.length - 1;
    const totalHeightRem = steps * 4;

    // Sync with GSAP progress
    useEffect(() => {
        const sync = () => {
            if (gsapTimeline.current) {
                const p = gsapTimeline.current.progress();
                setProgress(p);

                const index = Math.round(p * steps);
                if (navItems[index]) {
                    setActiveSectionId(navItems[index].id);
                }
            }
        };

        gsap.ticker.add(sync);
        return () => gsap.ticker.remove(sync);
    }, [gsapTimeline, navItems, steps]);

    // Indicator Top position
    const indicatorTop = `${progress * totalHeightRem}rem`;

    // Dynamic Scale for the line expansion
    // (Simulating the logic from Framer Motion)
    const getScaleY = () => {
        const pInRange = progress * steps;
        const index = Math.floor(pInRange);
        const fraction = pInRange - index;

        // Expansion peaks at 0.5 between indices
        const expansion = Math.sin(fraction * Math.PI) * 0.6;
        return 1 + expansion;
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
                            scaleY: getScaleY(),
                            originY: 0
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                </div>

                <ul className="nav-list">
                    {navItems.map((item, index) => {
                        const isActive = activeSectionId === item.id;

                        return (
                            <li
                                key={item.id}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => onSectionClick(index)}
                            >
                                <div className="nav-item-indicator-expand" style={{
                                    width: isActive ? "32px" : "12px",
                                    backgroundColor: isActive ? "#1d1d1f" : "rgba(0,0,0,0.1)"
                                }} />
                                <div className="nav-text-content">
                                    <span className="nav-number" style={{
                                        opacity: isActive ? 1 : 0.4,
                                        transform: isActive ? "scale(1.25)" : "scale(1)",
                                        color: "#1d1d1f"
                                    }}>
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <span className="nav-label" style={{
                                        opacity: isActive ? 1 : 0.4,
                                        color: isActive ? "#1d1d1f" : "rgba(0,0,0,0.4)",
                                        transform: isActive ? "translateX(8px)" : "translateX(0)"
                                    }}>
                                        {item.label}
                                    </span>
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
