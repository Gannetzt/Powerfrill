import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BatteryModuleInner } from './BatteryModuleInner';
import './BatteryModule3D.css';

gsap.registerPlugin(ScrollTrigger);

export const BatteryModule3D: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const moduleRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fallback or actual loading sequence
        const t = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(t);
    }, []);

    useLayoutEffect(() => {
        if (isLoading || !containerRef.current || !moduleRef.current) return;

        const { tray, topPlate, cells } = moduleRef.current;
        if (!tray || !topPlate || !cells) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

            // 1. Initial State
            gsap.set(tray.position, { y: -2.5 });
            gsap.set(topPlate.position, { y: 4.2 });
            cells.children.forEach((cellGroup: any) => {
                const cell = cellGroup.children[0];
                const cap = cellGroup.children[1];
                gsap.set([cell.position, cap.position], { y: 0 });
            });

            // 2. Open Case
            tl.to(topPlate.position, {
                y: 8,
                duration: 2,
                ease: "power2.inOut"
            }, 0)
                .to(tray.position, {
                    y: -4,
                    duration: 2,
                    ease: "power2.inOut"
                }, 0);

            // 3. Extract Cells (Wave effect based on original HTML)
            const cellDuration = 2;
            cells.children.forEach((cellGroup: any) => {
                // Get the grid positions from the component logic
                // Using internal state if needed, or simple staggering
                const body = cellGroup.children[0];
                const cap = cellGroup.children[1];

                // Simple stagger extraction
                tl.to([body.position, cap.position], {
                    y: 3,
                    duration: cellDuration,
                    ease: "back.out(1.2)"
                }, 1 + Math.random() * 1.5);

                // Pulse materials (assuming 0 is body mesh)
                if (body.material) {
                    tl.to(body.material, {
                        emissiveIntensity: 5,
                        duration: 0.5,
                        yoyo: true,
                        repeat: 1
                    }, 2 + Math.random());
                }
            });

            // 4. Camera movement handled by scroll trigger on the canvas container in HTML,
            // here we keep it simple or use a custom camera rig.
        });

        return () => ctx.revert();
    }, [isLoading]);

    return (
        <div ref={containerRef} className="battery-module-container">
            {isLoading && (
                <div className="battery-module-loader">
                    <div className="battery-module-loader-spinner" />
                </div>
            )}

            {/* Sticky Canvas Container */}
            <div ref={canvasContainerRef} className="battery-canvas-container">
                <Canvas
                    camera={{ position: [16, 14, 28], fov: 40 }}
                    gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
                    shadows
                >
                    <ambientLight intensity={0.4} />
                    <hemisphereLight args={[0xffffff, 0x222222, 0.8]} />
                    <spotLight position={[10, 25, 20]} angle={0.5} penumbra={0.5} intensity={100} castShadow />
                    <directionalLight position={[0, 30, 0]} intensity={0.6} />

                    {/* Energy Glow Light */}
                    <pointLight position={[0, 2, 0]} color={0xff6600} intensity={50} distance={15} />

                    <React.Suspense fallback={null}>
                        <BatteryModuleInner ref={moduleRef} />
                    </React.Suspense>

                    <OrbitControls
                        enableDamping
                        dampingFactor={0.05}
                        target={[0, 0, 0]}
                        enableZoom={false}
                    />
                </Canvas>

                {/* UI Overlay */}
                <div className="battery-ui-overlay">
                    <div className="battery-ui-top">
                        <div>
                            {/* Logo is now on the 3D model itself */}
                        </div>
                        <div className="battery-ui-badge">Industrial AI // Ready</div>
                    </div>

                    <div className="battery-ui-bottom">
                        <div className="battery-ui-hint">Scroll to inspect internal architecture</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
