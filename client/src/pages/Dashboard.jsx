import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosIntance';

const Dashboard = () => {
  const {user} = useAuth(); // Get user details from Auth Context
  const upcomingEvents = [];
  const createdEvents = [];
  const liveEvents = [];

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        console.log(user.id)
        const response = await axiosInstance.get(`/users/${user?.id}`);
        console.log(response.data.data);
        return response.data;        
      } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
    };

    // Fetch all events
    getAllEvents();
  }, [user?.id]);

  // Mock data for upcoming events
  // const upcomingEvents = [
  //   {
  //     id: 1, 
  //     title: 'AI Research Symposium',
  //     date: 'March 15, 2024',
  //     time: '10:00 AM - 4:00 PM',
  //     location: 'Virtual',
  //     status: 'Registered'
  //   },
  //   {
  //     id: 2, 
  //     title: 'Career Development Workshop',
  //     date: 'March 22, 2024',
  //     time: '1:00 PM - 3:00 PM',
  //     location: 'Main Campus, Room 302',
  //     status: 'Registered'
  //   },
  //   {
  //     id: 3, 
  //     title: 'Student Leadership Conference',
  //     date: 'April 5, 2024',
  //     time: '9:00 AM - 5:00 PM',
  //     location: 'Student Union Building',
  //     status: 'Pending Approval'
  //   }
  // ];

  // // Mock data for events created by user
  // const createdEvents = [
  //   {
  //     id: 101, 
  //     title: 'Web Development Study Group',
  //     date: 'March 18, 2024',
  //     time: '6:00 PM - 8:00 PM',
  //     location: 'Library, Meeting Room 4',
  //     attendees: 12,
  //     status: 'Active'
  //   },
  //   {
  //     id: 102, 
  //     title: 'Chess Club Tournament',
  //     date: 'April 10, 2024',
  //     time: '2:00 PM - 6:00 PM',
  //     location: 'Recreation Center',
  //     attendees: 8,
  //     status: 'Active'
  //   }
  // ];

  // // Mock data for live events
  // const liveEvents = [
  //   {
  //     id: 201,
  //     title: 'Live Coding Workshop',
  //     date: 'March 10, 2024',
  //     time: '2:00 PM - 4:00 PM',
  //     location: 'Virtual',
  //     link: 'https://liveevent.com/coding-workshop'
  //   },
  //   {
  //     id: 202,
  //     title: 'Live Music Concert',
  //     date: 'March 12, 2024',
  //     time: '6:00 PM - 8:00 PM',
  //     location: 'Virtual',
  //     link: 'https://liveevent.com/music-concert'
  //   }
  // ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">      
     {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user?.name || "User"}</h1>
                <p className="mt-1">You have 3 upcoming events this month</p>
              </div>
              <div>
                <Link to="/event-create" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Create Event
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-indigo-500">
              <h3 className="text-gray-500 text-sm font-medium">Upcoming Events</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">3</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-purple-500">
              <h3 className="text-gray-500 text-sm font-medium">Events Created</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">2</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-pink-500">
              <h3 className="text-gray-500 text-sm font-medium">Connections</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">24</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-blue-500">
              <h3 className="text-gray-500 text-sm font-medium">Notifications</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">5</p>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upcoming Events */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Your Upcoming Events</h2>
                </div>
                <div className="p-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="mb-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-indigo-600">{event.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{event.date} • {event.time}</p>
                          <p className="text-gray-600 text-sm">{event.location}</p>
                        </div>
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            event.status === 'Registered' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-3">
                        <Link to={`/events/${event.id}`} className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">
                          View Details
                        </Link>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                  <Link to="/events" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center justify-center">
                    View All Events
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Created Events & Recommendations */}
            <div className="space-y-8">
              {/* Events Created */}
              <div className="bg-white rounded-xl shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Events You're Organizing</h2>
                </div>
                <div className="p-4">
                  {createdEvents.map(event => (
                    <div key={event.id} className="mb-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-indigo-600">{event.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{event.date} • {event.time}</p>
                          <p className="text-gray-600 text-sm">Attendees: {event.attendees}</p>
                        </div>
                        <div>
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                            {event.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Link to={`/events/${event.id}/manage`} className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">
                          Manage Event
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                  <Link to="/events/create" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center justify-center">
                    Create New Event
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Live Events */}
              <div className="bg-white rounded-xl shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Live Events</h2>
                </div>
                <div className="p-4">
                  {liveEvents.map(event => (
                    <div key={event.id} className="mb-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-indigo-600">{event.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{event.date} • {event.time}</p>
                          <p className="text-gray-600 text-sm">{event.location}</p>
                        </div>
                        <div>
                          <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">
                            Join Now
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Connections */}
              <div className="bg-white rounded-xl shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Recommended Connections</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="h-10 w-10 rounded-full" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Michael Chen</p>
                      <p className="text-xs text-gray-500">Computer Science, Junior</p>
                    </div>
                    <button className="ml-auto text-indigo-600 hover:text-indigo-800 text-sm font-medium">Connect</button>
                  </div>
                  <div className="flex items-center">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="h-10 w-10 rounded-full" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Priya Sharma</p>
                      <p className="text-xs text-gray-500">Business Administration, Senior</p>
                    </div>
                    <button className="ml-auto text-indigo-600 hover:text-indigo-800 text-sm font-medium">Connect</button>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                  <Link to="/networks" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center justify-center">
                    View All Recommendations
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
