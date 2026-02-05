import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ProductPage.css';

interface Feature {
    value: string;
    label: string;
}

interface ProductPageProps {
    categoryPath: string[];
    title: string;
    subtitle: string;
    image: string;
    features: Feature[];
    description: string;
    advantages?: string[];
    applications?: string;
    proTip?: string;
}

const PowerSignature = () => (
    <div className="power-signature-backdrop">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
        </svg>
    </div>
);

const ProductPage: React.FC<ProductPageProps> = ({
    categoryPath,
    title,
    subtitle,
    image,
    features,
    description,
    advantages,
    applications,
    proTip
}) => {
    const [activeTab, setActiveTab] = React.useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'specs', label: 'Technical Specs' },
        { id: 'applications', label: 'Applications', show: !!applications },
        { id: 'advantages', label: 'Why Choose This?', show: !!advantages }
    ].filter(tab => tab.show !== false);

    return (
        <div className="product-page">
            <PowerSignature />
            <header className="product-hero-section">
                <img src={image} alt={title} className="product-hero-bg" />
                <div className="product-hero-content">
                    <motion.h1
                        className="product-title"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        className="product-subtitle"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </header>

            <div className="product-breadcrumb-container">
                <Link to="/products" className="breadcrumb-link">Products</Link>
                {categoryPath.map((path, index) => (
                    <React.Fragment key={index}>
                        <span className="breadcrumb-sep">/</span>
                        <span className={`breadcrumb-item ${index === categoryPath.length - 1 ? 'active' : ''}`}>
                            {path}
                        </span>
                    </React.Fragment>
                ))}
            </div>

            <div className="product-wizard-container">
                {/* Wizard Navigation */}
                <nav className="product-wizard-nav">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`wizard-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="tab-underline"
                                    className="tab-underline"
                                />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Wizard Content */}
                <div className="product-wizard-content-wrap">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="wizard-tab-pane"
                    >
                        {activeTab === 'overview' && (
                            <div className="pane-overview">
                                <h3 className="pane-heading">Overview</h3>
                                <p className="pane-description">{description}</p>
                                {proTip && (
                                    <div className="pro-tip-box">
                                        <strong>Pro Tip:</strong> {proTip}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'specs' && (
                            <div className="pane-specs">
                                <h3 className="pane-heading">Technical Specifications</h3>
                                <div className="specs-grid">
                                    {features.map((feature, idx) => (
                                        <div key={idx} className="product-feature-row">
                                            <span className="spec-label">{feature.label}</span>
                                            <span className="spec-value">{feature.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'applications' && (
                            <div className="pane-applications">
                                <h3 className="pane-heading">Applications</h3>
                                <div className="applications-text">
                                    {applications}
                                </div>
                            </div>
                        )}

                        {activeTab === 'advantages' && (
                            <div className="pane-advantages">
                                <h3 className="pane-heading">Why Choose This?</h3>
                                <ul className="advantages-list">
                                    {advantages?.map((adv, i) => (
                                        <li key={i} className="advantage-item">
                                            <span className="check-icon">✓</span> {adv}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
