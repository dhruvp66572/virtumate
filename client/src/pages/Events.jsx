import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosIntance";

const EventsPage = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [eventtypeFilter, seteventtypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    document.title = "UniEvents | Events";

    // Fetch events from API
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/events");
        const event = response.data.data 
        setEvents(event.filter((event) => event.status != "draft"));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  console.log(events);
  // Mock data for events
  // const events = [
  //   {
  //     id: 1,
  //     title: "AI Research Symposium",
  //     description:
  //       "Join leading researchers in artificial intelligence for a day of presentations and discussions on the latest advancements in the field.",
  //     date: "March 15, 2024",
  //     time: "10:00 AM - 4:00 PM",
  //     location: "Virtual",
  //     eventtype: "academic",
  //     organizer: "Computer Science Department",
  //     image:
  //       "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //     attendees: 78,
  //     tags: ["technology", "research", "ai"],
  //   },

  // Filter events based on search and eventtype
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

      let eventdate = new Date(event.startTime)
      console.log(eventdate);     

    const matcheseventtype =
      eventtypeFilter === "all" || event.eventType === eventtypeFilter;

    let matchesDate = true;
    if (dateFilter === "thisWeek") {
      let today = new Date();
      let thisWeek = new Date(today);
      thisWeek.setDate(today.getDate() + (7 - today.getDay()));
      let nextWeek = new Date(thisWeek);
      nextWeek.setDate(thisWeek.getDate() + 7);
      matchesDate =
        new Date(event.startTime) >= thisWeek && new Date(event.startTime) < nextWeek;
    } else if (dateFilter === "nextWeek") {
      let today = new Date();
      let nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      let nextNextWeek = new Date(nextWeek);
      nextNextWeek.setDate(nextWeek.getDate() + 7);
      matchesDate =
        new Date(event.startTime) >= nextWeek && new Date(event.startTime) < nextNextWeek;        
    } else if (dateFilter === "thisMonth") {
      let today = new Date();
      let nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      matchesDate =
        new Date(event.startTime) >= today && new Date(event.startTime) < nextMonth;
    } else if (dateFilter === "nextMonth") {
      let today = new Date();
      let nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      let nextNextMonth = new Date(nextMonth);
      nextNextMonth.setMonth(nextMonth.getMonth() + 1);
      matchesDate =
        new Date(event.startTime) >= nextMonth && new Date(event.startTime) < nextNextMonth;
    }

    return matchesSearch && matcheseventtype && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Discover Events
              </h1>
              <p className="mt-1 text-gray-600">
                Find and join events happening around your university
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/event-create"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create Event
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Search events, keywords, or tags"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="eventtype"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Event Type
                </label>
                <select
                  id="eventtype"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={eventtypeFilter}
                  onChange={(e) => seteventtypeFilter(e.target.value)}
                >
                  <option value="all">All Events</option>
                  <option value="webinar">Webinar</option>
                  <option value="workshop">Workshop</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date
                </label>
                <select
                  id="date"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Dates</option>
                  <option value="thisWeek">This Week</option>
                  <option value="nextWeek">Next Week</option>
                  <option value="thisMonth">This Month</option>
                  <option value="nextMonth">Next Month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Event Tags */}
          {events.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {[...new Set(events.flatMap(event => event.tags || []))]
                .filter(Boolean)
                .map((tag) => (
                  <button
                    key={tag}
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors cursor-pointer"
                    onClick={() => setSearchTerm(tag)}
                  >
                    #{tag}
                  </button>
                ))}
            </div>
          )}

          {/* Events Grid */}
                <div className="mb-12">
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <div
                    key={event._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
                    >
                    {event.status === "completed" && (
                      <div className="absolute top-0 left-0 w-full bg-gray-800 bg-opacity-70 text-white text-center py-1 z-10">
                      Completed
                      </div>
                    )}
                    {event.status === "live" && (
                      <div className="absolute top-0 left-0 w-full bg-green-600 bg-opacity-70 text-white text-center py-1 z-10 flex items-center justify-center">
                      <span className="h-2 w-2 bg-white rounded-full mr-2 animate-pulse"></span>
                      Live Now
                      </div>
                    )}
                    {event.status === "cancelled" && (
                      <div className="absolute top-0 left-0 w-full bg-red-600 bg-opacity-70 text-white text-center py-1 z-10">
                      Cancelled
                      </div>
                    )}
                    {event.status === "scheduled" && (
                      <div className="absolute top-0 left-0 w-full bg-blue-600 bg-opacity-70 text-white text-center py-1 z-10">
                      Scheduled
                      </div>
                    )}
                    {event.status === "upcoming" && (
                      <div className="absolute top-0 left-0 w-full bg-purple-600 bg-opacity-70 text-white text-center py-1 z-10">
                      Upcoming
                      </div>
                    )}
                    {event.status === "ongoing" && (
                      <div className="absolute top-0 left-0 w-full bg-yellow-600 bg-opacity-70 text-white text-center py-1 z-10 flex items-center justify-center">
                      <span className="h-2 w-2 bg-white rounded-full mr-2 animate-pulse"></span>
                      Ongoing
                      </div>
                    )}
                    <div className="h-48 overflow-hidden">
                      <img
                      src={
                        event.image || 
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      }
                      alt={event.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                        {event.eventType?.charAt(0).toUpperCase() +
                        event.eventType?.slice(1) || "Event"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {event.attendees || 0} attendees
                      </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                      {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                      </p>
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                      <svg
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(event.startTime).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                      <svg
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {new Date(event.startTime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(event.endTime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                      </div>
                        <div className="mt-4 flex justify-between items-center">
                          <Link
                            to={`/event-details/${event._id}`}
                            className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center"
                          >
                            View Details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                          {["live", "ongoing"].includes(event.status) ? (
                            <a
                            href={event.virtualLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer flex items-center"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            Join Now
                            </a>
                          ) : ["completed", "cancelled"].includes(event.status) ? (
                            <span className={`text-white px-4 py-2 rounded-lg ${event.status === "completed" ? "bg-gray-500" : "bg-red-500"}`}>
                            {event.status === "completed" ? "Completed" : "Cancelled"}
                            </span>
                          ) : (
                            <Link
                            to={`/events/${event._id}/register`}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                              <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            Register
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png" 
                    alt="No events found" 
                    className="w-32 h-32 mb-4 opacity-60"
                  />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    We couldn&apos;t find any events matching your current filters. Try adjusting your search criteria or check back later.
                  </p>
                  <button
                    onClick={() => {
                    setSearchTerm("");
                    seteventtypeFilter("all");
                    setDateFilter("all");
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Dynamic Pagination */}
          {filteredEvents.length > 0 && (
            <div className="flex justify-center">
              <nav className="inline-flex shadow-sm -space-x-px rounded-md">
                <button 
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  disabled={true} // Implement actual pagination logic here
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600"
                >
                  1
                </button>
                <button 
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  disabled={true} // Implement actual pagination logic here
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
