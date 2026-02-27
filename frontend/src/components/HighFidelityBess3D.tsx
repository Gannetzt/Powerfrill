import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { useScroll, useTransform } from 'framer-motion';

interface HighFidelityBess3DProps {
    accent?: string;
}

const HighFidelityBess3D: React.FC<HighFidelityBess3DProps> = ({ accent = '#ff6600' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawerRef = useRef<THREE.Group | null>(null);

    // Use Framer Motion for scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Map scroll progress (0 to 1) to drawer Z position
    // Base caseDepth = 9.5
    // Inside Z: 9.5/2 - 4 = 0.75
    // Outside Z: 9.5/2 + 2 = 6.75
    const drawerZ = useTransform(scrollYProgress, [0.3, 0.7], [0.75, 6.75]);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        // --- SETUP ---
        const textureLoader = new THREE.TextureLoader();
        const scene = new THREE.Scene();
        scene.background = null; // Transparent background

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 150);
        camera.position.set(-30, 22, 45); // Zoomed out position

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Lower pixel ratio for performance
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap; // Faster than VSM

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 7, 0);
        controls.enableZoom = false; // Disable zoom to avoid scroll conflicts
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // --- LIGHTS ---
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
        mainLight.position.set(20, 40, 30);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024; // Balanced resolution
        mainLight.shadow.mapSize.height = 1024;
        mainLight.shadow.bias = -0.001;
        mainLight.shadow.radius = 2;
        scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0x00aaff, 0.8);
        fillLight.position.set(-20, 10, -15);
        scene.add(fillLight);

        // --- GROUND GRID ---
        const gridHelper = new THREE.GridHelper(100, 50, 0xff6600, 0x333333);
        gridHelper.position.y = 0;
        gridHelper.material.opacity = 0.15;
        gridHelper.material.transparent = true;
        scene.add(gridHelper);

        // Subtle floor circle
        const circleGeo = new THREE.CircleGeometry(15, 64);
        const circleMat = new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.03, side: THREE.DoubleSide });
        const circle = new THREE.Mesh(circleGeo, circleMat);
        circle.rotation.x = -Math.PI / 2;
        circle.position.y = 0.01;
        scene.add(circle);

        // --- MATERIALS ---
        const caseMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.4, metalness: 0.3 });
        const screenBorderMat = new THREE.MeshStandardMaterial({ color: 0x0077cc, roughness: 0.3, metalness: 0.6 });
        const screenMat = new THREE.MeshStandardMaterial({ color: 0x020202, roughness: 0.05, metalness: 0.9 });
        const batteryOrangeMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(accent), roughness: 0.2, metalness: 0.4 });
        const batteryBlackMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.8, metalness: 0.1 });
        const glowBlueMat = new THREE.MeshStandardMaterial({ color: 0x00aaff, emissive: 0x00aaff, emissiveIntensity: 3.0 });

        const bessGroup = new THREE.Group();
        scene.add(bessGroup);
        // We'll expose this to the animate loop for scroll rotation
        const innerGroup = new THREE.Group();
        bessGroup.add(innerGroup);

        const caseWidth = 6.4;
        const caseHeight = 15;
        const caseDepth = 9.5;

        // Left/Right/Top/Back Panels
        const sidePanelGeo = new RoundedBoxGeometry(0.6, caseHeight, caseDepth, 5, 0.2);
        const leftPanel = new THREE.Mesh(sidePanelGeo, caseMat);
        leftPanel.position.set(-caseWidth / 2 + 0.3, caseHeight / 2 + 1.5, 0);
        leftPanel.castShadow = true; leftPanel.receiveShadow = true;
        innerGroup.add(leftPanel);

        const rightPanel = new THREE.Mesh(sidePanelGeo, caseMat);
        rightPanel.position.set(caseWidth / 2 - 0.3, caseHeight / 2 + 1.5, 0);
        rightPanel.castShadow = true; rightPanel.receiveShadow = true;
        innerGroup.add(rightPanel);

        const topPanelGeo = new RoundedBoxGeometry(caseWidth, 0.6, caseDepth, 5, 0.2);
        const topPanel = new THREE.Mesh(topPanelGeo, caseMat);
        topPanel.position.set(0, caseHeight + 1.5 + 0.3, 0);
        topPanel.castShadow = true; topPanel.receiveShadow = true;
        innerGroup.add(topPanel);

        const backPanelGeo = new RoundedBoxGeometry(caseWidth, caseHeight, 0.6, 5, 0.2);
        const backPanel = new THREE.Mesh(backPanelGeo, caseMat);
        backPanel.position.set(0, caseHeight / 2 + 1.5, -caseDepth / 2 + 0.3);
        backPanel.castShadow = true; backPanel.receiveShadow = true;
        innerGroup.add(backPanel);

        // Arch & Screen
        const screenGroup = new THREE.Group();
        screenGroup.position.set(0, caseHeight + 1.5, caseDepth / 2 - 1.2);
        screenGroup.rotation.x = -Math.PI / 7;

        const screenFrame = new THREE.Mesh(new RoundedBoxGeometry(caseWidth - 1.2, 3.2, 0.4, 4, 0.1), screenBorderMat);
        screenGroup.add(screenFrame);
        const screenInner = new THREE.Mesh(new THREE.BoxGeometry(caseWidth - 1.6, 2.6, 0.5), screenMat);
        screenInner.position.z = 0.05;
        screenGroup.add(screenInner);

        const pillarGeo = new RoundedBoxGeometry(1.6, caseHeight - 1.5, 2.5, 4, 0.2);
        const fp1 = new THREE.Mesh(pillarGeo, caseMat);
        fp1.position.set(-caseWidth / 2 + 0.8, caseHeight / 2 + 1.5, caseDepth / 2 - 1.25);
        innerGroup.add(fp1);
        const fp2 = new THREE.Mesh(pillarGeo, caseMat);
        fp2.position.set(caseWidth / 2 - 0.8, caseHeight / 2 + 1.5, caseDepth / 2 - 1.25);
        innerGroup.add(fp2);

        const archTop = new THREE.Mesh(new RoundedBoxGeometry(caseWidth, 2.5, 2.5, 4, 0.2), caseMat);
        archTop.position.set(0, caseHeight + 0.8, caseDepth / 2 - 1.25);
        archTop.add(screenGroup);
        innerGroup.add(archTop);

        // --- DRAWER ---
        const drawer = new THREE.Group();
        drawer.position.set(0, 2.3, caseDepth / 2 - 3);
        innerGroup.add(drawer);
        drawerRef.current = drawer;

        const frameWidth = caseWidth - 2.8;
        const frameHeight = caseHeight - 2.5;
        const frameDepth = 6.5;

        const centerCol = new THREE.Mesh(new THREE.BoxGeometry(0.8, frameHeight, 0.3), batteryBlackMat);
        centerCol.position.set(0, frameHeight / 2, frameDepth / 2);
        drawer.add(centerCol);

        const led = new THREE.Mesh(new THREE.BoxGeometry(0.12, frameHeight - 1.5, 0.15), glowBlueMat);
        led.position.set(0, frameHeight / 2, frameDepth / 2 + 0.12);
        drawer.add(led);

        const batWidth = (frameWidth / 2) - 0.5;
        const batHeight = 1.6;
        const batDepth = frameDepth - 0.8;
        const batGeo = new RoundedBoxGeometry(batWidth, batHeight, batDepth, 3, 0.1);
        const batFrontGeo = new THREE.BoxGeometry(batWidth + 0.05, batHeight - 0.3, 0.2);

        const rows = 6;
        const rowSpacing = frameHeight / rows;
        for (let r = 0; r < rows; r++) {
            const shelf = new THREE.Mesh(new THREE.BoxGeometry(frameWidth + 0.6, 0.25, frameDepth), batteryBlackMat);
            shelf.position.set(0, r * rowSpacing, 0);
            drawer.add(shelf);

            [-1, 1].forEach(dir => {
                const bat = new THREE.Group();
                bat.position.set(dir * (frameWidth / 4 + 0.1), r * rowSpacing + batHeight / 2 + 0.2, 0);
                bat.add(new THREE.Mesh(batGeo, batteryOrangeMat));
                const front = new THREE.Mesh(batFrontGeo, batteryBlackMat);
                front.position.z = batDepth / 2;
                bat.add(front);
                drawer.add(bat);
            });
        }

        // --- LOGO (Canvas Texture) ---

        // Helper to remove white background and create transparent texture
        const loadTransparentLogo = (path: string, callback: (tex: THREE.CanvasTexture) => void) => {
            textureLoader.load(path, (originalTex: THREE.Texture) => {
                const img = originalTex.image as HTMLImageElement;
                const canvas = document.createElement('canvas');
                canvas.width = img.width; canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                ctx.drawImage(img as CanvasImageSource, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) data[i + 3] = 0;
                }
                ctx.putImageData(imageData, 0, 0);
                const transparentTex = new THREE.CanvasTexture(canvas);
                transparentTex.needsUpdate = true;
                callback(transparentTex);
            });
        };

        const logoMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
        loadTransparentLogo('/assets/powerfrill-alternate-logo.jpg', (tex) => {
            logoMat.map = tex;
            logoMat.opacity = 1;
            logoMat.needsUpdate = true;
        });

        if (logoMat) {
            const logoPlane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), logoMat);
            logoPlane.position.set(-caseWidth / 2 - 0.05, caseHeight / 2 + 2, -1);
            logoPlane.rotation.y = -Math.PI / 2;
            innerGroup.add(logoPlane);

            const logoRight = logoPlane.clone();
            logoRight.position.set(caseWidth / 2 + 0.05, caseHeight / 2 + 2, -1);
            logoRight.rotation.y = Math.PI / 2;
            innerGroup.add(logoRight);
        }

        let isVisible = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0.1 }
        );
        observer.observe(container);

        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            if (isVisible) {
                // Handle scroll rotation
                const prog: number = scrollYProgress.get();
                // Rotate from -0.3 to 0.3 radians based on scroll
                innerGroup.rotation.y = (prog - 0.5) * 1.5;

                controls.update();
                renderer.render(scene, camera);
            }
        };
        animate();

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
            renderer.dispose();
            scene.clear();
        };
    }, [accent]);

    // Sync drawer position to scroll
    useEffect(() => {
        const unsubscribe = drawerZ.on("change", (latest: number) => {
            if (drawerRef.current) {
                drawerRef.current.position.z = latest;
            }
        });
        return () => unsubscribe();
    }, [drawerZ]);

    return (
        <div ref={containerRef} className="high-fidelity-bess-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
    );
};

export default HighFidelityBess3D;
