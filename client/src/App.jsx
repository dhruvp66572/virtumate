import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Room from "./pages/Room";
import LandingPage from "./pages/LandingPage";

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
      </Route>
    </Routes>
  );
};

export default App;
