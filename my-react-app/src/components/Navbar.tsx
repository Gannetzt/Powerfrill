import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/powerfrill-logo.png';


const navLinks = [
    { id: 'products', label: 'Products', path: '/products', type: 'link' },
    { id: 'bess', label: 'BESS', type: 'scroll' },
    { id: 'application', label: 'Application', type: 'scroll' },
    { id: 'innovation', label: 'Innovation', type: 'scroll' },
    { id: 'about', label: 'About', type: 'scroll' },
    { id: 'contact', label: 'Contact', type: 'scroll' }
];

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (id: string, type: string, path?: string) => {
        setIsMenuOpen(false);

        if (type === 'link' && path) {
            navigate(path);
            window.scrollTo(0, 0);
        } else {
            if (location.pathname !== '/') {
                navigate('/', { state: { scrollTo: id } });
            } else {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
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

    // Handle body scroll lock and global blur
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('no-scroll');
            document.body.classList.add('menu-is-open');
        } else {
            document.body.classList.remove('no-scroll');
            document.body.classList.remove('menu-is-open');
        }
        return () => {
            document.body.classList.remove('no-scroll');
            document.body.classList.remove('menu-is-open');
        };
    }, [isMenuOpen]);


    return (
        <>
            <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>

                <div className="header-container">
                    <div className="logo-wrapper">
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                            <img src={logo} alt="Powerfrill" className="logo-img" />
                        </Link>
                    </div>
                    <button
                        className="menu-toggle"
                        onClick={() => { setIsMenuOpen(!isMenuOpen); }}
                        aria-label="Toggle Menu"
                    >
                        <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
                    </button>
                </div>
            </header>

            <div className={`fullscreen-menu ${isMenuOpen ? 'open' : ''}`}>
                <nav className="menu-content">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            className="menu-link"
                            onClick={() => handleNavClick(link.id, link.type, link.path)}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Navbar;
