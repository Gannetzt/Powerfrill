import React from 'react';
import './Features.css';

const features = [
    {
        title: 'Lightning Fast',
        description: 'Built with speed in mind, ensuring your users get the best experience.',
        icon: '⚡'
    },
    {
        title: 'Modern Design',
        description: 'Aesthetically pleasing layouts that wow your visitors.',
        icon: '🎨'
    },
    {
        title: 'Fully Responsive',
        description: 'Looks great on every device, from mobile to desktop.',
        icon: '📱'
    },
    {
        title: 'Secure & Safe',
        description: 'Top-notch security protocols to keep your data protected.',
        icon: '🔒'
    }
];

const Features: React.FC = () => {
    return (
        <section id="features" className="features-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Core <span className="gradient-text">Features</span></h2>
                    <p className="section-subtitle">Everything you need to launch a world-class digital product.</p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card glass">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
