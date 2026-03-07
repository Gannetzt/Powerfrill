import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { publishingService } from '../services/api';
import './PromotionPopup.css';

interface Promotion {
    id: number;
    title: string;
    image_url: string;
    cta_link: string;
}

const PromotionPopup: React.FC = () => {
    const [promo, setPromo] = useState<Promotion | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();
    const { user } = useAuth();

    // Determine current screen ID from path
    const getScreenId = () => {
        const path = location.pathname;
        if (path === '/') return 'global';
        const parts = path.split('/').filter(Boolean);
        if (parts.length > 0) return parts[0];
        return 'global';
    };

    useEffect(() => {
        const fetchPromos = async () => {
            // Only show on login page and only if not seen in this session
            if (location.pathname !== '/login' || sessionStorage.getItem('promotionSeen')) {
                return;
            }

            try {
                const screen = getScreenId();
                const promos = await publishingService.getPromotions(screen);
                if (promos && promos.length > 0) {
                    setPromo(promos[0]);

                    const timer = setTimeout(() => {
                        setIsVisible(true);
                        sessionStorage.setItem('promotionSeen', 'true');
                    }, 2000);
                    return () => clearTimeout(timer);
                }
            } catch (error) {
                console.error('Failed to fetch promotions:', error);
            }
        };

        setIsVisible(false);
        fetchPromos();
    }, [location.pathname]);

    const isAdmin = user?.role === 'ADMIN' || user?.role === 'EDITOR';

    if (!promo || !isVisible || isAdmin) return null;

    return (
        <div className="promotion-overlay">
            <div className="promotion-popup">
                <button className="close-popup" onClick={() => setIsVisible(false)}>×</button>
                <div className="promo-content">
                    <img src={promo.image_url} alt={promo.title} />
                    <div className="promo-details">
                        <h2>{promo.title}</h2>
                        {promo.cta_link && (
                            <a href={promo.cta_link} className="promo-cta" onClick={() => setIsVisible(false)}>
                                LEARN MORE
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionPopup;
