import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories, getProductsByCategoryId } from '../data/products';
import './ProductsOverview.css';

const ProductsOverview: React.FC = () => {
    const [focusedCategoryId, setFocusedCategoryId] = useState<string>(categories[0].id);
    const sliderRef = useRef<HTMLDivElement>(null);

    const products = getProductsByCategoryId(focusedCategoryId);

    return (
        <div className="products-overview-page">
            <div className="overview-header">
                <h1 className="overview-title">Our <span className="gradient-text">Solutions</span></h1>
                <p className="overview-subtitle">Explore our diverse range of advanced solar and energy technologies.</p>
            </div>

            <div className="slider-container" ref={sliderRef}>
                <motion.div
                    className="category-slider"
                    drag="x"
                    dragConstraints={{ left: -300, right: 0 }} // Simple drag for now, can be improved
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            className={`category-card ${focusedCategoryId === category.id ? 'focused' : ''}`}
                            onClick={() => setFocusedCategoryId(category.id)}
                            whileHover={{ y: -10 }}
                            layout
                        >
                            <div className="card-image-wrap">
                                <img src={category.image} alt={category.name} className="card-image" />
                                <div className="card-overlay" />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{category.name}</h3>
                                {focusedCategoryId === category.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="card-details-reveal"
                                    >
                                        <p className="card-description">{category.description}</p>
                                        <Link to={`/category/${category.id}`} className="view-category-link" onClick={(e) => e.stopPropagation()}>
                                            View Professional Series →
                                        </Link>
                                    </motion.div>
                                )}

                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="sub-items-section">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={focusedCategoryId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="sub-items-grid"
                    >
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="sub-item-card"
                            >
                                <div className="sub-item-image-wrap">
                                    <img src={product.image} alt={product.title} className="sub-item-image" />
                                    <div className="sub-item-overlay">
                                        <span className="view-details">Explore →</span>
                                    </div>
                                </div>
                                <div className="sub-item-info">
                                    <h4 className="sub-item-title">{product.title}</h4>
                                    <p className="sub-item-subtitle">{product.subtitle}</p>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProductsOverview;
