import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { solutions, getCategoriesBySolutionId } from '../data/products';
import './ProductsOverview.css';

const ProductsOverview: React.FC = () => {
    const { solutionId } = useParams<{ solutionId: string }>();
    const solution = solutions.find(s => s.id === solutionId) || solutions[0];
    const solutionCategories = getCategoriesBySolutionId(solution.id);

    // If solutionId is provided but not found, could redirect to /products/solar
    if (solutionId && !solutions.find(s => s.id === solutionId)) {
        return <Navigate to="/products/solar" replace />;
    }

    return (
        <div className="products-overview-page">
            {/* Hero Section */}
            <section
                className="products-hero"
                style={{ backgroundImage: `url(${solution.heroImage})` }}
            >
                <div className="products-hero-overlay">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="products-hero-title"
                    >
                        {solution.title}
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
                    <span className="active-crumb">{solution.title}</span>
                </nav>
            </div>

            {/* Category Content Section */}
            <section className="products-content-section">
                <div className="container">
                    <h2 className="section-heading">
                        Our Solutions
                        <div className="heading-accent" />
                    </h2>

                    <div className="category-grid">
                        {solutionCategories.map((category, index) => (
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
        </div>
    );
};


export default ProductsOverview;
