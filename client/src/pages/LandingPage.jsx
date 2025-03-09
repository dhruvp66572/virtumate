import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const {user} = useAuth();
  let isAuthenticated = false;
  if(user){
    isAuthenticated = true;
  }
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Navigation Bar */}
      {/* <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-indigo-600">UniEvents</h2>
          </div>
          <div className="space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/events" className="text-gray-600 hover:text-indigo-600 transition-colors">Events</Link>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">Register</Link>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to University Event Management Platform</h1>
          <p className="text-xl mb-8">Connect, Participate, and Thrive in Your University Community</p>
          <div className="space-x-4">
          {
            isAuthenticated ? (
              <Link to="/dashboard" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Dashboard</Link>
            ) : (
              <Link to="/login" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </Link>
            )
          }
            <Link to="/events" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">Explore Events</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">Easy Event Discovery</h3>
              <p className="text-gray-600">Find and join events that match your interests</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">Networking Opportunities</h3>
              <p className="text-gray-600">Connect with peers and professionals</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">Real-time Updates</h3>
              <p className="text-gray-600">Stay informed about upcoming events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">Tech Symposium 2024</h3>
              <p className="text-gray-600 mb-4">Join us for the biggest tech event of the year</p>
              <Link to="/events" className="text-indigo-600 font-semibold hover:text-indigo-800">Learn More →</Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">Career Fair</h3>
              <p className="text-gray-600 mb-4">Meet top employers and explore opportunities</p>
              <Link to="/events" className="text-indigo-600 font-semibold hover:text-indigo-800">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join our community and never miss an important event again!</p>
          <Link to="/register" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Sign Up Now</Link>
        </div>
      </section>

      {/* Footer */}
        <Footer />
    </div>
    </>    
  );
};

export default LandingPage;
