import React from 'react';
import { Bell, Search, Clock, Users, MapPin, ArrowRight } from 'lucide-react';

const EventCard = ({ event, isLive }) => (
    
  <div className="min-w-[300px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div className="relative">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      {isLive && (
        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          Live Now
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Clock className="w-4 h-4" />
        {event.time}
      </div>
      <button className={`w-full py-2 rounded-lg ${isLive ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}>
        {isLive ? 'Join Now' : 'Register'}
      </button>
    </div>
</div>
);

const EventSection = ({ title, events, isLive }) => (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
        View More <ArrowRight className="w-4 h-4" />
      </button>
    </div>
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
        {events.map(event => (
          <EventCard key={event.id} event={event} isLive={isLive} />
        ))}
      </div>
    </div>
  </section>
);

const Dash = () => {
  const liveEvents = [
    {
      id: 1,
      title: "Global Tech Summit",
      description: "Join industry leaders discussing future tech trends",
      time: "Live Now",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Startup Networking",
      description: "Connect with founders and investors",
      time: "Live Now",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Design Workshop",
      description: "Learn advanced UI/UX techniques",
      time: "Live Now",
      image: "/api/placeholder/400/300"
    }
  ];

  const upcomingEvents = [
    {
      id: 4,
      title: "AI Workshop",
      description: "Hands-on ML implementation",
      time: "Tomorrow, 10:00 AM",
      image: "/api/placeholder/400/300"
    },
    {
      id: 5,
      title: "Web3 Conference",
      description: "Explore blockchain developments",
      time: "In 2 days",
      image: "/api/placeholder/400/300"
    },
    {
      id: 6,
      title: "Product Summit",
      description: "Product management insights",
      time: "Next week",
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      

      <div className="space-y-8">
        <EventSection title="Live Now" events={liveEvents} isLive={true} />
        <EventSection title="Upcoming Events" events={upcomingEvents} isLive={false} />
      </div>
    </div>
  );
};

export default Dash;