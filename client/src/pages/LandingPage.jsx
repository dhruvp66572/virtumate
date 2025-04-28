import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

import axiosInstance from '../utils/axiosIntance';

const LandingPage = () => {
  const { user } = useAuth();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeUsers: 0,
    completedEvents: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured events
        const eventsResponse = await axiosInstance.get("/events");
        setFeaturedEvents(eventsResponse.data.data);
        
        // Fetch platform statistics
        const statsResponse = await axiosInstance.get("/stats")
        console.log(statsResponse.data.data);
        setStats(statsResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback data if API fails
        setFeaturedEvents([
          {
            id: 1,
            title: 'Tech Symposium 2024',
            description: 'Join us for the biggest tech event of the year'
          },
          {
            id: 2,
            title: 'Career Fair',
            description: 'Meet top employers and explore opportunities'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to University Event Management Platform</h1>
          <p className="text-xl mb-8">Connect, Participate, and Thrive in Your University Community</p>
          <div className="space-x-4">
          {
            user ? (
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">{loading ? '...' : stats.totalEvents}+</h3>
              <p className="text-gray-600">Events Hosted</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">{loading ? '...' : stats.activeUsers}+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">{loading ? '...' : stats.completedEvents}+</h3>
              <p className="text-gray-600">Events Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">Easy Event Discovery</h3>
              <p className="text-gray-600">Find and join events that match your interests</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">Networking Opportunities</h3>
              <p className="text-gray-600">Connect with peers and professionals</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">Real-time Updates</h3>
              <p className="text-gray-600">Stay informed about upcoming events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
          
          {loading ? (
            <div className="text-center py-10">Loading events...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {featuredEvents.map(event => (
                <div key={event.id} className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 text-indigo-600">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <Link to={`/events/${event.id}`} className="text-indigo-600 font-semibold hover:text-indigo-800">Learn More →</Link>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Link to="/events" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join our community and never miss an important event again!</p>
          {user ? (
            <Link to="/dashboard" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Go to Dashboard</Link>
          ) : (
            <Link to="/register" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Sign Up Now</Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
    </>    
  );
};

export default LandingPage;
