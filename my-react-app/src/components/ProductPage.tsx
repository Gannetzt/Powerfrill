import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ProductPage.css';

interface Feature {
    value: string;
    label: string;
}

interface ProductPageProps {
    categoryPath: string[];
    title: string;
    subtitle: string;
    image: string;
    features: Feature[];
    description: string;
    advantages?: string[];
    applications?: string;
    proTip?: string;
}

const ProductPage: React.FC<ProductPageProps> = ({
    categoryPath,
    title,
    subtitle,
    image,
    features,
    description,
    advantages,
    applications,
    proTip
}) => {
    return (
        <div className="product-page">
            <header className="product-hero-section">
                <img src={image} alt={title} className="product-hero-bg" />
                <div className="product-hero-content">
                    <motion.h1
                        className="product-title"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        className="product-subtitle"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 2rem' }}>
                <Link to="/products" style={{ color: '#64748b', textDecoration: 'none' }}>Products</Link>
                {categoryPath.map((path, index) => (
                    <React.Fragment key={index}>
                        <span style={{ margin: '0 0.5rem', color: '#94a3b8' }}>/</span>
                        <span style={{ color: index === categoryPath.length - 1 ? '#0f172a' : '#64748b', fontWeight: index === categoryPath.length - 1 ? '500' : '400' }}>
                            {path}
                        </span>
                    </React.Fragment>
                ))}
            </div>

            <section className="product-grid-layout">
                {/* Specs Column */}
                <motion.div
                    className="product-specs-card"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Technical Specs</h3>
                    {features.map((feature, idx) => (
                        <div key={idx} className="product-feature-row">
                            <span className="spec-label">{feature.label}</span>
                            <span className="spec-value">{feature.value}</span>
                        </div>
                    ))}
                    {applications && (
                        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                            <span className="spec-label">Applications</span>
                            <p style={{ color: '#334155', marginTop: '0.5rem', fontWeight: '500' }}>{applications}</p>
                        </div>
                    )}
                </motion.div>

                {/* Description Column */}
                <motion.div
                    className="product-description-area"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 style={{ marginBottom: '1rem', fontSize: '2rem', color: '#0f172a' }}>Overview</h3>
                    <p>{description}</p>

                    {proTip && (
                        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '16px', marginTop: '2rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                            <strong style={{ color: '#2563eb' }}>Pro Tip:</strong> {proTip}
                        </div>
                    )}

                    {advantages && (
                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Why Choose This?</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {advantages.map((adv, i) => (
                                    <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#334155' }}>
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

export default ProductPage;
