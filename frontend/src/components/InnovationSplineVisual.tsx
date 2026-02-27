import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';

const InnovationSplineVisual: React.FC = () => {
    const splineRef = useRef<any>(null);

    function onLoad(spline: any) {
        splineRef.current = spline;
        // Ensure transparency
        if (spline._scene) {
            spline.setBackgroundColor('transparent');
        }

        // --- Industrial Recoloring ---
        try {
            // Body -> Corporate Orange
            ['Battery', 'Cube', 'Shell', 'Casing', 'Outer', 'Case'].forEach(name => {
                const obj = spline.findObjectByName(name);
                if (obj) obj.color = '#ff6600';
            });

            // Core Cells -> Industrial Gray
            ['Cell', 'Inner', 'Module', 'Stack', 'Core'].forEach(name => {
                const obj = spline.findObjectByName(name);
                if (obj) obj.color = '#888888';
            });

            // Logo -> Corporate Teal
            ['Logo', 'P', 'Lightning', 'Icon', 'Bolt'].forEach(name => {
                const obj = spline.findObjectByName(name);
                if (obj) obj.color = '#00e5ff';
            });

            // Speed up animation
            if (spline.setVariable) {
                spline.setVariable('Speed', 2.0);
                spline.setVariable('AnimationSpeed', 2.5);
            }
        } catch (e) {
            console.log('Spline initialization failed');
        }
    }

    return (
        <div className="innovation-spline-frame" style={{ width: '100%', height: '500px', position: 'relative', overflow: 'hidden' }}>
            <div className="innovation-visual-overlay" style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none',
                zIndex: 1
            }} />

            <Spline
                scene="https://prod.spline.design/S2WLN3I28R4v6W4q/scene.splinecode"
                onLoad={onLoad}
                style={{ background: 'transparent' }}
            />

            {/* Technical HUD Overlay on Spline */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                textAlign: 'right',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '10px',
                color: '#ff6600',
                letterSpacing: '2px',
                zIndex: 2
            }}>
                <div style={{ opacity: 0.6 }}>CORE_ANIM_ENGINE</div>
                <div style={{ fontWeight: 'bold' }}>PROCEDURAL_MAPPING_V4</div>
            </div>
        </div>
    );
};

export default InnovationSplineVisual;
