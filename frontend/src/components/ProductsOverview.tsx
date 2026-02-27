import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import ChargingSimulation from './ChargingSimulation';
import './ProductsOverview.css';



const ProductsOverview: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="products-overview-page">
            {/* Direct Hero Simulation - Clean & Responsive */}
            <section className="products-hero-simulation">
                <div className="hero-simulation-bg">
                    <ChargingSimulation />
                </div>

                <div className="hero-simulation-overlay">
                    <div className="hero-text-content">
                        <motion.h1
                            className="slider-heading"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            «Our components form the core <br />
                            of the hydraulic system.»
                        </motion.h1>
                        <motion.div
                            className="slider-underline"
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />

                        {/* Glassy E-commerce Categories Navigation */}
                        <motion.div
                            className="glassy-categories-nav"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <div className="gc-card" onClick={() => navigate('/hub/solar-energy')}>
                                <div className="gc-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                                        <path d="M2 17L12 22L22 17" />
                                        <path d="M2 12L12 17L22 12" />
                                    </svg>
                                </div>
                                <span>CORES</span>
                            </div>
                            <div className="gc-card" onClick={() => navigate('/hub/battery-bess')}>
                                <div className="gc-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M21 16.09V7.91C21 7.42 20.74 6.96 20.31 6.72L13.31 2.72C12.5 2.25 11.5 2.25 10.69 2.72L3.69 6.72C3.26 6.96 3 7.42 3 7.91V16.09C3 16.58 3.26 17.04 3.69 17.28L10.69 21.28C11.5 21.75 12.5 21.75 13.31 21.28L20.31 17.28C20.74 17.04 21 16.58 21 16.09Z" />
                                        <path d="M12 22V12" />
                                        <path d="M12 12L20.3 7.2" />
                                        <path d="M12 12L3.7 7.2" />
                                    </svg>
                                </div>
                                <span>PACKS</span>
                            </div>
                            <div className="gc-card" onClick={() => navigate('/hub/future-tech')}>
                                <div className="gc-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                        <line x1="12" y1="22.08" x2="12" y2="12" />
                                    </svg>
                                </div>
                                <span>MODULES</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>



            {/* Breadcrumbs & Title */}
            <div className="container content-container" id="product-content-area">
                <nav className="industrial-breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="sep">›</span>
                    <span className="active-crumb">Products</span>
                </nav>

                <div className="brand-section">
                    <h2 className="brand-title">Products</h2>
                    <div className="brand-underline"></div>
                    <p className="brand-text">
                        Where conventional solutions stop, innovation begins. With this in mind, we always strive to set new standards in technology, quality, manufacturing, delivery,
                        and customer care.
                    </p>
                </div>
            </div>

            {/* Hub Selector Section */}
            <section className="hubs-selector-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="general-product-info"
                    >
                        <h3>Explore Our Solutions</h3>
                        <p>
                            Powerfill offers a comprehensive range of cutting-edge energy solutions.
                            Click on the icons above to discover our specialized products in Solar Energy,
                            Storage Systems, and Advanced Battery Technology.
                        </p>
                        <div className="info-grid text-center mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-gray-50 rounded-lg">
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Efficiency</h4>
                                <p className="text-gray-600">Maximized energy output for every application.</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg">
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Durability</h4>
                                <p className="text-gray-600">Engineered to withstand the toughest environments.</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg">
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Innovation</h4>
                                <p className="text-gray-600">Pioneering the future of renewable energy.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>



        </div>
    );
};

export default ProductsOverview;
