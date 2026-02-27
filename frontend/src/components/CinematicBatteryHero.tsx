import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CinematicBatteryHero.css';

gsap.registerPlugin(ScrollTrigger);

const CinematicBatteryHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logoRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // --- Animation Constants ---
        // Animation Progress: 0 (Closed) -> 1 (Exploded)
        const animState = { progress: 0 };

        // --- Drawing Function (Placeholder for 3D/Image Sequence) ---
        const render = (progress: number) => {
            if (!ctx) return;
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2;

            // Clear
            ctx.clearRect(0, 0, w, h);

            // --- BESS MODULE VISUALIZATION (Placeholder) ---

            // Base scaling
            const baseScale = Math.min(w, h) * 0.003;

            // 1. Bottom Housing Case (Outer Shell)
            const caseYOffset = progress * 150; // Moves down
            ctx.save();
            ctx.translate(cx, cy + (100 * baseScale) + caseYOffset);
            ctx.scale(baseScale, baseScale);
            ctx.fillStyle = '#1a1a1a';
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-200, 0);
            ctx.lineTo(200, 0);
            ctx.lineTo(200, 100);
            ctx.lineTo(-200, 100);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // Logo on Case
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = '#444';
            ctx.fillText('POWERFILL MODULE', -80, 50);
            ctx.restore();

            // 2. Battery Cells (The Core)
            // They spread out vertically
            const cellsCount = 5;
            const cellSpread = progress * 40; // Cells separate

            for (let i = 0; i < cellsCount; i++) {
                const yPos = cy + (i - 2) * 15 - (i - 2) * cellSpread;

                ctx.save();
                ctx.translate(cx, yPos);
                ctx.scale(baseScale, baseScale);

                // Cell Body
                ctx.fillStyle = `rgba(50, 50, 50, ${1 - progress * 0.2})`; // Fade slightly
                ctx.strokeStyle = '#ff6600'; // Energy Orange
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.roundRect(-180, -5, 360, 10, 2);
                ctx.fill();
                ctx.stroke();

                // Energy Pulse (if exploded)
                if (progress > 0.1) {
                    ctx.fillStyle = `rgba(255, 102, 0, ${progress * 0.5})`;
                    ctx.beginPath();
                    ctx.arc(-150 + (i * 70) % 300, 0, 3, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            }

            // 3. BMS / Electronics Board (Top Layer)
            const bmsLift = progress * 200; // Lifts up high
            ctx.save();
            ctx.translate(cx, cy - (80 * baseScale) - bmsLift);
            ctx.scale(baseScale, baseScale);

            // PCB Board
            ctx.fillStyle = '#0a2a1a'; // Dark green PCB feel
            ctx.strokeStyle = '#00ffcc'; // Tech Green accent
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-190, 0);
            ctx.lineTo(190, 0);
            ctx.lineTo(170, -40);
            ctx.lineTo(-170, -40);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Chips
            ctx.fillStyle = '#111';
            ctx.fillRect(-50, -30, 100, 20);

            // Connecting Lines (Simulated wires stretching)
            if (progress > 0) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, bmsLift / baseScale);
                ctx.strokeStyle = `rgba(0, 255, 204, ${0.5 - progress * 0.5})`;
                ctx.stroke();
            }

            ctx.restore();

            // 4. Top Cover
            const lidLift = progress * 350; // Lifts highest
            ctx.save();
            ctx.translate(cx, cy - (100 * baseScale) - lidLift);
            ctx.scale(baseScale, baseScale);
            ctx.fillStyle = 'rgba(20, 20, 25, 0.9)';
            ctx.strokeStyle = '#555';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-200, 0);
            ctx.lineTo(200, 0);
            ctx.lineTo(180, -20);
            ctx.lineTo(-180, -20);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        };

        // --- Responsive Canvas ---
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(0); // Initial render
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();


        // --- GSAP ScrollTrigger ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth scrolling
                pin: stickyRef.current,
                onUpdate: (self) => {
                    // Drive animation state
                    // 0.0 - 0.2: Fade In (handled by CSS opacity mostly)
                    // 0.2 - 0.8: Explode
                    // 0.8 - 1.0: Hold / Fade Out

                    let p = self.progress;
                    let visualProgress = 0;

                    if (p < 0.2) {
                        visualProgress = 0;
                    } else if (p < 0.8) {
                        visualProgress = (p - 0.2) / 0.6; // Normalized 0-1
                    } else {
                        visualProgress = 1 - (p - 0.8) / 0.2; // Quick reassemble or fade
                    }

                    animState.progress = visualProgress;
                    render(visualProgress);
                }
            }
        });

        // Text Animations
        tl.to(logoRef.current, { opacity: 1, y: 0, duration: 1 }, 0);
        tl.to(taglineRef.current, { opacity: 1, duration: 1 }, 0.2);
        tl.to(gridRef.current, { opacity: 0.5, duration: 1 }, 0);

        // Cleanup function for useGSAP is handled automatically or we can return one
        // Note: window resize listener needs manual cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            // ScrollTrigger and Timeline are killed by useGSAP automatically when component unmounts
        };

    }, { scope: containerRef });

    return (
        <div className="cinematic-hero-wrapper" ref={containerRef}>
            <div className="cinematic-scroll-container">
                <div className="cinematic-sticky-stage" ref={stickyRef}>
                    {/* Background Grid */}
                    <div className="tech-hud-layer">
                        <div className="tech-grid" ref={gridRef}></div>
                    </div>

                    {/* Main Visual */}
                    <canvas ref={canvasRef} className="cinematic-canvas" />

                    {/* Overlay Text */}
                    <div className="cinematic-overlay">
                        <h1 className="cinematic-brand-logo" ref={logoRef}>POWERFILL</h1>
                        <p className="cinematic-tagline" ref={taglineRef}>ENGINEERED FOR THE FUTURE</p>
                    </div>
                </div>
            </div>

            {/* Scroll indicator or spacing */}
            <div style={{ position: 'absolute', bottom: '50px', width: '100%', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
                SCROLL TO EXPLORE
            </div>
        </div>
    );
};

export default CinematicBatteryHero;
