import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { categories, getProductsByCategoryId } from '../data/products';
import './CategoryDetail.css';

const CategoryDetail: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const category = categories.find(c => c.id === categoryId);
    const subCategories = getProductsByCategoryId(categoryId || '');

    if (!category) {
        return (
            <div className="error-page" style={{ textAlign: 'center', paddingTop: '200px' }}>
                <h1 style={{ color: '#ffffff' }}>Category Not Found</h1>
                <Link to="/products" style={{ color: '#3b82f6' }}>← Back to Products</Link>
            </div>
        );
    }

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
                    <Link to="/products">Products</Link>
                    <span className="sep">›</span>
                    <span className="active-crumb">{category.name}</span>
                </nav>
            </div>

            {/* Content Section */}
            <section className="category-content">
                <div className="container">
                    <h2 className="section-heading">
                        {category.name}
                        <div className="heading-accent" />
                    </h2>

                    <div className="sub-category-grid">
                        {subCategories.map((sub, index) => (
                            <motion.div
                                key={sub.id}
                                className="sub-category-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/product/${sub.id}`} className="card-link">
                                    <div className="card-image-wrap">
                                        <img src={sub.image} alt={sub.title} className="card-image" />
                                        <div className="card-info">
                                            <h3 className="card-title">{sub.title}</h3>
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

export default CategoryDetail;
