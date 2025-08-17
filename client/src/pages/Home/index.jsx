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
        <section className="service-tiers-section redesigned">
          <h2 className="tiers-title">Service Tiers</h2>
          <div className="tiers-list">
            <div className={`tier-card basic${selectedTier === 'basic' ? ' selected' : ''}`}>
              <h3>Basic</h3>
              <p>Implements fundamental privacy protections suitable for internal analyses and regions with moderate privacy regulations.</p>
              <ul>
                <li>Identifier removal and pseudonymization</li>
                <li>Basic differential privacy (ϵ = 1.0)</li>
                <li>Simple k-anonymity (k = 5)</li>
              </ul>
              <button className="tier-select-btn" onClick={() => handleSelectTier('basic')}>Select Basic (Free)</button>
            </div>
            <div className={`tier-card pro${selectedTier === 'pro' ? ' selected' : ''}`}>
              <h3>Pro</h3>
              <p>Provides advanced privacy guarantees suitable for strict regulatory environments and consumer-facing applications. Additional features include:</p>
              <ul>
                <li>Enhanced differential privacy (ϵ = 0.1)</li>
                <li>Stronger k-anonymity (k = 20)</li>
                <li>t-closeness for sensitive attributes</li>
                <li>Advanced attack resistance testing</li>
              </ul>
              <button className="tier-select-btn" onClick={() => handleSelectTier('pro')}>Select Pro ($20/month)</button>
            </div>
          </div>
          {error && <div className="tier-error">{error}</div>}
        </section>

      </div>
    </div>
  );
};

export default Home;
