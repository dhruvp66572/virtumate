import React from 'react';
import { useParams, Link } from 'react-router-dom';

const EventView = () => {
  const { id } = useParams();

  // Mock data for events (in a real app, this data would be fetched from an API)
  const events = [
    {
      id: 1,
      title: 'AI Research Symposium',
      description: 'Join leading researchers in artificial intelligence for a day of presentations and discussions on the latest advancements in the field.',
      date: 'March 15, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Virtual',
      category: 'academic',
      attendees: 78,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Career Development Workshop',
      description: 'Prepare for your future career with this interactive workshop featuring resume building, interview tips, and networking strategies.',
      date: 'March 22, 2024',
      time: '1:00 PM - 3:00 PM',
      location: 'Main Campus, Room 302',
      category: 'workshop',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    // ... other events
  ];

  // Find the event by ID
  const event = events.find(event => event.id === parseInt(id));

  if (!event) {
    return <div className="text-center">Event not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">      

      {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
              <p className="text-gray-600 text-sm mb-4">{event.date} • {event.time}</p>
              <p className="text-gray-700 mb-6">{event.description}</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">{event.location}</p>
              <div className="mt-6">
                <Link 
                  to={`/events/${event.id}/register`} 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Register for Event
                </Link>
              </div>
            </div>
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

export default EventView;
