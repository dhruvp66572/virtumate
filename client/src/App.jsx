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

// Function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<LandingPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={isAuthenticated() ? <Layout /> : <Navigate to="/" />}
      >
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/room/:roomId"
          element={isAuthenticated() ? <Room /> : <Navigate to="/" />}
        />

        <Route path="/events" element={<Events />} />
        <Route path="/event-management" element={<EventManagement />} />
        <Route path="/event-create" element={<Eventcreate />} />
        <Route path="/event-details/:id" element={<EventView />} />
        <Route path="/event-register" element={<EventRegister />} />
        <Route path="/attendees" element={<h1>Attendees</h1>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/messages" element={<h1>Messages</h1>} />
        <Route path="/analytics" element={<h1>Analytics</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
        <Route path="/help" element={<h1>Help</h1>} />

        <Route path="*" element={<Navigate to="/dashboard" />} />
        
      </Route>
    </Routes>
  );
};

export default App;
