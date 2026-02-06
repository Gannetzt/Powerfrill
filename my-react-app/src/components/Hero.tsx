import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SideNav from './SideNav';
import './Hero.css';

const sections = [
    {
        id: 'bess',
        title: 'BESS',
        subtitle: 'Battery Energy Storage System',
        content: 'Grid-scale battery solutions for reliable, sustainable energy storage and distribution.',
        image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1920'
    },
    {
        id: 'application',
        title: 'Application',
        subtitle: 'Power Solutions',
        content: 'From renewable integration to peak shaving, our batteries power diverse applications.',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1920'
    },
    {
        id: 'innovation',
        title: 'Innovation',
        subtitle: 'Next-Gen Technology',
        content: 'Cutting-edge lithium-ion and solid-state battery innovations for maximum efficiency.',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920'
    },
    {
        id: 'about',
        title: 'About',
        subtitle: 'Our Mission',
        content: 'Powering a cleaner future through advanced energy storage technology.',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920'
    },
    {
        id: 'contact',
        title: 'Contact',
        subtitle: 'Get Connected',
        content: 'Partner with us to transform your energy infrastructure.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920'
    }
];

const PREMIUM_EASE = [0.22, 1, 0.36, 1];

interface AnimatedSectionProps {
    section: typeof sections[0];
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ section, containerRef }) => {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        container: containerRef,
        offset: ["start end", "start start"]
    });

    // Scale-down background parallax (1.1 -> 1.0)
    const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

    return (
        <section id={section.id} ref={ref} className="hero-sub-section">
            <motion.div
                className="section-bg-parallax"
                style={{
                    backgroundImage: `url(${section.image})`,
                    scale: bgScale,
                    opacity: bgOpacity
                }}
            />
            <div className="section-overlay" />

            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{
                        duration: 1.2,
                        ease: PREMIUM_EASE
                    }}
                >
                    <h1 className="hero-title">{section.title}</h1>
                    <p className="hero-subtitle">{section.content}</p>
                    <div className="hero-actions">
                        <button className="btn btn-primary btn-lg">Learn More</button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="hero-container-main" ref={containerRef}>
            <SideNav containerRef={containerRef} />
            {sections.map((section) => (
                <AnimatedSection
                    key={section.id}
                    section={section}
                    containerRef={containerRef}
                />
            ))}
        </div>
    );
};

export default Hero;
