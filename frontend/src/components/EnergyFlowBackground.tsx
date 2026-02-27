import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface EnergyFlowBackgroundProps {
    activeChapter: number;
}

const EnergyFlowBackground: React.FC<EnergyFlowBackgroundProps> = ({ activeChapter }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<{
        renderer: THREE.WebGLRenderer;
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        clock: THREE.Clock;
        solarGroup: THREE.Group;
        batteryGroup: THREE.Group;
        bessGroup: THREE.Group;
        gridGroup: THREE.Group;
        evGroup: THREE.Group;
        solarLight: THREE.PointLight;
        batteryLight: THREE.PointLight;
        bessLight: THREE.PointLight;
        gridLight: THREE.PointLight;
        evLight: THREE.PointLight;
        solarCellMats: THREE.MeshStandardMaterial[];
        battRingMats: THREE.MeshStandardMaterial[];
        bessDispMats: THREE.MeshStandardMaterial[];
        pylonWarnMats: THREE.MeshStandardMaterial[];
        evEntities: { group: THREE.Group; baseY: number; wheels: THREE.Mesh[] }[];
        sun: THREE.DirectionalLight;
        fillLight: THREE.PointLight;
        tgtCam: THREE.Vector3;
        tgtLook: THREE.Vector3;
        curCam: THREE.Vector3;
        curLook: THREE.Vector3;
    } | null>(null);

    const C = useMemo(() => ({
        solar: 0x00FFBB,    // Emerald Cyber
        battery: 0x00FFD5,  // Cyan energy
        bess: 0x7000FF,     // Power Purple
        grid: 0xFF5E00,     // High Voltage Orange
        ev: 0xA259FF,       // EV Violet
        bg: 0x000000,       // Global Black Match
        accent: 0xFFD700    // Gold highlight
    }), []);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(C.bg, 0.02); // Reduced fog density for cleaner deep black

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 300);
        camera.position.set(0, 5, 18);

        // Lights
        scene.add(new THREE.AmbientLight(0x111827, 1.2));
        const sun = new THREE.DirectionalLight(0xFFE0A0, 2);
        sun.position.set(10, 20, 5);
        sun.castShadow = true;
        sun.shadow.mapSize.set(1024, 1024);
        scene.add(sun);

        const fillLight = new THREE.PointLight(0x00CFFF, 1.5, 50);
        fillLight.position.set(-10, 5, 0);
        scene.add(fillLight);

        // Ground
        const groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(140, 140),
            new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9, metalness: 0.1 })
        );
        groundMesh.rotation.x = -Math.PI / 2;
        groundMesh.position.y = -3;
        groundMesh.receiveShadow = true;
        scene.add(groundMesh);

        const gridHelper = new THREE.GridHelper(140, 70, 0x0d2035, 0x0d2035);
        gridHelper.position.y = -2.99;
        scene.add(gridHelper);

        // Stars
        const starPos = [];
        for (let i = 0; i < 2000; i++) starPos.push((Math.random() - .5) * 220, Math.random() * 80 + 10, (Math.random() - .5) * 220);
        const starGeo = new THREE.BufferGeometry();
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
        const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.7 }));
        scene.add(stars);

        // Helpers
        const mkMat = (col: number, emCol?: number, emInt?: number, rough?: number, metal?: number) => new THREE.MeshStandardMaterial({
            color: col,
            emissive: emCol !== undefined ? emCol : col,
            emissiveIntensity: emInt !== undefined ? emInt : 0,
            roughness: rough !== undefined ? rough : 0.5,
            metalness: metal !== undefined ? metal : 0.6
        });

        // SOLAR WIDGET
        const solarGroup = new THREE.Group();
        const solarCellMats: THREE.MeshStandardMaterial[] = [];
        scene.add(solarGroup);
        const buildSolarPanel = (px: number, pz: number) => {
            const g = new THREE.Group();
            g.add(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.5), mkMat(0x0a1a2a, 0x0a1a2a, 0, 0.4, 0.8)));
            for (let ci = 0; ci < 6; ci++) for (let cj = 0; cj < 4; cj++) {
                const mat = mkMat(0x001a44, 0x00FFBB, 0.4, 0.2, 0.9);
                solarCellMats.push(mat);
                const cell = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.05, 0.32), mat);
                cell.position.set(-1.0 + ci * 0.4, 0.07, -0.55 + cj * 0.37);
                g.add(cell);
            }
            const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 1.2, 8), mkMat(0x202a3a, 0x202a3a, 0, 0.6, 0.7));
            stand.position.set(0, -0.7, 0);
            g.add(stand);
            g.rotation.x = -Math.PI * 0.22;
            g.position.set(px, -2.2, pz);
            return g;
        };
        [[-4, -5], [-1.5, -5], [1, -5], [3.5, -5]].forEach(([x, z]) => solarGroup.add(buildSolarPanel(x, z)));
        solarGroup.position.set(12, 0, 0); // Move to Right
        const solarLight = new THREE.PointLight(C.solar, 0, 22);
        solarLight.position.set(12, 2, -6);
        scene.add(solarLight);

        // BATTERY WIDGET
        const batteryGroup = new THREE.Group();
        const battRingMats: THREE.MeshStandardMaterial[] = [];
        batteryGroup.position.set(12, 0, 3); // Shift right for text clarity
        scene.add(batteryGroup);
        const buildBatteryCell = (px: number, py: number, pz: number) => {
            const g = new THREE.Group();
            g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.2, 16), mkMat(0x111a11, 0x111a11, 0, 0.3, 0.95)));
            const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.06, 16), mkMat(C.battery, C.battery, 0.8, 0.2, 0.8));
            cap.position.set(0, 0.63, 0);
            g.add(cap);
            const ringMat = mkMat(C.battery, C.battery, 1.2, 0.1, 0.5);
            battRingMats.push(ringMat);
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.015, 8, 32), ringMat);
            ring.rotation.x = Math.PI / 2;
            ring.position.set(0, 0.3, 0);
            g.add(ring);
            g.position.set(px, py, pz);
            return g;
        };
        for (let bx = 0; bx < 4; bx++) for (let bz = 0; bz < 3; bz++) batteryGroup.add(buildBatteryCell(-2 + bx * 0.7, -2 + bz * 1.4, 0));
        const batteryLight = new THREE.PointLight(C.battery, 0, 20);
        batteryLight.position.set(12, 2, 3);
        scene.add(batteryLight);

        // BESS WIDGET
        const bessGroup = new THREE.Group();
        const bessDispMats: THREE.MeshStandardMaterial[] = [];
        bessGroup.position.set(-8, 0, 0); // Shift left
        scene.add(bessGroup);
        const buildBESSUnit = (px: number, pz: number) => {
            const g = new THREE.Group();
            g.add(new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.8, 1.4), mkMat(0x0a1525, 0x0a1525, 0, 0.4, 0.7)));
            const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.52, 0.15, 1.42), mkMat(C.bess, C.bess, 0.6, 0.2, 0.5));
            stripe.position.set(0, 0.85, 0);
            g.add(stripe);
            for (let v = 0; v < 7; v++) {
                const vent = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 1.42), mkMat(0x050810, 0x050810, 0, 0.8, 0.3));
                vent.position.set(-1.35 + v * 0.45, -0.2, 0);
                g.add(vent);
            }
            const dMat = mkMat(C.bess, C.bess, 1.5, 0.1, 0.3);
            bessDispMats.push(dMat);
            const disp = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.55, 0.05), dMat);
            disp.position.set(0, 0.25, 0.73);
            g.add(disp);
            g.position.set(px, -2.1, pz);
            return g;
        };
        [[-2.5, 0], [2.5, 0]].forEach(([x, z]) => bessGroup.add(buildBESSUnit(x, z)));
        const bessLight = new THREE.PointLight(C.bess, 0, 22);
        bessLight.position.set(12, 1, 0);
        scene.add(bessLight);

        // GRID WIDGET
        const gridGroup = new THREE.Group();
        const pylonWarnMats: THREE.MeshStandardMaterial[] = [];
        gridGroup.position.set(10, 0, 0); // Shift right
        scene.add(gridGroup);
        const buildPylon = (px: number, pz: number) => {
            const g = new THREE.Group();
            g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.15, 6, 6), mkMat(0x1a2a1a, 0x1a2a1a, 0, 0.5, 0.8)));
            for (let i = 0; i < 2; i++) {
                const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.2, 6), mkMat(0x1a2a1a, 0x1a2a1a, 0, 0.5, 0.8));
                arm.rotation.z = Math.PI / 2;
                arm.position.set(0, 2.0 - i * 1.5, 0);
                g.add(arm);
            }
            const wMat = mkMat(C.grid, C.grid, 2.0, 0.1, 0.3);
            pylonWarnMats.push(wMat);
            const warn = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), wMat);
            warn.position.set(0, 3.1, 0);
            g.add(warn);
            g.position.set(px, 1, pz);
            return g;
        };
        const pylonXZ = [[-6, 5], [0, 5], [6, 5]];
        pylonXZ.forEach(([x, z]) => gridGroup.add(buildPylon(x, z)));
        const gridLight = new THREE.PointLight(C.grid, 0, 25);
        gridLight.position.set(12, 3, 5);
        scene.add(gridLight);

        // EV WIDGET
        const evGroup = new THREE.Group();
        const evEntities: { group: THREE.Group; baseY: number; wheels: THREE.Mesh[] }[] = [];
        evGroup.position.set(-8, 0, 0); // Shift left
        scene.add(evGroup);
        const buildEV = (px: number, pz: number, color: number) => {
            const g = new THREE.Group();
            const wheels: THREE.Mesh[] = [];
            g.add(new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.7, 1.3), mkMat(color, color, 0.1, 0.3, 0.8)));
            const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.55, 1.2), mkMat(0x02050a, 0x02050a, 0, 0.1, 0.2));
            cabin.position.set(-0.1, 0.7, 0); g.add(cabin);
            const ws = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.44, 1.1), mkMat(0x3366ff, 0x00aaff, 0.5, 0.1, 0.3));
            ws.position.set(0.72, 0.67, 0); g.add(ws);
            for (const [wx, wy, wz] of [[1, 0, 0.72], [1, 0, -0.72], [-1, 0, 0.72], [-1, 0, -0.72]]) {
                const whl = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 16), mkMat(0x050505, 0x050505, 0, 0.8, 0.4));
                whl.rotation.z = Math.PI / 2;
                whl.position.set(wx, wy - 0.06, wz);
                g.add(whl); wheels.push(whl);
            }
            const baseY = -1.95;
            g.position.set(px, baseY, pz);
            return { group: g, baseY, wheels };
        };
        [[-4, -2], [0, -2], [4, -2]].forEach(([x, z], i) => {
            const ent = buildEV(x, z, [C.ev, 0x00FFBB, 0x7000FF][i % 3]);
            evGroup.add(ent.group); evEntities.push(ent);
        });
        const evLight = new THREE.PointLight(C.ev, 0, 25);
        evLight.position.set(12, 2, -2);
        scene.add(evLight);


        sceneRef.current = {
            renderer, scene, camera, clock: new THREE.Clock(),
            solarGroup, batteryGroup, bessGroup, gridGroup, evGroup,
            solarLight, batteryLight, bessLight, gridLight, evLight,
            solarCellMats, battRingMats, bessDispMats, pylonWarnMats,
            evEntities, sun, fillLight,
            tgtCam: new THREE.Vector3(0, 5, 18),
            tgtLook: new THREE.Vector3(0, 0, 0),
            curCam: new THREE.Vector3(0, 5, 18),
            curLook: new THREE.Vector3(0, 0, 0)
        };

        const animate = () => {
            if (!sceneRef.current) return;
            const s = sceneRef.current;
            const t = s.clock.getElapsedTime();

            s.curCam.lerp(s.tgtCam, 0.03);
            s.curLook.lerp(s.tgtLook, 0.03);
            s.camera.position.copy(s.curCam);
            s.camera.lookAt(s.curLook);

            if (s.solarGroup.visible) {
                s.solarCellMats.forEach((m, i) => m.emissiveIntensity = 0.2 + 0.3 * Math.sin(t * 2 + i * 0.25));
                s.solarLight.intensity = (s.solarLight.intensity * 0.95) + (s.solarLight.intensity > 1 ? (1.5 + 0.5 * Math.sin(t * 1.5)) * 0.05 : 0);
            }
            if (s.batteryGroup.visible) {
                s.battRingMats.forEach((m, i) => m.emissiveIntensity = 0.8 + 0.7 * Math.sin(t * 3 + i * 0.4));
            }
            if (s.evGroup.visible) {
                s.evEntities.forEach((ev, i) => {
                    ev.group.position.y = ev.baseY + 0.06 * Math.sin(t * 1.5 + i * 0.8);
                    ev.wheels.forEach(w => w.rotation.x += 0.05);
                });
            }

            s.sun.position.set(10 * Math.cos(t * 0.05), 15 + 5 * Math.sin(t * 0.03), 5);

            s.renderer.render(s.scene, s.camera);
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    useEffect(() => {
        if (!sceneRef.current) return;
        const s = sceneRef.current;
        const chapters = [
            { cp: [6, 6, 22], cl: [12, 0, -6], show: [s.solarGroup], li: [s.solarLight], fog: 0x000000, sunC: 0x00FFBB },
            { cp: [8, 5, 20], cl: [12, 0, 3], show: [s.batteryGroup], li: [s.batteryLight], fog: 0x000000, sunC: 0x00FFD5 },
            { cp: [6, 7, 20], cl: [12, 0, 0], show: [s.bessGroup], li: [s.bessLight], fog: 0x000000, sunC: 0x7000FF },
            { cp: [8, 9, 26], cl: [12, 2, 5], show: [s.gridGroup], li: [s.gridLight], fog: 0x000000, sunC: 0xFF5E00 },
            { cp: [6, 4, 18], cl: [12, 0, -2], show: [s.evGroup], li: [s.evLight], fog: 0x000000, sunC: 0xA259FF },
            { cp: [0, 18, 40], cl: [0, 0, 0], show: [s.solarGroup, s.batteryGroup, s.bessGroup, s.gridGroup, s.evGroup], li: [s.solarLight, s.batteryLight, s.bessLight, s.gridLight, s.evLight], fog: 0x000000, sunC: 0xFFFFFF },
        ];

        const ch = chapters[activeChapter] || chapters[0];
        s.tgtCam.set(ch.cp[0], ch.cp[1], ch.cp[2]);
        s.tgtLook.set(ch.cl[0], ch.cl[1], ch.cl[2]);

        [s.solarGroup, s.batteryGroup, s.bessGroup, s.gridGroup, s.evGroup].forEach(g => {
            g.visible = ch.show.includes(g);
        });

        [s.solarLight, s.batteryLight, s.bessLight, s.gridLight, s.evLight].forEach(l => {
            gsap.to(l, { intensity: ch.li.includes(l) ? 3 : 0, duration: 1 });
        });

        s.scene.fog!.color.setHex(ch.fog);
        s.sun.color.setHex(ch.sunC);
    }, [activeChapter]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

export default EnergyFlowBackground;
