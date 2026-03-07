import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { ProductData } from '../data/products';
import { productsData } from '../data/products';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/all';
import { publishingService } from '../services/api';
import './ProductPage.css';

import ChargingSimulation from './ChargingSimulation';
import HighFidelityBatteryPack from './HighFidelityBatteryPack';
const ProductPage: React.FC<ProductData> = (product) => {
    const {
        id,
        title,
        subtitle,
        image,
        productType,
        brief,
        features,
        description,
        advantages,
        applications,
        gallery,
        industryTags,
        specifications,
        hideQuotation,
        categoryId,
        menuId,
        chemistry,
        certification,
        cycleLife,
        warrantyYears,
        chargingTime,
        voltageNominal,
        capacityAh
    } = product;

    const { addToCart } = useCart();
    const [addedSuccessfully, setAddedSuccessfully] = React.useState(false);
    const [activeImage, setActiveImage] = React.useState(image);
    const [resources, setResources] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchResources = async () => {
            try {
                const data = await publishingService.getResources(menuId);
                setResources(data);
            } catch (error) {
                console.error('Failed to fetch resources:', error);
            }
        };
        fetchResources();
    }, [menuId]);

    const containerRef = useRef<HTMLDivElement>(null);
    const quoteBtnRef = useRef<HTMLButtonElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const handleAddToCart = contextSafe(() => {
        if (addedSuccessfully) return;

        addToCart({
            id,
            title,
            subtitle,
            image,
            quantity: 1
        });

        const btn = quoteBtnRef.current;
        if (!btn) return;

        setAddedSuccessfully(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    gsap.to(btn, {
                        text: { value: 'ADD TO QUOTATION' },
                        duration: 0.5,
                        onComplete: () => setAddedSuccessfully(false)
                    });
                }, 3000);
            }
        });

        // Sending... (Diff animation)
        tl.to(btn, {
            duration: 0.8,
            text: {
                value: 'ADDING...',
                type: 'diff'
            },
            ease: 'sine.in'
        });

        // Loop feedbaclk
        tl.to(btn, {
            duration: 0.5,
            text: {
                value: 'ADDING',
                type: 'diff'
            },
            ease: 'sine.inOut',
            repeat: 3,
            yoyo: true
        });

        // Sent! (Success)
        tl.to(btn, {
            text: 'ADDED TO QUOTE!',
            duration: 0.4,
            ease: 'none',
            className: 'et-primary-btn success'
        }, '+=0.2');
    });

    // Flip Gallery implementation
    useGSAP(() => {
        if (!galleryRef.current) return;

        const galleryElement = galleryRef.current;
        const items = galleryElement.querySelectorAll('.gallery__item');

        // Capture initial state
        const state = Flip.getState(items);

        // Apply final state class
        galleryElement.classList.add('gallery--final');

        const flip = Flip.to(state, {
            simple: true,
            ease: "expoScale(1, 5)",
            paused: true
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: galleryElement,
                start: "center center",
                end: "+=100%",
                scrub: true,
                pin: true,
                invalidateOnRefresh: true
            }
        });

        tl.add(flip);

    }, { scope: containerRef, dependencies: [gallery] });

    // Related products logic
    const relatedProducts = productsData
        .filter(p => p.id !== id && (p.categoryId === categoryId || p.industryTags.some(t => industryTags.includes(t))))
        .slice(0, 4);

    return (
        <div ref={containerRef} className="product-page-enterprise">
            <section className="product-section-hero">
                <div className="hero-grid container">
                    <div className="hero-visuals">
                        <motion.div
                            className="main-display-wrap"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            {id === 'velopack-800v' ? (
                                <ChargingSimulation />
                            ) : id === 'series-p86' ? (
                                <HighFidelityBatteryPack />
                            ) : (
                                <img src={activeImage} alt={title} className="main-product-img" />
                            )}
                        </motion.div>

                        {gallery && gallery.length > 0 && (
                            <div id="gallery-8" ref={galleryRef} className="gallery-morph-wrap">
                                {[image, ...gallery].map((img, i) => (
                                    <div
                                        key={i}
                                        className={`gallery__item ${activeImage === img ? 'active' : ''}`}
                                        onClick={() => setActiveImage(img)}
                                    >
                                        <img src={img} alt={`${title} view ${i}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="hero-info">
                        <nav className="enterprise-breadcrumb">
                            <Link to="/products">Portfolio</Link>
                            <span className="sep">/</span>
                            <Link to={`/hub/${menuId}`}>{menuId.replace('-', ' ')}</Link>
                            <span className="sep">/</span>
                            <span className="current">{title}</span>
                        </nav>

                        <motion.h1 className="et-title">{title}</motion.h1>
                        <p className="et-subtitle">{subtitle}</p>

                        <div className="et-brief-box">
                            <h3>Engineering Performance</h3>
                            <p>{brief}</p>
                        </div>

                        <div className="et-highlights-strip">
                            {chemistry && (
                                <div className="highlight-item">
                                    <span className="h-val">{chemistry}</span>
                                    <span className="h-lab">CHEMISTRY</span>
                                </div>
                            )}
                            {certification && (
                                <div className="highlight-item highlight-cert">
                                    <span className="h-val">{certification}</span>
                                    <span className="h-lab">CERTIFICATION</span>
                                </div>
                            )}
                            {cycleLife && (
                                <div className="highlight-item">
                                    <span className="h-val">{cycleLife}</span>
                                    <span className="h-lab">CYCLE LIFE</span>
                                </div>
                            )}
                            {!chemistry && features.slice(0, 3).map((f, i) => (
                                <div key={i} className="highlight-item">
                                    <span className="h-val">{f.value}</span>
                                    <span className="h-lab">{f.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Trust Badges Section */}
                        <div className="et-trust-badges">
                            <div className="trust-badge">
                                <span className="badge-icon">🛡️</span>
                                <span className="badge-text">AIS 156 PHASE 2</span>
                            </div>
                            <div className="trust-badge">
                                <span className="badge-icon">🚚</span>
                                <span className="badge-text">PAN INDIA DELIVERY</span>
                            </div>
                            <div className="trust-badge">
                                <span className="badge-icon">⚙️</span>
                                <span className="badge-text">CUSTOM SOLUTIONS</span>
                            </div>
                        </div>

                        <div className="et-cta-group">
                            {!hideQuotation && productType === 'hardware' && (
                                <button
                                    ref={quoteBtnRef}
                                    className={`et-primary-btn ${addedSuccessfully ? 'success' : ''}`}
                                    onClick={handleAddToCart}
                                    disabled={addedSuccessfully}
                                >
                                    ADD TO QUOTATION
                                </button>
                            )}
                            <button className="et-secondary-btn" onClick={() => {
                                const section = document.getElementById('downloads-section');
                                section?.scrollIntoView({ behavior: 'smooth' });
                            }}>DOWNLOAD DATASHEET</button>
                        </div>
                    </div>
                </div>
            </section>

            {resources.length > 0 && (
                <section id="downloads-section" className="product-section-downloads bg-dark">
                    <div className="container">
                        <h2 className="section-label">00. Technical Library</h2>
                        <h3 className="downloads-title">Available Resources</h3>
                        <div className="downloads-grid">
                            {resources.map(res => (
                                <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="download-card">
                                    <div className="dl-icon">📄</div>
                                    <div className="dl-info">
                                        <h4>{res.title}</h4>
                                        <span>{res.type.toUpperCase()} • PDF</span>
                                    </div>
                                    <div className="dl-arrow">↓</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="product-section-engineering bg-darker">
                <div className="container grid-2">
                    <div className="eng-narrative">
                        <h2 className="section-label">01. Engineering Narrative</h2>
                        <h3 className="eng-title">Technical Description</h3>
                        <p className="eng-desc">{description}</p>
                        {applications && (
                            <div className="eng-sub-box">
                                <h4>Operational Range</h4>
                                <p>{applications}</p>
                            </div>
                        )}
                    </div>

                    <div className="eng-advantages">
                        <h2 className="section-label">02. Core Advantages</h2>
                        <div className="adv-list">
                            {advantages?.map((adv, i) => (
                                <div key={i} className="adv-card">
                                    <div className="adv-icon">✓</div>
                                    <p>{adv}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="product-section-specs">
                <div className="container">
                    <h2 className="section-label text-center">03. Technical Data Sheet</h2>
                    <h3 className="specs-main-title text-center">Performance Specifications</h3>
                    <div className="specs-table-wrap">
                        <table className="specs-table">
                            <tbody>
                                {voltageNominal && (
                                    <tr>
                                        <td className="spec-key">NOMINAL VOLTAGE</td>
                                        <td className="spec-val">{voltageNominal}</td>
                                    </tr>
                                )}
                                {capacityAh && (
                                    <tr>
                                        <td className="spec-key">RATED CAPACITY</td>
                                        <td className="spec-val">{capacityAh}</td>
                                    </tr>
                                )}
                                {chargingTime && (
                                    <tr>
                                        <td className="spec-key">CHARGING TIME</td>
                                        <td className="spec-val">{chargingTime}</td>
                                    </tr>
                                )}
                                {warrantyYears && (
                                    <tr>
                                        <td className="spec-key">WARRANTY</td>
                                        <td className="spec-val">{warrantyYears} YEARS</td>
                                    </tr>
                                )}
                                {Object.entries(specifications).map(([key, val], i) => (
                                    <tr key={i}>
                                        <td className="spec-key">{key}</td>
                                        <td className="spec-val">{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="product-section-discovery bg-darker">
                <div className="container">
                    <h2 className="section-label">04. Discovery</h2>
                    <h3 className="discovery-title">Interconnected Systems</h3>
                    <div className="related-grid-et">
                        {relatedProducts.map(rel => (
                            <Link key={rel.id} to={`/${rel.menuId}/${rel.groupId}/${rel.categoryId}/${rel.slug}`} className="discovery-card">
                                <div className="d-card-img">
                                    <img src={rel.image} alt={rel.title} />
                                </div>
                                <div className="d-card-body">
                                    <span className="d-cat">{rel.category}</span>
                                    <h4>{rel.title}</h4>
                                    <p>{rel.subtitle}</p>
                                    <div className="d-card-footer">
                                        <span className="view-link">View Specs →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductPage;
