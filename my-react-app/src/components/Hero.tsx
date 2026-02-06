import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import SideNav from './SideNav';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const sections = [
    {
        id: 'bess',
        number: '01',
        title: 'BESS',
        subtitle: 'Battery Energy Storage',
        content: 'Grid-scale solutions for a sustainable energy future.',
        image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1920',
        midImage: 'https://images.unsplash.com/photo-1548332965-211a68ba2c82?w=1000' // Mid layer accent
    },
    {
        id: 'application',
        number: '02',
        title: 'APPLICATION',
        subtitle: 'Power Anywhere',
        content: 'From microgrids to industrial complexes, we power the world.',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920',
        midImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000'
    },
    {
        id: 'innovation',
        number: '03',
        title: 'INNOVATION',
        subtitle: 'Next-Gen Tech',
        content: 'Pushing the boundaries of solid-state storage.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920',
        midImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000'
    },
    {
        id: 'about',
        number: '04',
        title: 'ABOUT',
        subtitle: 'Our Legacy',
        content: 'Driven by excellence and mechanical precision.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920',
        midImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1000'
    },
    {
        id: 'contact',
        number: '05',
        title: 'CONTACT',
        subtitle: 'Join Us',
        content: 'Partner with the leaders in clean energy infrastructure.',
        image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1920',
        midImage: 'https://images.unsplash.com/photo-1557426282-08ee02bd5044?w=1000'
    }
];

const Hero: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollRef.current) return;

        // Initialize Locomotive Scroll v5
        const locoScroll = new LocomotiveScroll();

        // Horizontal Parallax & 3D Transitions
        const sectionsEl = gsap.utils.toArray('.hero-sub-section');

        sectionsEl.forEach((section: any) => {
            const bg = section.querySelector('.bg-layer');
            const mid = section.querySelector('.mid-layer');
            const title = section.querySelector('.hero-title');

            // Background Parallax
            gsap.to(bg, {
                x: '-15%',
                scrollTrigger: {
                    trigger: section,
                    start: 'left right',
                    end: 'right left',
                    scrub: true,
                    horizontal: true
                }
            });

            // Mid-range Parallax
            gsap.to(mid, {
                x: '10%',
                scrollTrigger: {
                    trigger: section,
                    start: 'left right',
                    end: 'right left',
                    scrub: true,
                    horizontal: true
                }
            });

            // 3D Perspective Animation
            gsap.fromTo(section,
                { rotateY: 10, opacity: 0, scale: 0.95 },
                {
                    rotateY: 0, opacity: 1, scale: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'left right',
                        end: 'left left',
                        scrub: 1,
                        horizontal: true
                    }
                }
            );

            // Staggered Title Letters
            if (title) {
                const text = title.innerText;
                title.innerHTML = '';
                text.split('').forEach((char: string) => {
                    const span = document.createElement('span');
                    span.innerText = char;
                    span.style.display = 'inline-block';
                    if (char === ' ') span.style.width = '2rem';
                    title.appendChild(span);
                });

                gsap.from(title.querySelectorAll('span'), {
                    y: 100,
                    opacity: 0,
                    stagger: 0.03,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: section,
                        start: 'left 80%',
                        horizontal: true
                    }
                });
            }
        });

        return () => {
            locoScroll.destroy();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="hero-viewport" ref={containerRef}>
            <div className="scroll-wrapper" ref={scrollRef}>
                <div className="hero-horizontal-container">
                    <SideNav containerRef={containerRef} />
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            id={section.id}
                            className="hero-sub-section"
                        >
                            {/* Layered Parallax Background */}
                            <div className="parallax-layer bg-layer" style={{ backgroundImage: `url(${section.image})` }} />
                            <div className="parallax-layer mid-layer" style={{ backgroundImage: `url(${section.midImage})` }} />
                            <div className="section-overlay" />

                            <div className="container centered-content">
                                <div className="hero-content">
                                    <h4 className="section-number-top">{section.number} {section.subtitle}</h4>
                                    <h1 className="hero-title">{section.title}</h1>
                                    <p className="hero-subtitle">{section.content}</p>
                                    <div className="hero-actions">
                                        <button className="btn btn-primary btn-lg">Learn More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
