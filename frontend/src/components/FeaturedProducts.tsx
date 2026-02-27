import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { productsData } from '../data/products';
import { useCart } from '../context/CartContext';
import './FeaturedProducts.css';

const FeaturedProducts: React.FC = () => {
    const { addToCart } = useCart();
    // Select a few flagship products
    const featured = productsData.filter(p => p.rating === 5).slice(0, 3);

    return (
        <section className="featured-products-section">
            <div className="container">
                <div className="featured-header">
                    <h2 className="section-subtitle">Flagship Series</h2>
                    <h3 className="section-title">FEATURED SYSTEMS</h3>
                    <div className="title-accent" />
                </div>

                <div className="featured-grid">
                    {featured.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="featured-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Link to={`/${product.menuId}/${product.groupId}/${product.categoryId}/${product.slug}`} className="featured-card-link">
                                <div className="featured-image-wrap">
                                    <img src={product.image} alt={product.title} className="featured-image" />
                                    <div className="featured-badge">FLAGSHIP</div>
                                </div>
                                <div className="featured-info">
                                    <span className="featured-cat">{product.category}</span>
                                    <h4 className="featured-name">{product.title}</h4>
                                    <p className="featured-desc">{product.subtitle}</p>
                                    <div className="featured-footer">
                                        <span className="featured-price">{product.priceLabel || 'Price on Request'}</span>
                                        <div className="featured-actions">
                                            <button
                                                className="featured-add-btn"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    addToCart({
                                                        id: product.id,
                                                        title: product.title,
                                                        subtitle: product.subtitle,
                                                        image: product.image,
                                                        quantity: 1
                                                    });
                                                    // Visual feedback logic
                                                    const target = e.currentTarget;
                                                    target.innerHTML = '✓';
                                                    target.classList.add('added');
                                                    setTimeout(() => {
                                                        target.innerHTML = '+';
                                                        target.classList.remove('added');
                                                    }, 2000);
                                                }}
                                                title="Add to Quotation"
                                            >
                                                +
                                            </button>
                                            <span className="featured-action">VIEW SYSTEM →</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
