import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import EventForm from "./EventForm";
import { getallEvents } from "../handlers/event_handler";
import AuthContext from "../context/AuthContext";

export const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getallEvents();
        if (response && response.data) {
          setEvents(response.data); // Update the events state
        } else {
          console.error("Failed to fetch events: response is undefined or invalid");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchData();
  }, []);

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
            <p className="dashboard-subtitle">Welcome back {user ? user.username : "Guest"} </p>
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
              <p className="stat-number">{events.length}</p>
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
            {events.map((event) => (
              <div className="event-card" key={event._id}>
                <h3 className="event-title">{event.title}</h3>
                <span className="event-badge badge-green">
                  {event.eventDate}
                </span>
                <p className="event-info">{event.description}</p>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div className="quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-list">
              <button className="action-button secondary">View Reports</button>
              <button
                className="action-button primary"
                onClick={() => setShowForm(true)}
              >
                Create New Event
              </button>
              {showForm && <EventForm onClose={() => setShowForm(false)} />}
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
                <button
                  className="action-button primary"
                  onClick={createMeeting}
                >
                  New Meeting
                </button>
                <div className="input-group"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
