import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const user = useSelector(state => state.user.user);
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !user.email) return;
      setLoading(true);
      try {
        const res = await axios.post('http://localhost:8080/api/get-user-login-history', { email: user.email }, { withCredentials: true });
        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          setLoginHistory(res.data.data);
        }
      } catch (e) {}
      setLoading(false);
    };
    fetchHistory();
  }, [user]);

  // Prepare a map of login dates (YYYY-MM-DD) - backend now returns array of date strings
  const loginDates = new Set(loginHistory.map(d => new Date(d).toISOString().slice(0, 10)));

  // Generate a 1-year grid (52 weeks x 7 days)
  // Generate grid for 1 year (52 weeks)
  const weeks = 52;
  const days = weeks * 7;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // The last day in the grid should be today
  const endDate = new Date(today);
  // Start date is (days - 1) days before endDate
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - days + 1);
  // Build grid
  const grid = [];
  for (let d = 0; d < days; d++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + d);
    grid.push(date);
  }

  if (!user) {
    return <div className="profile-container"><div className="profile-card"><h2>No user data found.</h2></div></div>;
  }
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="login-activity-wrapper" style={{ margin: '2rem 0' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Login Activity</h3>
          {loading ? <div>Loading...</div> : (
            <div style={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
              {/* Month labels */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 6 }}>
                <div style={{ height: 12, marginBottom: 2 }}></div>
                {['Mon', 'Wed', 'Fri'].map((day, i) => (
                  <div key={day} style={{ height: 36, fontSize: 10, color: '#888', marginBottom: 2 }}>{day}</div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                {/* Group grid by month, each group is an array of dates for that month */}
                {(() => {
                  const months = [];
                  let currentMonth = null;
                  let currentMonthDates = [];
                  for (let i = 0; i < grid.length; i++) {
                    const date = grid[i];
                    const month = date.getMonth();
                    const year = date.getFullYear();
                    if (currentMonth === null) {
                      currentMonth = `${year}-${month}`;
                    }
                    const thisMonth = `${year}-${month}`;
                    if (thisMonth !== currentMonth) {
                      if (currentMonthDates.length > 0) {
                        months.push({
                          key: currentMonth,
                          dates: currentMonthDates,
                          monthShort: currentMonthDates[0].toLocaleString('default', { month: 'short' }),
                          year: currentMonthDates[0].getFullYear(),
                        });
                      }
                      currentMonth = thisMonth;
                      currentMonthDates = [];
                    }
                    currentMonthDates.push(date);
                  }
                  // Always push the last month, even if today is not the 1st
                  if (currentMonthDates.length > 0) {
                    months.push({
                      key: currentMonth,
                      dates: currentMonthDates,
                      monthShort: currentMonthDates[0].toLocaleString('default', { month: 'short' }),
                      year: currentMonthDates[0].getFullYear(),
                    });
                  }
                  // Render each month as a group of columns (weeks)
                  return months.map((month, mIdx) => {
                    if (!month.dates || month.dates.length === 0) return null;
                    // Find the index of the 1st of the month
                    let firstOfMonthIdx = month.dates.findIndex(d => d.getDate() === 1);
                    if (firstOfMonthIdx === -1) firstOfMonthIdx = 0;
                    if (!month.dates[firstOfMonthIdx]) return null;
                    const padTop = month.dates[firstOfMonthIdx].getDay();
                    const paddedDates = [
                      ...Array(padTop).fill(null),
                      ...month.dates.slice(firstOfMonthIdx)
                    ];
                    const monthWeeks = [];
                    let week = [];
                    for (let i = 0; i < paddedDates.length; i++) {
                      week.push(paddedDates[i]);
                      if (week.length === 7) {
                        monthWeeks.push(week);
                        week = [];
                      }
                    }
                    if (week.length > 0) {
                      while (week.length < 7) week.push(null);
                      monthWeeks.push(week);
                    }
                    return monthWeeks.map((weekArr, wIdx) => (
                      <div key={`${month.key}-week${wIdx}`} style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: wIdx === 0 && mIdx !== 0 ? 8 : 0 }}>
                        <div style={{ height: 12, fontSize: 10, color: '#888', marginBottom: 2, textAlign: 'center' }}>
                          {wIdx === 0 ? month.monthShort : ''}
                        </div>
                        {weekArr.map((date, dayIdx) => {
                          if (!date) return <div key={dayIdx} style={{ width: 12, height: 12, margin: 1, background: 'transparent' }} />;
                          const dateStr = date.toISOString().slice(0, 10);
                          const isActive = loginDates.has(dateStr);
                          return (
                            <div
                              key={dayIdx}
                              title={dateStr}
                              style={{
                                width: 12,
                                height: 12,
                                borderRadius: 2,
                                background: isActive ? '#22c55e' : '#e3eaff',
                                border: isActive ? '1px solid #16a34a' : '1px solid #b3c6ff',
                                margin: 1,
                              }}
                            />
                          );
                        })}
                      </div>
                    ));
                  });
                })()}
              </div>
            </div>
          )}
        </div>
        <div className="profile-info" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', margin: '2rem 0', background: '#f8fafc', borderRadius: 14, boxShadow: '0 2px 12px #e0e7ef', padding: '2rem 2.5rem', border: '1px solid #e5e7eb', minHeight: 120
        }}>
          {/* Avatar */}
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#2563eb', fontWeight: 700, boxShadow: '0 1px 4px #c7d2fe', marginBottom: 12 }}>
            {user?.name ? user.name[0].toUpperCase() : user?.email?.[0]?.toUpperCase() || '?'}
          </div>
          {/* Info fields */}
          <div style={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: 8 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', marginBottom: 8, textAlign: 'center', letterSpacing: 1 }}>Profile Information</div>
            {/* Name & Email in one row */}
            <div style={{ display: 'flex', gap: '1.2rem', width: '100%', marginBottom: '1.2rem' }}>
              {/* Name */}
              <div style={{
                flex: '1 1 220px',
                fontSize: 18,
                color: '#1e293b',
                background: 'linear-gradient(90deg, #f0f4ff 0%, #e0e7ff 100%)',
                borderRadius: 10,
                padding: '1rem 1.5rem',
                boxShadow: '0 2px 8px #e0e7ef',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <span style={{ fontWeight: 900, color: '#2563eb', fontSize: 20, marginRight: 8 }}>Name:</span>
                {user.name ? <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 20, whiteSpace: 'nowrap' }}>{user.name.toUpperCase()}</span> : <span style={{ color: '#cbd5e1', fontWeight: 700 }}>N/A</span>}
              </div>
              {/* Email */}
              <div style={{
                flex: '1 1 220px',
                fontSize: 18,
                color: '#1e293b',
                background: 'linear-gradient(90deg, #f0f4ff 0%, #e0e7ff 100%)',
                borderRadius: 10,
                padding: '1rem 1.5rem',
                boxShadow: '0 2px 8px #e0e7ef',
                fontWeight: 700,
                textTransform: 'none',
                letterSpacing: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <span style={{ fontWeight: 900, color: '#2563eb', fontSize: 20 }}>Email:</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', textTransform: 'none', letterSpacing: 0 }}>{user.email || <span style={{ color: '#cbd5e1', fontWeight: 700 }}>N/A</span>}</span>
              </div>
            </div>
            {/* Row 2: Role & Product */}
            <div style={{ display: 'flex', gap: '1.2rem', width: '100%' }}>
              {/* Role */}
              <div style={{
                flex: '1 1 220px',
                fontSize: 18,
                color: '#1e293b',
                background: 'linear-gradient(90deg, #f0f4ff 0%, #e0e7ff 100%)',
                borderRadius: 10,
                padding: '1rem 1.5rem',
                boxShadow: '0 2px 8px #e0e7ef',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <span style={{ fontWeight: 900, color: '#2563eb', fontSize: 20 }}>Role:</span> {user.role ? user.role.toUpperCase() : <span style={{ color: '#cbd5e1', fontWeight: 700 }}>N/A</span>}
              </div>
              {/* Product */}
              {user.role === 'consumer' && user.product ? (
                <div style={{
                  flex: '1 1 220px',
                  fontSize: 18,
                  color: '#1e293b',
                  background: 'linear-gradient(90deg, #f0f4ff 0%, #e0e7ff 100%)',
                  borderRadius: 10,
                  padding: '1rem 1.5rem',
                  boxShadow: '0 2px 8px #e0e7ef',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}>
                  <span style={{ fontWeight: 900, color: '#2563eb', fontSize: 20, marginRight: 8 }}>Product:</span>
                  {Array.isArray(user.product)
                    ? <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 18, whiteSpace: 'nowrap' }}>{user.product.join(', ').toUpperCase()}</span>
                    : <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 18, whiteSpace: 'nowrap' }}>{user.product.toUpperCase()}</span>
                  }
                </div>
              ) : (
                <div style={{ flex: '1 1 220px', background: 'none' }}></div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;

