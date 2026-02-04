import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/powerfrill-logo.png';

const navLinks = [
    { id: 'products', label: 'Products', isSubMenu: true },
    { id: 'application', label: 'Applications' },
    { id: 'innovation', label: 'Innovation' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
];

const productsMenu = {
    title: 'Our Solutions',
    categories: [
        {
            name: 'Solar energy & Solar Power Solutions',
            path: '/products',
            anchor: 'solar'
        },
        {
            name: 'Energy storage systems',
            path: '/products',
            anchor: 'storage'
        },
        {
            name: 'Battery Packs',
            path: '/products',
            anchor: 'batteries'
        }
    ]
};



const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showProducts, setShowProducts] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (id: string, path?: string, isSubMenu?: boolean) => {
        if (isSubMenu) {
            setShowProducts(true);
            return;
        }

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
                                onClick={() => handleNavClick(link.id, (link as any).path, (link as any).isSubMenu)}
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
                                    <div className="category-header-row single-link">
                                        <Link
                                            to={category.path}
                                            state={{ scrollTo: category.anchor }}
                                            className="category-header hub-full-link"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                setShowProducts(false);
                                            }}
                                        >
                                            {category.name}
                                            <span className="chevron">→</span>
                                        </Link>
                                    </div>
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
