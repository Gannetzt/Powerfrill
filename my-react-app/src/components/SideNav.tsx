import React, { useState, useEffect } from 'react';
import { motion, useTransform, cubicBezier } from 'framer-motion';
import './SideNav.css';

const RIMAC_EASE_FUNC = cubicBezier(0.4, 0, 0.2, 1);

interface NavItem {
    id: string;
    label: string;
}

interface SideNavProps {
    customItems?: NavItem[];
    activeProgress: any; // MotionValue<number>
    onSectionClick: (index: number) => void;
}

const SideNav: React.FC<SideNavProps> = ({ customItems, activeProgress, onSectionClick }) => {
    const navItems = customItems || [];
    const [activeSectionId, setActiveSectionId] = useState(navItems[0]?.id);

    const steps = navItems.length - 1;
    const totalHeightRem = steps * 4;

    // Indicator follows the virtual progress
    const indicatorTop = useTransform(activeProgress, [0, 1], ["0rem", `${totalHeightRem}rem`]);

    // Slide & Expand Effect
    const range: number[] = [];
    const heightMap: number[] = [];
    for (let i = 0; i <= steps; i++) {
        range.push(i / steps);
        heightMap.push(1);
        if (i < steps) {
            range.push((i + 0.5) / steps);
            heightMap.push(1.6);
        }
    }

    const dynamicScaleY = useTransform(activeProgress, range, heightMap);

    // Sync active section state for CSS classes if needed
    useEffect(() => {
        const unsubscribe = activeProgress.on("change", (v: number) => {
            const index = Math.round(v * steps);
            if (navItems[index]) {
                setActiveSectionId(navItems[index].id);
            }
        });
        return unsubscribe;
    }, [activeProgress, navItems, steps]);

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
                        const r1 = Math.max(0, segmentProgress - 0.1);
                        const r2 = segmentProgress;
                        const r3 = Math.min(1, segmentProgress + 0.1);

                        return (
                            <li
                                key={item.id}
                                className={`nav-item ${activeSectionId === item.id ? 'active' : ''}`}
                                onClick={() => onSectionClick(index)}
                            >
                                <ItemIndicator activeProgress={activeProgress} range={[r1, r2, r3]} />
                                <div className="nav-text-content">
                                    <ItemNumber activeProgress={activeProgress} range={[r1, r2, r3]} index={index} />
                                    <ItemLabel activeProgress={activeProgress} range={[r1, r2, r3]} label={item.label} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

const ItemIndicator = ({ activeProgress, range }: { activeProgress: any, range: number[] }) => {
    const width = useTransform(activeProgress, range, ["12px", "32px", "12px"], { ease: RIMAC_EASE_FUNC });
    const bg = useTransform(activeProgress, range, ["rgba(255,255,255,0.2)", "#ffffff", "rgba(255,255,255,0.2)"], { ease: RIMAC_EASE_FUNC });
    return <motion.div className="nav-item-indicator-expand" style={{ width, backgroundColor: bg }} />;
};

const ItemNumber = ({ activeProgress, range, index }: { activeProgress: any, range: number[], index: number }) => {
    const scale = useTransform(activeProgress, range, [1, 1.25, 1], { ease: RIMAC_EASE_FUNC });
    const opacity = useTransform(activeProgress, range, [0.4, 1, 0.4], { ease: RIMAC_EASE_FUNC });
    return (
        <motion.span className="nav-number" style={{ scale, opacity }}>
            {(index + 1).toString().padStart(2, '0')}
        </motion.span>
    );
};

const ItemLabel = ({ activeProgress, range, label }: { activeProgress: any, range: number[], label: string }) => {
    const x = useTransform(activeProgress, range, [0, 8, 0], { ease: RIMAC_EASE_FUNC });
    const opacity = useTransform(activeProgress, range, [0.3, 1, 0.3], { ease: RIMAC_EASE_FUNC });
    const color = useTransform(activeProgress, range, ["rgba(255,255,255,0.3)", "#ffffff", "rgba(255,255,255,0.3)"], { ease: RIMAC_EASE_FUNC });
    return (
        <motion.span className="nav-label" style={{ x, opacity, color }}>
            {label}
        </motion.span>
    );
};

export default SideNav;
