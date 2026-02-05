import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { solutions, getCategoriesBySolutionId } from '../data/products';
import './SolutionDetail.css';

const PowerSignature = () => (
    <div className="power-signature-backdrop">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
        </svg>
    </div>
);

const SolutionDetail: React.FC = () => {
    const { solutionId } = useParams<{ solutionId: string }>();
    const solution = solutions.find(s => s.id === solutionId);
    const solutionCategories = getCategoriesBySolutionId(solutionId || '');

    if (!solution) {
        return (
            <div className="error-page" style={{ textAlign: 'center', paddingTop: '200px' }}>
                <h1 style={{ color: '#ffffff' }}>Solution Hub Not Found</h1>
                <Link to="/products" style={{ color: '#3b82f6' }}>← Back to Portfolio</Link>
            </div>
        );
    }

    return (
        <div className="solution-detail-page">
            <PowerSignature />
            {/* Hero Section */}
            <section className="solution-hero" style={{ backgroundImage: `url(${solution.heroImage})` }}>
                <div className="solution-hero-overlay">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="solution-hero-title"
                    >
                        {solution.title}
                    </motion.h1>
                </div>
            </section>

            <div className="container">
                {/* Breadcrumbs */}
                <nav className="industrial-breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="sep">›</span>
                    <Link to="/products">Portfolio</Link>
                    <span className="sep">›</span>
                    <span className="active-crumb">{solution.title}</span>
                </nav>

                {/* Categories Grid */}
                <section className="solution-content">
                    <h2 className="section-heading">
                        Product Categories
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
                                        <div className="card-info">
                                            <h3 className="card-title">{category.name}</h3>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SolutionDetail;
