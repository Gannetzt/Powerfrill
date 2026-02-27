import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import './InnovationSplineVisual.css';

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
        <div className="innovation-spline-frame">
            <div className="innovation-visual-overlay" />

            <Spline
                scene="https://prod.spline.design/S2WLN3I28R4v6W4q/scene.splinecode"
                onLoad={onLoad}
                style={{ background: 'transparent' }}
            />

            {/* Technical HUD Overlay on Spline */}
            <div className="innovation-hud">
                <div className="innovation-hud-label">CORE_ANIM_ENGINE</div>
                <div className="innovation-hud-value">PROCEDURAL_MAPPING_V4</div>
            </div>
        </div>
    );
};

export default InnovationSplineVisual;
