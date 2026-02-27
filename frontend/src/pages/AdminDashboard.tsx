import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import './AdminDashboard.css';
import AdminHeader from '../components/AdminHeader';

const AdminDashboard: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const fetchProducts = async () => {
        try {
            const data = await productService.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            showNotification('Failed to fetch product catalog', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    if (loading) return <div className="admin-loading">INITIALIZING SECURE SESSION...</div>;

    return (
        <div className="admin-dashboard">
            {notification && (
                <div className={`admin-notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <AdminHeader />

            <main className="admin-main">


                <section className="dashboard-stats">
                    <div className="stat-card">
                        <h3>Total Inventory</h3>
                        <p>{products.length}</p>
                        <Link to="/admin/products" className="stat-link">View Full Inventory →</Link>
                    </div>
                    <div className="stat-card">
                        <h3>Active Solutions</h3>
                        <p>{Array.from(new Set(products.map(p => p.categoryId))).length}</p>
                        <Link to="/admin/publishing" className="stat-link">Manage Solutions →</Link>
                    </div>
                    <div className="stat-card">
                        <h3>System Health</h3>
                        <p className="status-badge">OPTIMAL</p>
                        <Link to="/admin/staff" className="stat-link">Check Permissions →</Link>
                    </div>
                </section>

                <section className="dashboard-shortcuts">
                    <div className="shortcut-grid">
                        <Link to="/admin/products/new" className="shortcut-card">
                            <div className="shortcut-icon">+</div>
                            <div className="shortcut-text">
                                <h4>New Product</h4>
                                <p>Add a technical system to the catalog</p>
                            </div>
                        </Link>
                        <Link to="/admin/publishing" className="shortcut-card">
                            <div className="shortcut-icon">📢</div>
                            <div className="shortcut-text">
                                <h4>New Promotion</h4>
                                <p>Launch a campaign or brochure</p>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
