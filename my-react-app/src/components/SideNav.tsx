import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import gsap from 'gsap';
import './SideNav.css';

interface NavItem {
    id: string;
    label: string;
}

export interface SideNavHandle {
    setProgress: (progress: number) => void;
}

interface SideNavProps {
    customItems?: NavItem[];
    onSectionClick: (index: number) => void;
}

const SideNav = forwardRef<SideNavHandle, SideNavProps>(({ customItems, onSectionClick }, ref) => {
    const navItems = customItems || [];
    const indicatorRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState(navItems[0]?.id);
    const lastActiveRef = useRef(navItems[0]?.id);

    useImperativeHandle(ref, () => ({
        setProgress: (p: number) => {
            if (!indicatorRef.current) return;

            const steps = navItems.length - 1;
            const totalHeightRem = steps * 4;
            const indicatorTop = p * totalHeightRem; // rem value

            // Scale logic simulating the previous spring effect but deterministic
            const pInRange = p * steps;
            const fraction = pInRange - Math.floor(pInRange);
            // Expansion peaks at 0.5 between indices
            const expansion = Math.sin(fraction * Math.PI) * 0.6;
            const scaleY = 1 + expansion;

            gsap.to(indicatorRef.current, {
                top: `${indicatorTop}rem`,
                scaleY: scaleY,
                duration: 0.6,
                ease: "power2.out",
                overwrite: true
            });

            // Update active item logic
            const index = Math.round(pInRange);
            const newItem = navItems[index];
            if (newItem && newItem.id !== lastActiveRef.current) {
                lastActiveRef.current = newItem.id;
                setActiveId(newItem.id);
            }
        }
    }));

    const totalHeightRem = (navItems.length - 1) * 4;

    return (
        <div className="side-nav-wrapper">
            <div className="side-nav-content">
                <div className="nav-vertical-line-container" style={{ height: `${totalHeightRem}rem` }}>
                    <div className="nav-base-line" />
                    <div
                        ref={indicatorRef}
                        className="nav-active-indicator"
                        style={{
                            top: 0,
                            transformOrigin: 'top center'
                        }}
                    />
                </div>

                <ul className="nav-list">
                    {navItems.map((item, index) => {
                        const isActive = activeId === item.id;

                        return (
                            <li
                                key={item.id}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => onSectionClick(index)}
                            >
                                <div className="nav-text-content">
                                    <span className="nav-number">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <span className="nav-label">
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
});

export default SideNav;
