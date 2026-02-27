import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import AdminHeader from '../components/AdminHeader';
import './AdminDashboard.css'; // Reusing dashboard styles for consistency

const AdminProductList: React.FC = () => {
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

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            try {
                await productService.delete(id);
                showNotification('Product deleted successfully', 'success');
                fetchProducts();
            } catch (error) {
                showNotification('Failed to delete product', 'error');
            }
        }
    };

    if (loading) return <div className="admin-loading">LOADING INVENTORY...</div>;

    return (
        <div className="admin-dashboard">
            {notification && (
                <div className={`admin-notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <AdminHeader />

            <main className="admin-main">
                <section className="product-management">
                    <div className="section-header">
                        <h2>Full Inventory</h2>
                        <div className="header-buttons">
                            <Link to="/admin/products/new" className="add-button">+ NEW PRODUCT</Link>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Slug</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product: any) => (
                                    <tr key={product.id}>
                                        <td className="p-title">{product.title}</td>
                                        <td>{product.category}</td>
                                        <td className="p-slug">{product.slug}</td>
                                        <td><span className="status-live">Live</span></td>
                                        <td className="actions">
                                            <Link to={`/admin/products/${product.id}`} className="edit-btn">Edit</Link>
                                            <button onClick={() => handleDelete(product.id, product.title)} className="delete-btn">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminProductList;
