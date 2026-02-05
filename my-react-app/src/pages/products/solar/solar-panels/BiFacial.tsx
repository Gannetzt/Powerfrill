import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProductById } from '../../../../data/products';
import './SolarPanels.css';

const BiFacial: React.FC = () => {
    const product = getProductById('bi-facial');

    if (!product) return <div>Product Not Found</div>;

    return (
        <div className="solar-product-page">
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ display: 'inline-block', background: '#3b82f6', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '1rem' }}
                    >
                        Dual-Sided Technology
                    </motion.div>
                    <p className="solar-subtitle">{product.subtitle}</p>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 2rem' }}>
                <Link to="/products" style={{ color: '#64748b', textDecoration: 'none' }}>Products</Link>
                <span style={{ margin: '0 0.5rem', color: '#94a3b8' }}>/</span>
                <span style={{ color: '#0f172a', fontWeight: '500' }}>Bi-Facial</span>
            </div>

            <section className="solar-grid-layout">
                <motion.div
                    className="solar-description-area"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 style={{ marginBottom: '1rem', fontSize: '2rem', color: '#0f172a' }}>Maximize Yield</h3>
                    <p>{product.description}</p>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '16px', marginTop: '2rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <strong style={{ color: '#2563eb' }}>Pro Tip:</strong> Ideal for reflective surfaces like white rooftops, snow, or sand to capture back-side light.
                    </div>
                </motion.div>

                <motion.div
                    className="solar-specs-card"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Performance Metrics</h3>
                    {product.features.map((feature: any, idx: number) => (
                        <div key={idx} className="solar-feature-row">
                            <span className="spec-label">{feature.label}</span>
                            <span className="spec-value">{feature.value}</span>
                        </div>
                    ))}
                    {product.advantages && (
                        <ul style={{ marginTop: '2rem', paddingLeft: '1.2rem', color: '#cbd5e1' }}>
                            {product.advantages.map((adv: string, i: number) => (
                                <li key={i} style={{ marginBottom: '0.5rem' }}>{adv}</li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            </section>
        </div>
    );
};

export default BiFacial;
