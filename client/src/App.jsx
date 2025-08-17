

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from './utils/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import './App.css';

function Navbar({ theme, toggleTheme, loggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate('/login');
  };
  return (
    <nav className="vertical-navbar">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
      <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink>
      <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Register</NavLink>
  <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Profile</NavLink>
  <NavLink to="/upload" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Upload CSV</NavLink>
      {loggedIn && (
        <>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}


function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleStorage = () => setLoggedIn(isLoggedIn());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app-layout">
        <Navbar theme={theme} toggleTheme={toggleTheme} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
