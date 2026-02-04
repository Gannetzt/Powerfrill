import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { categories, getProductsByCategoryId } from '../data/products';
import SideNav from './SideNav';
import './CategoryDetail.css';
import './Hero.css'; // Reuse Hero styles


interface AnimatedProductSectionProps {
    id: string;
    title: string;
    description: string;
    image: string;
    productId?: string;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const AnimatedProductSection: React.FC<AnimatedProductSectionProps> = ({
    id, title, description, image, productId, containerRef
}) => {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        container: containerRef,
        offset: ["start end", "end start"]
    });

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 45,
        damping: 15,
        restDelta: 0.001
    });

    const scale = useTransform(springProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
    const opacity = useTransform(springProgress, [0, 0.45, 0.55, 1], [0.4, 1, 1, 0.4]);
    const blurValue = useTransform(springProgress, [0, 0.5, 1], [8, 0, 8]);
    const blur = useTransform(blurValue, (v) => `blur(${v}px)`);
    const bgScale = useTransform(springProgress, [0, 0.5, 1], [1.3, 1, 1.3]);
    const yOffset = useTransform(springProgress, [0, 0.5, 1], ["5vh", "0vh", "-5vh"]);

    return (
        <section id={id} ref={ref} className="hero-sub-section">
            <motion.div
                className="section-container-expanding"
                style={{
                    scale,
                    opacity,
                    filter: blur,
                    y: yOffset,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                <motion.div
                    className="section-bg-overlay"
                    style={{
                        backgroundImage: `url(${image})`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                        opacity: 0.4,
                        scale: bgScale
                    }}
                />

                <div className="container centered-content">
                    <motion.div
                        className="hero-content"
                        style={{
                            opacity: useTransform(springProgress, [0.3, 0.5, 0.7], [0, 1, 0]),
                            scale: useTransform(springProgress, [0.4, 0.5, 0.6], [0.95, 1, 0.95]),
                        }}
                    >
                        <h1 className="hero-title">{title}</h1>
                        <p className="hero-subtitle">{description}</p>
                        {productId && (
                            <div className="hero-actions">
                                <Link to={`/product/${productId}`} className="btn btn-primary btn-lg">
                                    View Details
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

const CategoryDetail: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const containerRef = useRef<HTMLDivElement>(null);
    const category = categories.find(c => c.id === categoryId);
    const subProducts = getProductsByCategoryId(categoryId || '');

    if (!category) {
        return (
            <div className="error-page" style={{ textAlign: 'center', paddingTop: '200px' }}>
                <h1 style={{ color: '#ffffff' }}>Category Not Found</h1>
                <Link to="/products" style={{ color: '#3b82f6' }}>← Back to Products</Link>
            </div>
        );
    }

    const sections = [
        {
            id: 'category-hero',
            label: 'Start',
            title: category.name,
            description: category.description,
            image: category.image,
            productId: undefined
        },
        ...subProducts.map(prod => ({
            id: prod.id,
            label: prod.title,
            title: prod.title,
            description: prod.subtitle,
            image: prod.image,
            productId: prod.id
        }))
    ];

    return (
        <div className="category-detail-page">
            <div className="hero-container-main" ref={containerRef}>
                <SideNav containerRef={containerRef} customItems={sections.map(s => ({ id: s.id, label: s.label }))} />
                {sections.map(section => (
                    <AnimatedProductSection
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        description={section.description}
                        image={section.image}
                        productId={section.productId}
                        containerRef={containerRef}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryDetail;

