import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ProductPage.css';

interface Feature {
    value: string;
    label: string;
}

interface ProductPageProps {
    category: string;
    categoryPath: string[];
    title: string;
    subtitle: string;
    image: string;
    features: Feature[];
    description: string;
}

const ProductPage: React.FC<ProductPageProps> = ({
    category,
    categoryPath,
    title,
    subtitle,
    image,
    features,
    description
}) => {
    return (
        <motion.div
            className="product-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Breadcrumb Navigation */}
            <nav className="breadcrumb">
                <Link to="/">🏠 Home</Link>
                <span className="separator">›</span>
                <span className="static-crumb">Products</span>
                {categoryPath.map((path, index) => (
                    <React.Fragment key={index}>
                        <span className="separator">›</span>
                        <span className={index === categoryPath.length - 1 ? 'current' : ''}>
                            {path}
                        </span>
                    </React.Fragment>
                ))}
            </nav>

            {/* Category Badge */}
            <motion.span
                className="category-badge"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {category}
            </motion.span>

            {/* Main Content */}
            <div className="product-content">
                {/* Product Image */}
                <motion.div
                    className="product-image-container"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <img src={image} alt={title} className="product-image" />
                </motion.div>

                {/* Product Info */}
                <div className="product-info">
                    <motion.h1
                        className="product-title"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        className="product-subtitle"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        {subtitle}
                    </motion.p>

                    {/* Feature Stats */}
                    <motion.div
                        className="product-features"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        {features.map((feature, index) => (
                            <div key={index} className="feature-item">
                                <span className="feature-value">{feature.value}</span>
                                <span className="feature-label">{feature.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Description - Inside Info for desktop layout balance? */}
                    <motion.p
                        className="product-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        {description}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductPage;
