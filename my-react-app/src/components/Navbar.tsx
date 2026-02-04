import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/powerfrill-logo.png';

const navLinks = [
    { id: 'solar', label: 'Solar Solutions', path: '/products/solar' },
    { id: 'storage', label: 'Energy Storage', path: '/products/storage' },
    { id: 'batteries', label: 'Battery Packs', path: '/products/batteries' },
    { id: 'pumps', label: 'Pumps & Motors', path: '/category/pumps-motors' },
    { id: 'innovation', label: 'Innovation' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
];


const productsMenu = {
    title: 'Solar Energy & Solar Power Solutions',
    categories: [
        {
            name: 'Solar Panels',
            items: [
                { label: 'Mono Facial', id: 'mono-facial' },
                { label: 'Bi-Facial', id: 'bi-facial' },
                { label: 'Topcon', id: 'topcon' }
            ]
        },
        {
            name: 'Autonomous Cleaning Robotic Systems',
            items: [
                { label: 'Dobby R1', id: 'dobby-r1' },
                { label: 'Dobby R2', id: 'dobby-r2' }
            ]
        },
        {
            name: 'Active Tracking Systems',
            items: [
                { label: 'Single Axis Tracker', id: 'single-axis-tracker' },
                { label: 'Dual Axis Tracker', id: 'dual-axis-tracker' },
                { label: 'Weather Mitigation System', id: 'weather-mitigation' }
            ]
        },
        {
            name: 'Miscellaneous',
            items: [
                { label: 'On Grid Inverters', id: 'on-grid-inverters' },
                { label: 'Off Grid Inverters', id: 'off-grid-inverters' },
                { label: 'Hybrid Inverters', id: 'hybrid-inverters' },
                { label: 'Solar Net Meters', id: 'solar-net-meters' },
                { label: 'Earthing & Lightning Arresters', id: 'earthing-arresters' },
                { label: 'SCADA & Data Logger Systems', id: 'scada-systems' },
                { label: 'Plant Efficiency Management Systems', id: 'efficiency-systems' },
                { label: 'Computer Aided Framework', id: 'computer-framework' },
                { label: 'Pre Treated Steel Frames', id: 'steel-frames' },
                { label: 'Prefabricated Mounting Structures', id: 'mounting-structures' }
            ]
        },
        {
            name: 'Energy Storage Systems',
            items: [
                { label: 'Micro Power Banks', id: 'micro-power-banks' },
                { label: 'Enterprise Power Banks', id: 'enterprise-power-banks' },
                { label: 'Energy Farms – Containerized Banks', id: 'energy-farms' },
                { label: 'Utility Scale Energy Storage', id: 'utility-scale' },
                { label: 'Mobile Power Banks', id: 'mobile-power-banks' }
            ]
        }
    ]
};

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (id: string, path?: string) => {
        setIsMenuOpen(false);
        setShowProducts(false);

        if (path) {
            navigate(path);
            return;
        }

        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };


    const handleProductClick = () => {
        setIsMenuOpen(false);
        setShowProducts(false);
    };

    const toggleCategory = (name: string) => {
        setExpandedCategory(expandedCategory === name ? null : name);
    };

    // Handle scroll on mount if navigating back to home
    React.useEffect(() => {
        if (location.state && (location.state as any).scrollTo) {
            const id = (location.state as any).scrollTo;
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                // Clear state
                navigate(location.pathname, { replace: true, state: {} });
            }, 100);
        }
    }, [location, navigate]);

    // Handle body scroll lock
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => document.body.classList.remove('no-scroll');
    }, [isMenuOpen]);


    return (
        <>
            <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>

                <div className="header-container">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                        <img src={logo} alt="Powerfrill" className="logo-img" />
                    </Link>
                    <button
                        className="menu-toggle"
                        onClick={() => { setIsMenuOpen(!isMenuOpen); setShowProducts(false); }}
                        aria-label="Toggle Menu"
                    >
                        <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
                    </button>
                </div>
            </header>

            <div className={`fullscreen-menu ${isMenuOpen ? 'open' : ''}`}>
                {!showProducts ? (
                    <nav className="menu-content">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                className="menu-link"
                                onClick={() => handleNavClick(link.id, (link as any).path)}
                            >
                                {link.label}
                            </button>
                        ))}

                    </nav>
                ) : (
                    <div className="products-panel">
                        <button className="back-btn" onClick={() => setShowProducts(false)}>
                            ← Back
                        </button>
                        <h2 className="products-title">{productsMenu.title}</h2>
                        <div className="products-categories">
                            {productsMenu.categories.map((category) => (
                                <div key={category.name} className="category-group">
                                    <button
                                        className={`category-header ${expandedCategory === category.name ? 'expanded' : ''}`}
                                        onClick={() => toggleCategory(category.name)}
                                    >
                                        {category.name}
                                        <span className="chevron">{expandedCategory === category.name ? '−' : '+'}</span>
                                    </button>
                                    {expandedCategory === category.name && (
                                        <div className="category-items">
                                            {category.items.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    to={`/product/${item.id}`}
                                                    className="product-item"
                                                    onClick={handleProductClick}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
