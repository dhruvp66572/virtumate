import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EventManagement = () => {
  // Get the event ID from URL parameters
  const { id } = useParams();
  
  // Mock event data (in a real app, this would be fetched from an API)
  const [event, setEvent] = useState({
    id: 101,
    title: 'Web Development Study Group',
    description: 'A collaborative study group for students interested in web development. We will cover HTML, CSS, JavaScript, React, and Node.js through hands-on projects and code reviews.',
    date: 'March 18, 2024',
    time: '6:00 PM - 8:00 PM',
    location: 'Library, Meeting Room 4',
    category: 'workshop',
    isPublic: true,
    capacity: 20,
    attendees: [
      { id: 1, name: 'Alex Johnson', email: 'alex.j@university.edu', status: 'confirmed' },
      { id: 2, name: 'Maya Patel', email: 'maya.p@university.edu', status: 'confirmed' },
      { id: 3, name: 'Carlos Rodriguez', email: 'c.rodriguez@university.edu', status: 'pending' },
      { id: 4, name: 'Zoe Williams', email: 'zoe.w@university.edu', status: 'confirmed' },
      { id: 5, name: 'Tyler Chang', email: 't.chang@university.edu', status: 'confirmed' },
      { id: 6, name: 'Emma Davis', email: 'emma.d@university.edu', status: 'confirmed' },
      { id: 7, name: 'Jason Kim', email: 'j.kim@university.edu', status: 'waitlisted' },
      { id: 8, name: 'Olivia Smith', email: 'o.smith@university.edu', status: 'waitlisted' },
      { id: 9, name: 'Liam Wilson', email: 'l.wilson@university.edu', status: 'cancelled' },
      { id: 10, name: 'Sophia Garcia', email: 's.garcia@university.edu', status: 'confirmed' },
      { id: 11, name: 'Noah Martin', email: 'noah.m@university.edu', status: 'confirmed' },
      { id: 12, name: 'Ava Thompson', email: 'a.thompson@university.edu', status: 'pending' },
    ],
    agenda: [
      { id: 1, title: 'Introduction to React Hooks', startTime: '6:00 PM', endTime: '6:30 PM', speaker: 'Sarah Johnson' },
      { id: 2, title: 'Building Custom Hooks', startTime: '6:30 PM', endTime: '7:15 PM', speaker: 'Sarah Johnson' },
      { id: 3, title: 'Q&A and Project Work', startTime: '7:15 PM', endTime: '8:00 PM', speaker: 'All Participants' }
    ],
    resources: [
      { id: 1, title: 'React Hooks Cheatsheet', type: 'PDF', url: '#', uploadedAt: 'March 10, 2024' },
      { id: 2, title: 'Project Starter Code', type: 'ZIP', url: '#', uploadedAt: 'March 12, 2024' }
    ],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for editing form
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({...event});
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value
    });
  };
  
  const handleSaveEdit = () => {
    setEvent(editedEvent);
    setIsEditing(false);
  };
  
  // Function to get attendee stats
  const getAttendeeStats = () => {
    const confirmed = event.attendees.filter(a => a.status === 'confirmed').length;
    const pending = event.attendees.filter(a => a.status === 'pending').length;
    const waitlisted = event.attendees.filter(a => a.status === 'waitlisted').length;
    const cancelled = event.attendees.filter(a => a.status === 'cancelled').length;
    
    return { confirmed, pending, waitlisted, cancelled, total: event.attendees.length };
  };
  
  const stats = getAttendeeStats();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/dashboard" className="text-gray-500 hover:text-indigo-600">Dashboard</Link>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link to="/events" className="ml-2 text-gray-500 hover:text-indigo-600">Events</Link>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-indigo-600 font-medium">Manage Event</span>
              </li>
            </ol>
          </nav>

          {/* Event Header */}
          <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
            <div className="relative h-64 bg-gradient-to-r from-indigo-500 to-purple-600">
              {event.image && (
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover opacity-30"
                />
              )}
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white text-indigo-700 mb-3">
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                    <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                    <div className="flex items-center text-white text-sm">
                      <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date} • {event.time}
                    </div>
                    <div className="flex items-center text-white text-sm mt-1">
                      <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    {!isEditing ? (
                      <>
                        <button 
                          onClick={() => setIsEditing(true)} 
                          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                          Edit Event
                        </button>
                        <Link to={`/events/${event.id}`} className="border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
                          View Public Page
                        </Link>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={handleSaveEdit} 
                          className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button 
                          onClick={() => {
                            setIsEditing(false);
                            setEditedEvent({...event});
                          }} 
                          className="border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event Tabs */}
            <div className="border-b border-gray-200">
              <div className="px-8">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('attendees')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'attendees'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Attendees
                  </button>
                  <button
                    onClick={() => setActiveTab('agenda')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'agenda'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Agenda
                  </button>
                  <button
                    onClick={() => setActiveTab('resources')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'resources'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Resources
                  </button>
                  <button
                    onClick={() => setActiveTab('messaging')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'messaging'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Messaging
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'analytics'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Analytics
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {isEditing ? (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={editedEvent.title}
                        onChange={handleEditChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={editedEvent.description}
                        onChange={handleEditChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="text"
                          id="date"
                          name="date"
                          value={editedEvent.date}
                          onChange={handleEditChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input
                          type="text"
                          id="time"
                          name="time"
                          value={editedEvent.time}
                          onChange={handleEditChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={editedEvent.location}
                        onChange={handleEditChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          id="category"
                          name="category"
                          value={editedEvent.category}
                          onChange={handleEditChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="workshop">Workshop</option>
                          <option value="academic">Academic</option>
                          <option value="conference">Conference</option>
                          <option value="social">Social</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                        <input
                          type="number"
                          id="capacity"
                          name="capacity"
                          value={editedEvent.capacity}
                          onChange={handleEditChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="isPublic"
                        name="isPublic"
                        type="checkbox"
                        checked={editedEvent.isPublic}
                        onChange={(e) => setEditedEvent({...editedEvent, isPublic: e.target.checked})}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                        This event is public and can be discovered by all users
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Event Information</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 mr-2 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div>
                              <span className="block text-sm font-medium text-gray-900">Date & Time</span>
                              <span className="block text-sm text-gray-600">{event.date}, {event.time}</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 mr-2 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div>
                              <span className="block text-sm font-medium text-gray-900">Location</span>
                              <span className="block text-sm text-gray-600">{event.location}</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 mr-2 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <div>
                              <span className="block text-sm font-medium text-gray-900">Category</span>
                              <span className="block text-sm text-gray-600">{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 mr-2 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <div>
                              <span className="block text-sm font-medium text-gray-900">Capacity</span>
                              <span className="block text-sm text-gray-600">{event.capacity} attendees</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Visibility & Sharing</h3>
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${event.isPublic ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                              {event.isPublic ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              )}
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-gray-900">
                                {event.isPublic ? 'Public Event' : 'Private Event'}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {event.isPublic 
                                  ? 'This event is visible to everyone at the university.'
                                  : 'This event is by invitation only.'
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Share Event</h3>
                        <div className="flex space-x-3 mb-4">
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                            <svg className="h-5 w-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                            Facebook
                          </button>
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                            <svg className="h-5 w-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                            Twitter
                          </button>
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                            <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy Link
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <button className="inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                          </svg>
                          Send Invitations
                        </button>
                        <button className="inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none">
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Add to Calendar
                        </button>
                        <button className="inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none">
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
                          </svg>
                          Export Attendee List
                        </button>
                        <button className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                          <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                          Archive Event
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Attendees Tab */}
            {activeTab === 'attendees' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Attendees Management</h2>
                  <div className="flex space-x-3">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Attendees
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                      <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
                      </svg>
                      Export List
                    </button>
                  </div>
                </div>

                {/* Attendee Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Total Attendees</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Confirmed</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.confirmed}</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Waitlisted</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.waitlisted}</p>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Search attendees..."
                    />
                  </div>
                  <div className="flex space-x-3">
                    <select className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option value="">All Statuses</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="waitlisted">Waitlisted</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Attendees Table */}
                <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {event.attendees.map((attendee) => (
                        <tr key={attendee.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                {attendee.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{attendee.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{attendee.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              attendee.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800'
                                : attendee.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : attendee.status === 'waitlisted'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">Message</button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{event.attendees.length}</span> of <span className="font-medium">{event.attendees.length}</span> attendees
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Agenda Tab */}
            {activeTab === 'agenda' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Event Agenda</h2>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Session
                  </button>
                </div>

                {/* Timeline */}
                <div className="mb-10 relative">
                  <div className="absolute top-0 bottom-0 left-6 w-1 bg-indigo-100"></div>
                  {event.agenda.map((session, index) => (
                    <div key={session.id} className="relative pl-8 pb-8">
                      <div className="absolute left-4 -translate-x-1/2 h-6 w-6 rounded-full border-4 border-white bg-indigo-500"></div>
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                            <p className="text-gray-600 text-sm">{session.startTime} - {session.endTime}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p className="text-gray-600 text-sm">Speaker: {session.speaker}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Session Form (simplified) */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add a New Session</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="sessionTitle" className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
                      <input
                        type="text"
                        id="sessionTitle"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter session title"
                      />
                    </div>
                    <div>
                      <label htmlFor="sessionSpeaker" className="block text-sm font-medium text-gray-700 mb-1">Speaker</label>
                      <input
                        type="text"
                        id="sessionSpeaker"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Speaker name"
                      />
                    </div>
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                      <input
                        type="text"
                        id="startTime"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="e.g. 10:00 AM"
                      />
                    </div>
                    <div>
                      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                      <input
                        type="text"
                        id="endTime"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="e.g. 11:00 AM"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                      Add Session
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Event Resources</h2>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload Resource
                  </button>
                </div>

                {/* Resource List */}
                <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resource
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Uploaded At
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {event.resources.map((resource) => (
                        <tr key={resource.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                {resource.type === 'PDF' ? (
                                  <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 11.5h10a.5.5 0 000-1H7a.5.5 0 000 1zM7 13.5h10a.5.5 0 000-1H7a.5.5 0 000 1zM7 15.5h10a.5.5 0 000-1H7a.5.5 0 000 1zM5 5v14h14V5H5zm.5-1h13a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 18.5v-13A1.5 1.5 0 015.5 4z" />
                                  </svg>
                                ) : (
                                  <svg className="h-6 w-6 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 00-.196-.293l-6-6a.997.997 0 00-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 00-.259-.051C13.04 2.011 13.021 2 13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8.997a.99.99 0 00-.063-.317zM10 18H8v-4h2v4zm4 0h-2v-6h2v6zm4 0h-2v-2h2v2zm-6-9V4h-1v5H7V4H6v5H5V4h-.5A1.5 1.5 0 013 5.5v13A1.5 1.5 0 014.5 20h15a1.5 1.5 0 001.5-1.5V9h-9z" />
                                  </svg>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{resource.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{resource.uploadedAt}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">Download</button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Upload Form */}
                <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      Drag and drop your files here, or <span className="text-indigo-600 font-medium">browse</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF, DOC, PPT, images, or videos up to 10MB
                    </p>
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                      Upload Files
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Messaging Tab */}
            {activeTab === 'messaging' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Attendee Messaging</h2>
                  <div className="flex space-x-3">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send Email
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Send Notification
                    </button>
                  </div>
                </div>

                {/* Message Composer */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">New Message</h3>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                      <select
                        id="recipients"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option>All Attendees</option>
                        <option>Confirmed Attendees</option>
                        <option>Pending Attendees</option>
                        <option>Waitlisted Attendees</option>
                        <option>Select Individual Attendees</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Message subject"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        id="message"
                        rows={6}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Type your message here..."
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        Save Draft
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message Templates */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Message Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors">
                      <h4 className="font-medium text-gray-900">Event Reminder</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        A friendly reminder that our event is coming up soon. We're looking forward to seeing you!
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors">
                      <h4 className="font-medium text-gray-900">Thank You Message</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        Thank you for attending our event! We hope you found it valuable and look forward to seeing you again.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors">
                      <h4 className="font-medium text-gray-900">Location Change</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        We need to inform you about an important change to our event location. Please see the details below.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors">
                      <h4 className="font-medium text-gray-900">Cancellation Notice</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        We regret to inform you that we need to cancel the upcoming event. We apologize for any inconvenience.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message History */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Message History</h3>
                  <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Event Details Confirmation</h4>
                          <p className="text-sm text-gray-500 mt-1">Sent to All Attendees • March 10, 2024</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Agenda Update</h4>
                          <p className="text-sm text-gray-500 mt-1">Sent to Confirmed Attendees • March 12, 2024</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Event Analytics</h2>
                  <p className="mt-1 text-gray-600">Track registration, engagement, and other metrics for your event</p>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-500 flex items-center justify-center">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">Registration Rate</h3>
                        <div className="mt-2 flex items-baseline">
                          <p className="text-3xl font-bold text-gray-900">60%</p>
                          <p className="ml-2 text-sm text-green-600">+15%</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-indigo-500 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        12 out of 20 capacity filled
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-500 flex items-center justify-center">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">Response Rate</h3>
                        <div className="mt-2 flex items-baseline">
                          <p className="text-3xl font-bold text-gray-900">87%</p>
                          <p className="ml-2 text-sm text-green-600">+5%</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        13 out of 15 invites responded
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-purple-500 flex items-center justify-center">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">Page Views</h3>
                        <div className="mt-2 flex items-baseline">
                          <p className="text-3xl font-bold text-gray-900">128</p>
                          <p className="ml-2 text-sm text-green-600">+32%</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        75% growth since last week
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Timeline Chart (placeholder) */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Timeline</h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      Chart visualization would appear here (showing registrations over time)
                    </p>
                  </div>
                </div>

                {/* Attendance Demographics (placeholder) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Demographics</h3>
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">
                        Demographics chart would appear here
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">
                        Traffic sources chart would appear here
                      </p>
                    </div>
                  </div>
                </div>

                {/* Export Analytics */}
                <div className="flex justify-end">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                    <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Analytics Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Connecting university communities through meaningful events</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors">Browse Events</Link>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 University Event Management Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventManagement;
