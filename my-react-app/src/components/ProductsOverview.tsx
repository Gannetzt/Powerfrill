import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { solutions } from '../data/products';
import './ProductsOverview.css';

const PowerSignature = () => (
    <div className="power-signature-backdrop">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
        </svg>
    </div>
);

const ProductsOverview: React.FC = () => {
    return (
        <div className="products-overview-page">
            <PowerSignature />
            {/* Hero Section */}
            <section className="products-hero">
                <div className="products-hero-overlay">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="products-hero-title"
                    >
                        Our Products
                    </motion.h1>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="container">
                <nav className="industrial-breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="sep">›</span>
                    <span className="active-crumb">Products Portfolio</span>
                </nav>
            </div>

            {/* Hub Selector Section */}
            <section className="hubs-selector-section">
                <div className="container">
                    <div className="hub-grid">
                        {solutions.map((hub, index) => (
                            <motion.div
                                key={hub.id}
                                className="hub-major-card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/hub/${hub.id}`} className="card-link">
                                    <div className="card-image-wrap">
                                        <img src={hub.heroImage} alt={hub.title} className="card-image" />
                                        <div className="card-info">
                                            <h3 className="card-title">{hub.title}</h3>
                                            <div className="card-cta">Explore Division →</div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductsOverview;

