import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Observer } from 'gsap/all';
import SideNav from './SideNav';
import type { SideNavHandle } from './SideNav';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);




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
    const navRef = useRef<SideNavHandle>(null);
    const animating = useRef(false);
    const currentIndex = useRef(0);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

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
        const updatePlaneSize = (group: THREE.Group, texture: THREE.Texture) => {
            if (!texture.image) return;
            const img = texture.image as HTMLImageElement;
            const aspect = window.innerWidth / window.innerHeight;
            const imageAspect = img.width / img.height;

            const vFov = (camera.fov * Math.PI) / 180;
            const planeHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
            const planeWidth = planeHeight * aspect;

            // We use 1.05x scale to avoid any edge bleeding during transitions
            group.scale.set(planeWidth * 1.05, planeHeight * 1.05, 1);

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

            // Initial state: first one visible, others hidden
            // All start at scale 1.1 (zoomed in slightly) waiting to settle to 1, or 1 if active
            const startScale = index === 0 ? 1 : 1.1;
            mesh.scale.set(startScale, startScale, 1);

            group.add(mesh);
            scene.add(group);
            planeGroups.push(group);
            planeMeshes.push(mesh);
        });

        const fadeToVisible = () => {
            if (containerRef.current && containerRef.current.style.opacity === '0') {
                gsap.to(containerRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" });
            }
        };

        const safetyTimeout = setTimeout(fadeToVisible, 3000);

        loadingManager.onLoad = () => {
            clearTimeout(safetyTimeout);
            fadeToVisible();
        };

        // --- Observer Logic ---

        // Helper to animate to a specific section
        const gotoSection = (index: number, direction: number) => {
            if (animating.current) return;
            if (index < 0 || index >= sectionsData.length) return;

            animating.current = true;
            const prevIndex = currentIndex.current;
            currentIndex.current = index;

            // const outgoingGroup = planeGroups[prevIndex];
            const outgoingMesh = planeMeshes[prevIndex];
            // const incomingGroup = planeGroups[index];
            const incomingMesh = planeMeshes[index];

            const tl = gsap.timeline({
                onComplete: () => {
                    animating.current = false;
                }
            });

            // Update Nav immediately for responsiveness
            if (navRef.current) {
                // Calculate discrete progress for nav
                const p = index / (sectionsData.length - 1);
                navRef.current.setProgress(p);
            }

            // TEXT TRANSITIONS
            // Outgoing text: Fade out & move slightly
            tl.to(`#text-${prevIndex}`, {
                yPercent: -10 * direction,
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut"
            }, 0);

            // Incoming text: From opposite side
            gsap.set(`#text-${index}`, { yPercent: 10 * direction, opacity: 0 });
            tl.to(`#text-${index}`, {
                yPercent: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }, 0.2); // slight overlap

            // IMAGE TRANSITIONS (Crossfade with Scale)
            // Ensure incoming is rendered on top if needed, or just handle via opacity
            // Three.js doesn't support z-index, relies on render order or depth test. 
            // We disable depth write for background planes usually, but here distinct opacity handles it.

            // Outgoing: Scale down slightly + Fade Out
            tl.to(outgoingMesh.scale, { x: 0.95, y: 0.95, duration: 1.2, ease: "power2.inOut" }, 0);
            tl.to(outgoingMesh.material, { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 0);

            // Incoming: Start Scaled Up (1.1) -> Scale to 1 + Fade In
            // Reset incoming props first just in case
            incomingMesh.scale.set(1.1, 1.1, 1);
            tl.to(incomingMesh.scale, { x: 1, y: 1, duration: 1.2, ease: "power2.inOut" }, 0);
            tl.to(incomingMesh.material, { opacity: 1, duration: 1.0, ease: "power2.inOut" }, 0);

        };

        // Expose gotoSection to the parent scope or ref if needed, 
        // but for now we bind it to the observer and nav.

        // We attach this to the window/ref so nav can call it? 
        // Better: We define the nav callback in the render, but it needs access to this scope.
        // We can use a ref to store the function.
        (containerRef.current as any).gotoSection = (i: number) => {
            const dir = i > currentIndex.current ? 1 : -1;
            gotoSection(i, dir);
        };

        Observer.create({
            target: window, // Capture global scroll events
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onDown: () => !animating.current && gotoSection(currentIndex.current - 1, -1),
            onUp: () => !animating.current && gotoSection(currentIndex.current + 1, 1),
            tolerance: 10,
            preventDefault: true
        });

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

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
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            Observer.getAll().forEach((o: any) => o.kill());
            // Cleanup meshes/materials...
            planeMeshes.forEach(p => {
                p.geometry.dispose();
                (p.material as THREE.Material).dispose();
            });
        };
    }, []);

    const handleNavClick = (index: number) => {
        if (containerRef.current && (containerRef.current as any).gotoSection) {
            (containerRef.current as any).gotoSection(index);
        }
    };

    return (
        <div ref={containerRef} className="hero-wrapper" style={{ background: '#f5f5f7', opacity: 0 }}>
            <div className="hero-gradient-overlay" />
            <canvas ref={canvasRef} className="hero-canvas" />
            <SideNav
                ref={navRef}
                customItems={sectionsData.map(s => ({ id: s.id, label: s.title }))}
                onSectionClick={handleNavClick}
            />

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
                        <div className="hero-explore-container">
                            <span className="hero-explore-text">EXPLORE</span>
                            <div className="hero-explore-line" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
