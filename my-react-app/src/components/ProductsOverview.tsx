import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { solutions, getProductsByCategoryId, categories } from '../data/products';
import SideNav from './SideNav';
import './ProductsOverview.css';

interface ProductSliderProps {
    solutionId: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ solutionId }) => {
    // Collect all products for this solution hub across its categories
    const solutionCategories = categories.filter(c => c.solutionId === solutionId);
    const allProducts = solutionCategories.flatMap(cat => getProductsByCategoryId(cat.id));

    const [activeIndex, setActiveIndex] = useState(0);
    const activeProduct = allProducts[activeIndex];

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % allProducts.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + allProducts.length) % allProducts.length);

    if (allProducts.length === 0) return null;

    return (
        <div className="hub-slider-wrapper">
            <div className="slider-main-area">
                <button className="slider-nav-btn prev" onClick={prevSlide}>
                    <span className="arrow-icon">‹</span>
                </button>

                <div className="slider-card-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProduct.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                            className="product-detail-slide"
                        >
                            <div className="slide-layout">
                                {/* Left Side: High Density Image */}
                                <div className="slide-image-side">
                                    <div className="category-tag">{activeProduct.category}</div>
                                    <div className="image-frame">
                                        <img src={activeProduct.image} alt={activeProduct.title} className="slide-image" />
                                    </div>
                                </div>

                                {/* Right Side: Technical Specs */}
                                <div className="slide-info-side">
                                    <h2 className="slide-title">{activeProduct.title}</h2>
                                    <p className="slide-subtitle">{activeProduct.subtitle}</p>

                                    <div className="slide-stats-grid">
                                        {activeProduct.features.map((feature, idx) => (
                                            <div key={idx} className="stat-box">
                                                <span className="stat-value">{feature.value}</span>
                                                <span className="stat-label">{feature.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: Detailed Description */}
                            <div className="slide-footer-details">
                                <div className="detail-section">
                                    <h4 className="detail-section-label">Overview</h4>
                                    <p className="detail-description">{activeProduct.description}</p>
                                </div>
                                {activeProduct.advantages && (
                                    <div className="detail-section">
                                        <h4 className="detail-section-label">Key Advantages</h4>
                                        <ul className="advantages-list">
                                            {activeProduct.advantages.map((adv, i) => (
                                                <li key={i}>{adv}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button className="slider-nav-btn next" onClick={nextSlide}>
                    <span className="arrow-icon">›</span>
                </button>
            </div>

            <div className="slider-pagination">
                {allProducts.map((_, idx) => (
                    <button
                        key={idx}
                        className={`pagination-dot ${idx === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

const ProductsOverview: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state && (location.state as any).scrollTo) {
            const id = (location.state as any).scrollTo;
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <div className="unified-portal" ref={containerRef}>
            <SideNav
                containerRef={containerRef}
                customItems={solutions.map(s => ({ id: s.id, label: s.title }))}
            />

            <div className="portal-container">
                {/* Global Breadcrumbs (Light Theme) */}
                <div className="container">
                    <nav className="industrial-breadcrumb light">
                        <Link to="/">Home</Link>
                        <span className="sep">›</span>
                        <span className="active-crumb">Products Portfolio</span>
                    </nav>
                </div>

                {solutions.map((solution) => (
                    <section key={solution.id} id={solution.id} className="hub-section">
                        <div className="container">
                            <div className="hub-header">
                                <h1 className="hub-display-title">{solution.title}</h1>
                                <div className="hub-accent-line" />
                            </div>

                            <ProductSlider solutionId={solution.id} />
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default ProductsOverview;
