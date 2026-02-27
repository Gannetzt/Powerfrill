import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Define materials inside or as helper objects to avoid early initialization issues
const COLORS = {
    gray: 0x4a4a4a,
    darkGray: 0x252525,
    silver: 0xaaaaaa,
    orange: 0xff6600,
    bolt: 0x888888
};

const Batteries = () => {
    const cellRows = 6;
    const cellCols = 8;
    const cellSpacing = 0.9;

    const cellMat = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: COLORS.orange,
        emissive: COLORS.orange,
        emissiveIntensity: 2.5,
        roughness: 0.1,
        metalness: 0.8
    }), []);

    const cellCapMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        metalness: 0.9,
        roughness: 0.1
    }), []);

    // Create an array of positions
    const positions = useMemo(() => {
        const pos = [];
        for (let r = 0; r < cellRows; r++) {
            for (let c = 0; c < cellCols; c++) {
                const x = (c - (cellCols - 1) / 2) * cellSpacing;
                const z = (r - (cellRows - 1) / 2) * cellSpacing;
                pos.push({ x, z, key: `cell-${r}-${c}` });
            }
        }
        return pos;
    }, []);

    return (
        <group>
            {positions.map((p) => (
                <group key={p.key} position={[p.x, 0, p.z]}>
                    <mesh material={cellMat}>
                        <cylinderGeometry args={[0.35, 0.35, 4, 16]} />
                    </mesh>
                    <mesh position={[0, 2.05, 0]} material={cellCapMat}>
                        <cylinderGeometry args={[0.25, 0.25, 0.1, 16]} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

const Bolts = ({ width, depth, countW, countD, y }: { width: number, depth: number, countW: number, countD: number, y: number }) => {
    const boltGeo = useMemo(() => new THREE.CylinderGeometry(0.08, 0.08, 0.15, 6), []);
    const boltMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: COLORS.bolt,
        metalness: 0.9,
        roughness: 0.1
    }), []);

    const positions = useMemo(() => {
        const pos = [];
        // Front & Back
        for (let i = 0; i < countW; i++) {
            const x = -width / 2 + (i * width / (countW - 1));
            pos.push([x, y, -depth / 2]);
            pos.push([x, y, depth / 2]);
        }
        // Sides
        for (let i = 1; i < countD - 1; i++) {
            const z = -depth / 2 + (i * depth / (countD - 1));
            pos.push([-width / 2, y, z]);
            pos.push([width / 2, y, z]);
        }
        return pos;
    }, [width, depth, countW, countD, y]);

    return (
        <group>
            {positions.map((p, i) => (
                <mesh key={i} geometry={boltGeo} material={boltMat} position={p as [number, number, number]} />
            ))}
        </group>
    );
};

const IndustrialPlug = ({ offsetZ, rotationY = 0 }: { offsetZ: number, rotationY?: number }) => {
    const groupRef = useRef<THREE.Group>(null);

    const metalMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: COLORS.silver,
        metalness: 0.8,
        roughness: 0.2
    }), []);

    const lowerCaseMat = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: COLORS.darkGray,
        roughness: 0.6,
        metalness: 0.3
    }), []);

    const curve = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 0.5, 0.5),
        new THREE.Vector3(3, -1, 3)
    ]), []);

    const plugBodyGeo = useMemo(() => new THREE.CylinderGeometry(0.2, 0.2, 0.6, 12), []);
    const plugHeadGeo = useMemo(() => new THREE.BoxGeometry(0.4, 0.4, 0.8), []);
    const cableMat = useMemo(() => new THREE.MeshStandardMaterial({ color: COLORS.orange }), []);

    // Set orientation on mount
    useFrame(() => {
        if (groupRef.current && groupRef.current.children.length > 1) {
            const plugGroup = groupRef.current.children[1] as THREE.Group;
            const endPoint = curve.getPoint(1);
            const tangent = curve.getTangent(1);
            plugGroup.position.copy(endPoint);

            const quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);
            plugGroup.quaternion.copy(quaternion);
        }
    });

    return (
        <group position={[1.2, 0, offsetZ]} rotation={[0, rotationY, 0]}>
            <mesh material={cableMat}>
                <tubeGeometry args={[curve, 20, 0.1, 8, false]} />
            </mesh>
            <group ref={groupRef}>
                {/* Dummy group for hook referencing, proper plug inside */}
                <group>
                    <mesh geometry={plugBodyGeo} material={metalMat} rotation={[0, 0, Math.PI / 2]} />
                    <mesh geometry={plugHeadGeo} material={lowerCaseMat} position={[0.6, 0, 0]} />
                </group>
            </group>
        </group>
    );
};

const Handle = () => {
    const metalMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: COLORS.silver,
        metalness: 0.8,
        roughness: 0.2
    }), []);

    const handleClampGeo = useMemo(() => {
        const geo = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 12, 1, false, 0, Math.PI);
        geo.rotateX(Math.PI / 2);
        return geo;
    }, []);

    const curve = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2, 0.2, 0),
        new THREE.Vector3(-2, 1.4, 0),
        new THREE.Vector3(2, 1.4, 0),
        new THREE.Vector3(2, 0.2, 0)
    ]), []);

    return (
        <group>
            <mesh geometry={handleClampGeo} material={metalMat} position={[-2, 0.2, 0]} />
            <mesh geometry={handleClampGeo} material={metalMat} position={[2, 0.2, 0]} />
            <mesh material={metalMat}>
                <tubeGeometry args={[curve, 20, 0.18, 8, false]} />
            </mesh>
        </group>
    );
};


export interface BatteryModuleRef {
    tray: THREE.Mesh | null;
    topPlate: THREE.Group | null;
    cells: THREE.Group | null;
}

export const BatteryModuleInner = React.forwardRef<BatteryModuleRef, any>((props, ref) => {
    // References for animations
    const trayRef = useRef<THREE.Mesh>(null);
    const topPlateRef = useRef<THREE.Group>(null);
    const cellGroupRef = useRef<THREE.Group>(null);

    // Materials inside to avoid initialization issues
    const topPlateMat = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: COLORS.gray,
        roughness: 0.4,
        metalness: 0.5,
        clearcoat: 0.1
    }), []);

    const lowerCaseMat = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: COLORS.darkGray,
        roughness: 0.6,
        metalness: 0.3
    }), []);

    const metalMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: COLORS.silver,
        metalness: 0.8,
        roughness: 0.2
    }), []);

    // Load Logo Texture - This requires a Suspense boundary in the parent!
    const logoTexture = useLoader(THREE.TextureLoader, '/assets/powerfrill-logo.png');

    // Forward ref
    React.useImperativeHandle(ref, () => ({
        tray: trayRef.current,
        topPlate: topPlateRef.current,
        cells: cellGroupRef.current
    }));

    return (
        <group {...props}>
            {/* 1. Lower Tray */}
            <RoundedBox ref={trayRef as any} args={[10, 5, 6]} radius={0.1} smoothness={4} material={lowerCaseMat} position={[0, -2.5, 0]} receiveShadow castShadow />

            {/* 2. Battery Cells Grid */}
            <group ref={cellGroupRef as any}>
                <Batteries />
            </group>

            {/* 3. Top Plate Group */}
            <group ref={topPlateRef as any} position={[0, 4.2, 0]}>
                <RoundedBox args={[10.6, 0.2, 6.6]} radius={0.05} smoothness={2} material={topPlateMat} />

                {/* Logo on Top Plate */}
                <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[4, 1.5]} />
                    <meshStandardMaterial
                        map={logoTexture}
                        transparent={true}
                        roughness={0.2}
                        metalness={0.5}
                        polygonOffset={true}
                        polygonOffsetFactor={-4}
                    />
                </mesh>

                <Bolts width={10.2} depth={6.2} countW={10} countD={6} y={0.1} />

                {/* Perimeter Brackets */}
                <mesh material={metalMat} position={[-3.5, 0.12, 3.1]}>
                    <boxGeometry args={[1.2, 0.05, 0.4]} />
                </mesh>
                <mesh material={metalMat} position={[3.5, 0.12, 3.1]}>
                    <boxGeometry args={[1.2, 0.05, 0.4]} />
                </mesh>
                <mesh material={metalMat} position={[-3.5, 0.12, -3.1]}>
                    <boxGeometry args={[1.2, 0.05, 0.4]} />
                </mesh>
                <mesh material={metalMat} position={[3.5, 0.12, -3.1]}>
                    <boxGeometry args={[1.2, 0.05, 0.4]} />
                </mesh>

                {/* Handle Refined */}
                <Handle />

                {/* Control Box & Industrial Plugs */}
                <group position={[3.8, 0.4, 1.8]}>
                    <RoundedBox args={[2, 0.8, 2.2]} radius={0.05} smoothness={2} material={lowerCaseMat} />

                    {/* Ports */}
                    <mesh material={metalMat} position={[1, 0, 0.45]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
                    </mesh>
                    <mesh material={metalMat} position={[1, 0, -0.45]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
                    </mesh>

                    {/* Plugs and Cables */}
                    <IndustrialPlug offsetZ={0.45} />
                    <IndustrialPlug offsetZ={-0.45} rotationY={0.2} />
                </group>
            </group>
        </group>
    );
});
