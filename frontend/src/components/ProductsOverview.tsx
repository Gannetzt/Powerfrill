import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { productsData } from '../data/products';
import ProductCard from './ProductCard';
import './ProductsOverview.css';


const ProductsOverview: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'name-desc'>('default');
    const [viewMode, setViewMode] = useState<'grid-3' | 'grid-4'>('grid-3');

    const menus = Array.from(new Set(productsData.map(p => p.menuId)));

    const filteredProducts = useMemo(() => {
        let result = [...productsData];

        if (selectedMenu) {
            result = result.filter(p => p.menuId === selectedMenu);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.industryTags.some(t => t.toLowerCase().includes(query))
            );
        }

        if (sortBy === 'name-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'name-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }

        return result;
    }, [selectedMenu, searchQuery, sortBy]);

    return (
        <div className="products-ecommerce-page">
            <div className="container ecommerce-layout">
                {/* Sidebar Filters */}
                <aside className="ecommerce-sidebar">
                    <div className="sidebar-section">
                        <h4>Search Products</h4>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search by name or category..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h4>Product Hubs</h4>
                        <ul className="category-list">
                            <li
                                className={selectedMenu === null ? 'active' : ''}
                                onClick={() => setSelectedMenu(null)}
                            >
                                All Solutions
                            </li>
                            {menus.map(menu => (
                                <li
                                    key={menu}
                                    className={selectedMenu === menu ? 'active' : ''}
                                    onClick={() => setSelectedMenu(menu)}
                                >
                                    {menu.replace('-', ' ').toUpperCase()}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <h4>Applications</h4>
                        <ul className="category-list small">
                            <li onClick={() => setSearchQuery('Rickshaw')}>E-Rickshaw</li>
                            <li onClick={() => setSearchQuery('Scooter')}>E-Scooter</li>
                            <li onClick={() => setSearchQuery('Solar')}>Solar Storage</li>
                            <li onClick={() => setSearchQuery('Industrial')}>Industrial UPS</li>
                            <li onClick={() => setSearchQuery('Medical')}>Medical Grade</li>
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <h4>Need Assistance?</h4>
                        <div className="assistance-box">
                            <p>Can't find the specific energy infrastructure you need?</p>
                            <Link to="/hub/about" className="contact-link">Contact Engineering →</Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="ecommerce-main">
                    <div className="shop-controls">
                        <div className="results-count">
                            Showing {filteredProducts.length} results
                        </div>

                        <div className="controls-right">
                            <div className="view-toggle">
                                <button
                                    className={viewMode === 'grid-3' ? 'active' : ''}
                                    onClick={() => setViewMode('grid-3')}
                                    title="3 Columns"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                                </button>
                                <button
                                    className={viewMode === 'grid-4' ? 'active' : ''}
                                    onClick={() => setViewMode('grid-4')}
                                    title="4 Columns"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18"><rect x="2" y="2" width="4" height="4" /><rect x="9" y="2" width="4" height="4" /><rect x="16" y="2" width="4" height="4" /><rect x="2" y="9" width="4" height="4" /><rect x="9" y="9" width="4" height="4" /><rect x="16" y="9" width="4" height="4" /><rect x="2" y="16" width="4" height="4" /><rect x="9" y="16" width="4" height="4" /><rect x="16" y="16" width="4" height="4" /></svg>
                                </button>
                            </div>

                            <select className="sort-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                                <option value="default">Default Sorting</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                            </select>
                        </div>
                    </div>

                    <AnimatePresence mode="popLayout">
                        <motion.div
                            className={`product-grid ${viewMode}`}
                            layout
                        >
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredProducts.length === 0 && (
                        <div className="no-results">
                            <h3>No products found</h3>
                            <p>Try adjusting your search or filters to find what you're looking for.</p>
                            <button className="reset-btn" onClick={() => { setSearchQuery(''); setSelectedMenu(null); }}>Reset All Filters</button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductsOverview;

