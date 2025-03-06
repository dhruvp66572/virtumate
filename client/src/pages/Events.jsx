import React, { useState } from "react";
import { Link } from "react-router-dom";

const EventsPage = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock data for events
  const events = [
    {
      id: 1,
      title: "AI Research Symposium",
      description:
        "Join leading researchers in artificial intelligence for a day of presentations and discussions on the latest advancements in the field.",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Virtual",
      category: "academic",
      organizer: "Computer Science Department",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      attendees: 78,
      tags: ["technology", "research", "ai"],
    },
    {
      id: 2,
      title: "Career Development Workshop",
      description:
        "Prepare for your future career with this interactive workshop featuring resume building, interview tips, and networking strategies.",
      date: "March 22, 2024",
      time: "1:00 PM - 3:00 PM",
      location: "Main Campus, Room 302",
      category: "workshop",
      organizer: "Career Services",
      image:
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      attendees: 45,
      tags: ["career", "professional", "development"],
    },
    {
      id: 3,
      title: "Student Leadership Conference",
      description:
        "Develop your leadership skills at this annual conference featuring keynote speakers, breakout sessions, and networking opportunities.",
      date: "April 5, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Student Union Building",
      category: "conference",
      organizer: "Student Affairs",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74ec9c409d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      attendees: 120,
      tags: ["leadership", "student", "development"],
    },
    {
      id: 4,
      title: "Spring Music Festival",
      description:
        "Enjoy performances from student musicians and local bands at our annual spring music festival on the campus lawn.",
      date: "April 18, 2024",
      time: "5:00 PM - 10:00 PM",
      location: "Campus Lawn",
      category: "social",
      organizer: "Music Department",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      attendees: 250,
      tags: ["music", "entertainment", "social"],
    },
    {
      id: 5,
      title: "Data Science Hackathon",
      description:
        "Put your data analysis skills to the test in this 24-hour hackathon with prizes for the most innovative solutions.",
      date: "March 28, 2024",
      time: "12:00 PM - 12:00 PM (next day)",
      location: "Innovation Hub",
      category: "academic",
      organizer: "Data Science Club",
      image:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      attendees: 64,
      tags: ["data science", "competition", "technology"],
    },
    {
      id: 6,
      title: "International Food Festival",
      description:
        "Experience cuisines from around the world prepared by international student associations and local restaurants.",
      date: "April 12, 2024",
      time: "11:00 AM - 3:00 PM",
      location: "University Plaza",
      category: "social",
      organizer: "International Student Association",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      attendees: 320,
      tags: ["food", "culture", "international"],
    },
  ];

  // Filter events based on search and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;

    let matchesDate = true;
    if (dateFilter === "thisWeek") {
      // In a real app, you would implement actual date logic here
      matchesDate =
        event.date.includes("March 15") || event.date.includes("March 22");
    } else if (dateFilter === "nextWeek") {
      matchesDate = event.date.includes("March 28");
    } else if (dateFilter === "thisMonth") {
      matchesDate = event.date.includes("March");
    } else if (dateFilter === "nextMonth") {
      matchesDate = event.date.includes("April");
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
                  <option value="academic">Academic</option>
                  <option value="workshop">Workshops</option>
                  <option value="conference">Conferences</option>
                  <option value="social">Social</option>
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
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                      {event.category.charAt(0).toUpperCase() +
                        event.category.slice(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {event.attendees} attending
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
                    {event.date}
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to={`/event-details/1`}
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
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                Connecting university communities through meaningful events
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Events
                </Link>
                <Link
                  to="/help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 University Event Management Platform. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventsPage;
