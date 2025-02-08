import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-base-100 text-center min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Welcome to VirtuMate</h1>
      <p className="text-lg mt-4 text-gray-500">
        The best place to host and join virtual meetings and events.
      </p>
      <div className="mt-6 space-x-4">
        <Link to="/register" className="btn btn-primary">Get Started</Link>
        <Link to="/login" className="btn btn-secondary">Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
