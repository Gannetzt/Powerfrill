import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProductById } from '../../../../data/products';
import './SolarPanels.css';

const Topcon: React.FC = () => {
    const product = getProductById('topcon');

    if (!product) return <div>Product Not Found</div>;

    return (
        <div className="solar-product-page">
            <header className="solar-hero-section">
                <img src={product.image} alt={product.title} className="solar-hero-bg" />
                <div className="solar-hero-content">
                    <motion.h1
                        className="solar-title"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        {product.title}
                    </motion.h1>
                    <p className="solar-subtitle">{product.subtitle}</p>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 2rem' }}>
                <Link to="/products" style={{ color: '#64748b', textDecoration: 'none' }}>Products</Link>
                <span style={{ margin: '0 0.5rem', color: '#94a3b8' }}>/</span>
                <span style={{ color: '#0f172a', fontWeight: '500' }}>TOPCon</span>
            </div>

            <section className="solar-grid-layout">
                <motion.div
                    className="solar-specs-card"
                    style={{ gridColumn: '1 / -1', textAlign: 'center' }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Next-Gen Efficiency</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
                        {product.features.map((feature: any, idx: number) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#d97706' }}>{feature.value}</span>
                                <span style={{ fontSize: '0.9rem', color: '#64748b', letterSpacing: '2px' }}>{feature.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="solar-description-area"
                    style={{ gridColumn: '1 / -1', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p>{product.description}</p>
                    <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '0.95rem' }}>
                        * Tunnel Oxide Passivated Contact technology minimizes electron recombination, significantly boosting efficiency compared to standard PERC cells.
                    </p>
                </motion.div>
            </section>
        </div>
    );
};

export default Topcon;
