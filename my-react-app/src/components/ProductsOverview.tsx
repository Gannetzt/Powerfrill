import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories, solutions } from '../data/products';
import './ProductsOverview.css';

const ProductsOverview: React.FC = () => {
    return (
        <div className="products-overview-page">
            {/* Hero Section */}
            <section className="products-hero">
                <div className="products-hero-overlay">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="products-hero-title"
                    >
                        Our Industrial Solutions
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

            {/* Hub Sections */}
            <div className="portal-hubs-container">
                {solutions.map((hub) => {
                    const hubCategories = categories.filter(cat => cat.solutionId === hub.id);
                    if (hubCategories.length === 0) return null;

                    return (
                        <section key={hub.id} className="hub-portfolio-section">
                            <div className="container">
                                <div className="hub-portfolio-header">
                                    <h2 className="hub-portfolio-title">
                                        {hub.title}
                                        <div className="hub-underline" />
                                    </h2>
                                </div>

                                <div className="category-grid">
                                    {hubCategories.map((category, index) => (
                                        <motion.div
                                            key={category.id}
                                            className="category-major-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link to={`/category/${category.id}`} className="card-link">
                                                <div className="card-image-wrap">
                                                    <img src={category.image} alt={category.name} className="card-image" />
                                                </div>
                                                <div className="card-info">
                                                    <h3 className="card-title">{category.name}</h3>
                                                    <p className="card-description">{category.description}</p>
                                                    <div className="expand-indicator">
                                                        <span className="plus">+</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductsOverview;

