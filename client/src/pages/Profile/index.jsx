import React from 'react';
import './Profile.css';

const Profile = () => {
  // Demo user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    role: 'Student',
    tier: 'Basic',
    joined: '2025-08-01',
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Dashboard</h1>
        <div className="profile-info">
          <div className="profile-row">
            <span className="profile-label">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Role:</span>
            <span>{user.role}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Service Tier:</span>
            <span>{user.tier}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Joined:</span>
            <span>{user.joined}</span>
          </div>
        </div>
        <div className="profile-actions">
          <button className="profile-btn">Edit Profile</button>
          <button className="profile-btn profile-btn-logout">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
