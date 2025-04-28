import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosIntance";

const Dashboard = () => {
  // const upcomingEvents = [];
  // const createdEvents = [];
   const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const { user, token } = useAuth(); // Get user details from Auth Context

  useEffect(() => {
    const formatEvents = (events, type) => {
      return events.map((event) => ({
        ...event,
        date: new Date(event.startTime).toISOString().split("T")[0], // YYYY-MM-DD
        time: new Date(event.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        type, // Add status label (Organized or Registered)
      }));
    };

    const fetchEvents = async () => {
      if (!user) return;

      try {
        const response = await axiosInstance.get(`/users/${user.id}/events`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include auth token
          },
        });

        console.log("Raw Response:", response.data.data);

        const organizedEvents = response.data.data.organized || [];
        const registeredEvents = response.data.data.attended || [];
        

        console.log("Organized Events:", organizedEvents);
        console.log("Registered Events:", registeredEvents);

        // ✅ Use the formatEvents function with parameters
        const formattedOrganized = formatEvents(organizedEvents, "Organized");
        const formattedRegistered = formatEvents(
          registeredEvents,
          "Registered"
        );

        // ✅ Merge both types into a single array
        const formattedEvents = [...formattedOrganized, ...formattedRegistered];

        console.log("Formatted Events:", formattedEvents);

        // ✅ Store in state
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user?.id, token]);

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

  const handleJoin = async (id) => {
      try {
        const response = await axiosInstance.post(`/events/${id}/meeting/join`);
        console.log(response.data);
        const token = response.data.token;
        localStorage.setItem("roomToken", token);     
        navigate(`/video-call/${id}`);
      } catch (error) {
        console.error("Error joining meeting", error);
      }
    };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {user?.name || "User"}
                </h1>
                <p className="mt-1">You have 3 upcoming events this month</p>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <Link
                    to="/event-create"
                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Create Event
                  </Link>
                </div>
                {/* <div>
                  <button
                    onClick={() =>
                      (window.location.href = "http://localhost:9000")
                    }
                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Start Event
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-indigo-500">
              <h3 className="text-gray-500 text-sm font-medium">
                Registered Events
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {events.filter(event => event.type === "Registered").length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-purple-500">
              <h3 className="text-gray-500 text-sm font-medium">
                Events Created
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {events.filter(event => event.type === "Organized").length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-pink-500">
              <h3 className="text-gray-500 text-sm font-medium">Connections</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {user?.connections?.length || 0}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-blue-500">
              <h3 className="text-gray-500 text-sm font-medium">
                Notifications
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {user?.notifications?.length || 0}
              </p>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upcoming Events */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Your Upcoming Events
                  </h2>
                </div>
                <div className="p-4">
                  {/* {upcomingEvents.map(event => (
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
                        <Link to={/events/${event.id}} className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">
                          View Details
                        </Link>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  ))} */}
                  {events.filter(event => event.type === "Registered").length > 0 ? (
                    events
                      .filter(event => event.type === "Registered")
                      .map((event) => (
                        <div
                          key={event._id}
                          className="mb-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg text-indigo-600">
                                {event.title}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">
                                {event.date} • {event.time}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {event.location}
                              </p>
                            </div>
                            <div>
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                  event.status === "Registered"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {event.status}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 flex space-x-3">
                            <Link
                              to={`/event-details/${event._id}`}
                              className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors"
                            >
                              View Details
                            </Link>
                            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors" 
                            
                            onClick={() => {
                              const addToGoogleCalendar = () => {
                                const startDate = new Date(event.startTime)
                                  .toISOString()
                                  .replace(/-|:|\.\d+/g, "");
                                const endDate = new Date(event.endTime)
                                  .toISOString()
                                  .replace(/-|:|\.\d+/g, "");
                                const details = encodeURIComponent(
                                  event.description || "No details provided"
                                );
                                const title = encodeURIComponent(
                                  event.title || "Event"
                                );
                                const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}`;
                                window.open(url, "_blank");
                              };
  
                              addToGoogleCalendar();
                            }}
                            >
                              Add to Calendar
                            </button>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-500">
                      You have no upcoming events.
                    </p>
                  )}
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                  <Link
                    to="/events"
                    className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center justify-center"
                  >
                    View All Events
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
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
                  <h2 className="text-xl font-semibold text-gray-800">
                    Events You are Organizing
                  </h2>
                </div>
                <div className="p-4">
                  {events.filter((event) => event.organizerId === user.id).length > 0 ? (
                     events
                     .filter((event) => event.organizerId === user.id).map((event) => (
                      <div
                        key={event._id}
                        className="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:pb-0"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h2 className="text-xl font-semibold text-indigo-600">
                              {event.title}
                            </h2>
                            <p className="text-gray-600 mt-1">
                              📅 {event.date} • 🕒 {event.time}
                            </p>
                            <p className="text-gray-600 mt-1">
                              👥 Attendees: {event.registeredAttendees.length || 0}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                                event.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {event.status}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <Link
                            to={`/myevents/${event._id}`}
                            className="text-indigo-600 font-medium hover:text-indigo-800 transition"
                          >
                            Manage Event →
                          </Link>
                          <p className="text-sm text-gray-500">
                            Created on:{" "}
                            {new Date(event.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      You have not organized any events yet.
                    </p>
                  )}
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                  <Link
                    to="/event-create"
                    className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center justify-center"
                  >
                    Create New Event
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Live Events */}
              <div className="bg-white rounded-xl shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Live Events
                  </h2>
                </div>
                <div className="p-4">
                  {events.filter(event => event.status === "live").map((event) => (
                    <div
                      key={event.id}
                      className="mb-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-indigo-600">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {event.date} • {event.time}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {event.eventType}
                          </p>
                        </div>
                        <div>
                          <button
                          onClick={() => handleJoin(event._id)}
                         rel="noopener noreferrer"
                            className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors"
                          >
                            Join Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Connections */}
              <div className="bg-white rounded-xl shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Recommended Connections
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Michael Chen
                      </p>
                      <p className="text-xs text-gray-500">
                        Computer Science, Junior
                      </p>
                    </div>
                    <button className="ml-auto text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Priya Sharma
                      </p>
                      <p className="text-xs text-gray-500">
                        Business Administration, Senior
                      </p>
                    </div>
                    <button className="ml-auto text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Connect
                    </button>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                  <Link
                    to="/networks"
                    className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center justify-center"
                  >
                    View All Recommendations
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
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