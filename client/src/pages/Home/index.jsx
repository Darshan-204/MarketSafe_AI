import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth';
import './Home.css';


const Home = () => {
  const [selectedTier, setSelectedTier] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSelectTier = (tier) => {
    if (!isLoggedIn()) {
      setError('Please login to select a service tier.');
      setTimeout(() => {
        navigate('/login');
      }, 1200);
      return;
    }
    setSelectedTier(tier);
    alert(`You have selected the ${tier === 'basic' ? 'Basic (Free)' : 'Pro ($20/month)'} tier!`);
    // Proceed to next step or dashboard as needed
  };

  return (
    <div className="home-container">
      <div className="home-card redesigned">
        <section className="hero-section">
          <div className="hero-icon">🔒</div>
          <h1 className="home-title">Welcome to <span className="brand-gradient">MarketSafeAI</span></h1>
          <p className="home-description">
            <b>MarketSafeAI</b> is your trusted platform for secure and intelligent market analysis.<br />
            Our mission is to provide advanced AI-driven insights, ensuring your trading and investment decisions are safe, informed, and profitable.
          </p>
        </section>
        <section className="features-section">
          <h2 className="features-title">Why Choose MarketSafeAI?</h2>
          <div className="features-marquee">
            <div className="features-list">
              <div className="feature-card">
                <span className="feature-icon">🛡️</span>
                <div>
                  <b>Privacy-First</b>
                  <p>Integrates differential privacy and anonymization for robust data protection.</p>
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">⚡</span>
                <div>
                  <b>Real-Time Utility</b>
                  <p>Optimized for large-scale, real-time marketing analytics without compromising privacy.</p>
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">📊</span>
                <div>
                  <b>Actionable Insights</b>
                  <p>Empirical evaluation ensures a balance between privacy and predictive accuracy.</p>
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🔗</span>
                <div>
                  <b>Easy Integration</b>
                  <p>Lightweight dashboard and API for seamless marketing workflow integration.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
