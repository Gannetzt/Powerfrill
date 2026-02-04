import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { solutions, getCategoriesBySolutionId, getProductsByCategoryId } from '../data/products';
import SideNav from './SideNav';
import './ProductsOverview.css';
import './Hero.css'; // Reuse core storytelling styles

interface CategorySliderProps {
    categoryId: string;
    categoryName: string;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categoryId, categoryName }) => {
    const products = getProductsByCategoryId(categoryId);
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProduct = products[activeIndex];

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % products.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + products.length) % products.length);

    if (products.length === 0) return null;

    return (
        <div className="category-slider-block">
            <h3 className="category-inline-title">{categoryName}</h3>

            <div className="product-slider-wrapper">
                <button className="slider-arrow left" onClick={prevSlide}>‹</button>

                <div className="product-slider-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProduct.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="active-slide-content"
                        >
                            <div className="slide-image-container">
                                <img src={activeProduct.image} alt={activeProduct.title} className="slide-main-image" />
                            </div>

                            <div className="slide-main-info">
                                <h2 className="active-product-title">{activeProduct.title}</h2>
                                <p className="active-product-subtitle">{activeProduct.subtitle}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button className="slider-arrow right" onClick={nextSlide}>›</button>

                <div className="slider-dots">
                    {products.map((_, idx) => (
                        <button
                            key={idx}
                            className={`dot ${idx === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(idx)}
                        />
                    ))}
                </div>
            </div>

            {/* Technical Details Below Slider */}
            <motion.div
                key={`details-${activeProduct.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="product-detail-expanded"
            >
                <div className="detail-grid">
                    <div className="detail-main">
                        <h4 className="detail-section-label">Overview</h4>
                        <p className="detail-description">{activeProduct.description}</p>

                        {activeProduct.advantages && (
                            <div className="advantages-section">
                                <h4 className="detail-section-label">Key Advantages</h4>
                                <ul className="advantages-list">
                                    {activeProduct.advantages.map((adv, i) => (
                                        <li key={i}>{adv}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="detail-sidebar">
                        <h4 className="detail-section-label">Technical Stats</h4>
                        <div className="detail-features">
                            {activeProduct.features.map((feature, index) => (
                                <div key={index} className="detail-feature-item">
                                    <span className="feature-val">{feature.value}</span>
                                    <span className="feature-lab">{feature.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

interface HubSectionProps {
    solution: typeof solutions[0];
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const HubSection: React.FC<HubSectionProps> = ({ solution, containerRef }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const categories = getCategoriesBySolutionId(solution.id);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        container: containerRef,
        offset: ["start end", "end start"]
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 15 });
    const scale = useTransform(springProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
    const opacity = useTransform(springProgress, [0, 0.45, 0.55, 1], [0.6, 1, 1, 0.6]);

    return (
        <section id={solution.id} ref={sectionRef} className="solution-hub-section">
            <motion.div
                className="hub-hero-sticky"
                style={{ scale, opacity }}
            >
                <div
                    className="hub-bg-image"
                    style={{ backgroundImage: `url(${solution.heroImage})` }}
                />
                <div className="hub-hero-content">
                    <h1 className="hub-title">{solution.title}</h1>
                    <div className="scroll-hint">Discover Solutions ↓</div>
                </div>
            </motion.div>

            <div className="hub-sliders-container">
                <div className="container">
                    {categories.map((cat) => (
                        <CategorySlider key={cat.id} categoryId={cat.id} categoryName={cat.name} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProductsOverview: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state && (location.state as any).scrollTo) {
            const id = (location.state as any).scrollTo;
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element && containerRef.current) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <div className="unified-products-page">
            <div className="hero-container-main" ref={containerRef}>
                <SideNav
                    containerRef={containerRef}
                    customItems={solutions.map(s => ({ id: s.id, label: s.title }))}
                />
                {solutions.map((solution) => (
                    <HubSection key={solution.id} solution={solution} containerRef={containerRef} />
                ))}
            </div>
        </div>
    );
};

export default ProductsOverview;

