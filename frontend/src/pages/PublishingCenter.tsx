import React, { useState, useEffect } from 'react';
import { publishingService } from '../services/api';
import AdminHeader from '../components/AdminHeader';
import './PublishingCenter.css';

interface Resource {
    id: number;
    title: string;
    type: string;
    url: string;
    target_screens: string[];
    is_active: boolean;
    created_at: string;
}

interface Promotion {
    id: number;
    title: string;
    image_url: string;
    cta_link: string;
    target_screens: string[];
    is_active: boolean;
    start_date: string;
    end_date: string;
}

const PublishingCenter: React.FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'resources' | 'promotions'>('resources');
    const [message, setMessage] = useState({ type: '', text: '' });

    // Targeting Options
    const targetOptions = [
        { id: 'global', label: 'Global (All Screens)' },
        { id: 'solar-energy', label: 'Solar Energy' },
        { id: 'battery-bess', label: 'Battery BESS' },
        { id: 'future-tech', label: 'Future Tech' },
        { id: 'smart-solutions', label: 'Smart Solutions' },
        { id: 'ev-charging', label: 'EV Charging' }
    ];

    const [newResource, setNewResource] = useState({
        title: '',
        type: 'brochure',
        url: '',
        target_screens: ['global'] as string[]
    });

    const [newPromotion, setNewPromotion] = useState({
        title: '',
        image_url: '',
        cta_link: '',
        target_screens: ['global'] as string[],
        start_date: '',
        end_date: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [resData, promoData] = await Promise.all([
                publishingService.getAllResources(),
                publishingService.getPromotions() // Using basic getter for now
            ]);
            setResources(resData);
            setPromotions(promoData);
        } catch (error) {
            console.error('Failed to fetch publishing data:', error);
            setMessage({ type: 'error', text: 'Failed to load publishing data' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateResource = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await publishingService.createResource(newResource);
            setMessage({ type: 'success', text: 'Resource published successfully' });
            setNewResource({ title: '', type: 'brochure', url: '', target_screens: ['global'] });
            fetchData();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to publish resource' });
        }
    };

    const handleCreatePromotion = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await publishingService.createPromotion(newPromotion);
            setMessage({ type: 'success', text: 'Promotion launched successfully' });
            setNewPromotion({ title: '', image_url: '', cta_link: '', target_screens: ['global'], start_date: '', end_date: '' });
            fetchData();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to launch promotion' });
        }
    };

    const handleDeleteResource = async (id: number) => {
        if (!window.confirm('Delete this resource?')) return;
        try {
            await publishingService.deleteResource(id);
            fetchData();
        } catch (error) {
            setMessage({ type: 'error', text: 'Deletion failed' });
        }
    };

    const toggleTarget = (list: string[], target: string) => {
        if (target === 'global') return ['global'];
        const newList = list.filter(t => t !== 'global');
        if (newList.includes(target)) {
            const filtered = newList.filter(t => t !== target);
            return filtered.length === 0 ? ['global'] : filtered;
        } else {
            return [...newList, target];
        }
    };

    if (loading) return <div className="admin-loading">LOADING PUBLISHING CENTER...</div>;

    return (
        <div className="publishing-center">
            <AdminHeader />
            <div className="publishing-content-area">
                <header className="publishing-header">
                    <h1>Publishing Center</h1>
                    <p>Manage brochures, pamphlets, and customer announcements</p>
                </header>

                {message.text && (
                    <div className={`status-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <div className="publishing-tabs">
                    <button
                        className={activeTab === 'resources' ? 'active' : ''}
                        onClick={() => setActiveTab('resources')}
                    >
                        Brochures & Pamphlets
                    </button>
                    <button
                        className={activeTab === 'promotions' ? 'active' : ''}
                        onClick={() => setActiveTab('promotions')}
                    >
                        Promotional Popups
                    </button>
                </div>

                <div className="publishing-content">
                    {activeTab === 'resources' ? (
                        <div className="resources-section">
                            <section className="publish-form">
                                <h2>Publish New Material</h2>
                                <form onSubmit={handleCreateResource}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            value={newResource.title}
                                            onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                                            placeholder="e.g. 2024 Solar Solutions Brochure"
                                            required
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Type</label>
                                            <select
                                                value={newResource.type}
                                                onChange={e => setNewResource({ ...newResource, type: e.target.value })}
                                            >
                                                <option value="brochure">Brochure</option>
                                                <option value="pamphlet">Pamphlet</option>
                                                <option value="tech-doc">Technical Doc</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Download URL</label>
                                            <input
                                                value={newResource.url}
                                                onChange={e => setNewResource({ ...newResource, url: e.target.value })}
                                                placeholder="https://example.com/file.pdf"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="targeting-group">
                                        <label>Visible On:</label>
                                        <div className="checkbox-grid">
                                            {targetOptions.map(opt => (
                                                <label key={opt.id} className="checkbox-item">
                                                    <input
                                                        type="checkbox"
                                                        checked={newResource.target_screens.includes(opt.id)}
                                                        onChange={() => setNewResource({
                                                            ...newResource,
                                                            target_screens: toggleTarget(newResource.target_screens, opt.id)
                                                        })}
                                                    />
                                                    {opt.label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <button type="submit" className="publish-btn">PUBLISH MATERIAL</button>
                                </form>
                            </section>

                            <section className="published-list">
                                <h2>Global Library</h2>
                                <div className="resource-grid">
                                    {resources.map(res => (
                                        <div key={res.id} className="resource-card">
                                            <div className="res-info">
                                                <h3>{res.title}</h3>
                                                <span className={`type-badge ${res.type}`}>{res.type.toUpperCase()}</span>
                                                <div className="targets">
                                                    {res.target_screens.map(t => <span key={t} className="target-tag">{t}</span>)}
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteResource(res.id)} className="delete-btn">Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className="promotions-section">
                            <section className="publish-form">
                                <h2>Launch New Promotion</h2>
                                <form onSubmit={handleCreatePromotion}>
                                    <div className="form-group">
                                        <label>Campaign Title</label>
                                        <input
                                            value={newPromotion.title}
                                            onChange={e => setNewPromotion({ ...newPromotion, title: e.target.value })}
                                            placeholder="e.g. Spring Sale 20% Off"
                                            required
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Banner Image URL</label>
                                            <input
                                                value={newPromotion.image_url}
                                                onChange={e => setNewPromotion({ ...newPromotion, image_url: e.target.value })}
                                                placeholder="https://example.com/banner.jpg"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>CTA Link</label>
                                            <input
                                                value={newPromotion.cta_link}
                                                onChange={e => setNewPromotion({ ...newPromotion, cta_link: e.target.value })}
                                                placeholder="/products/solar-panel"
                                            />
                                        </div>
                                    </div>
                                    <div className="targeting-group">
                                        <label>Target Audience (Screens):</label>
                                        <div className="checkbox-grid">
                                            {targetOptions.map(opt => (
                                                <label key={opt.id} className="checkbox-item">
                                                    <input
                                                        type="checkbox"
                                                        checked={newPromotion.target_screens.includes(opt.id)}
                                                        onChange={() => setNewPromotion({
                                                            ...newPromotion,
                                                            target_screens: toggleTarget(newPromotion.target_screens, opt.id)
                                                        })}
                                                    />
                                                    {opt.label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <button type="submit" className="publish-btn">LAUNCH CAMPAIGN</button>
                                </form>
                            </section>

                            <section className="published-list">
                                <h2>Active Campaigns</h2>
                                <div className="promo-list">
                                    {promotions.length === 0 ? <p className="empty">No active promotions</p> :
                                        promotions.map(promo => (
                                            <div key={promo.id} className="promo-card">
                                                <img src={promo.image_url} alt={promo.title} />
                                                <div className="promo-info">
                                                    <h3>{promo.title}</h3>
                                                    <div className="targets">
                                                        {promo.target_screens.map(t => <span key={t} className="target-tag">{t}</span>)}
                                                    </div>
                                                </div>
                                                <button className="delete-btn">End Campaign</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublishingCenter;
