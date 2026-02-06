import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SideNav from './SideNav';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sectionsData = [
    {
        id: 'bess',
        title: 'BESS',
        subtitle: 'Battery Energy Storage System',
        image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1920'
    },
    {
        id: 'application',
        title: 'Application',
        subtitle: 'Power Solutions',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1920'
    },
    {
        id: 'innovation',
        title: 'Innovation',
        subtitle: 'Next-Gen Technology',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920'
    },
    {
        id: 'about',
        title: 'About',
        subtitle: 'Our Mission',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920'
    },
    {
        id: 'contact',
        title: 'Contact',
        subtitle: 'Get Connected',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920'
    }
];

const Hero: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // --- Three.js Setup ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        camera.position.z = 2;

        const textureLoader = new THREE.TextureLoader();
        const planes: THREE.Mesh[] = [];

        // Create planes for each section
        sectionsData.forEach((section, index) => {
            const texture = textureLoader.load(section.image);
            const geometry = new THREE.PlaneGeometry(5, 3); // Aspect ratio adjusted
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: index === 0 ? 1 : 0
            });
            const plane = new THREE.Mesh(geometry, material);

            // Initial states
            plane.scale.set(index === 0 ? 1 : 1.12, index === 0 ? 1 : 1.12, 1);
            plane.position.z = index === 0 ? 0 : 0.3;

            scene.add(plane);
            planes.push(plane);
        });

        // --- GSAP Master Timeline ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${sectionsData.length * 100}%`,
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });
        timelineRef.current = tl;

        // Build transitions for Planes & Text
        sectionsData.forEach((_, index) => {
            const outgoing = planes[index];
            const incoming = planes[index + 1];
            // Text elements are queried by ID
            // const textCurrent = document.querySelector(`#text-${index}`); // Not directly used in tl.to, but good for reference
            // const textNext = document.querySelector(`#text-${index + 1}`); // Not directly used in tl.to, but good for reference

            const transitionDuration = 1;
            const overlap = 0.5; // 50% overlap for smoother crossfade
            const startTime = index * transitionDuration;

            // Initial text states
            if (index === 0) gsap.set(`#text-${index}`, { opacity: 1, y: 0 });
            else gsap.set(`#text-${index}`, { opacity: 0, y: 30 });

            if (incoming) {
                // Outgoing Logic (Plane)
                tl.to(outgoing.scale, { x: 0.92, y: 0.92, duration: transitionDuration }, startTime)
                    .to(outgoing.material, { opacity: 0, duration: transitionDuration }, startTime)
                    .to(outgoing.position, { z: -0.3, duration: transitionDuration }, startTime);

                // Outgoing Logic (Text)
                tl.to(`#text-${index}`, {
                    opacity: 0,
                    y: -30,
                    duration: transitionDuration * 0.4
                }, startTime);

                // Incoming Logic (Plane)
                const incomingStartTime = startTime + (1 - overlap);
                tl.to(incoming.scale, { x: 1, y: 1, duration: transitionDuration }, incomingStartTime)
                    .to(incoming.material, { opacity: 1, duration: transitionDuration }, incomingStartTime)
                    .to(incoming.position, { z: 0, duration: transitionDuration }, incomingStartTime);

                // Incoming Logic (Text)
                tl.to(`#text-${index + 1}`, {
                    opacity: 1,
                    y: 0,
                    duration: transitionDuration * 0.6
                }, incomingStartTime + (transitionDuration * 0.2));
            }
        });

        // Animation Loop
        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Handle Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            planes.forEach(p => {
                p.geometry.dispose();
                if (p.material instanceof THREE.MeshBasicMaterial && p.material.map) {
                    p.material.map.dispose();
                }
                (p.material as THREE.Material).dispose();
            });
            tl.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    const scrollToSection = (index: number) => {
        if (!timelineRef.current) return;
        const trigger = timelineRef.current.scrollTrigger;
        if (!trigger) return;

        const targetScroll = trigger.start + (trigger.end - trigger.start) * (index / (sectionsData.length - 1));
        gsap.to(window, {
            scrollTo: targetScroll,
            duration: 1.5,
            ease: "power2.inOut"
        });
    };

    return (
        <div ref={containerRef} className="hero-wrapper" style={{ background: '#000' }}>
            <canvas ref={canvasRef} className="hero-canvas" />
            <SideNav
                customItems={sectionsData.map(s => ({ id: s.id, label: s.title }))}
                gsapTimeline={timelineRef}
                onSectionClick={scrollToSection}
            />

            {/* HTML Overlays synced to timeline if needed, or simple absolute content */}
            <div className="hero-content-fixed">
                {sectionsData.map((section, index) => (
                    <div
                        key={section.id}
                        id={`text-${index}`}
                        className="hero-text-overlay"
                        style={{ opacity: index === 0 ? 1 : 0 }}
                    >
                        <h1 className="hero-title">{section.title}</h1>
                        <p className="hero-subtitle">{section.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
