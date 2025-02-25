import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Room from "./pages/Room";
import Events from "./pages/Events";

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
        element={isAuthenticated() ? <Layout /> : <Navigate to="/login" />}
      >
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/room/:roomId"
          element={isAuthenticated() ? <Room /> : <Navigate to="/login" />}
        />

        <Route path="/events" element={<Events />} />
        <Route path="/attendees" element={<h1>Attendees</h1>} />
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
