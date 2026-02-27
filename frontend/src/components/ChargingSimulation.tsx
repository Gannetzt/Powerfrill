import React, { useEffect, useRef, useState } from 'react';
import './ChargingSimulation.css';

const ChargingSimulation: React.FC = () => {
    const [pct, setPct] = useState(0);
    const [kw, setKw] = useState('0.0');
    const [km, setKm] = useState(0);
    const [eta, setEta] = useState('--');
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Particles generation
        if (particlesRef.current) {
            const container = particlesRef.current;
            container.innerHTML = ''; // Clear existing
            for (let i = 0; i < 25; i++) {
                const p = document.createElement('div');
                p.className = 'particle';
                const left = Math.random() * 100;
                const duration = 3 + Math.random() * 6;
                const delay = Math.random() * 6;
                const drift = (Math.random() - 0.5) * 80;
                const size = 1 + Math.random() * 2;

                p.style.cssText = `
                    left: ${left}%;
                    animation-duration: ${duration}s;
                    animation-delay: ${delay}s;
                    --drift: ${drift}px;
                    width: ${size}px;
                    height: ${size}px;
                `;
                container.appendChild(p);
            }
        }

        let animationFrameId: number;
        let isVisible = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0.1 }
        );
        if (particlesRef.current?.parentElement) {
            observer.observe(particlesRef.current.parentElement);
        }

        const CYCLE = 6000;
        const update = () => {
            animationFrameId = requestAnimationFrame(update);

            if (isVisible) {
                const elapsed = (Date.now() % CYCLE) / CYCLE;

                let currentPct;
                if (elapsed < 0.80) {
                    currentPct = Math.round((elapsed / 0.80) * 100);
                } else if (elapsed < 0.90) {
                    currentPct = 100;
                } else {
                    currentPct = 0;
                }

                setPct(currentPct);
                setKw((11.2 * (currentPct / 100 * 0.6 + 0.4)).toFixed(1));
                setKm(Math.round(currentPct * 4.2));

                const minsLeft = Math.max(0, Math.round((100 - currentPct) * 0.4));
                setEta(currentPct >= 100 ? 'DONE' : (minsLeft + 'm'));
            }
        };

        update();

        return () => {
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="simulation-container">
            <div className="particles" ref={particlesRef}></div>

            <div className="scene">

                <div className="car-wrap">
                    <svg className="car-svg" viewBox="0 0 340 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 85 L30 65 Q32 40 60 35 L120 25 Q155 18 185 20 L250 22 Q290 24 305 40 L315 55 L318 85 Z"
                            fill="rgba(50,20,0,0.9)" stroke="rgba(255,102,0,0.5)" strokeWidth="1.5" />
                        <path d="M80 35 Q110 10 180 10 Q230 10 260 28"
                            fill="none" stroke="rgba(255,153,0,0.4)" strokeWidth="1.5" />
                        <path d="M108 34 L125 14 Q155 8 180 10 L255 25 L240 34 Z"
                            fill="rgba(255,102,0,0.08)" stroke="rgba(255,102,0,0.3)" strokeWidth="1" />
                        <path d="M115 34 L130 16 Q150 10 170 12 L200 14 L195 34 Z"
                            fill="rgba(255,102,0,0.06)" />
                        <path d="M200 34 L202 14 L240 22 L248 34 Z"
                            fill="rgba(255,102,0,0.06)" />
                        <line x1="115" y1="34" x2="115" y2="82" stroke="rgba(255,102,0,0.2)" strokeWidth="1" />
                        <line x1="200" y1="34" x2="200" y2="82" stroke="rgba(255,102,0,0.2)" strokeWidth="1" />
                        <line x1="255" y1="34" x2="255" y2="82" stroke="rgba(255,102,0,0.2)" strokeWidth="1" />
                        <circle cx="88" cy="90" r="28" fill="rgba(30,10,0,0.95)" stroke="rgba(255,102,0,0.5)" strokeWidth="1.5" />
                        <circle cx="88" cy="90" r="18" fill="rgba(50,20,0,0.8)" stroke="rgba(255,102,0,0.3)" strokeWidth="1" />
                        <circle cx="88" cy="90" r="6" fill="rgba(255,102,0,0.5)" />
                        <circle cx="262" cy="90" r="28" fill="rgba(30,10,0,0.95)" stroke="rgba(255,102,0,0.5)" strokeWidth="1.5" />
                        <circle cx="262" cy="90" r="18" fill="rgba(50,20,0,0.8)" stroke="rgba(255,102,0,0.3)" strokeWidth="1" />
                        <circle cx="262" cy="90" r="6" fill="rgba(255,102,0,0.5)" />
                        <line x1="88" y1="72" x2="88" y2="108" stroke="rgba(255,102,0,0.2)" strokeWidth="1" />
                        <line x1="70" y1="90" x2="106" y2="90" stroke="rgba(255,102,0,0.2)" strokeWidth="1" />
                        <line x1="75" y1="77" x2="101" y2="103" stroke="rgba(255,102,0,0.2)" strokeWidth="1" />
                        <line x1="101" y1="77" x2="75" y2="103" stroke="rgba(255,102,0,0.2)" strokeWidth="1" />
                        <line x1="262" y1="72" x2="262" y2="108" stroke="rgba(255,102,0,0.2)" strokeWidth="1" />
                        <line x1="244" y1="90" x2="280" y2="90" stroke="rgba(255,102,0,0.2)" strokeWidth="1" />
                        <ellipse cx="318" cy="55" rx="6" ry="8" fill="rgba(255,102,0,0.6)" filter="url(#glow-sim)" />
                        <ellipse cx="28" cy="60" rx="5" ry="7" fill="rgba(255,120,0,0.4)" />
                        <rect x="314" y="68" width="10" height="14" rx="3" fill="rgba(255,102,0,0.3)" stroke="rgba(255,102,0,0.6)" strokeWidth="1" />
                        <path d="M60 114 Q175 120 310 114" stroke="rgba(255,102,0,0.15)" strokeWidth="2" fill="none" />
                        <defs>
                            <filter id="glow-sim">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                        </defs>
                    </svg>

                    <div className="energy-lines">
                        <div className="energy-line"></div>
                        <div className="energy-line"></div>
                        <div className="energy-line"></div>
                    </div>
                </div>

                <div className="battery-section">
                    <div style={{ position: 'relative' }}>
                        <div className="glow-ring"></div>
                        <div className="battery-outer">
                            <div className="battery-fill"></div>
                            <div className="cell-dividers">
                                <div className="divider"></div>
                                <div className="divider"></div>
                                <div className="divider"></div>
                            </div>
                            <div className="bolt">⚡</div>
                        </div>
                    </div>

                    <div className="percent-display">{pct}<span>%</span></div>
                    <div className="status-label">● Charging</div>

                    <div className="stats-row">
                        <div className="stat">
                            <div className="stat-value">{kw}</div>
                            <div className="stat-label">kW Power</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <div className="stat-value">{km}</div>
                            <div className="stat-label">km Range</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <div className="stat-value">{eta}</div>
                            <div className="stat-label">ETA Full</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChargingSimulation;
