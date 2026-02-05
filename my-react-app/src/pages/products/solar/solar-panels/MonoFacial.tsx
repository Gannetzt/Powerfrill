import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProductById } from '../../../../data/products';
import './SolarPanels.css';

const MonoFacial: React.FC = () => {
    const product = getProductById('mono-facial');

    if (!product) return <div>Product Not Found</div>;

    return (
        <div className="solar-product-page">
            {/* Custom Solar Hero */}
            <header className="solar-hero-section">
                <img src={product.image} alt={product.title} className="solar-hero-bg" />
                <div className="solar-hero-content">
                    <motion.h1
                        className="solar-title"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {product.title}
                    </motion.h1>
                    <motion.p
                        className="solar-subtitle"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {product.subtitle}
                    </motion.p>
                </div>
            </header>

            {/* Breadcrumbs (Custom style) */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 2rem' }}>
                <Link to="/products" style={{ color: '#94a3b8', textDecoration: 'none' }}>Products</Link>
                <span style={{ margin: '0 0.5rem', color: '#64748b' }}>/</span>
                <span style={{ color: '#fff' }}>Mono Facial</span>
            </div>

            {/* Split Content */}
            <section className="solar-grid-layout">
                {/* Specs Column */}
                <motion.div
                    className="solar-specs-card"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Technical Specs</h3>
                    {product.features.map((feature: any, idx: number) => (
                        <div key={idx} className="solar-feature-row">
                            <span className="spec-label">{feature.label}</span>
                            <span className="spec-value">{feature.value}</span>
                        </div>
                    ))}
                    <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <span className="spec-label">Applications</span>
                        <p style={{ color: '#fff', marginTop: '0.5rem' }}>Residential, Commercial Roofs</p>
                    </div>
                </motion.div>

                {/* Description Column */}
                <motion.div
                    className="solar-description-area"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 style={{ marginBottom: '1rem', fontSize: '2rem', color: '#fff' }}>Overview</h3>
                    <p>{product.description}</p>

                    {product.advantages && (
                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ color: '#a5b4fc', marginBottom: '1rem' }}>Why Choose Mono Facial?</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {product.advantages.map((adv: string, i: number) => (
                                    <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ color: '#3b82f6' }}>✓</span> {adv}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>
            </section>
        </div>
    );
};

export default MonoFacial;
