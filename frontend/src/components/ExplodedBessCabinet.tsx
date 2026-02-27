import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExplodedBessCabinet: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        // --- Core Setup ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x02050a); // Industrial dark background
        scene.fog = new THREE.Fog(0x02050a, 20, 150);

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 8, 60); // Zoomed out initial position

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 8, 0);
        controls.enableZoom = false;

        // --- Lights ---
        scene.add(new THREE.AmbientLight(0xffffff, 0.7));

        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(20, 30, 20);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        mainLight.shadow.camera.left = -30;
        mainLight.shadow.camera.right = 30;
        mainLight.shadow.camera.top = 30;
        mainLight.shadow.camera.bottom = -30;
        scene.add(mainLight);

        const headLight = new THREE.SpotLight(0xffffff, 0.8, 100, Math.PI / 4, 0.5);
        headLight.position.set(0, 15, 50);
        scene.add(headLight);

        // --- Floor ---
        const floorGeo = new THREE.PlaneGeometry(200, 200);
        const floorMat = new THREE.ShadowMaterial({ opacity: 0.15 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        const grid = new THREE.GridHelper(100, 40, 0x333333, 0x111111);
        scene.add(grid);

        // --- Cabinet Materials ---
        const cabinetMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.6, metalness: 0.2 });
        const internalMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.8 });
        const moduleMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 });
        const cellOrangeMat = new THREE.MeshStandardMaterial({
            color: 0xff4500,
            emissive: 0xff4500,
            emissiveIntensity: 1.2,
            roughness: 0.3
        });
        const doorInnerMat = new THREE.MeshStandardMaterial({ color: 0xdbdbdb, roughness: 0.4 });
        const orangeCableMat = new THREE.MeshStandardMaterial({ color: 0xff4500, roughness: 0.3, metalness: 0.1 });
        const screenMat = new THREE.MeshBasicMaterial({ color: 0x222222 });

        // --- Textures ---
        const textureLoader = new THREE.TextureLoader();
        const loadTransparentLogo = (path: string, callback: (tex: THREE.CanvasTexture) => void) => {
            textureLoader.load(path, (originalTex) => {
                const img = originalTex.image;
                const canvas = document.createElement('canvas');
                canvas.width = img.width; canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                ctx.drawImage(img, 0, 0);
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

        const createDangerTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 256; canvas.height = 256;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;
            ctx.clearRect(0, 0, 256, 256);
            ctx.fillStyle = '#ffcc00'; ctx.beginPath(); ctx.moveTo(128, 40); ctx.lineTo(220, 210); ctx.lineTo(36, 210); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#000'; ctx.fillRect(120, 85, 16, 70); ctx.beginPath(); ctx.arc(128, 185, 10, 0, Math.PI * 2); ctx.fill();
            return new THREE.CanvasTexture(canvas);
        };

        const logoMat = new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide, depthWrite: false, opacity: 0 });
        loadTransparentLogo('/assets/powerfrill-alternate-logo.jpg', (tex) => {
            logoMat.map = tex;
            logoMat.opacity = 1;
            logoMat.needsUpdate = true;
        });
        const dangerTex = createDangerTexture();
        const dangerMat = new THREE.MeshBasicMaterial({ map: dangerTex, transparent: true });

        // --- Modeling ---
        const cabWidth = 18; const cabHeight = 20; const cabDepth = 14;
        const cabinetGroup = new THREE.Group();
        cabinetGroup.position.y = 1.5;
        scene.add(cabinetGroup);

        const wallThick = 0.5;
        const walls = new THREE.Group();
        cabinetGroup.add(walls);

        const backWall = new THREE.Mesh(new THREE.BoxGeometry(cabWidth, cabHeight, wallThick), cabinetMat);
        backWall.position.set(0, cabHeight / 2, -cabDepth / 2 + wallThick / 2);
        walls.add(backWall);

        const topWall = new THREE.Mesh(new THREE.BoxGeometry(cabWidth, wallThick, cabDepth), cabinetMat);
        topWall.position.set(0, cabHeight - wallThick / 2, 0);
        walls.add(topWall);

        const bottomWall = new THREE.Mesh(new THREE.BoxGeometry(cabWidth, wallThick, cabDepth), cabinetMat);
        bottomWall.position.set(0, wallThick / 2, 0);
        walls.add(bottomWall);

        const leftWall = new THREE.Mesh(new THREE.BoxGeometry(wallThick, cabHeight, cabDepth), cabinetMat);
        leftWall.position.set(-cabWidth / 2 + wallThick / 2, cabHeight / 2, 0);
        walls.add(leftWall);

        const rightWall = new THREE.Mesh(new THREE.BoxGeometry(wallThick, cabHeight, cabDepth), cabinetMat);
        rightWall.position.set(cabWidth / 2 - wallThick / 2, cabHeight / 2, 0);
        walls.add(rightWall);

        if (logoMat) {
            const logoLeft = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), logoMat);
            logoLeft.position.set(-cabWidth / 2 - 0.05, cabHeight / 2 + 2, 0);
            logoLeft.rotation.y = -Math.PI / 2;
            cabinetGroup.add(logoLeft);

            const logoRight = logoLeft.clone();
            logoRight.position.x = cabWidth / 2 + 0.05;
            logoRight.rotation.y = Math.PI / 2;
            cabinetGroup.add(logoRight);
        }

        const modulesGroup = new THREE.Group();
        modulesGroup.position.set(0.5, cabHeight / 2 - 2, cabDepth / 2 - 2.5);
        cabinetGroup.add(modulesGroup);

        const allBatteries: THREE.Group[] = [];
        const cols = 8; const rows = 6;
        const mSpacingX = 1.9; const mSpacingY = 2.4;
        const mWidth = 1.8; const mHeight = 2.2;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const mod = new THREE.Group();
                const posX = (i - (cols - 1) / 2) * mSpacingX;
                const posY = (j - (rows - 1) / 2) * mSpacingY;
                mod.position.set(posX, posY, 0);

                const mBody = new THREE.Mesh(new RoundedBoxGeometry(mWidth, mHeight, 0.6, 4, 0.05), moduleMat);
                mod.add(mBody);

                const indicator = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.2, 0.1), cellOrangeMat);
                indicator.position.z = 0.31;
                mod.add(indicator);

                if (dangerTex) {
                    const sym = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), dangerMat);
                    sym.position.set(-0.5, -0.7, 0.32);
                    mod.add(sym);
                }

                modulesGroup.add(mod);
                allBatteries.push(mod);
            }
        }

        const doorWidth = cabWidth / 2; const doorHeight = cabHeight; const doorDepth = 0.4;
        const leftDoorGroup = new THREE.Group();
        leftDoorGroup.position.set(-cabWidth / 2, cabHeight / 2, cabDepth / 2);
        cabinetGroup.add(leftDoorGroup);

        const rightDoorGroup = new THREE.Group();
        rightDoorGroup.position.set(cabWidth / 2, cabHeight / 2, cabDepth / 2);
        cabinetGroup.add(rightDoorGroup);

        const doorGeo = new RoundedBoxGeometry(doorWidth, doorHeight, doorDepth, 2, 0.1);
        const lMesh = new THREE.Mesh(doorGeo, cabinetMat); lMesh.position.x = doorWidth / 2; leftDoorGroup.add(lMesh);
        const rMesh = new THREE.Mesh(doorGeo, cabinetMat); rMesh.position.x = -doorWidth / 2; rightDoorGroup.add(rMesh);

        const rightDoorInner = new THREE.Mesh(new THREE.BoxGeometry(doorWidth - 0.2, doorHeight - 0.2, 0.1), doorInnerMat);
        rightDoorInner.position.set(-doorWidth / 2, 0, -doorDepth / 2);
        rightDoorGroup.add(rightDoorInner);

        // --- Details (Mockup additions) ---
        // Internal Cavity Backing
        const innerWidth = cabWidth - 1;
        const innerHeight = cabHeight - 1;
        const cavity = new THREE.Mesh(new THREE.PlaneGeometry(innerWidth, innerHeight), internalMat);
        cavity.position.set(0, cabHeight / 2, -cabDepth / 2 + wallThick + 0.1);
        cabinetGroup.add(cavity);

        // Control Panel Top
        const panelGroup = new THREE.Group();
        panelGroup.position.set(0.5, cabHeight - 2.8, cabDepth / 2 - 1);
        cabinetGroup.add(panelGroup);

        const centerPanel = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 0.2), internalMat);
        panelGroup.add(centerPanel);

        const centerScreen = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 0.15), screenMat);
        centerScreen.position.z = 0.12;
        panelGroup.add(centerScreen);

        const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 0.2), internalMat);
        leftPanel.position.set(-5, 0, 0);
        panelGroup.add(leftPanel);

        const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 0.2), internalMat);
        rightPanel.position.set(5, 0, 0);
        panelGroup.add(rightPanel);

        if (dangerTex) {
            const bigDanger = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), dangerMat);
            bigDanger.position.set(0.8, 0, 0.11);
            rightPanel.add(bigDanger);
        }

        // Cables
        const cableGroup = new THREE.Group();
        cableGroup.position.set(-cabWidth / 2 + 2, 0, cabDepth / 2 - 1.2);
        cabinetGroup.add(cableGroup);

        const curve1 = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, cabHeight - 1, 0),
            new THREE.Vector3(-0.5, cabHeight / 2 + 2, 0.2),
            new THREE.Vector3(0, 4, 0.5)
        ]);
        const cableGeo = new THREE.TubeGeometry(curve1, 20, 0.25, 8, false);
        const cableMesh = new THREE.Mesh(cableGeo, orangeCableMat);
        cableGroup.add(cableMesh);

        const cable2 = cableMesh.clone();
        cable2.position.set(0.6, 0, -0.2);
        cableGroup.add(cable2);

        // Wheels
        const wheelGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.8, 32);
        wheelGeo.rotateZ(Math.PI / 2);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
        const wheelsPos: [number, number, number][] = [
            [-cabWidth / 2 + 2.5, -0.5, cabDepth / 2 - 2],
            [cabWidth / 2 - 2.5, -0.5, cabDepth / 2 - 2],
            [-cabWidth / 2 + 2.5, -0.5, -cabDepth / 2 + 2.5],
            [cabWidth / 2 - 2.5, -0.5, -cabDepth / 2 + 2.5],
        ];
        wheelsPos.forEach(p => {
            const w = new THREE.Mesh(wheelGeo, wheelMat);
            w.position.set(...p);
            cabinetGroup.add(w);
        });

        // --- Animations ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1.5
            }
        });

        tl.to(leftDoorGroup.rotation, { y: -Math.PI * 0.8, ease: "power2.inOut" }, 0);
        tl.to(rightDoorGroup.rotation, { y: Math.PI * 0.8, ease: "power2.inOut" }, 0);

        allBatteries.forEach((bat) => {
            tl.to(bat.position, {
                z: 10 + Math.random() * 5, // Reduced explosion depth
                x: bat.position.x * 1.3,
                y: bat.position.y * 1.3,
                ease: "power1.inOut"
            }, 0.2);
        });

        tl.to(camera.position, { z: 45, y: 15, ease: "power2.inOut" }, 0); // Zoomed out end position

        let isVisible = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                // Performance: Disable ScrollTrigger when not in view
                ScrollTrigger.getAll().forEach(st => {
                    if (st.vars.trigger === containerRef.current) {
                        isVisible ? st.enable() : st.disable();
                    }
                });
            },
            { threshold: 0.05 }
        );
        observer.observe(containerRef.current);

        const clock = new THREE.Clock();
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            if (isVisible) {
                const t = clock.getElapsedTime();
                cellOrangeMat.emissiveIntensity = 1.0 + Math.sin(t * 3) * 0.4;
                controls.update();
                renderer.render(scene, camera);
            }
        };
        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
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
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="exploded-bess-cabinet" style={{ width: '100%', height: '800px', position: 'relative', overflow: 'hidden', background: '#02050a' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

            {/* HUD Overlay */}
            <div style={{
                position: 'absolute',
                top: '40px',
                left: '40px',
                pointerEvents: 'none',
                fontFamily: 'Orbitron, sans-serif',
                color: '#ff4500',
                zIndex: 10
            }}>
                <div style={{ fontSize: '12px', letterSpacing: '4px', opacity: 0.6 }}>SYSTEM_INSPECTION_MODE</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>CABINET_EXPLODED_VIEW</div>
            </div>
        </div>
    );
};

export default ExplodedBessCabinet;
