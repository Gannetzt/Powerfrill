import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { categories, getProductsByCategoryId } from '../data/products';
import './CategoryDetail.css';

const CategoryDetail: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const category = categories.find(c => c.id === categoryId);
    const subProducts = getProductsByCategoryId(categoryId || '');
    const [activeIndex, setActiveIndex] = useState(0);

    if (!category) {
        return (
            <div className="error-page" style={{ textAlign: 'center', paddingTop: '200px' }}>
                <h1 style={{ color: '#ffffff' }}>Category Not Found</h1>
                <Link to="/products" style={{ color: '#3b82f6' }}>← Back to Products</Link>
            </div>
        );
    }

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % subProducts.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + subProducts.length) % subProducts.length);
    };

    const activeProduct = subProducts[activeIndex];

    return (
        <div className="category-detail-page">
            {/* Hero Section */}
            <section className="category-hero" style={{ backgroundImage: `url(${category.image})` }}>
                <div className="category-hero-overlay">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="category-hero-title"
                    >
                        {category.name}
                    </motion.h1>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="container">
                <nav className="industrial-breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="sep">›</span>
                    <Link to="/products/solar">Products</Link>
                    <span className="sep">›</span>
                    <span className="active-crumb">{category.name}</span>
                </nav>
            </div>

            {/* Combined Slider & Detail Section */}
            <section className="category-content">
                <div className="container">
                    <div className="product-slider-wrapper">
                        <button className="slider-arrow left" onClick={prevSlide}>‹</button>

                        <div className="product-slider-container">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProduct.id}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="active-slide-content"
                                >
                                    <div className="slide-image-container">
                                        <img src={activeProduct.image} alt={activeProduct.title} className="slide-main-image" />
                                    </div>

                                    <div className="slide-main-info">
                                        <motion.h2
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="active-product-title"
                                        >
                                            {activeProduct.title}
                                        </motion.h2>
                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="active-product-subtitle"
                                        >
                                            {activeProduct.subtitle}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button className="slider-arrow right" onClick={nextSlide}>›</button>

                        <div className="slider-dots">
                            {subProducts.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`dot ${idx === activeIndex ? 'active' : ''}`}
                                    onClick={() => setActiveIndex(idx)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Technical Details (Below Image) */}
                    <motion.div
                        key={`details-${activeProduct.id}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="product-detail-expanded"
                    >
                        <div className="detail-grid">
                            <div className="detail-main">
                                <h3 className="detail-section-label">Overview</h3>
                                <p className="detail-description">{activeProduct.description}</p>

                                {activeProduct.advantages && (
                                    <div className="advantages-section">
                                        <h3 className="detail-section-label">Key Advantages</h3>
                                        <ul className="advantages-list">
                                            {activeProduct.advantages.map((adv, i) => (
                                                <li key={i}>{adv}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="detail-sidebar">
                                <h3 className="detail-section-label">Technical Stats</h3>
                                <div className="detail-features">
                                    {activeProduct.features.map((feature, index) => (
                                        <div key={index} className="detail-feature-item">
                                            <span className="feature-val">{feature.value}</span>
                                            <span className="feature-lab">{feature.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CategoryDetail;

