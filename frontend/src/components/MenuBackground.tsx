import React from 'react';

const MenuBackground: React.FC = () => {
    return (
        <div className="menu-scene-bg">
            <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="menu-svg-scene">
                <defs>
                    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0a0c10" />
                        <stop offset="60%" stopColor="#0e1118" />
                        <stop offset="100%" stopColor="#111820" />
                    </linearGradient>
                    <linearGradient id="gnd" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0d1015" />
                        <stop offset="100%" stopColor="#080a0c" />
                    </linearGradient>
                    <filter id="glow-o" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow-y" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="softglow" x="-80%" y="-80%" width="260%" height="260%">
                        <feGaussianBlur stdDeviation="18" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="blur6">
                        <feGaussianBlur stdDeviation="6" />
                    </filter>
                    <filter id="blur12">
                        <feGaussianBlur stdDeviation="12" />
                    </filter>
                    <clipPath id="screenClip"><rect x="0" y="0" width="1440" height="900" /></clipPath>
                </defs>

                <g clipPath="url(#screenClip)">
                    <rect width="1440" height="900" fill="url(#sky)" />
                    <rect y="660" width="1440" height="240" fill="url(#gnd)" />
                    <ellipse cx="720" cy="660" rx="700" ry="40" fill="#d4551e" opacity=".12" filter="url(#blur12)" />

                    <g id="stars" opacity=".9">
                        {[120, 280, 450, 620, 800, 970, 1100, 1280, 1380, 60, 350, 700, 1050, 1350].map((cx, i) => {
                            const cy = [60, 30, 80, 40, 70, 25, 55, 38, 90, 130, 150, 120, 130, 160][i];
                            const r = [1.2, 0.8, 1, 0.7, 1.1, 0.9, 1.3, 0.8, 1, 0.7, 1, 0.8, 1.1, 0.9][i];
                            const dur = [3.1, 2.3, 4, 2.8, 3.5, 2.1, 3.8, 2.6, 4.2, 3, 5, 2.9, 3.3, 4.1][i];
                            return (
                                <circle key={i} cx={cx} cy={cy} r={r} fill="#fff" opacity=".6">
                                    <animate attributeName="opacity" values=".4;1;.4" dur={`${dur}s`} repeatCount="indefinite" />
                                </circle>
                            );
                        })}
                    </g>

                    <circle cx="1320" cy="110" r="42" fill="#1a1510" opacity=".95" />
                    <circle cx="1320" cy="110" r="38" fill="#2a2018" />
                    <circle cx="1320" cy="110" r="38" fill="none" stroke="#d4551e" strokeWidth="1.5" opacity=".6" />
                    <circle cx="1320" cy="110" r="60" fill="#d4551e" opacity=".1" filter="url(#blur12)" />
                    <circle cx="1308" cy="102" r="5" fill="#221a12" opacity=".7" />
                    <circle cx="1328" cy="118" r="3.5" fill="#221a12" opacity=".6" />
                    <circle cx="1316" cy="120" r="2.5" fill="#221a12" opacity=".5" />

                    <ellipse cx="200" cy="665" rx="220" ry="80" fill="#0d1015" />
                    <g id="solar-panels">
                        {[
                            { t: "translate(60,580) rotate(-12)", d: 0 },
                            { t: "translate(155,570) rotate(-12)", d: 0.5 },
                            { t: "translate(250,565) rotate(-12)", d: 1 },
                            { t: "translate(100,622) rotate(-12)", d: 1.5 },
                            { t: "translate(195,615) rotate(-12)", d: 2 }
                        ].map((p, i) => (
                            <g key={i} transform={p.t}>
                                <rect width="80" height="50" rx="3" fill="#0e1a2a" stroke="#1a3a5c" strokeWidth="1.5" />
                                <line x1="20" y1="0" x2="20" y2="50" stroke="#1a3a5c" strokeWidth=".8" />
                                <line x1="40" y1="0" x2="40" y2="50" stroke="#1a3a5c" strokeWidth=".8" />
                                <line x1="60" y1="0" x2="60" y2="50" stroke="#1a3a5c" strokeWidth=".8" />
                                <line x1="0" y1="17" x2="80" y2="17" stroke="#1a3a5c" strokeWidth=".8" />
                                <line x1="0" y1="33" x2="80" y2="33" stroke="#1a3a5c" strokeWidth=".8" />
                                <rect width="80" height="50" rx="3" fill="#f5c518" opacity="0">
                                    <animate attributeName="opacity" values="0;0;0;0.12;0.3;0.12;0;0;0" dur="4s" repeatCount="indefinite" begin={`${p.d}s`} />
                                </rect>
                            </g>
                        ))}
                    </g>

                    <line x1="170" y1="630" x2="170" y2="720" stroke="#f5c518" strokeWidth=".8" strokeDasharray="4,6" opacity=".5">
                        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
                    </line>
                    <circle r="3" fill="#f5c518" opacity=".9" filter="url(#glow-y)">
                        <animateMotion path="M170,630 L170,720" dur="1.2s" repeatCount="indefinite" />
                    </circle>

                    <g id="turbines">
                        <g transform="translate(1180,300)">
                            <line x1="0" y1="0" x2="0" y2="360" stroke="#2a2a2a" strokeWidth="5" />
                            <g>
                                <g style={{ transformOrigin: '0 0' }}>
                                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="8s" repeatCount="indefinite" />
                                    <line x1="0" y1="0" x2="0" y2="-70" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                                    <line x1="0" y1="0" x2="60" y2="35" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                                    <line x1="0" y1="0" x2="-60" y2="35" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                                    <circle cx="0" cy="-70" r="3" fill="#d4551e" opacity=".6"><animate attributeName="opacity" values=".6;1;.6" dur="1s" repeatCount="indefinite" /></circle>
                                </g>
                                <circle r="6" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
                            </g>
                        </g>
                    </g>

                    <g id="charging-station" transform="translate(640,570)">
                        <rect x="-10" y="-120" width="20" height="185" rx="4" fill="#1a1c1e" stroke="#333" strokeWidth="1.5" />
                        <rect x="-28" y="-140" width="56" height="52" rx="6" fill="#1e2124" stroke="#d4551e" strokeWidth="1.5" />
                        <rect x="-20" y="-134" width="40" height="22" rx="3" fill="#0a1520" />
                        <rect x="-16" y="-128" width="0" height="6" rx="2" fill="#3acb5a">
                            <animate attributeName="width" values="0;32;0" dur="4s" repeatCount="indefinite" />
                        </rect>
                        <text x="0" y="-110" textAnchor="middle" fontSize="14" fill="#f5c518" filter="url(#glow-y)">⚡</text>
                        <path d="M18,-108 Q50,-108 55,-80" fill="none" stroke="#555" strokeWidth="4" strokeLinecap="round" />
                    </g>

                    <g id="big-battery" transform="translate(980,380)">
                        <rect x="-70" y="-140" width="140" height="240" rx="12" fill="#111820" stroke="#d4551e" strokeWidth="2" />
                        <rect x="-22" y="-158" width="44" height="22" rx="6" fill="#1a1c1e" stroke="#d4551e" strokeWidth="1.5" />
                        {[[-55, -125], [5, -125], [-55, -50], [5, -50]].map((p, i) => (
                            <rect key={i} x={p[0]} y={p[1]} width="50" height="60" rx="5" fill="#0e1115" stroke="#1a3050" strokeWidth="1.2" />
                        ))}
                        <rect x="-52" y="27.5" width="0" height="13" rx="3" fill="#3acb5a">
                            <animate attributeName="width" values="0;52;104;52;0" dur="4s" repeatCount="indefinite" />
                        </rect>
                        <text x="0" y="8" textAnchor="middle" fontSize="38" fill="#f5c518" opacity=".25" filter="url(#softglow)">⚡</text>
                        <text x="0" y="8" textAnchor="middle" fontSize="38" fill="#f5c518" opacity=".8">
                            <animate attributeName="opacity" values=".6;.9;.6" dur="1.5s" repeatCount="indefinite" />⚡
                        </text>
                    </g>

                    <rect x="0" y="700" width="1440" height="60" fill="#0c0e10" />
                    <g opacity=".2">
                        {Array.from({ length: 13 }).map((_, i) => (
                            <rect key={i} x={i * 120} y={728} width="80" height="4" rx="2" fill="#555">
                                <animate attributeName="x" values={`${i * 120};${(i - 1) * 120}`} dur="2s" repeatCount="indefinite" />
                            </rect>
                        ))}
                    </g>

                    <g id="car1" opacity=".85">
                        <animateTransform attributeName="transform" type="translate" values="-200,700; 1650,700" dur="12s" repeatCount="indefinite" />
                        <rect x="5" y="18" width="130" height="36" rx="8" fill="#1a1e22" />
                        <path d="M30,18 L46,2 L100,2 L118,18" fill="#151819" stroke="#222" strokeWidth="1" />
                        <circle cx="32" cy="52" r="14" fill="#111" stroke="#333" strokeWidth="2" />
                        <circle cx="108" cy="52" r="14" fill="#111" stroke="#333" strokeWidth="2" />
                        <rect x="128" y="26" width="10" height="8" rx="2" fill="#f5c518" opacity=".8" />
                        <text x="55" y="40" fontFamily="'Exo 2',sans-serif" fontSize="7" fill="#d4551e" opacity=".6" fontWeight="700">POWERFRILL EV</text>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default MenuBackground;
