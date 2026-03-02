import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink, Link } from 'react-router-dom';
import './AdminHeader.css';

const AdminHeader: React.FC = () => {
    const { user, logout } = useAuth();

    const navItems = [
        { label: 'Dashboard', path: '/admin' },
        { label: 'Inventory', path: '/admin/products' },
        { label: 'Quotations', path: '/admin/quotations' },
        { label: 'Team', path: '/admin/staff' },
        { label: 'Publishing', path: '/admin/publishing' }
    ];

    return (
        <header className="admin-header">
            <div className="header-brand-nav">
                <Link to="/" className="admin-logo-link">
                    <span className="admin-brand">POWERFRIILL</span>
                </Link>
                <nav className="top-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            end={item.path === '/admin'}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="header-actions">
                <div className="user-info-pill">
                    <span className="user-badge">{user?.role.toUpperCase()}</span>
                    <span className="user-email">{user?.email}</span>
                </div>
                <button onClick={logout} className="logout-button">LOGOUT</button>
            </div>
        </header>
    );
};

export default AdminHeader;
