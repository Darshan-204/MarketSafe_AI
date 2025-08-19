import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/userSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/signin', {
        email,
        password
      }, { withCredentials: true });
      if (res.data && res.data.success) {
        // Fetch user details after login
        const userRes = await axios.post('http://localhost:8080/api/user-details', { email }, { withCredentials: true });
        if (userRes.data && userRes.data.success && userRes.data.data) {
          dispatch(setUser(userRes.data.data));
        } else {
          dispatch(setUser(null));
        }
        // Log user login history (optional: you can use the response if needed)
        try {
          await axios.post('http://localhost:8080/api/user-login-history', { email }, { withCredentials: true });
        } catch (e) {}
        alert('Login successful!');
        navigate('/');
      } else {
        alert(res.data.mess || 'Login failed.');
      }
    } catch (err) {
      alert('Login failed.');
    }
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
