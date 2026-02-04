import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { solutions, getCategoriesBySolutionId } from '../data/products';
import SideNav from './SideNav';
import './ProductsOverview.css';
import './Hero.css'; // Reuse Hero styles for scroll sections

interface AnimatedCategorySectionProps {
    id: string;
    title: string;
    description: string;
    image: string;
    categoryId?: string;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const AnimatedCategorySection: React.FC<AnimatedCategorySectionProps> = ({
    id, title, description, image, categoryId, containerRef
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
                        {categoryId && (
                            <div className="hero-actions">
                                <Link to={`/category/${categoryId}`} className="btn btn-primary btn-lg">
                                    View Products
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

const ProductsOverview: React.FC = () => {
    const { solutionId } = useParams<{ solutionId: string }>();
    const containerRef = useRef<HTMLDivElement>(null);
    const solution = solutions.find(s => s.id === solutionId) || solutions[0];
    const solutionCategories = getCategoriesBySolutionId(solution.id);

    if (solutionId && !solutions.find(s => s.id === solutionId)) {
        return <Navigate to="/products/solar" replace />;
    }

    const sections = [
        {
            id: 'overview',
            label: 'Overview',
            title: solution.title,
            description: "Explore our industry-leading technologies and custom engineering solutions.",
            image: solution.heroImage,
            categoryId: undefined
        },
        ...solutionCategories.map(cat => ({
            id: cat.id,
            label: cat.name,
            title: cat.name,
            description: cat.description,
            image: cat.image,
            categoryId: cat.id
        }))
    ];

    return (
        <div className="products-overview-page">
            <div className="hero-container-main" ref={containerRef}>
                <SideNav containerRef={containerRef} customItems={sections.map(s => ({ id: s.id, label: s.label }))} />
                {sections.map(section => (
                    <AnimatedCategorySection
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        description={section.description}
                        image={section.image}
                        categoryId={section.categoryId}
                        containerRef={containerRef}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsOverview;
