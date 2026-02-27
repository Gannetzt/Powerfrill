import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { solutions, getCategoriesByGroupId, getGroupsByMenuId } from '../data/products';
import { hubContent } from '../data/hubContent';
import {
    BessFlowWidget,
    InnovationRoadmapWidget,
    MissionCounterWidget,
    ServiceMatrixWidget,
    HubBackgroundVisuals,
    CarTechnicalLogo
} from './HubWidgets';
import HighFidelityBess3D from './HighFidelityBess3D';
import InnovationSplineVisual from './InnovationSplineVisual';
import ExplodedBessCabinet from './ExplodedBessCabinet';
import './SolutionDetail.css';
import BESSNetworkDiagram from './BESSNetworkDiagram';

const AnatomyScrollSection: React.FC<{ staticData: any }> = ({ staticData }) => {
    return (
        <div className="hub-anatomy-frame-container" style={{ height: '100vh', marginBottom: '0', position: 'relative', background: 'transparent' }}>
            {/* 
                Removed global filter to preserve natural material colors 
                and support multi-colored object rendering (Teal logo + Orange body)
             */}
            <div style={{ width: '100%', height: '100%' }}>
                <HighFidelityBess3D accent={staticData?.accent} />
            </div>

            {/* Technical Data Sheet Overlay - HUD Style (Corner Docked) */}
            <div style={{
                position: 'absolute',
                top: '120px',
                left: '60px',
                zIndex: 10,
                pointerEvents: 'none',
                fontFamily: 'Orbitron, sans-serif'
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        background: 'rgba(5,5,5,0.85)',
                        backdropFilter: 'blur(15px)',
                        padding: '1.8rem 2.5rem',
                        borderLeft: '4px solid #ff6600',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                        width: '340px'
                    }}
                >
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.6rem', color: '#ff6600', letterSpacing: '4px', fontWeight: 800, display: 'block' }}>TECHNICAL SPECIFICATIONS</span>
                        <h3 style={{ fontSize: '1.4rem', color: '#ffffff', margin: '0.5rem 0', letterSpacing: '1px', fontWeight: 900 }}>
                            POWERFRILL <span style={{ color: '#ff6600' }}>LFP-2400</span>
                        </h3>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1.2rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '1.2rem',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: '1.2rem'
                    }}>
                        <div>
                            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', letterSpacing: '1px' }}>Nominal Voltage</span>
                            <span style={{ fontSize: '1rem', color: '#fff', fontWeight: 700 }}>768 VDC</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', letterSpacing: '1px' }}>Capacity</span>
                            <span style={{ fontSize: '1rem', color: '#fff', fontWeight: 700 }}>280 Ah</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', letterSpacing: '1px' }}>Lifecycle</span>
                            <span style={{ fontSize: '1rem', color: '#fff', fontWeight: 700 }}>6,000+</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', letterSpacing: '1px' }}>Chemistry</span>
                            <span style={{ fontSize: '1rem', color: '#ff6600', fontWeight: 700 }}>LiFePO₄</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>SYSTEM STATUS</span>
                        <span style={{ fontSize: '0.65rem', color: '#00ffcc', fontWeight: 800 }}>● NOMINAL</span>
                    </div>
                </motion.div>
            </div>

            {/* Overlay to ensure seamless integration */}
            <div style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at center, transparent 40%, #000000 90%)'
            }} />
        </div>
    );
};

const SolutionDetail: React.FC = () => {
    const { solutionId } = useParams<{ solutionId: string }>();
    const solution = solutions.find(s => s.id === solutionId);
    const menuGroups = getGroupsByMenuId(solutionId || '');
    const staticData = hubContent[solutionId || ''];

    // Emit logo theme change event for specialized pages
    React.useEffect(() => {
        const isLight = solutionId === 'about';
        window.dispatchEvent(new CustomEvent('heroThemeChange', { detail: { isLight } }));
        // Reset when leaving sub-page
        return () => {
            window.dispatchEvent(new CustomEvent('heroThemeChange', { detail: { isLight: false } }));
        };
    }, [solutionId]);

    if (!solution && !staticData) {
        return (
            <div className="error-page" style={{ textAlign: 'center', paddingTop: '200px' }}>
                <h1 style={{ color: '#ffffff' }}>Solution Hub Not Found</h1>
                <Link to="/products" style={{ color: '#3b82f6' }}>← Back to Portfolio</Link>
            </div>
        );
    }

    return (
        <div
            className="solution-detail-page"
            style={{
                '--hub-accent': staticData?.accent || '#ffffff',
                '--hub-accent-rgb': staticData?.accent === '#ffcc00' ? '255, 204, 0' :
                    staticData?.accent === '#00ffcc' ? '0, 255, 204' :
                        staticData?.accent === '#ff6600' ? '255, 102, 0' : '255, 0, 102'
            } as React.CSSProperties}
        >
            {/* Global Video Background for BESS page */}
            {
                solutionId === 'bess-info' && (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="hub-video-background"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: 0,
                            opacity: 0.6
                        }}
                    >
                        <source src="/assets/hero-bg.mp4" type="video/mp4" />
                    </video>
                )
            }

            {staticData && <HubBackgroundVisuals accent={staticData.accent} />}

            {/* Hero Section */}
            <section className="solution-hero" style={{ backgroundImage: solution?.heroImage ? `url(${solution.heroImage})` : 'none' }}>
                <div className="solution-hero-overlay">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-label-wrap"
                    >
                        <span className="hero-label-line" />
                        <span className="hero-label-text">POWERFILL</span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="solution-hero-title"
                    >
                        {staticData ? staticData.id.toUpperCase() : solution?.title}
                    </motion.h1>

                    {/* Hub Hero Subtitles — text moved from Home screen */}
                    {(() => {
                        const subtitles: Record<string, { sub: string; desc: string }> = {
                            'bess-info': {
                                sub: 'GRID-SCALE INFRASTRUCTURE · OPERATIONAL RESILIENCE',
                                desc: 'Industrial Battery Energy Storage Systems (BESS) engineered for utility-scale stability. Our solutions automate frequency regulation, eliminate intermittent renewable clipping, and provide high-availability backup for strategic energy sectors.'
                            },
                            'application': {
                                sub: 'ENGINEERING ADVISORY · SITE ARCHITECTURE',
                                desc: 'End-to-end technical stewardship for complex energetic deployments. We specialize in custom modular integration, site-hardening for extreme environments, and high-voltage grid synchronization.'
                            },
                            'innovation': {
                                sub: 'GEN-4 ARCHITECTURE · SILICON CARBIDE (SiC) EVOLUTION',
                                desc: 'Pioneering the next decade of power conversion. Our R&D focuses on ultra-fast switching SiC semiconductor stacks, solid-state electrode integration, and decentralized AI grid kernels.'
                            },
                            'about': {
                                sub: 'GLOBAL MANDATE · CORPORATE ESG',
                                desc: 'Engineering the technical substrate of the global energy transition. Powerfrill is a vertically integrated provider of mission-critical energy hardware, operating across 42 strategic industrial regions.'
                            },
                        };
                        const id = staticData?.id || '';
                        const entry = subtitles[id];
                        if (!entry) return null;
                        return (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="hero-sub-strip"
                                >
                                    {entry.sub.split(' · ').map((part, i) => (
                                        <React.Fragment key={i}>{i > 0 && <span className="dot"> · </span>}{part}</React.Fragment>
                                    ))}
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    style={{
                                        fontSize: '1.1rem',
                                        color: 'rgba(255,255,255,0.6)',
                                        lineHeight: 1.7,
                                        maxWidth: '600px',
                                        marginTop: '1.5rem',
                                        fontFamily: 'var(--font-main)',
                                    }}
                                >
                                    {entry.desc}
                                </motion.p>
                            </>
                        );
                    })()}
                </div>
            </section>

            <div className="container">
                {/* Back Navigation & Breadcrumbs */}
                <div className="hub-header-nav">
                    <Link to="/products" className="hub-back-button">
                        <span className="arrow">←</span>
                        <span className="text">Back to Portfolio</span>
                    </Link>
                    <nav className="industrial-breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="sep">›</span>
                        <Link to="/products">Portfolio</Link>
                        <span className="sep">›</span>
                        <span className="active-crumb">{staticData ? staticData.id.toUpperCase() : solution?.title}</span>
                    </nav>
                </div>

                {staticData && (
                    <section className="specialized-hub-content">
                        <div className="hub-intro-box">
                            <span className="narrative-label">Engineering Narrative</span>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="hub-objective"
                            >
                                Technical Description
                            </motion.h2>
                            <p className="hub-specialized-info">{staticData.objective}</p>
                            {staticData.specializedInformation && (
                                <p className="hub-specialized-info" style={{ marginTop: '2.5rem', opacity: 0.6, fontSize: '1.25rem' }}>
                                    {staticData.specializedInformation}
                                </p>
                            )}
                        </div>

                        {staticData.stats && (
                            <div className="hub-stats-bar">
                                {staticData.stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        className="hub-stat-card"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="hub-stat-value">{stat.val}</div>
                                        <div className="hub-stat-label">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* BESS Network Diagram for Application page */}
                        {staticData.id === 'application' && (
                            <BESSNetworkDiagram />
                        )}

                        {/* 3D Anatomy Frame (Spline replacement) */}
                        {staticData.id === 'bess-info' && (
                            <AnatomyScrollSection staticData={staticData} />
                        )}

                        {/* Innovation Visual Restoration (Original Spline) */}
                        {staticData.id === 'bess-info' && (
                            <section className="hub-innovation-core-section" style={{ marginTop: '4rem', borderTop: '1px solid rgba(255,102,0,0.1)', paddingTop: '4rem' }}>
                                <div className="sub-heading-strip">
                                    <span className="dot">●</span>
                                    <span>TECHNICAL INNOVATION CORE</span>
                                </div>
                                <h3 className="section-title" style={{ marginBottom: '2rem' }}>Thermal Management & Cell Dynamics</h3>
                                <p className="hub-specialized-info" style={{ marginBottom: '3rem' }}>
                                    Experience the procedural thermal mapping and cell balancing dynamics of the Powerfrill BESS core.
                                    Our proprietary logic ensures uniform heat distribution across the 16-cell module stack.
                                </p>
                                <InnovationSplineVisual />
                            </section>
                        )}

                        {/* Detailed System Inspection (Exploded View) */}
                        {staticData.id === 'bess-info' && (
                            <section className="hub-exploded-inspection-section" style={{ marginTop: '6rem', borderTop: '1px solid rgba(255,102,0,0.1)', paddingTop: '6rem' }}>
                                <div className="sub-heading-strip">
                                    <span className="dot">●</span>
                                    <span>DETAILED SYSTEM INSPECTION</span>
                                </div>
                                <h3 className="section-title" style={{ marginBottom: '2rem' }}>Modular Architecture & Disassembly</h3>
                                <p className="hub-specialized-info" style={{ marginBottom: '3rem' }}>
                                    Inspect the high-density modular architecture of our utility-scale BESS cabinet.
                                    Scroll to trigger the automated disassembly sequence and explore the internal 48-module array.
                                </p>
                                <div style={{ height: '120vh', width: '100%', position: 'relative' }}>
                                    <ExplodedBessCabinet />
                                </div>
                            </section>
                        )}
                    </section>
                )}
            </div>

            <div className="container">
                {staticData && (
                    <div className="hub-main-layout">
                        <div className="hub-content-primary">
                            <span className="narrative-label">Core Advantages</span>

                            {staticData.id === 'about' ? (
                                <div className="sub-heading-strip">
                                    <span>Mission</span>
                                    <span className="dot">·</span>
                                    <span>Contact Information</span>
                                </div>
                            ) : (
                                <div className="sub-heading-strip">
                                    <span>Integrated</span>
                                    <span className="dot">·</span>
                                    <span>Scalable</span>
                                    <span className="dot">·</span>
                                    <span>Secure</span>
                                </div>
                            )}

                            {staticData.features && (
                                <section className="hub-services-grid-wrap">
                                    <div className="hub-features-grid">
                                        {staticData.features.map((feature, i) => (
                                            <div key={i} className="hub-feature-card">
                                                <h4 className="card-title">{feature.title}</h4>
                                                <p className="card-desc">{feature.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {staticData.services && (
                                <section className="hub-services-section">
                                    <h3 className="group-section-heading">Engineering Services</h3>
                                    <div className="services-list">
                                        {staticData.services.map((service, i) => (
                                            <div key={i} className="service-row">
                                                <div className="service-info">
                                                    <h4>{service.title}</h4>
                                                    <p>{service.description}</p>
                                                </div>
                                                <div className="service-capabilities">
                                                    {service.capabilities.map((cap, ci) => (
                                                        <span key={ci} className="capability-tag">{cap}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {staticData.futureScope && (
                                <div className="hub-future-section">
                                    <h3 className="section-title">Future Scope & Roadmap</h3>
                                    <ul className="future-list">
                                        {staticData.futureScope.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {staticData.contactInfo && (
                                <div className="hub-contact-section">
                                    <h3 className="section-title">Contact Information</h3>
                                    <div className="contact-grid">
                                        <div className="contact-item">
                                            <label>Email</label>
                                            <span>{staticData.contactInfo.email}</span>
                                        </div>
                                        <div className="contact-item">
                                            <label>Technical Support</label>
                                            <span>{staticData.contactInfo.phone}</span>
                                        </div>
                                        <div className="contact-item">
                                            <label>Operations</label>
                                            <span>{staticData.contactInfo.operationHours}</span>
                                        </div>
                                        <div className="contact-item">
                                            <label>Global HQ</label>
                                            <span>{staticData.contactInfo.address}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {staticData.ctaLabel && (
                                <div className="hub-action-footer">
                                    <Link to={staticData.ctaPath || '#'} className="hub-cta-button">
                                        {staticData.ctaLabel}
                                    </Link>
                                </div>
                            )}
                        </div>

                        <aside className="hub-sidebar-widgets">
                            {staticData.id === 'bess-info' && <BessFlowWidget />}
                            {staticData.id === 'innovation' && <InnovationRoadmapWidget />}
                            {staticData.id === 'about' && (
                                <>
                                    <CarTechnicalLogo />
                                    <MissionCounterWidget />
                                </>
                            )}
                            {staticData.id === 'application' && <ServiceMatrixWidget />}
                        </aside>
                    </div>
                )}

                {/* Categories Grid (if not specialized) */}
                {menuGroups.length > 0 && !staticData && (
                    <section className="solution-content">
                        {menuGroups.map((group, groupIndex) => {
                            const groupCategories = getCategoriesByGroupId(group.id);
                            if (groupCategories.length === 0) return null;

                            return (
                                <div key={group.id} className="solution-group-section">
                                    <motion.h2
                                        className="group-section-heading"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: groupIndex * 0.1 }}
                                    >
                                        {group.name}
                                        <div className="heading-accent" />
                                    </motion.h2>

                                    <div className="category-grid">
                                        {groupCategories.map((category, catIndex) => (
                                            <motion.div
                                                key={category.id}
                                                className="category-hover-card"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (groupIndex * 0.2) + (catIndex * 0.1) }}
                                            >
                                                <Link to={`/category/${category.id}`} className="hover-card-anchor">
                                                    <div className="hover-card-visual">
                                                        <img src={category.image} alt={category.name} className="hover-card-img" />
                                                    </div>
                                                    <div className="hover-card-body">
                                                        <h3 className="hover-card-title">{category.name}</h3>
                                                        <p className="hover-card-desc">{category.description}</p>
                                                        <div className="hover-card-footer">
                                                            <span>EXPLORE MODULE</span>
                                                            <span className="arrow">→</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                )}
            </div>
        </div >
    );
};

export default SolutionDetail;
