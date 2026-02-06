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
        scene.background = new THREE.Color('#f5f5f7');

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        camera.position.z = 2;

        const loadingManager = new THREE.LoadingManager();
        const textureLoader = new THREE.TextureLoader(loadingManager);
        const planeGroups: THREE.Group[] = [];
        const planeMeshes: THREE.Mesh[] = [];

        // Function to calculate plane size that replicates "background-size: cover"
        // Applies to the GROUP to handle window layout
        const updatePlaneSize = (group: THREE.Group, texture: THREE.Texture) => {
            if (!texture.image) return;
            const img = texture.image as HTMLImageElement;
            const aspect = window.innerWidth / window.innerHeight;
            const imageAspect = img.width / img.height;

            const vFov = (camera.fov * Math.PI) / 180;
            const planeHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
            const planeWidth = planeHeight * aspect;

            // We use 1.1x base for group to ensure we have bleed margin
            group.scale.set(planeWidth * 1.1, planeHeight * 1.1, 1);

            if (imageAspect > aspect) {
                texture.repeat.set(aspect / imageAspect, 1);
                texture.offset.set((1 - aspect / imageAspect) / 2, 0);
            } else {
                texture.repeat.set(1, imageAspect / aspect);
                texture.offset.set(0, (1 - imageAspect / aspect) / 2);
            }
        };

        // Create planes for each section
        sectionsData.forEach((section, index) => {
            const group = new THREE.Group();
            const texture = textureLoader.load(section.image, (tex) => {
                updatePlaneSize(group, tex);
            });
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;

            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: index === 0 ? 1 : 0,
                color: 0xeeeeee
            });
            const mesh = new THREE.Mesh(geometry, material);

            // Animation start states on MESH
            const startScale = index === 0 ? 1 : 1.1;
            mesh.scale.set(startScale, startScale, 1);

            // Position Z on GROUP - mandatory values
            group.position.z = index === 0 ? 0 : 0.3;

            group.add(mesh);
            scene.add(group);
            planeGroups.push(group);
            planeMeshes.push(mesh);
        });

        loadingManager.onLoad = () => {
            initTimeline();
            gsap.to(containerRef.current, { opacity: 1, duration: 1, ease: "power2.out" });
        };

        const initTimeline = () => {
            ScrollTrigger.normalizeScroll(true);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${sectionsData.length * 200}%`,
                    scrub: 1.8,
                    pin: true,
                    anticipatePin: 1
                }
            });
            timelineRef.current = tl;

            sectionsData.forEach((_, index) => {
                const outgoingMesh = planeMeshes[index];
                const outgoingGroup = planeGroups[index];
                const incomingMesh = planeMeshes[index + 1];
                const incomingGroup = planeGroups[index + 1];

                const transitionDuration = 1;
                const overlap = 0.5;
                const startTime = index * transitionDuration;

                if (index === 0) gsap.set(`#text-0`, { opacity: 1, y: 0 });
                else gsap.set(`#text-${index}`, { opacity: 0, y: 60 });

                if (incomingMesh) {
                    // Outgoing: Scale 1 -> 0.95, Z 0 -> -0.3
                    tl.to(outgoingMesh.scale, { x: 0.95, y: 0.95, duration: transitionDuration }, startTime)
                        .to(outgoingMesh.material, { opacity: 0, duration: transitionDuration }, startTime)
                        .to(outgoingGroup.position, { z: -0.3, duration: transitionDuration }, startTime);

                    tl.to(`#text-${index}`, { opacity: 0, y: -100, duration: transitionDuration * 0.45 }, startTime);

                    // Incoming: Scale 1.1 -> 1, Z 0.3 -> 0
                    const incomingStartTime = startTime + (1 - overlap);
                    tl.to(incomingMesh.scale, { x: 1, y: 1, duration: transitionDuration }, incomingStartTime)
                        .to(incomingMesh.material, { opacity: 1, duration: transitionDuration }, incomingStartTime)
                        .to(incomingGroup.position, { z: 0, duration: transitionDuration }, incomingStartTime);

                    tl.to(`#text-${index + 1}`, { opacity: 1, y: 0, duration: transitionDuration * 0.75 }, incomingStartTime + (transitionDuration * 0.1));
                }
            });
        };

        // Animation Loop
        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Handle Resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);

            planeGroups.forEach((group, idx) => {
                const mesh = planeMeshes[idx];
                if (mesh.material instanceof THREE.MeshBasicMaterial && mesh.material.map) {
                    updatePlaneSize(group, mesh.material.map);
                }
            });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            planeMeshes.forEach(p => {
                p.geometry.dispose();
                if (p.material instanceof THREE.MeshBasicMaterial && p.material.map) {
                    p.material.map.dispose();
                }
                (p.material as THREE.Material).dispose();
            });
            if (timelineRef.current) timelineRef.current.kill();
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
        <div ref={containerRef} className="hero-wrapper" style={{ background: '#f5f5f7', opacity: 0 }}>
            <div className="hero-gradient-overlay" />
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
