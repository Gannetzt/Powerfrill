import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ProductData } from '../data/products';
import './ProductCard.css';

interface ProductCardProps {
    product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const {
        title,
        subtitle,
        image,
        category,
        menuId,
        groupId,
        categoryId,
        slug
    } = product;

    const productPath = `/${menuId}/${groupId}/${categoryId}/${slug}`;

    return (
        <motion.div
            className="ecommerce-product-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link to={productPath} className="card-image-link">
                <div className="card-image-container">
                    <img src={image} alt={title} className="product-image" loading="lazy" />
                    {product.certification ? (
                        <div className="card-badge technical">{product.certification}</div>
                    ) : (
                        <div className="card-badge">PREMIUM</div>
                    )}
                </div>
            </Link>

            <div className="card-details">
                <div className="card-meta">
                    <span className="card-category">{category}</span>
                </div>
                <Link to={productPath} className="card-title-link">
                    <h3 className="card-title">{title}</h3>
                </Link>
                <p className="card-subtitle">{subtitle}</p>

                <div className="card-footer">
                    <div className="price-display">
                        <span className="price-label">QUOTE REQUIRED</span>
                    </div>
                    <Link to={productPath} className="view-details-btn">
                        VIEW SYSTEM
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
