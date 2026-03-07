import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/api';
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
    const { cartItems, cartCount, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [quoteId, setQuoteId] = useState('');
    const [message, setMessage] = useState('');
    const [projectType, setProjectType] = useState('Standard Solution');
    const [voltage, setVoltage] = useState('');
    const [capacity, setCapacity] = useState('');
    const [industrySegment, setIndustrySegment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const productIds = cartItems.map(item => item.id);
            const inquiry = await productService.createInquiry({
                message,
                product_list: productIds,
                project_type: projectType,
                voltage_required: voltage,
                capacity_required: capacity,
                industry_segment: industrySegment
            });

            setQuoteId(`QT-${inquiry.id}`);
            setIsSubmitted(true);
            clearCart();
        } catch (err: any) {
            setError(err.message || 'Failed to submit inquiry');
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="checkout-success">
                <motion.div
                    className="success-content"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="success-icon">✓</div>
                    <h1>QUOTATION RECEIVED</h1>
                    <p className="quote-id-wrap">REFERENCE ID: <span className="quote-id">{quoteId}</span></p>
                    <p className="success-msg">
                        Your technical specification has been queued for engineering review.
                        A PowerFill specialist will contact you with detailed pricing within 24 hours.
                    </p>
                    <button className="back-btn" onClick={() => navigate('/')}>RETURN TO INDUSTRIAL HUB</button>
                </motion.div>
            </div>
        );
    }

    if (cartCount === 0) {
        return (
            <div className="checkout-empty">
                <h1>QUOTATION LIST EMPTY</h1>
                <p>Please select technical systems from our directory to request a quote.</p>
                <button className="back-btn" onClick={() => navigate('/products')}>EXPLORE FIELDS</button>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <header className="checkout-header">
                    <h1>TECHNICAL QUOTATION</h1>
                    <p>Review your selected industrial systems and request engineering analysis.</p>
                </header>

                <div className="checkout-grid">
                    <div className="checkout-summary">
                        <div className="summary-card">
                            <h2>SYSTEM SUMMARY ({cartCount})</h2>
                            <div className="summary-items">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="summary-item">
                                        <div className="item-main">
                                            <h3>{item.title}</h3>
                                            <p>{item.subtitle}</p>
                                        </div>
                                        <div className="item-qty">QTY: {item.quantity}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="checkout-form-wrap">
                        {!user ? (
                            <div className="auth-prompt-card">
                                <h2>AUTHENTICATION REQUIRED</h2>
                                <p>You must be signed in to submit a technical quotation and track your inquiry status.</p>
                                <div className="auth-prompt-actions">
                                    <button className="auth-login-btn" onClick={() => navigate('/login')}>SIGN IN / SIGN UP</button>
                                </div>
                            </div>
                        ) : (
                            <form className="quotation-form" onSubmit={handleSubmit}>
                                <h2>REQUESTER DETAILS</h2>
                                <div className="user-info-badge">
                                    <div className="user-avatar">{user.full_name?.[0] || user.email[0].toUpperCase()}</div>
                                    <div className="user-details">
                                        <span className="user-name">{user.full_name || user.username || 'Industrial Partner'}</span>
                                        <span className="user-email">{user.email}</span>
                                    </div>
                                    <button type="button" className="edit-profile-btn" onClick={() => navigate('/login')}>Change Account</button>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>PROJECT TYPE</label>
                                        <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
                                            <option value="Standard Solution">Standard Solution</option>
                                            <option value="Custom Battery Pack">Custom Battery Pack</option>
                                            <option value="OEM Manufacturing">OEM Manufacturing</option>
                                            <option value="Prototype Development">Prototype Development</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>INDUSTRY SEGMENT</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. E-Rickshaw, Solar, Medical"
                                            value={industrySegment}
                                            onChange={(e) => setIndustrySegment(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>REQUIRED VOLTAGE (V)</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 48V, 60V, 72V"
                                            value={voltage}
                                            onChange={(e) => setVoltage(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>REQUIRED CAPACITY (Ah)</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 100Ah, 200Ah"
                                            value={capacity}
                                            onChange={(e) => setCapacity(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group full">
                                        <label>TECHNICAL SPECIFICATIONS / PROJECT NOTES</label>
                                        <textarea
                                            placeholder="Tell us about your technical requirements or specific use cases..."
                                            rows={6}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                {error && <div className="error-message">{error}</div>}

                                <button type="submit" className="submit-quote-btn" disabled={loading}>
                                    {loading ? 'PROCESSING...' : 'SUBMIT QUOTATION REQUEST'}
                                </button>
                                <p className="form-disclaimer">
                                    * This is a technical consultation request. Final pricing and data persistence are subject to engineering validation.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
