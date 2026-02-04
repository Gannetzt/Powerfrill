import React from 'react';
import './Footer.css';
import logo from '../assets/powerfrill-logo.png';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <img src={logo} alt="Powerfrill" className="footer-logo" />
                <p className="footer-text">&copy; {new Date().getFullYear()} Powerfrill. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
