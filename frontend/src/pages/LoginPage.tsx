import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { login, signup, user } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    // Redirection logic
    React.useEffect(() => {
        if (user) {
            if (user.role === 'ADMIN' || user.role === 'EDITOR') {
                navigate('/admin');
            } else if (cartCount > 0) {
                navigate('/checkout');
            } else {
                navigate('/products');
            }
        }
    }, [user, navigate, cartCount]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('username', email); // backend login accepts email in username field
        formData.append('password', password);

        try {
            await login(formData);
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await signup({
                email,
                password,
                phone_number: phoneNumber,
                full_name: fullName,
                username: username || null,
                role: 'VIEWER'
            });
            setSuccess('Account created successfully! Logging you in...');

            // Auto login after signup
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);
            await login(formData);

        } catch (err: any) {
            setError(err.message || 'Signup failed');
        }
    };

    const handleGoogleLogin = () => {
        alert("Google OAuth integration requires a Client ID from the Google Cloud Console. Logic is ready to be hooked up!");
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-tabs">
                    <button
                        className={isLogin ? 'active' : ''}
                        onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
                    >
                        SIGN IN
                    </button>
                    <button
                        className={!isLogin ? 'active' : ''}
                        onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
                    >
                        SIGN UP
                    </button>
                </div>

                <h1>{isLogin ? 'WELCOME BACK' : 'JOIN POWERFILL'}</h1>
                <p>{isLogin ? 'Access your industrial dashboard' : 'Create an account to track your quotations and inquiries'}</p>

                {success && <div className="success-message">{success}</div>}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                    {!isLogin && (
                        <>
                            <div className="input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required={!isLogin}
                                />
                            </div>
                            <div className="input-group">
                                <label>Username (Optional)</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required={!isLogin}
                                />
                            </div>
                        </>
                    )}
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="login-button">
                        {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
                    </button>
                </form>

                <div className="login-divider">
                    <span>OR</span>
                </div>

                <button className="google-login-btn" onClick={handleGoogleLogin}>
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
                    {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
