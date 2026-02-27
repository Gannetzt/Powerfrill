import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import gsap from 'gsap';
import { logoBase64 } from '../data/logoBase64';
import './HighFidelityBatteryPack.css';

const HighFidelityBatteryPack: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- Core Scene ---
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(40, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
        camera.position.set(16, 14, 28);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false; // Keep it cinematic
        controls.target.set(0, 0, 0);

        // --- Industrial Lighting ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 0.8);
        scene.add(hemiLight);

        const frontSpot = new THREE.SpotLight(0xffffff, 100, 60, 0.5, 0.5, 1);
        frontSpot.position.set(10, 25, 20);
        frontSpot.castShadow = true;
        scene.add(frontSpot);

        const topFill = new THREE.DirectionalLight(0xffffff, 0.6);
        topFill.position.set(0, 30, 0);
        scene.add(topFill);

        // --- Materials ---
        const colors = {
            gray: 0x4a4a4a,
            darkGray: 0x252525,
            silver: 0xaaaaaa,
            orange: 0xff6600,
            bolt: 0x888888
        };

        const topPlateMat = new THREE.MeshPhysicalMaterial({
            color: colors.gray,
            roughness: 0.4,
            metalness: 0.5,
            clearcoat: 0.1
        });

        const lowerCaseMat = new THREE.MeshPhysicalMaterial({
            color: colors.darkGray,
            roughness: 0.6,
            metalness: 0.3
        });

        const cellMat = new THREE.MeshPhysicalMaterial({
            color: colors.orange,
            emissive: colors.orange,
            emissiveIntensity: 1.5,
            roughness: 0.1,
            metalness: 0.8
        });

        const metalMat = new THREE.MeshStandardMaterial({
            color: colors.silver,
            metalness: 0.8,
            roughness: 0.2
        });

        const boltMat = new THREE.MeshStandardMaterial({
            color: colors.bolt,
            metalness: 0.9,
            roughness: 0.1
        });

        // --- Components ---
        const mainGroup = new THREE.Group();
        scene.add(mainGroup);

        // 1. Lower Tray
        const trayGeo = new RoundedBoxGeometry(10, 5, 6, 4, 0.1);
        const tray = new THREE.Mesh(trayGeo, lowerCaseMat);
        tray.position.y = -2.5;
        tray.receiveShadow = true;
        tray.castShadow = true;
        mainGroup.add(tray);

        // 2. Battery Cells Grid
        const cellGroup = new THREE.Group();
        mainGroup.add(cellGroup);

        const cellRows = 6;
        const cellCols = 8;
        const cellSpacing = 0.9;
        const cellBodyGeo = new THREE.CylinderGeometry(0.35, 0.35, 4, 16);
        const cellCapGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.1, 16);
        const cellCapMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.9, roughness: 0.1 });

        const cells: THREE.Group[] = [];
        for (let r = 0; r < cellRows; r++) {
            for (let c = 0; c < cellCols; c++) {
                const cell = new THREE.Group();
                const body = new THREE.Mesh(cellBodyGeo, cellMat);
                const cap = new THREE.Mesh(cellCapGeo, cellCapMat);
                cap.position.y = 2.05;
                cell.add(body);
                cell.add(cap);

                cell.position.x = (c - (cellCols - 1) / 2) * cellSpacing;
                cell.position.z = (r - (cellRows - 1) / 2) * cellSpacing;
                cell.userData = { originalY: 0, row: r, col: c };

                cellGroup.add(cell);
                cells.push(cell);
            }
        }

        // 3. Top Plate
        const topPlateGroup = new THREE.Group();
        topPlateGroup.position.y = 4.2;
        mainGroup.add(topPlateGroup);

        const plateGeo = new RoundedBoxGeometry(10.6, 0.2, 6.6, 2, 0.05);
        const plate = new THREE.Mesh(plateGeo, topPlateMat);
        topPlateGroup.add(plate);

        // Perimeter Bolts
        const boltGeo = new THREE.CylinderGeometry(0.08, 0.15, 0.15, 6); // Refined bolt shape
        const addPerimeterBolts = (parent: THREE.Group, y: number, w: number, d: number, countW: number, countD: number) => {
            // Front & Back
            for (let i = 0; i < countW; i++) {
                const x = -w / 2 + (i * w / (countW - 1));
                const b1 = new THREE.Mesh(boltGeo, boltMat);
                b1.position.set(x, y, -d / 2);
                parent.add(b1);
                const b2 = b1.clone();
                b2.position.z = d / 2;
                parent.add(b2);
            }
            // Sides
            for (let i = 1; i < countD - 1; i++) {
                const z = -d / 2 + (i * d / (countD - 1));
                const b1 = new THREE.Mesh(boltGeo, boltMat);
                b1.position.set(-w / 2, y, z);
                parent.add(b1);
                const b2 = b1.clone();
                b2.position.x = w / 2;
                parent.add(b2);
            }
        };
        addPerimeterBolts(topPlateGroup, 0.1, 10.2, 6.2, 10, 6);

        // Brackets
        const bracketGeo = new THREE.BoxGeometry(1.2, 0.05, 0.4);
        const bracketPositions = [
            [-3.5, 0.12, 3.1], [3.5, 0.12, 3.1],
            [-3.5, 0.12, -3.1], [3.5, 0.12, -3.1]
        ];
        bracketPositions.forEach(p => {
            const b = new THREE.Mesh(bracketGeo, metalMat);
            b.position.set(p[0], p[1], p[2]);
            topPlateGroup.add(b);
        });

        // Handle Refined
        const handleGroup = new THREE.Group();
        topPlateGroup.add(handleGroup);

        const handleClampGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 12, 1, false, 0, Math.PI);
        handleClampGeo.rotateX(Math.PI / 2);

        const hClampL = new THREE.Mesh(handleClampGeo, metalMat);
        hClampL.position.set(-2, 0.2, 0);
        handleGroup.add(hClampL);

        const hClampR = hClampL.clone();
        hClampR.position.x = 2;
        handleGroup.add(hClampR);

        const handlePath = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-2, 0.2, 0),
            new THREE.Vector3(-2, 1.4, 0),
            new THREE.Vector3(2, 1.4, 0),
            new THREE.Vector3(2, 0.2, 0)
        ]);
        const hGeo = new THREE.TubeGeometry(handlePath, 20, 0.18, 8, false);
        const hMesh = new THREE.Mesh(hGeo, metalMat);
        handleGroup.add(hMesh);

        // Control Box
        const cBoxGroup = new THREE.Group();
        cBoxGroup.position.set(3.8, 0.4, 1.8);
        topPlateGroup.add(cBoxGroup);
        const cBoxMesh = new THREE.Mesh(new RoundedBoxGeometry(2, 0.8, 2.2, 2, 0.05), lowerCaseMat);
        cBoxGroup.add(cBoxMesh);

        // Plugs & Cables
        const createCable = (offset: THREE.Vector3) => {
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(1, 0.5, 0.5),
                new THREE.Vector3(3, -1, 3)
            ]);
            const cGeo = new THREE.TubeGeometry(curve, 20, 0.1, 8, false);
            const cMesh = new THREE.Mesh(cGeo, new THREE.MeshStandardMaterial({ color: colors.orange }));
            const g = new THREE.Group();
            g.add(cMesh);
            g.position.copy(offset);
            return g;
        };
        cBoxGroup.add(createCable(new THREE.Vector3(1.2, 0, 0.45)));
        cBoxGroup.add(createCable(new THREE.Vector3(1.2, 0, -0.45)));

        // 4-Color Logo with Transparency
        if (logoBase64) {
            const logoMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9, depthWrite: false });

            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(image, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        // Soft threshold to remove white/light-grey background
                        if (r > 220 && g > 220 && b > 220) {
                            // Smooth alpha blending for edges
                            const avg = (r + g + b) / 3;
                            if (avg > 250) {
                                data[i + 3] = 0; // Fully transparent
                            } else {
                                data[i + 3] = Math.max(0, 255 - ((avg - 220) * (255 / 30)));
                            }
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    const tex = new THREE.CanvasTexture(canvas);
                    tex.colorSpace = THREE.SRGBColorSpace;
                    logoMat.map = tex;
                    logoMat.needsUpdate = true;
                }
            };
            image.src = "data:image/jpeg;base64," + logoBase64;

            const decalGeo = new THREE.PlaneGeometry(3.5, 1.16); // Aspect ratio adjusted slightly
            const decalMesh = new THREE.Mesh(decalGeo, logoMat);
            // Attach to the front face of the tray (depth 6 -> z = 3)
            decalMesh.position.set(0, 0, 3.01);
            tray.add(decalMesh);
        }

        // --- Animations ---
        const tl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            repeatDelay: 1.5
        });

        // Step 1: Plate lifts and tilts
        tl.to(topPlateGroup.position, { y: 14, duration: 2, ease: "power2.inOut" }, 0);
        tl.to(topPlateGroup.rotation, { x: 0.2, z: -0.1, duration: 2, ease: "power2.inOut" }, 0);

        // Step 2: Cells lift layer by layer
        const cellStagger = 0.05;
        cells.forEach((cell, i) => {
            tl.to(
                cell.position,
                {
                    y: 8,
                    duration: 2,
                    ease: "back.out(1.2)"
                },
                1.5 + (i * cellStagger)
            );
        });

        // Step 3: Energy Glow Intensity Increase
        tl.to(cellMat, { emissiveIntensity: 12, duration: 1, ease: "slow" }, 1);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            tl.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="hipack-visual-container">
            <div className="hipack-overlay">
                <div className="hipack-header">
                    <div className="hipack-title-block">
                        <h2>Series P-86 Module</h2>
                        <p>High-Density Architecture</p>
                    </div>
                    <div className="hipack-status">ACTIVE DISASSEMBLY</div>
                </div>
            </div>
            {/* Removed the 300vh trigger element since animation is autoplaying */}
        </div>
    );
};

export default HighFidelityBatteryPack;
