import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './BESSNetworkDiagram.css';

gsap.registerPlugin(MotionPathPlugin);

/**
 * BESS Network Diagram — Correct Energy Flow
 *
 * Solar Array ──┐
 *               ▼
 * Power Grid ──► BESS (Charges Batteries) ──► Battery Swapping Station ◄── Customer EVs
 */
const BESSNetworkDiagram: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const ctx = gsap.context(() => {
            // 1. Flow Lines Animation
            const flowLines = svgRef.current?.querySelectorAll('.flow-line');
            if (flowLines && flowLines.length > 0) {
                gsap.to(flowLines, {
                    strokeDashoffset: -100,
                    duration: 2,
                    repeat: -1,
                    ease: "none"
                });
            }

            // 2. Battery Fills Stagger
            const fills = svgRef.current?.querySelectorAll('.battery-fill');
            if (fills && fills.length > 0) {
                gsap.fromTo(fills,
                    { opacity: 0.2, scaleX: 0.5 },
                    {
                        opacity: 0.8,
                        scaleX: 1,
                        duration: 1.5,
                        stagger: 0.1,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    }
                );
            }

            // 3. Solar Cells Shimmer
            const solarCells = svgRef.current?.querySelectorAll('.solar-cell');
            if (solarCells && solarCells.length > 0) {
                gsap.to(solarCells, {
                    opacity: 0.8,
                    duration: 2,
                    stagger: {
                        amount: 1.5,
                        from: "random"
                    },
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }

            // 4. Power Pulses (Travelling dots)
            const lines = ['flow-solar-bess', 'flow-bess-grid', 'flow-bess-ev'];
            lines.forEach((className) => {
                const path = svgRef.current?.querySelector(`.${className}`) as SVGPathElement;
                if (!path) return;

                // Create a pulse circle for each main line
                const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                pulse.setAttribute("r", "3");
                pulse.setAttribute("fill", className.includes('solar') ? "#ffcc00" : "#ff6600");
                pulse.setAttribute("class", "power-pulse-particle");
                pulse.style.filter = "drop-shadow(0 0 4px " + (className.includes('solar') ? "#ffcc00" : "#ff6600") + ")";
                svgRef.current?.appendChild(pulse);

                gsap.set(pulse, { opacity: 0 });

                gsap.to(pulse, {
                    motionPath: {
                        path: path,
                        align: path,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: true
                    },
                    opacity: 1,
                    duration: className.includes('solar') ? 2 : 3,
                    repeat: -1,
                    ease: "none",
                    delay: Math.random() * 2
                });
            });
        }, svgRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="bess-diagram-wrapper">
            <div className="bess-diagram-label">
                <span className="bess-diagram-label-line" />
                <span>ENERGY ECOSYSTEM · BATTERY SWAP TOPOLOGY</span>
            </div>

            <svg
                ref={svgRef}
                className="bess-network-svg"
                viewBox="0 0 960 440"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="BESS Battery Swap Network Diagram"
            >
                <defs>
                    <filter id="orange-glow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <marker id="arrow-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L8,3 z" fill="#ff6600" />
                    </marker>
                    <marker id="arrow-yellow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L8,3 z" fill="#ffcc00" />
                    </marker>
                </defs>

                {/* Background grid */}
                <g opacity="0.06">
                    {[0, 60, 120, 180, 240, 300, 360, 420].map(y => (
                        <line key={`h${y}`} x1="0" y1={y} x2="960" y2={y} stroke="#ff6600" strokeWidth="0.5" />
                    ))}
                    {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960].map(x => (
                        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="440" stroke="#ff6600" strokeWidth="0.5" />
                    ))}
                </g>

                {/* ═══════════════════════════════
                    NODE 1 — SOLAR ARRAY (top-left)
                    Feeds INTO BESS
                    ═══════════════════════════════ */}
                <g className="bess-node" transform="translate(40,40)">
                    {/* Solar panels 3×4 grid */}
                    {[0, 1, 2].map(row => [0, 1, 2, 3].map(col => (
                        <rect key={`sp-${row}-${col}`}
                            x={col * 34} y={row * 24}
                            width="30" height="20" rx="2"
                            fill="#1a0800" stroke="#ff6600" strokeWidth="1"
                            className="solar-cell"
                            style={{ animationDelay: `${(row + col) * 0.18}s` }}
                        />
                    )))}
                    {/* Support post */}
                    <rect x="59" y="72" width="6" height="28" fill="#ff6600" opacity="0.6" />
                    {/* Sun ray indicator */}
                    <circle cx="150" cy="15" r="8" fill="none" stroke="#ffcc00" strokeWidth="1" opacity="0.5" className="status-dot" />
                    <line x1="130" y1="35" x2="110" y2="55" stroke="#ffcc00" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                    <text x="62" y="115" fill="#ff6600" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="1">SOLAR ARRAY</text>
                </g>

                {/* ═══════════════════════════════
                    NODE 2 — POWER GRID (bottom-left)
                    Also feeds INTO BESS
                    ═══════════════════════════════ */}
                <g className="bess-node" transform="translate(50,240)">
                    {/* Pylon */}
                    <polyline points="20,160 0,80 40,80 20,0 40,80 70,80 50,0 40,80 20,0"
                        stroke="#ff6600" strokeWidth="1.5" fill="none" opacity="0.9" />
                    <line x1="0" y1="80" x2="70" y2="80" stroke="#ff6600" strokeWidth="1.5" />
                    <line x1="6" y1="105" x2="64" y2="105" stroke="#ff6600" strokeWidth="1" opacity="0.6" />
                    {/* Insulators */}
                    <line x1="8" y1="80" x2="8" y2="92" stroke="#ffcc00" strokeWidth="1.5" />
                    <line x1="35" y1="80" x2="35" y2="92" stroke="#ffcc00" strokeWidth="1.5" />
                    <line x1="62" y1="80" x2="62" y2="92" stroke="#ffcc00" strokeWidth="1.5" />
                    {/* Power lines going right */}
                    <line x1="70" y1="80" x2="120" y2="80" stroke="#ff6600" strokeWidth="1" strokeDasharray="6,4" opacity="0.5" />
                    <text x="35" y="175" fill="#ff6600" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="1">POWER GRID</text>
                </g>

                {/* ═══════════════════════════════
                    NODE 3 — BESS CABINET (center)
                    Receives solar + grid power
                    Stores charged batteries
                    ═══════════════════════════════ */}
                <g className="bess-node" transform="translate(350,120)">
                    {/* Main cabinet */}
                    <rect x="0" y="0" width="160" height="200" rx="5"
                        fill="#0d0500" stroke="#ff6600" strokeWidth="2"
                        className="bess-box-pulse" />
                    {/* Top terminal connectors */}
                    <rect x="45" y="-15" width="14" height="17" rx="2" fill="#ff6600" opacity="0.8" />
                    <rect x="100" y="-15" width="14" height="17" rx="2" fill="#ff6600" opacity="0.8" />
                    {/* Battery slots (6 rows) */}
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <g key={i}>
                            {/* Slot background */}
                            <rect x="14" y={12 + i * 28} width="132" height="20" rx="3"
                                fill="#1a0300" stroke="#ff6600" strokeWidth="0.5" opacity="0.6" />
                            {/* Charge fill bar */}
                            <rect x="14" y={12 + i * 28} width={40 + (i % 3) * 30} height="20" rx="3"
                                fill="#ff6600" opacity="0.5"
                                className="battery-fill"
                                style={{ animationDelay: `${i * 0.25}s` }} />
                            {/* Battery icon */}
                            <rect x="122" y={16 + i * 28} width="18" height="12" rx="1"
                                fill="none" stroke="#ffcc00" strokeWidth="0.8" />
                            <rect x="140" y={20 + i * 28} width="4" height="6" rx="1"
                                fill="#ffcc00" opacity="0.7" />
                        </g>
                    ))}
                    {/* Bottom vents */}
                    {[0, 1, 2, 3].map(v => (
                        <rect key={v} x={16 + v * 35} y="204" width="24" height="8" rx="2"
                            fill="#ff6600" opacity="0.35" />
                    ))}
                    {/* "CHARGED BATTERIES" label inside */}
                    <text x="80" y="222" fill="#ffcc00" fontSize="8" fontFamily="monospace"
                        textAnchor="middle" letterSpacing="1">CHARGED BATTERIES</text>
                    <text x="80" y="235" fill="#ff6600" fontSize="8" fontFamily="monospace"
                        textAnchor="middle" letterSpacing="1">BESS · 2.5 MW STORAGE</text>
                </g>

                {/* BESS enclosure tag */}
                <rect x="340" y="250" width="220" height="22" rx="4"
                    fill="#ff6600" opacity="0.1" stroke="#ff6600" strokeWidth="0.8" />
                <text x="450" y="265" fill="#ff6600" fontSize="9" fontFamily="monospace"
                    textAnchor="middle" letterSpacing="1">Battery Energy Storage System (BESS)</text>

                {/* ═══════════════════════════════
                    NODE 4 — BATTERY SWAPPING STATION (right)
                    Receives charged batteries from BESS
                    Customers arrive to swap
                    ═══════════════════════════════ */}
                <g className="bess-node" transform="translate(640,80)">
                    {/* Station building */}
                    <rect x="0" y="40" width="130" height="130" rx="4"
                        fill="#0d0500" stroke="#ff6600" strokeWidth="1.5" />
                    {/* Roof */}
                    <polygon points="0,40 65,5 130,40"
                        fill="#1a0300" stroke="#ff6600" strokeWidth="1.5" />
                    {/* Sign strip */}
                    <rect x="0" y="40" width="130" height="20" rx="0"
                        fill="#ff6600" opacity="0.2" />
                    <text x="65" y="54" fill="#ffcc00" fontSize="7" fontFamily="monospace"
                        textAnchor="middle" letterSpacing="1">BATTERY SWAP</text>
                    {/* Battery slots on display */}
                    {[0, 1, 2].map(i => (
                        <g key={i}>
                            <rect x={12 + i * 38} y="70" width="28" height="50" rx="3"
                                fill="#1a0300" stroke="#ff6600" strokeWidth="0.8" />
                            <rect x={12 + i * 38} y="70" width="28" height={20 + (i % 3) * 10} rx="3"
                                fill="#ff6600" opacity="0.5"
                                className="battery-fill"
                                style={{ animationDelay: `${i * 0.3}s` }} />
                            <text x={26 + i * 38} y="136" fill="#ff6600" fontSize="6"
                                fontFamily="monospace" textAnchor="middle">SLOT {i + 1}</text>
                        </g>
                    ))}
                    {/* Door at bottom */}
                    <rect x="48" y="130" width="34" height="38" rx="2"
                        fill="#1a0500" stroke="#ff6600" strokeWidth="1" />
                    <text x="65" y="190" fill="#ff6600" fontSize="9" fontFamily="monospace"
                        textAnchor="middle" letterSpacing="1">SWAP STATION</text>
                </g>

                {/* ═══════════════════════════════
                    CUSTOMER EVs approaching station
                    ═══════════════════════════════ */}
                <g transform="translate(640,290)">
                    <text x="65" y="-6" fill="#ffcc00" fontSize="8" fontFamily="monospace"
                        textAnchor="middle" letterSpacing="1">CUSTOMERS</text>

                    {/* EV 1 */}
                    <g className="ev-car" style={{ animationDelay: '0s' }}>
                        <rect x="0" y="8" width="54" height="22" rx="4"
                            fill="#1a0800" stroke="#ff6600" strokeWidth="1" />
                        <rect x="8" y="2" width="30" height="12" rx="3"
                            fill="#0d0500" stroke="#ff6600" strokeWidth="0.8" />
                        <circle cx="13" cy="30" r="7" fill="#111" stroke="#ff6600" strokeWidth="1" />
                        <circle cx="42" cy="30" r="7" fill="#111" stroke="#ff6600" strokeWidth="1" />
                        {/* Empty battery indicator (red) */}
                        <rect x="36" y="10" width="14" height="8" rx="1"
                            fill="none" stroke="#ff3300" strokeWidth="0.8" />
                        <rect x="36" y="10" width="3" height="8" rx="1"
                            fill="#ff3300" opacity="0.6" />
                        <rect x="50" y="12" width="3" height="4" rx="1" fill="#ff3300" opacity="0.5" />
                    </g>

                    {/* EV 2 */}
                    <g className="ev-car" transform="translate(70,0)" style={{ animationDelay: '0.6s' }}>
                        <rect x="0" y="8" width="54" height="22" rx="4"
                            fill="#1a0800" stroke="#ff6600" strokeWidth="1" />
                        <rect x="8" y="2" width="30" height="12" rx="3"
                            fill="#0d0500" stroke="#ff6600" strokeWidth="0.8" />
                        <circle cx="13" cy="30" r="7" fill="#111" stroke="#ff6600" strokeWidth="1" />
                        <circle cx="42" cy="30" r="7" fill="#111" stroke="#ff6600" strokeWidth="1" />
                        <rect x="36" y="10" width="14" height="8" rx="1"
                            fill="none" stroke="#ff3300" strokeWidth="0.8" />
                        <rect x="36" y="10" width="4" height="8" rx="1"
                            fill="#ff3300" opacity="0.5" />
                        <rect x="50" y="12" width="3" height="4" rx="1" fill="#ff3300" opacity="0.5" />
                    </g>

                    {/* Arrow showing customers arriving at station */}
                    <path d="M 54,18 C 100,18 110,140 125,150"
                        stroke="#ffcc00" strokeWidth="1" strokeDasharray="5,3"
                        fill="none" markerEnd="url(#arrow-yellow)"
                        className="flow-line" style={{ animationDelay: '1.5s' }} />
                </g>

                {/* ════════════════════════════
                    FLOW LINES
                    ════════════════════════════ */}

                {/* Solar → BESS */}
                <path d="M 180,100 C 260,100 310,160 350,200"
                    stroke="#ffcc00" strokeWidth="2" strokeDasharray="10,5"
                    fill="none" markerEnd="url(#arrow-yellow)"
                    className="flow-line flow-solar-bess" />
                {/* Label */}
                <text x="255" y="145" fill="#ffcc00" fontSize="8" fontFamily="monospace"
                    textAnchor="middle" opacity="0.7" transform="rotate(-30,255,145)">SOLAR POWER</text>

                {/* Grid → BESS */}
                <path d="M 170,315 C 260,315 310,270 350,250"
                    stroke="#ff6600" strokeWidth="2" strokeDasharray="10,5"
                    fill="none" markerEnd="url(#arrow-orange)"
                    className="flow-line flow-bess-grid"
                    style={{ animationDelay: '0.5s' }} />
                {/* Label */}
                <text x="255" y="310" fill="#ff6600" fontSize="8" fontFamily="monospace"
                    textAnchor="middle" opacity="0.7" transform="rotate(15,255,310)">GRID POWER</text>

                {/* BESS → Swap Station (charged batteries transported) */}
                <path d="M 510,190 C 570,190 600,160 640,150"
                    stroke="#ff6600" strokeWidth="2.5" strokeDasharray="12,5"
                    fill="none" markerEnd="url(#arrow-orange)"
                    className="flow-line flow-bess-ev"
                    style={{ animationDelay: '1s' }} />
                {/* Animated battery icon on the line */}
                <g className="battery-in-transit">
                    <rect x="550" y="180" width="22" height="14" rx="2"
                        fill="#ff6600" opacity="0.9" />
                    <rect x="572" y="184" width="4" height="6" rx="1"
                        fill="#ff6600" />
                    <rect x="552" y="182" width="18" height="10" rx="1"
                        fill="#ffcc00" opacity="0.5" />
                </g>
                <text x="570" y="176" fill="#ff6600" fontSize="8" fontFamily="monospace"
                    textAnchor="middle" opacity="0.7">CHARGED PACKS</text>

                {/* ─── Status beacons ─── */}
                <circle cx="180" cy="100" r="5" fill="#ffcc00"
                    className="status-dot" filter="url(#soft-glow)" />
                <circle cx="170" cy="315" r="5" fill="#ff6600"
                    className="status-dot" filter="url(#soft-glow)"
                    style={{ animationDelay: '0.3s' }} />
                <circle cx="430" cy="210" r="6" fill="#ff6600"
                    className="status-dot" filter="url(#orange-glow)"
                    style={{ animationDelay: '0.6s' }} />
                <circle cx="640" cy="150" r="5" fill="#ffcc00"
                    className="status-dot" filter="url(#soft-glow)"
                    style={{ animationDelay: '1s' }} />

                {/* ─── Legend ─── */}
                <g transform="translate(30,390)">
                    <line x1="0" y1="8" x2="28" y2="8" stroke="#ffcc00" strokeWidth="1.5" strokeDasharray="6,3" />
                    <text x="34" y="12" fill="#ffcc00" fontSize="8" fontFamily="monospace" opacity="0.7">Solar Input</text>
                    <line x1="120" y1="8" x2="148" y2="8" stroke="#ff6600" strokeWidth="1.5" strokeDasharray="6,3" style={{ marginLeft: '8px' }} />
                    <text x="154" y="12" fill="#ff6600" fontSize="8" fontFamily="monospace" opacity="0.7">Grid Input / Battery Flow</text>
                    <text x="360" y="12" fill="#ff3300" fontSize="8" fontFamily="monospace" opacity="0.7">■ Depleted EV Battery</text>
                </g>

            </svg>
        </div>
    );
};

export default BESSNetworkDiagram;
