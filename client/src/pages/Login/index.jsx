import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic
    alert('Login submitted!');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="hero-section">
          <div className="hero-icon">🔒</div>
          <h1 className="home-title">Welcome to <span className="brand-gradient">MarketSafeAI</span></h1>
        </div>
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
