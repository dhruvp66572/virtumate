import { useState, useEffect, useContext } from "react";
import EventFormModal from "../components/modals/EventFormModal";
import EventCalendar from "../components/EventCalendar";
import EventList from "../components/EventList";
import { createEvent, deleteEventById, getallEvents, updateEventById } from "../handlers/event_handler";
import AuthContext from "../context/AuthContext";
import ViewEventModal from "../components/modals/ViewEventModal";

const Events = () => {
  // State for events and UI
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'upcoming', 'past'
  const { user } = useContext(AuthContext);
  console.log(user);

  async function fetchData() {
    try {
      const response = await getallEvents();
      if (response && response.data) {
        setEvents(response.data); // Update the events state
      } else {
        console.error(
          "Failed to fetch events: response is undefined or invalid"
        );
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  // Load sample events
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: "Team Meeting",
        description: "Weekly team sync-up",
        date: "2025-03-01",
        time: "10:00",
        location: "Conference Room A",
        type: "Meeting",
        color: "#4F46E5", // Indigo
        attendees: ["John", "Sarah", "Mike"],
      },
    ];
    fetchData();
  }, []);

  // Get event color based on type
  const getEventColor = (type) => {
    const colorMap = {
      Meeting: "#4F46E5", // Indigo
      Corporate: "#059669", // Emerald
      Training: "#D97706", // Amber
      Social: "#EC4899", // Pink
      Other: "#6B7280", // Gray
    };
    return colorMap[type] || colorMap["Other"];
  };

  // Generate random Meeting Link
  const generateMeetingLink = () => {
    return `http://localhost:5173/${Math.random()
      .toString(36)
      .substring(2, 8)}`;
  };

  // Create new event
  const handleCreateEvent = async (event) => {
    const newEvent = {
      ...event,
      id: Math.max(0, ...events.map((e) => e.id)) + 1,
      color: getEventColor(event.type),
    };

    const data = await createEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      duration: 2,
      organizer: user.id,
      meetingLink: generateMeetingLink(),
      status: "upcoming",
      attendees: event.attendees,
    });
    console.log(data)
    setEvents([...events, newEvent]);
    setIsCreateModalOpen(false);
  };

  // Update event
  const handleUpdateEvent = async (updatedEvent) => {
     const updatednewEvent = {
      ...updatedEvent,
      id: Math.max(0, ...events.map((e) => e.id)) + 1,
      color: getEventColor(event.type),
    };

    const data = await updateEventById({
      title: updatednewEvent.title,
      description: updatednewEvent.description,
      date: updatednewEvent.date,
      time: updatednewEvent.time,
      duration: 2,
      organizer: user.id,
      meetingLink: generateMeetingLink(),
      status: "upcoming",
      attendees: updatednewEvent.attendees,
    }, selectedEvent._id);

    console.log(data)

    fetchData();
    setIsUpdateModalOpen(false);
  };

  // Delete event
  const handleDeleteEvent = async () => {
    console.log(selectedEvent)
    const deletedEvenet = await deleteEventById(selectedEvent._id);     
    console.log(deletedEvenet)
    fetchData();
    setIsDeleteModalOpen(false);
  };

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const today = new Date();
    const eventDate = new Date(event.date);

    switch (filter) {
      case "upcoming":
        return matchesSearch && eventDate >= today;
      case "past":
        return matchesSearch && eventDate < today;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="ml-2 text-xl font-semibold text-gray-800">
                EventFlow
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Event Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Organize, schedule and manage all your events in one place
            </p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create New Event
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                className="block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-l-md border border-gray-300 ${
                    viewMode === "list"
                      ? "bg-indigo-50 text-indigo-700 border-indigo-500 z-10"
                      : "text-gray-700 bg-white"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1 inline-block -mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  List
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-r-md border border-gray-300 ${
                    viewMode === "calendar"
                      ? "bg-indigo-50 text-indigo-700 border-indigo-500 z-10"
                      : "text-gray-700 bg-white"
                  }`}
                  onClick={() => setViewMode("calendar")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1 inline-block -mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Calendar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Display */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {viewMode === "list" ? (
            <EventList
              events={filteredEvents}
              onEdit={(event) => {
                setSelectedEvent(event);
                setIsUpdateModalOpen(true);
              }}
              onDelete={(event) => {
                setSelectedEvent(event);
                setIsDeleteModalOpen(true);
              }}
            />
          ) : (
            <EventCalendar
              events={filteredEvents}
              onEventClick={(event) => {
                setSelectedEvent(event);
                setIsUpdateModalOpen(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <EventFormModal
          title="Create New Event"
          onSubmit={handleCreateEvent}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {/* Update Event Modal */}
      {isUpdateModalOpen && selectedEvent && (
        <EventFormModal
          title="Update Event"
          event={selectedEvent}
          onSubmit={handleUpdateEvent}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedEvent && (
        <DeleteConfirmationModal
          event={selectedEvent}
          onConfirm={handleDeleteEvent}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

const DeleteConfirmationModal = ({ event, onConfirm, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="form-title">Delete Event</h2>
        <p className="text-gray-600">
          Are you sure you want to delete the event "{event.title}"?
        </p>
        <div className="mt-6 flex justify-end gap-2 ">
          <button
            onClick={onClose}
            className="inline-flex items-center px-7 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center px-7  py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;
