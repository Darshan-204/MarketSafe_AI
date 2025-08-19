

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { isLoggedIn, logout } from './utils/auth';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from './store/userSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import './App.css';

function Navbar({ theme, toggleTheme, setLoggedIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const loggedIn = !!user;
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true });
    } catch (e) {}
    logout();
    setLoggedIn(false);
    dispatch(clearUser());
    navigate('/login');
  };
  return (
    <nav className="vertical-navbar">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
  {!loggedIn && <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink>}
  {!loggedIn && <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Register</NavLink>}
  <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Profile</NavLink>
  {loggedIn && user && user.role === 'customer' && (
    <NavLink to="/upload" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Upload CSV</NavLink>
  )}
      {loggedIn && (
        <>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
          <button
            className="nav-link logout-link"
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, margin: 0, textAlign: 'left' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}


function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const user = useSelector(state => state.user.user);
  const loggedIn = !!user;
  const [_, setLoggedIn] = useState(loggedIn); // keep for compatibility

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
            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
