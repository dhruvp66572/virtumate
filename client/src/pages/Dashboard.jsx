import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; 

export const Dashboard = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createMeeting = async () => {
    const generatedRoomId = Math.random().toString(36).substring(2, 15);
    navigate(`/room/${generatedRoomId}`);
  };

  const joinMeeting = () => {
    if (roomId.trim()) {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Virtual Event Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back</p>
          </div>
          <div className="header-actions">
            <button className="icon-button">🔔</button>
            <button className="icon-button">👤</button>
          </div>
        </header>

        {/* STATS SECTION */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <div>
              <p className="stat-number">1,234</p>
              <p className="stat-label">Total Attendees</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📅</span>
            <div>
              <p className="stat-number">12</p>
              <p className="stat-label">Active Events</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💬</span>
            <div>
              <p className="stat-number">856</p>
              <p className="stat-label">Messages</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📈</span>
            <div>
              <p className="stat-number">89%</p>
              <p className="stat-label">Engagement Rate</p>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="main-grid">
          {/* UPCOMING EVENTS */}
          <div className="events-section">
            <h2 className="section-title">Upcoming Events</h2>
            <div className="event-card">
              <h3 className="event-title">Tech Conference 2024</h3>
              <span className="event-badge badge-blue">Tomorrow</span>
              <p className="event-info">500 registered attendees</p>
            </div>
            <div className="event-card">
              <h3 className="event-title">Digital Marketing Summit</h3>
              <span className="event-badge badge-green">Next Week</span>
              <p className="event-info">320 registered attendees</p>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-list">
              
              <button className="action-button secondary">View Reports</button>
              <button className="action-button primary" onClick={createMeeting}>Create New Event</button>
              <div className="input-group">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="input-field"
            />
            <button className="btn join-btn" onClick={joinMeeting}>
              Join Meeting
            </button>
            </div>
          </div>
        </div>  
       
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
