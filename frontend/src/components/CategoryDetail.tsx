import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { categories } from '../data/products';
import { productService, publishingService } from '../services/api';
import { useCart } from '../context/CartContext';
import './CategoryDetail.css';

const CategoryDetail: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const category = categories.find(c => c.id === categoryId);
    const { addToCart } = useCart();

    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const all = await productService.getAll();
                const filtered = all.filter((p: any) => p.categoryId === categoryId);
                setSubCategories(filtered);

                // Fetch brochures for this category using dynamic targeting
                const targetId = getTargetId();
                const resData = await publishingService.getResources(targetId);
                setResources(resData);
            } catch (err) {
                console.error('Failed to fetch category products:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [categoryId]);

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
            Loading Category...
        </div>
    );

    if (!category) {
        return (
            <div className="error-page" style={{ textAlign: 'center', paddingTop: '200px' }}>
                <h1 style={{ color: '#ffffff' }}>Category Not Found</h1>
                <Link to="/products" style={{ color: '#3b82f6' }}>← Back to Products</Link>
            </div>
        );
    }

    // Helper to get screen ID for brochures
    const getTargetId = () => {
        if (category.name.toLowerCase().includes('solar')) return 'solar-energy';
        if (category.name.toLowerCase().includes('battery')) return 'battery-bess';
        return categoryId;
    };

    return (
        <div className="category-detail-page">
            {/* Hero Section */}
            <section
                className="category-hero"
                style={{ backgroundImage: `url(${categoryId === '2w-packs' ? '/battery_hero_bg.png' : category.image})` }}
            >
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
                                <Link to={`/${sub.menuId}/${sub.groupId}/${sub.categoryId}/${sub.slug}`} className="card-link">
                                    <div className="card-image-wrap">
                                        <img src={sub.image} alt={sub.title} className="card-image" />
                                        <div className="card-info">
                                            <h3 className="card-title">{sub.title}</h3>
                                            <div className="card-commercial">
                                                <span className="card-price">{sub.priceLabel || 'Price on Request'}</span>
                                                {!sub.hideQuotation && sub.productType !== 'informational' && (
                                                    <div
                                                        className="card-quick-add"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            addToCart({
                                                                id: sub.id,
                                                                title: sub.title,
                                                                subtitle: sub.subtitle,
                                                                image: sub.image,
                                                                quantity: 1
                                                            });
                                                            // Visual feedback
                                                            const target = e.currentTarget;
                                                            target.style.background = '#fff';
                                                            target.style.color = '#ff6600';
                                                            target.innerHTML = '✓';
                                                            setTimeout(() => {
                                                                target.style.background = '#ff6600';
                                                                target.style.color = '#000';
                                                                target.innerHTML = '+';
                                                            }, 2000);
                                                        }}
                                                    >
                                                        +
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {resources.length > 0 && (
                        <div className="category-resources">
                            <h3 className="resources-title">Technical Library</h3>
                            <div className="res-grid">
                                {resources.map(res => (
                                    <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="res-link">
                                        <div className="res-icon">PDF</div>
                                        <div className="res-text">
                                            <h4>{res.title}</h4>
                                            <p>{res.type.toUpperCase()}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CategoryDetail;
