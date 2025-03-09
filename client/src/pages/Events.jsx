import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosIntance";

const EventsPage = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    document.title = "UniEvents | Events";

    // Fetch events from API
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/events");
        setEvents(response.data.data);
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
  //     category: "academic",
  //     organizer: "Computer Science Department",
  //     image:
  //       "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //     attendees: 78,
  //     tags: ["technology", "research", "ai"],
  //   },

  // Filter events based on search and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

      let eventdate = new Date(event.startTime).toDateString().split(" ").slice(1).join(" ");
      console.log(eventdate);
      let diff = new Date(event.startTime) - new Date();
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      console.log(days);
      if (days < 0) {
        event.status = "completed";
      } else {
        event.status = "live";
      }      
      console.log(event.status);

    const matchesCategory =
      categoryFilter === "all" || event.eventType === categoryFilter;

    let matchesDate = true;
    if (dateFilter === "thisWeek") {
      let today = new Date();
      let nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      matchesDate =
        new Date(event.startTime) >= today && new Date(event.startTime) < nextWeek;        
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

    return matchesSearch && matchesCategory && matchesDate;
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
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
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
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="webinar">webinar</option>
                  <option value="workshop">workshop</option>
                  <option value="conference">conference</option>
                  <option value="other">other</option>
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
          <div className="mb-8 flex flex-wrap gap-2">
            <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors">
              #technology
            </button>
            <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              #research
            </button>
            <button className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors">
              #career
            </button>
            <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              #leadership
            </button>
            <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
              #social
            </button>
            <button className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors">
              #arts
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    }
                    alt={event.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                      {event.eventType.charAt(0).toUpperCase() +
                        event.eventType.slice(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {event.attendees} attendees
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
                    {
                      // In a real app, you would format the time using a library like date-fns or moment.js
                      new Date(event.startTime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })
                    }{" "} - {" "}
                    {
                      new Date(event.endTime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })
                    }
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to={`/event-details/${event._id}`}
                      className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                    >
                      View Details
                    </Link>
                    {event.isLive ? (
                      <a
                        href={event.virtualLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Join Now
                      </a>
                    ) : (
                      <Link
                        to={"/event-register"}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Register
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <nav className="inline-flex shadow-sm -space-x-px rounded-md">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
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
              {
                // Array of page numbers
                [1, 2, 3, 4, 5].map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {pageNumber}
                  </button>
                ))
              }
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
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
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
