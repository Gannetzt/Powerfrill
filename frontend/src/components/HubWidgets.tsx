import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// --- BESS FLOW WIDGET ---
export const BessFlowWidget: React.FC = () => {
    const [charge, setCharge] = useState(65);
    const [isExporting, setIsExporting] = useState(true);
    const [freq, setFreq] = useState(50.00);
    const [voltage, setVoltage] = useState(768);

    useEffect(() => {
        const interval = setInterval(() => {
            setCharge(prev => {
                if (isExporting) {
                    if (prev <= 15) { setIsExporting(false); return prev + 1; }
                    return prev - 1;
                } else {
                    if (prev >= 95) { setIsExporting(true); return prev - 1; }
                    return prev + 1;
                }
            });
            setFreq(50.00 + (Math.random() - 0.5) * 0.05);
            setVoltage(768 + Math.floor((Math.random() - 0.5) * 5));
        }, 2000);
        return () => clearInterval(interval);
    }, [isExporting]);

    return (
        <div className="hub-widget bess-flow-widget industrial-dashboard">
            <div className="widget-header">
                <span className="widget-tag">ACTIVE GRID TELEMETRY</span>
                <h4 className="widget-title">BESS Operational Core</h4>
            </div>

            <div className="telemetry-strip">
                <div className="tel-item">
                    <span className="tel-label">FREQUENCY</span>
                    <span className="tel-val">{freq.toFixed(2)} Hz</span>
                </div>
                <div className="tel-item">
                    <span className="tel-label">BUS_VOLT</span>
                    <span className="tel-val">{voltage} VDC</span>
                </div>
            </div>

            <div className="flow-container">
                <div className="node grid">
                    <div className="node-icon">⚡</div>
                    <span>UTILITY GRID</span>
                </div>
                <div className="flow-path">
                    <motion.div className="flow-particle"
                        animate={{ x: isExporting ? [0, 80] : [80, 0], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                <div className="node bess">
                    <div className="battery-outer">
                        <motion.div className="battery-fill"
                            animate={{ height: `${charge}%` }}
                            transition={{ duration: 1 }}
                            style={{
                                background: charge < 20 ? '#ff3300' :
                                    !isExporting ? '#ff6600' :
                                        '#00ffcc'
                            }}
                        />
                    </div>
                    <span className="percentage">{charge}% SOC</span>
                </div>
                <div className="flow-path">
                    <motion.div className="flow-particle"
                        animate={{ x: isExporting ? [0, 80] : [80, 0], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.2 }}
                    />
                </div>
                <div className="node load">
                    <div className="node-icon">🏭</div>
                    <span>IND_LOAD</span>
                </div>
            </div>

            <div className="widget-status-grid">
                <div className={`status-pill ${isExporting ? 'export' : 'charge'}`}>
                    <div className="status-dot" />
                    <span>{isExporting ? 'LCOS_OPTIMIZATION' : 'GRID_ABSORPTION'}</span>
                </div>
                <div className="status-pill generic">
                    <div className="status-dot active" />
                    <span>PRIMARY_FREQ_RESP</span>
                </div>
            </div>
        </div>
    );
};

// --- INNOVATION ROADMAP WIDGET ---
export const InnovationRoadmapWidget: React.FC = () => {
    const roadmap = [
        { year: '2025', tech: 'Gen-4 SiC Stacks', status: 'In Production' },
        { year: '2027', tech: 'Solid-State Proto', status: 'Lab Testing' },
        { year: '2030', tech: 'Kinetic AI Grid', status: 'R&D Phase' },
        { year: '2035', tech: 'Global Energy Peer', status: 'Target' }
    ];
    return (
        <div className="hub-widget roadmap-widget">
            <div className="widget-header">
                <span className="widget-tag">FUTURE SCOPE</span>
                <h4 className="widget-title">Tech Roadmap</h4>
            </div>
            <div className="roadmap-list">
                {roadmap.map((item, i) => (
                    <motion.div key={i} className="roadmap-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <div className="roadmap-year">{item.year}</div>
                        <div className="roadmap-details">
                            <div className="roadmap-tech">{item.tech}</div>
                            <div className="roadmap-status">{item.status}</div>
                        </div>
                        <div className="roadmap-dot" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- MISSION COUNTER WIDGET ---
export const MissionCounterWidget: React.FC = () => {
    const [count, setCount] = useState(1);
    useEffect(() => {
        const target = 1420500;
        let start = 0;
        const increment = target / (2000 / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else { setCount(Math.floor(start)); }
        }, 16);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="hub-widget counter-widget">
            <div className="widget-header">
                <span className="widget-tag">GLOBAL IMPACT</span>
                <h4 className="widget-title">Energy Delivered</h4>
            </div>
            <div className="counter-value">{count.toLocaleString()} <span className="mwh">MWH</span></div>
            <p className="counter-desc">Total decarbonized energy facilitated via Powerfrill systems since 2018.</p>
        </div>
    );
};

// --- SERVICE MATRIX WIDGET ---
export const ServiceMatrixWidget: React.FC = () => (
    <div className="hub-widget matrix-widget">
        <div className="widget-header">
            <span className="widget-tag">CAPABILITIES</span>
            <h4 className="widget-title">Service Matrix</h4>
        </div>
        <div className="matrix-grid">
            {['Design', 'Simulation', 'Install', 'Audit', 'Maintain', 'Certify'].map((s, i) => (
                <div key={i} className="matrix-item">
                    <div className="matrix-check">✓</div>
                    <span>{s}</span>
                </div>
            ))}
        </div>
        <div className="matrix-footer">Available in 42 regions worldwide</div>
    </div>
);

export const CarTechnicalLogo: React.FC = () => {
    return (
        <div className="hub-widget-card car-logo-widget">
            <h4 className="widget-title">EV PLATFORM ARCHITECTURE</h4>
            <div className="car-svg-container">
                <svg viewBox="0 0 400 200" className="technical-car-svg">
                    {/* Grid Background */}
                    <defs>
                        <pattern id="carGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,102,0,0.1)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#carGrid)" />

                    {/* Car Silhouette / Blueprint */}
                    <g fill="none" stroke="rgba(255,102,0,0.8)" strokeWidth="1.5">
                        {/* Body Top Curve */}
                        <path d="M 50,140 C 50,80 150,60 200,60 C 250,60 350,80 350,140 L 50,140" strokeWidth="2" />
                        {/* Windows/Cabin */}
                        <path d="M 140,85 L 180,75 L 230,75 L 270,95 L 260,110 L 150,110 Z" strokeOpacity="0.5" fill="rgba(255,102,0,0.05)" />
                        {/* Wheels */}
                        <g className="wheel-lines">
                            <circle cx="100" cy="140" r="35" />
                            <circle cx="100" cy="140" r="5" fill="currentColor" />
                            <path d="M 100,105 L 100,175 M 65,140 L 135,140" strokeOpacity="0.3" />

                            <circle cx="300" cy="140" r="35" />
                            <circle cx="300" cy="140" r="5" fill="currentColor" />
                            <path d="M 300,105 L 300,175 M 265,140 L 335,140" strokeOpacity="0.3" />
                        </g>
                        {/* Detail Lines */}
                        <line x1="180" y1="75" x2="180" y2="110" strokeOpacity="0.4" />
                        <line x1="230" y1="75" x2="230" y2="110" strokeOpacity="0.4" />
                        {/* Headlight and Taillight hints */}
                        <circle cx="55" cy="120" r="5" fill="rgba(255,102,0,0.3)" stroke="none" />
                        <rect x="340" y="115" width="8" height="15" fill="rgba(255,102,0,0.3)" stroke="none" rx="2" />
                    </g>

                    {/* Technical Dimension Lines */}
                    <g stroke="rgba(255,102,0,0.3)" strokeWidth="0.5" fontSize="8" fontFamily="monospace" fill="rgba(255,102,0,0.5)">
                        <path d="M 50,165 L 50,175 M 350,165 L 350,175 M 50,170 L 350,170" />
                        <text x="175" y="180">4850mm [CHASSIS_L]</text>

                        <path d="M 370,60 L 380,60 M 370,140 L 380,140 M 375,60 L 375,140" />
                        <text x="382" y="105" transform="rotate(90 382,105)">1420mm</text>
                    </g>
                </svg>
            </div>
            <div className="car-data-stream">
                <span className="data-bit">DRIVE: AWD_DUAL</span>
                <span className="data-bit">BATT: 120kWh_SILICON</span>
            </div>
        </div>
    );
};

// =============================================================================
// HUB BACKGROUND VISUALS — CSS-animation based, very visible and colorful
// =============================================================================
// =============================================================================
// HUB BACKGROUND VISUALS — Advanced Industrial Canvas Animation
// =============================================================================
export const HubBackgroundVisuals: React.FC<{ accent: string }> = ({ accent }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext('2d');
        if (!ctx) return;

        let W: number, H: number;
        let t = 0;
        let waveT = 0;

        const resize = () => {
            W = cv.width = window.innerWidth;
            H = cv.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // --- 1. Particles ---
        const PARTICLES = Array.from({ length: 200 }, () => ({ // Increased density
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            r: Math.random() * 2.2 + 0.5, // Slightly larger
            alpha: Math.random() * 0.6 + 0.2, // Brighter
            hue: Math.random() < 0.75 ? accent : '#ffffff',
            speed: Math.random() * 0.6 + 0.1,
        }));

        // --- 2. Grid Lines ---
        const GRID_LINES = Array.from({ length: 28 }, (_, i) => ({ // More grid lines
            vertical: i < 16,
            pos: i < 16 ? (i / 15) : ((i - 16) / 11),
            alpha: Math.random() * 0.08 + 0.03,
            pulse: Math.random(),
            speed: Math.random() * 0.004 + 0.001,
        }));

        // --- 3. Lightning Arcs ---
        let ARCS: any[] = [];
        const spawnArc = () => {
            if (ARCS.length > 10) return; // More simultaneous arcs
            const cx = W * (0.1 + Math.random() * 0.8);
            const cy = H * (0.1 + Math.random() * 0.6);
            const len = 80 + Math.random() * 150;
            const angle = Math.random() * Math.PI * 2;
            const segs = 8 + Math.floor(Math.random() * 6);
            const pts = [{ x: cx, y: cy }];
            let px = cx, py = cy;
            for (let i = 0; i < segs; i++) {
                const a = angle + (Math.random() - 0.5) * 1.5;
                px += Math.cos(a) * (len / segs) + (Math.random() - 0.5) * 30;
                py += Math.sin(a) * (len / segs) + (Math.random() - 0.5) * 30;
                pts.push({ x: px, y: py });
            }
            ARCS.push({ pts, life: 1, decay: 0.04 + Math.random() * 0.06 }); // Slower decay
        };

        // --- 4. Pulse Rings ---
        let RINGS: any[] = [];
        const spawnRing = () => {
            RINGS.push({
                x: W * (0.3 + Math.random() * 0.4),
                y: H * (0.2 + Math.random() * 0.5),
                r: 0,
                maxR: 120 + Math.random() * 180,
                life: 1,
                speed: 1.8 + Math.random() * 1.5,
            });
        };

        // --- 5. Streaks ---
        const STREAKS = Array.from({ length: 8 }, () => ({
            x: -300,
            y: Math.random() * window.innerHeight,
            speed: 3 + Math.random() * 5,
            len: 80 + Math.random() * 160,
            alpha: 0.08 + Math.random() * 0.12,
            w: Math.random() * 1.2 + 0.3,
        }));

        const arcInterval = setInterval(spawnArc, 1400);
        const ringInterval = setInterval(spawnRing, 2200);

        const render = () => {
            t += 0.016;
            waveT += 0.025;

            ctx.clearRect(0, 0, W, H);

            // Deep black background with slight accent glow at bottom
            const bg = ctx.createLinearGradient(0, 0, 0, H);
            bg.addColorStop(0, '#000000');
            bg.addColorStop(0.6, '#000000');
            bg.addColorStop(1, `${accent}15`); // Very subtle accent glow at bottom
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // --- GRID ---
            ctx.save();
            GRID_LINES.forEach(gl => {
                gl.pulse = (gl.pulse + gl.speed) % 1;
                const a = gl.alpha * (0.5 + 0.5 * Math.sin(gl.pulse * Math.PI * 2));
                ctx.globalAlpha = a;
                ctx.strokeStyle = accent;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                if (gl.vertical) {
                    const x = gl.pos * W;
                    ctx.moveTo(x, 0); ctx.lineTo(x, H);
                } else {
                    const y = gl.pos * H;
                    ctx.moveTo(0, y); ctx.lineTo(W, y);
                }
                ctx.stroke();
            });
            ctx.restore();


            // --- VOLTAGE WAVEFORMS ---
            ctx.save();
            ctx.globalAlpha = 0.15;
            const wg = ctx.createLinearGradient(0, 0, W, 0);
            wg.addColorStop(0, 'transparent');
            wg.addColorStop(0.5, accent);
            wg.addColorStop(1, 'transparent');
            ctx.strokeStyle = wg;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = 0; x <= W; x += 5) {
                const y = H * 0.45 + Math.sin((x / W) * Math.PI * 8 + waveT) * 15;
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.restore();

            // --- PARTICLES & CONNECTIONS ---
            PARTICLES.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;

                for (let j = i + 1; j < PARTICLES.length; j++) {
                    const dx = PARTICLES[j].x - p.x;
                    const dy = PARTICLES[j].y - p.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 100) {
                        ctx.globalAlpha = (1 - d / 100) * 0.08;
                        ctx.strokeStyle = p.hue;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(PARTICLES[j].x, PARTICLES[j].y); ctx.stroke();
                    }
                }

                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.hue;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            });

            // --- STREAKS ---
            STREAKS.forEach(s => {
                s.x += s.speed;
                if (s.x > W + 300) { s.x = -300; s.y = Math.random() * H; }
                ctx.save();
                const sg = ctx.createLinearGradient(s.x, 0, s.x + s.len, 0);
                sg.addColorStop(0, 'transparent');
                sg.addColorStop(0.5, `${accent}40`);
                sg.addColorStop(1, 'transparent');
                ctx.strokeStyle = sg;
                ctx.lineWidth = s.w;
                ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.len, s.y); ctx.stroke();
                ctx.restore();
            });

            // --- PULSE RINGS ---
            for (let i = RINGS.length - 1; i >= 0; i--) {
                const ring = RINGS[i];
                ring.r += ring.speed;
                ring.life = 1 - ring.r / ring.maxR;
                if (ring.life <= 0) { RINGS.splice(i, 1); continue; }
                ctx.save();
                ctx.globalAlpha = ring.life * 0.2;
                ctx.strokeStyle = accent;
                ctx.lineWidth = 1;
                ctx.beginPath(); ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2); ctx.stroke();
                ctx.restore();
            }

            // --- LIGHTNING ARCS ---
            for (let i = ARCS.length - 1; i >= 0; i--) {
                const arc = ARCS[i];
                arc.life -= arc.decay;
                if (arc.life <= 0) { ARCS.splice(i, 1); continue; }
                ctx.save();
                ctx.globalAlpha = arc.life * 0.4;
                ctx.strokeStyle = arc.life > 0.5 ? '#ffffff' : accent;
                ctx.lineWidth = arc.life * 2;
                ctx.beginPath();
                arc.pts.forEach((pt: any, j: number) => j === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y));
                ctx.stroke();
                ctx.restore();
            }

            requestAnimationFrame(render);
        };

        const animId = requestAnimationFrame(render);
        return () => {
            window.removeEventListener('resize', resize);
            clearInterval(arcInterval);
            clearInterval(ringInterval);
            cancelAnimationFrame(animId);
        };
    }, [accent]);

    return (
        <div className="hub-background-system" aria-hidden>
            <canvas ref={canvasRef} className="hub-canvas-bg" />

            {/* Atmospheric floating orbs */}
            <div className="hub-ambient-orbs">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={`hub-ambient-orb orb-${i + 1}`}
                        style={{ background: `radial-gradient(circle, ${accent}33 0%, transparent 70%)` }}
                    />
                ))}
            </div>

            {/* Large technical watermark */}
            <div className="hub-bg-watermark">⚡</div>

            {/* CSS Overlays for atmosphere */}
            <div className="hub-atmosphere">
                <div className="hub-vignette" />
                <div className="hub-scanlines" />
            </div>
        </div>
    );
};
