import React, { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import AdminHeader from '../components/AdminHeader';
import './AdminDashboard.css'; // Reusing dashboard styles for consistency

interface Inquiry {
    id: number;
    message: string;
    product_list: string[];
    status: string;
    created_at: string;
    user_id: number;
    user_email: string;
    user_name: string | null;
    user_phone: string | null;
}

const AdminQuotations: React.FC = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const data = await apiRequest('/inquiries');
            setInquiries(data);
        } catch (err: any) {
            console.error('Failed to fetch inquiries:', err);
            setError(err.message || 'Failed to load quotations');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="admin-loading">FETCHING QUOTATIONS...</div>;

    return (
        <div className="admin-dashboard">
            <AdminHeader />
            <main className="admin-main">
                <div className="admin-header-actions">
                    <h2>Received Quotations (Inquiries)</h2>
                    <button onClick={fetchInquiries} className="save-button">Refresh</button>
                </div>

                {error && <div className="admin-notification error">{error}</div>}

                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>User (Email / Phone)</th>
                                <th>Products</th>
                                <th>Message</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No quotations received yet.</td>
                                </tr>
                            ) : (
                                inquiries.map(inquiry => (
                                    <tr key={inquiry.id}>
                                        <td>#{inquiry.id}</td>
                                        <td>{new Date(inquiry.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <strong>{inquiry.user_name || 'N/A'}</strong><br />
                                            <span style={{ fontSize: '0.85em', color: '#888' }}>{inquiry.user_email}</span><br />
                                            {inquiry.user_phone && <span style={{ fontSize: '0.85em', color: '#3b82f6' }}>{inquiry.user_phone}</span>}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                {inquiry.product_list.map((slug, i) => (
                                                    <span key={i} className="status-badge" style={{ background: '#333' }}>{slug}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td><div style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={inquiry.message}>{inquiry.message}</div></td>
                                        <td>
                                            <span className={`status-badge ${inquiry.status === 'pending' ? 'draft' : 'active'}`}>
                                                {inquiry.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminQuotations;
