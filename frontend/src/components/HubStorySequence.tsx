import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { HubStoryFrame } from '../data/hubContent';

interface HubStorySequenceProps {
    frames: HubStoryFrame[];
}

export const HubStorySequence: React.FC<HubStorySequenceProps> = ({ frames }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameCount = frames.length;

    return (
        <div
            ref={containerRef}
            className="hub-immersive-sequence-v2"
            style={{
                height: `${frameCount * 200}vh`,
                position: 'relative'
            }}
        >
            <div className="sticky-viewport">
                {/* Background Cross-fade layer */}
                <div className="sequence-bg-layer">
                    {frames.map((frame, i) => {
                        const start = i / frameCount;
                        const end = (i + 1) / frameCount;

                        // Clean cross-fade
                        const opacity = useTransform(
                            scrollYProgress,
                            [start, start + 0.1, end - 0.1, end],
                            [0, 1, 1, 0]
                        );

                        return (
                            <motion.div
                                key={i}
                                className="sequence-bg-frame"
                                style={{
                                    opacity,
                                    zIndex: i
                                }}
                            >
                                <img
                                    src={frame.image}
                                    alt={frame.title}
                                    className="sequence-img"
                                />
                                <div className="sequence-overlay" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Narrative Content Layer - Aligned to HTML Reference */}
                <div className="sequence-content-layer">
                    {frames.map((frame, i) => {
                        const start = i / frameCount;
                        const end = (i + 1) / frameCount;

                        // Content timing
                        const opacity = useTransform(
                            scrollYProgress,
                            [start + 0.15, start + 0.35, end - 0.35, end - 0.15],
                            [0, 1, 1, 0]
                        );
                        const y = useTransform(
                            scrollYProgress,
                            [start + 0.15, start + 0.35, end - 0.35, end - 0.15],
                            [30, 0, 0, -30]
                        );

                        return (
                            <motion.div
                                key={i}
                                className={`chapter ch-center`}
                                style={{
                                    opacity,
                                    y,
                                    position: 'absolute',
                                    pointerEvents: 'none'
                                }}
                            >
                                <div className="ch-eyebrow">CHAPTER 0{i + 1} // ENGINEERING NARRATIVE</div>
                                <h3 className="ch-title">{frame.title}</h3>
                                <p className="ch-body">{frame.description}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Minimal Navigation Aids */}
                <div className="sequence-hud-layer">
                    <motion.div
                        className="sequence-scroll-hint"
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.02], [1, 0]) }}
                    >
                        <span>SCROLL</span>
                        <div className="hint-line" />
                    </motion.div>

                    <div className="chapter-dots-v2">
                        {frames.map((_, i) => {
                            const start = i / frameCount;
                            const end = (i + 1) / frameCount;
                            // Active dot logic based on scroll
                            return (
                                <Dot
                                    key={i}
                                    active={useTransform(scrollYProgress, [start, end], [1, 0])}
                                    progress={scrollYProgress}
                                    index={i}
                                    total={frameCount}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dot: React.FC<{ progress: any, index: number, total: number, active: any }> = ({ progress, index, total }) => {


    // Simplified dot for state
    return (
        <div className="dot-wrap">
            <motion.div
                className="dot"
                style={{
                    backgroundColor: useTransform(progress,
                        [(index / total), (index / total) + 0.01, ((index + 1) / total) - 0.01, (index + 1) / total],
                        ['rgba(255,255,255,0.2)', 'var(--orange)', 'var(--orange)', 'rgba(255,255,255,0.2)']
                    ),
                    boxShadow: useTransform(progress,
                        [(index / total), (index / total) + 0.01, ((index + 1) / total) - 0.01, (index + 1) / total],
                        ['none', '0 0 10px var(--orange)', '0 0 10px var(--orange)', 'none']
                    ),
                    scale: useTransform(progress,
                        [(index / total), (index / total) + 0.01, ((index + 1) / total) - 0.01, (index + 1) / total],
                        [1, 1.5, 1.5, 1]
                    )
                }}
            />
        </div>
    );
};
