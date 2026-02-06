import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { solutions } from '../data/products';
import './ProductsOverview.css';

// Helper to get icons based on solution ID
const getIconForSolution = (id: string) => {
    switch (id) {
        case 'solar':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
            );
        case 'storage':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
                    <line x1="6" y1="7" x2="6" y2="17" />
                    <line x1="10" y1="7" x2="10" y2="17" />
                    <line x1="14" y1="7" x2="14" y2="17" />
                    <line x1="18" y1="7" x2="18" y2="17" />
                </svg>
            );
        case 'batteries':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="6" width="16" height="14" rx="2" />
                    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    <path d="M8 13h2" />
                    <path d="M14 13h2M15 13v0" />
                </svg>
            );
        default:
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            );
    }
};

const ProductsOverview: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Auto-play slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % solutions.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % solutions.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + solutions.length) % solutions.length);

    // Duplicating solutions to mimic a full bar of icons as requested
    const navIcons = [...solutions, ...solutions];

    const handleIconClick = (id: string) => {
        setSelectedCategory(id);
        // Scroll to content section smoothly
        const contentSection = document.getElementById('product-content-area');
        if (contentSection) {
            contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="products-overview-page">
            {/* Hero Slider Section */}
            <section className="products-hero-slider">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide}
                        className="hero-slide-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        style={{ backgroundImage: `url(${solutions[currentSlide].heroImage})` }}
                    />
                </AnimatePresence>

                <div className="hero-slider-overlay">
                    <div className="hero-content-wrapper">
                        <button className="slider-arrow left" onClick={prevSlide}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>

                        <div className="hero-text-content">
                            <h1 className="slider-heading">
                                «Our components form the core <br />
                                of the hydraulic system.»
                            </h1>
                            <div className="slider-underline"></div>
                        </div>

                        <button className="slider-arrow right" onClick={nextSlide}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    </div>

                    <div className="slider-dots">
                        {solutions.map((_, idx) => (
                            <span
                                key={idx}
                                className={`dot ${idx === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(idx)}
                            />
                        ))}
                    </div>
                </div>

                {/* Overlapping Icon Navigation */}
                <div className="icon-nav-bar">
                    <div className="icon-nav-scroll">
                        {navIcons.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className={`icon-nav-item ${selectedCategory === item.id ? 'active' : ''}`}
                                onClick={() => handleIconClick(item.id)}
                            >
                                <div className="icon-circle">
                                    {getIconForSolution(item.id)}
                                </div>
                                <span className="icon-label">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Breadcrumbs & Title */}
            <div className="container content-container" id="product-content-area">
                <nav className="industrial-breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="sep">›</span>
                    <span className="active-crumb">Products</span>
                </nav>

                <div className="brand-section">
                    <h2 className="brand-title">Products</h2>
                    <div className="brand-underline"></div>
                    <p className="brand-text">
                        Where conventional solutions stop, innovation begins. With this in mind, we always strive to set new standards in technology, quality, manufacturing, delivery,
                        and customer care.
                    </p>
                </div>
            </div>

            {/* Hub Selector Section */}
            <section className="hubs-selector-section">
                <div className="container">
                    {selectedCategory === null ? (
                        /* Default View: General Product Info */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="general-product-info"
                        >
                            <h3>Explore Our Solutions</h3>
                            <p>
                                Powerfrill offers a comprehensive range of cutting-edge energy solutions.
                                Click on the icons above to discover our specialized products in Solar Energy,
                                Storage Systems, and Advanced Battery Technology.
                            </p>
                            <div className="info-grid text-center mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-gray-50 rounded-lg">
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Efficiency</h4>
                                    <p className="text-gray-600">Maximized energy output for every application.</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-lg">
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Durability</h4>
                                    <p className="text-gray-600">Engineered to withstand the toughest environments.</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-lg">
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Innovation</h4>
                                    <p className="text-gray-600">Pioneering the future of renewable energy.</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* Filtered View: Specific Cards */
                        <div className="hub-grid">
                            {solutions
                                .filter(hub => hub.id === selectedCategory)
                                .map((hub) => (
                                    <motion.div
                                        key={hub.id}
                                        className="hub-product-card"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Link to={`/hub/${hub.id}`} className="card-link">
                                            <div className="card-image-area">
                                                <img src={hub.heroImage} alt={hub.title} className="card-product-img" />
                                            </div>
                                            <div className="card-content-area">
                                                <h3 className="card-title">{hub.title}</h3>
                                                <div className="card-arrow">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 9L12 15L18 9" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductsOverview;
