import Navbar from "./components/Navbar"; // Ensure Navbar is always visible
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Room from "./pages/Room";
import Events from "./pages/Events";
import EventManagement from "./pages/EventManagement";
import Eventcreate from "./pages/Eventcreate";
import EventView from "./pages/EventView";
import EventRegister from "./pages/EventRegister";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/Footer";
import MyEvenets from "./pages/MyEvenets";
import Settings from "./pages/Settings";
import VideoCall from "./components/VideoCall";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isAuthenticated } = useAuth(); // Get auth state

  return (
    <>     
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/event-create" element={<Eventcreate />} />
            <Route path="/myevents" element={<MyEvenets />} />
            <Route path="/myevents/:id" element={<EventManagement />} />
            <Route path="/event-details/:id" element={<EventView />} />
            <Route path="/events/:id/register" element={<EventRegister />} />
            <Route path="/video-call/:roomName" element={<VideoCall />} />
            <Route path="/attendees" element={<h1>Attendees</h1>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/messages" element={<h1>Messages</h1>} />
            <Route path="/analytics" element={<h1>Analytics</h1>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<h1>Help</h1>} />

            {/* Redirect unknown routes to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        ) : (
          // Redirect non-authenticated users to home (Landing Page)
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
};

export default App;
