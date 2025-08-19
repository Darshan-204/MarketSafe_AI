import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  // Removed company field
  const [role, setRole] = useState('customer');
  const [product, setProduct] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  function isStrongPassword(pw) {
    // At least 1 uppercase, 1 lowercase, 1 number, 1 special char, min 8 chars
    return /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw) && pw.length >= 8;
  }

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!isStrongPassword(password)) {
      alert('Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      // Send verification code to email with required body
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      const subject = 'Your MarketSafeAI Verification Code';
      const text = `Your verification code is: ${code}`;
      const html = `<p>Your verification code is: <b>${code}</b></p>`;
      await axios.post('http://localhost:8080/api/email', {
        to: email,
        subject,
        text,
        html
      });
      // Store code locally for demo (in real app, code is stored on backend)
      window.localStorage.setItem('register_code', code);
      setSent(true);
      setStep(2);
    } catch (err) {
      alert('Failed to send verification code.');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    // Check code before registering
    const storedCode = window.localStorage.getItem('register_code');
    if (code !== storedCode) {
      alert('Invalid verification code.');
      return;
    }
    try {
      const payload = {
        name,
        email,
        password,
        role,
        code
      };
      if (role === 'consumer') {
        payload.product = product; // send as comma-separated string
      }
      await axios.post('http://localhost:8080/api/register', payload);
  alert('Registration complete!');
  setStep(1);
  setName('');
  setRole('customer');
  setProduct('');
  setEmail('');
  setPassword('');
  setConfirmPassword('');
  setCode('');
  setSent(false);
  window.localStorage.removeItem('register_code');
  navigate('/login');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="hero-section">
          <div className="hero-icon">🔒</div>
          <h1 className="home-title">Welcome to <span className="brand-gradient">MarketSafeAI</span></h1>
        </div>
        <h2 className="register-title">Register</h2>
        <form className="register-form" onSubmit={step === 1 ? handleSendCode : handleVerify}>
          {step === 1 && <>
            <label>Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            <label>Role:</label>
            <select value={role} onChange={e => setRole(e.target.value)} required>
              <option value="customer">Customer</option>
              <option value="consumer">Consumer</option>
            </select>

            {/* Show Product input if role is 'consumer' */}
            {role === 'consumer' && (
              <>
                <label>Product:</label>
                <input
                  type="text"
                  value={product}
                  onChange={e => setProduct(e.target.value)}
                  required
                />
              </>
            )}

            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <label>Password:</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="password-input"
              />
              <span
                className="password-eye"
                onClick={() => setShowPassword(v => !v)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁'}
              </span>
            </div>
            <label>Confirm Password:</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="password-input"
              />
              <span
                className="password-eye"
                onClick={() => setShowConfirmPassword(v => !v)}
                title={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? '👁️' : '👁'}
              </span>
            </div>
            
            <div style={{ width: '100%', textAlign: 'right' }}>
              <button type="submit">Send Verification Code</button>
            </div>
          </>}
          {step === 2 && <>
            <label>Verification Code:</label>
            <input type="text" value={code} onChange={e => setCode(e.target.value)} required />
            <button type="submit">Verify & Register</button>
          </>}
        </form>
        {sent && <p className="verification-message">A verification code has been sent to your email.</p>}
      </div>
    </div>
  );
};

export default Register;
