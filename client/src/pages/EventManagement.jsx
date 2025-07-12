import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosIntance";
import {
  changeEventStatusById,
  updateEventById,
} from "../handlers/event_handler";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const EventManagement = () => {
  // Get the event ID from URL parameters
  const { id } = useParams();
  const { user } = useAuth();

  const [subTab, setSubTab] = useState("view");
  const [attendeedata, setAttendeeData] = useState([]);
  useEffect(() => {
    document.title = "Virtumate | Manage Event";
    // Fetch event details from API
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        // console.log(response.data.data);
        setEvent(response.data.data);

        const attendeeResponse = await axiosInstance.get(
          `/events/${id}/attendees`
        );
        console.log(attendeeResponse.data.data[0].attended);
        setAttendeeData(attendeeResponse.data.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const [event, setEvent] = useState([]);

  // State for active tab
  const [activeTab, setActiveTab] = useState("overview");

  // State for editing form
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  const handleSaveEdit = async () => {
    // code for call update
    try {
      const response = await updateEventById(editedEvent, event._id);
      console.log(response);
    } catch (e) {
      console.log(e);
    }

    setEvent(editedEvent);
    setIsEditing(false);
  };

  const handleAttendanceChange = (attendeeId, attended) => {
    console.log(attendeeId, attended);

    // Update the attendance status of the attendee
    const updatedAttendees = attendeedata.map((attendee) => {
      if (attendee._id === attendeeId) {
        return { ...attendee, attended: attended }; // Use the passed 'attended' value directly
      }
      return attendee;
    });
    setAttendeeData(updatedAttendees);
  };

  const saveAttendance = async () => {
    try {
      const response = await axiosInstance.put(
        `/events/${event._id}`,
        { registeredAttendees: attendeedata } // Send the updated attendees data
      );
      console.log(response.data.data);
      // Handle success response if needed
      toast.success("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  // State for status options
  const [statusOptions] = useState([
    { value: "draft", label: "Draft", color: "yellow" },
    { value: "scheduled", label: "Scheduled", color: "blue" },
    { value: "live", label: "Live", color: "green" },
    { value: "completed", label: "Completed", color: "gray" },
    { value: "cancelled", label: "Cancelled", color: "red" },
    { value: "upcoming", label: "Upcoming", color: "purple" },
    { value: "ongoing", label: "Ongoing", color: "teal" },
  ]);

  const [Recipientstype, setRecipientstype] = useState("All Attendees");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  // Function to handlesend email
  const handleSendEmail = async () => {
    try {
      if (!subject) {
        toast.error("Subject is required.");
        return;
      }
      if (!body) {
        toast.error("Body is required.");
        return;
      }

      if (subject.length > 100) {
        toast.error("Subject should not exceed 100 characters.");
        return;
      }

      if (Recipientstype === "All Attendees") {
        toast.success("Sending email to all attendees...");
        // console.log(event.registeredAttendees);

        // } else if (Recipients === "speakers") {
        //   Recipients = event.speakers.map((speaker) => speaker._id);
        // } else if (Recipients === "exhibitors") {
        //   Recipients = event.exhibitorBooths.map((booth) => booth._id);
        // } else if (Recipients === "attendees") {
        //   Recipients = event.registeredAttendees.map((attendee) => attendee.userId);
      } else {
        toast.error("Please select a recipient type.");
        return;
      }

      // Send email using the API
      const toastId = toast.loading("Sending email...");
      const response = await axiosInstance.post(
        `/events/${event._id}/getallregisteredemail`,
        {
          subject: subject,
          body: body,
        }
      );
      if (response.status === 200) {
        toast.dismiss(toastId);
        toast.success("Email sent successfully!");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error sending email:", error);

      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };
  // Function to handlesend email
  const handleSendEmailmsg = async (subject, body) => {
    try {
      if (!subject) {
        toast.error("Subject is required.");
        return;
      }
      if (!body) {
        toast.error("Body is required.");
        return;
      }

      if (subject.length > 100) {
        toast.error("Subject should not exceed 100 characters.");
        return;
      }

      // Send email using the API
      const toastId = toast.loading("Sending email...");
      const response = await axiosInstance.post(
        `/events/${event._id}/getallregisteredemail`,
        {
          subject: subject,
          body: body,
        }
      );      
      if (response.status === 200) {
        toast.dismiss(toastId);
        toast.success("Email sent successfully!");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error sending email:", error);

      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  const handleSchedule = async (id) => {
    try {
      const response = await axiosInstance.post(`/events/${id}/meeting`);
      console.log(response.data.data);
      toast.success("Meeting Scheduled!", {
        duration: 3000, // 3 seconds
      });
    } catch (error) {
      console.error("Error scheduling meeting", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  Dashboard
                </Link>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link
                  to="/myevents"
                  className="ml-2 text-gray-500 hover:text-indigo-600"
                >
                  My Events
                </Link>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-indigo-600 font-medium">
                  Manage Event
                </span>
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
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="text-sm font-semibold px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full inline-flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {event.eventType || "Event"}
                      </span>
                      {(event.registeredAttendees?.length || 0) >=
                      event.maxAttendees ? (
                        <span className="text-sm font-semibold px-3 py-1 bg-red-100 text-red-800 rounded-full">
                          Fully Booked
                        </span>
                      ) : (
                        <span className="text-sm font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full">
                          {event.maxAttendees -
                            (event.registeredAttendees?.length || 0)}{" "}
                          Spots Left
                        </span>
                      )}
                      {event.status && (
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            event.status === "draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : event.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : event.status === "live"
                              ? "bg-green-100 text-green-800"
                              : event.status === "completed"
                              ? "bg-gray-100 text-gray-800"
                              : event.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : event.status === "upcoming"
                              ? "bg-purple-100 text-purple-800"
                              : event.status === "ongoing"
                              ? "bg-teal-100 text-teal-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {event.status.charAt(0).toUpperCase() +
                            event.status.slice(1)}
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                    <div className="flex items-center text-white text-sm">
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
                      })}{" "}
                      -{" "}
                      {
                        // In a real app, you would format the time using a library like date-fns or moment.js
                        new Date(event.startTime).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })
                      }{" "}
                      -{" "}
                      {new Date(event.endTime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                    {/* <div className="flex items-center text-white text-sm mt-1">
                      <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div> */}
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

                        <select
                          value={event.status}
                          onChange={async (e) => {
                            let status = e.target.value;
                            setEvent({ ...event, status: e.target.value });
                            const toastId = toast.loading(
                              "Changing event Status..."
                            );
                            try {
                              const response = await axiosInstance.put(
                                `/events/${event._id}/changestatus`,
                                { status }
                              );
                              console.log(response.data);

                              if (response.status === 200) {
                                toast.dismiss(toastId);
                                toast.success("Now Event is " + status + "!");

                                if (status === "live") {
                                  handleSchedule(event._id); // Call the handleSchedule function after changing status
                                }
                              }
                            } catch (error) {
                              console.error(
                                "Error Changing event status:",
                                error
                              );
                              toast.dismiss(toastId);
                              toast.error("Failed to Change event Status ❌");
                            }
                          }}
                          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        <Link
                          to={`/event-details/${event._id}`}
                          className="border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                        >
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
                            setEditedEvent({ ...event });
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
                    onClick={() => setActiveTab("overview")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "overview"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("attendees")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "attendees"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Attendees
                  </button>
                  <button
                    onClick={() => setActiveTab("agenda")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "agenda"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Agenda
                  </button>
                  <button
                    onClick={() => setActiveTab("resources")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "resources"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Resources
                  </button>
                  <button
                    onClick={() => setActiveTab("messaging")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "messaging"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Messaging
                  </button>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "analytics"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
            {activeTab === "overview" && (
              <div>
                {isEditing ? (
                  <div className="space-y-8 max-w-4xl mx-auto">
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
                      <h3 className="text-lg font-semibold text-indigo-700 mb-2 flex items-center">
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Edit Event Details
                      </h3>
                      <p className="text-sm text-indigo-600">
                        Make changes to your event and click &quot;Save
                        Changes&quot; when you&apos;re done.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-md font-medium text-gray-700 mb-4 pb-2 border-b border-gray-100">
                        Basic Information
                      </h4>
                      <div className="mb-6">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Event Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={editedEvent.title}
                          onChange={handleEditChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                          placeholder="Enter a compelling title for your event"
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={5}
                          value={editedEvent.description}
                          onChange={handleEditChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                          placeholder="Describe your event in detail to attract attendees"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Provide clear details about what attendees can expect
                          from this event
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-md font-medium text-gray-700 mb-4 pb-2 border-b border-gray-100">
                        Date & Time
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label
                            htmlFor="startTime"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Start Date & Time{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="datetime-local"
                            id="startTime"
                            name="startTime"
                            value={editedEvent.startTime}
                            onChange={handleEditChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="endTime"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            End Date & Time{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="datetime-local"
                            id="endTime"
                            name="endTime"
                            value={editedEvent.endTime}
                            onChange={handleEditChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-md font-medium text-gray-700 mb-4 pb-2 border-b border-gray-100">
                        Event Configuration
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label
                            htmlFor="eventType"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Event Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="eventType"
                            name="eventType"
                            value={editedEvent.eventType}
                            onChange={handleEditChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                          >
                            <option value="">Select an event type</option>
                            <option value="webinar">Webinar</option>
                            <option value="workshop">Workshop</option>
                            <option value="conference">Conference</option>
                            {/* <option value="seminar">Seminar</option>
                            <option value="networking">Networking</option>
                            <option value="social">Social Event</option> */}
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="maxAttendees"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Maximum Attendees{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <input
                              type="number"
                              id="maxAttendees"
                              name="maxAttendees"
                              min="1"
                              max="10000"
                              value={editedEvent.maxAttendees}
                              onChange={handleEditChange}
                              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pr-12 transition-colors"
                              placeholder="100"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                people
                              </span>
                            </div>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Set the capacity limit for your event
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Event Status
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                          {statusOptions.map((option) => (
                            <div
                              key={option.value}
                              onClick={() =>
                                setEditedEvent({
                                  ...editedEvent,
                                  status: option.value,
                                })
                              }
                              className={`cursor-pointer rounded-md border px-3 py-2 text-sm flex items-center justify-center ${
                                editedEvent.status === option.value
                                  ? `bg-${option.color}-50 border-${option.color}-200 text-${option.color}-700`
                                  : "border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="h-4 w-4 relative mr-2">
                          <input
                            id="isPublic"
                            name="isPublic"
                            type="checkbox"
                            checked={editedEvent.isPublic}
                            onChange={(e) =>
                              setEditedEvent({
                                ...editedEvent,
                                isPublic: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="isPublic"
                            className="font-medium text-sm text-gray-700"
                          >
                            Make this event public
                          </label>
                          <p className="text-xs text-gray-500">
                            Public events will be listed in the event directory
                            and can be discovered by all users
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 pb-2 border-b border-gray-100">
                        Event Description
                      </h3>
                      <div className="prose max-w-none mb-4 text-gray-700">
                        <p>{event.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 pb-2 border-b border-gray-100">
                          Event Details
                        </h3>
                        <ul className="space-y-5">
                          <li className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                              <svg
                                className="h-5 w-5 text-indigo-500"
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
                            </div>
                            <div>
                              <span className="block text-sm font-medium text-gray-900">
                                Date & Time
                              </span>
                              <span className="block text-sm text-gray-600">
                                {new Date(event.startTime).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                                <br />
                                {new Date(event.startTime).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}{" "}
                                -{" "}
                                {new Date(event.endTime).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="h-5 w-5 mr-2 text-indigo-500 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              />
                            </svg>
                            <div>
                              <span className="block text-sm font-medium text-gray-900">
                                Event Type
                              </span>
                              <span className="block text-sm text-gray-600">
                                {event.eventType}
                              </span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="h-5 w-5 mr-2 text-indigo-500 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                            <div>
                              <span className="block text-sm font-medium text-gray-900">
                                maxAttendees
                              </span>
                              <span className="block text-sm text-gray-600">
                                {event.maxAttendees} attendees
                              </span>
                            </div>
                          </li>
                          {/* Registration Deadline */}

                          <li className="flex items-start">
                            <svg
                              className="h-5 w-5 mr-2 text-indigo-500 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <div>
                              <span className="block text-sm font-medium text-gray-900">
                                Registration Deadline
                              </span>
                              <span className="block text-sm text-gray-600">
                                {(event.registrationDeadline &&
                                  new Date(
                                    event.registrationDeadline
                                  ).toLocaleDateString()) ||
                                  "No deadline"}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Visibility & Sharing
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center">
                            <div
                              className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                                event.isPublic
                                  ? "bg-green-100 text-green-500"
                                  : "bg-red-100 text-red-500"
                              }`}
                            >
                              {event.isPublic ? (
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-gray-900">
                                {event.isPublic
                                  ? "Public Event"
                                  : "Private Event"}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {event.isPublic
                                  ? "This event is visible to everyone at the university."
                                  : "This event is by invitation only."}
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold mb-2">
                          Share Event
                        </h3>
                        <div className="flex space-x-3 mb-4">
                          {/* <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none" 
                            
                          >
                            <svg
                              className="h-5 w-5 mr-2 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                            Facebook
                          </button>
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                            <svg
                              className="h-5 w-5 mr-2 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                            Twitter
                          </button> */}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${window.location.origin}/event/${event._id}`
                              );
                              toast.success("Link copied to clipboard!");
                            }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            <svg
                              className="h-5 w-5 mr-2 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Copy Link
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Quick Actions
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                          onClick={() => {
                            const subject = `🌟 You're Invited: Join Us for ${event.title}! 🌟`;
                            const body = `
                              🎉 We are thrilled to invite you to our upcoming event: "${
                                event.title
                              }"! 🎉
                              
                              📅 Date: ${new Date(
                                event.startTime
                              ).toLocaleDateString()}
                              🕒 Time: ${new Date(
                                event.startTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              
                              🌟 This is a fantastic opportunity to connect, learn, and engage with like-minded individuals. Don't miss out on this exciting event!
                              
                              We look forward to seeing you there! 😊
                              
                              Best regards,
                              The Virtumate Team
                            `;

                            handleSendEmailmsg(subject, body);
                          }}
                          className="inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                          <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                            />
                          </svg>
                          Send Invitations
                        </button>
                        <button
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
                          className="inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
                        >
                          <svg
                            className="h-5 w-5 mr-2"
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
                          Add to Calendar
                        </button>
                        <button
                          onClick={() => {
                            const generatePDF = async () => {
                              const { jsPDF } = await import("jspdf");
                              const autoTable = (
                                await import("jspdf-autotable")
                              ).default;

                              const doc = new jsPDF();

                              // Add Event Header
                              doc.setFontSize(18);
                              doc.text(event.title || "Event Details", 14, 20);
                              doc.setFontSize(12);
                              doc.text(
                                `Date: ${new Date(
                                  event.startTime
                                ).toLocaleDateString()}`,
                                14,
                                30
                              );
                              doc.text(
                                `Time: ${new Date(
                                  event.startTime
                                ).toLocaleTimeString()} - ${new Date(
                                  event.endTime
                                ).toLocaleTimeString()}`,
                                14,
                                36
                              );
                              doc.text(
                                `Status: ${event.status || "N/A"}`,
                                14,
                                48
                              );

                              // Add a line separator
                              doc.line(14, 52, 200, 52);

                              // Add Table Header
                              doc.setFontSize(14);
                              doc.text("Registered Attendees", 14, 60);

                              // Prepare Table Data
                              const tableData = attendeedata.map((attendee) => [
                                attendee._id || "N/A",
                                attendee.email || "N/A",
                                attendee.attended ? "Present" : "Absent",
                              ]);

                              // Add Table
                              autoTable(doc, {
                                head: [["Name", "Email", "Attendance"]],
                                body: tableData,
                                startY: 70,
                              });

                              // Add Footer
                              const pageCount = doc.internal.getNumberOfPages();
                              for (let i = 1; i <= pageCount; i++) {
                                doc.setPage(i);
                                doc.setFontSize(10);
                                doc.text(
                                  `Page ${i} of ${pageCount}`,
                                  doc.internal.pageSize.width - 20,
                                  doc.internal.pageSize.height - 10
                                );
                              }

                              // Save PDF
                              doc.save(
                                `${event.title || "event"}_attendees.pdf`
                              );
                            };

                            generatePDF();
                          }}
                          className="inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
                        >
                          <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3"
                            />
                          </svg>
                          Export Attendee List
                        </button>
                        {/* <button 
                          
                        className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                          <svg
                            className="h-5 w-5 mr-2 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            />
                          </svg>
                          Archive Event
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Attendees Tab */}
            {activeTab === "attendees" && (
              <div>
                {/* Sub-tabs */}
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setSubTab("view")}
                    className={`py-2 px-4 rounded-md font-medium ${
                      subTab === "view"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    View Attendees
                  </button>
                  <button
                    onClick={() => setSubTab("takeAttendance")}
                    className={`py-2 px-4 rounded-md font-medium ${
                      subTab === "takeAttendance"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Take Attendance
                  </button>

                  <button
                    onClick={() => {
                      const csvContent = [
                        ["Name", "Email", "Attendance"],
                        ...attendeedata.map((attendee) => [
                          attendee.name || "N/A",
                          attendee.email || "N/A",
                          attendee.attended ? "Present" : "Absent",
                        ]),
                      ]
                        .map((row) => row.join(","))
                        .join("\n");

                      const blob = new Blob([csvContent], {
                        type: "text/csv;charset=utf-8;",
                      });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.setAttribute("href", url);
                      link.setAttribute("download", "attendance.csv");
                      link.style.visibility = "hidden";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className={`py-2 px-4 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700`}
                  >
                    Export Attendance
                  </button>
                </div>

                {/* View Attendees */}
                {subTab === "view" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Registered Attendees
                    </h2>
                    <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg mb-8">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Email
                            </th>
                            {/* <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th> */}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {attendeedata.map((attendee) => (
                            <tr key={attendee.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {/* {attendee.name} */}
                                {attendee._id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {attendee._id}
                              </td>
                              {/*                             <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              attendee.attended == true
                                ? "bg-green-100 text-green-800"
                                : attendee.attended == false
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                              }`}
                            >d
                              {attendee.attended == true
                                ? "Attended" }
                            </span>
                            </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Take Attendance */}
                {subTab === "takeAttendance" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Take Attendance
                    </h2>
                    <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg mb-8">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Attendance
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {attendeedata.map((attendee) => (
                            <tr key={attendee.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {attendee._id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {attendee._id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  checked={attendee.attended}
                                  onChange={(e) =>
                                    handleAttendanceChange(
                                      attendee._id,
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={saveAttendance}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                      >
                        Save Attendance
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "agenda" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Event Agenda
                  </h2>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Session
                  </button>
                </div>

                {/* Timeline */}
                <div className="mb-10 relative">
                  <div className="absolute top-0 bottom-0 left-6 w-1 bg-indigo-100"></div>
                  {event.agenda.map((session) => (
                    <div key={session.id} className="relative pl-8 pb-8">
                      <div className="absolute left-4 -translate-x-1/2 h-6 w-6 rounded-full border-4 border-white bg-indigo-500"></div>
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {session.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {session.startTime} - {session.endTime}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-gray-400 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <p className="text-gray-600 text-sm">
                            Speaker: {session.speaker}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Session Form (simplified) */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Add a New Session
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="sessionTitle"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Session Title
                      </label>
                      <input
                        type="text"
                        id="sessionTitle"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter session title"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sessionSpeaker"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Speaker
                      </label>
                      <input
                        type="text"
                        id="sessionSpeaker"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Speaker name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="startTime"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Start Time
                      </label>
                      <input
                        type="text"
                        id="startTime"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="e.g. 10:00 AM"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="endTime"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        End Time
                      </label>
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
            {activeTab === "resources" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Event Resources -- Pending
                  </h2>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Upload Resource
                  </button>
                </div>

                {/* Resource List */}
                <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Resource
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Uploaded At
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
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
                                {resource.type === "PDF" ? (
                                  <svg
                                    className="h-6 w-6 text-red-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M7 11.5h10a.5.5 0 000-1H7a.5.5 0 000 1zM7 13.5h10a.5.5 0 000-1H7a.5.5 0 000 1zM7 15.5h10a.5.5 0 000-1H7a.5.5 0 000 1zM5 5v14h14V5H5zm.5-1h13a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 18.5v-13A1.5 1.5 0 015.5 4z" />
                                  </svg>
                                ) : (
                                  <svg
                                    className="h-6 w-6 text-indigo-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 00-.196-.293l-6-6a.997.997 0 00-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 00-.259-.051C13.04 2.011 13.021 2 13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8.997a.99.99 0 00-.063-.317zM10 18H8v-4h2v4zm4 0h-2v-6h2v6zm4 0h-2v-2h2v2zm-6-9V4h-1v5H7V4H6v5H5V4h-.5A1.5 1.5 0 013 5.5v13A1.5 1.5 0 014.5 20h15a1.5 1.5 0 001.5-1.5V9h-9z" />
                                  </svg>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {resource.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {resource.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {resource.uploadedAt}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              Download
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
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
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      Drag and drop your files here, or{" "}
                      <span className="text-indigo-600 font-medium">
                        browse
                      </span>
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
            {activeTab === "messaging" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Attendee Messaging
                  </h2>
                  <div className="flex space-x-3">
                    {/* <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      Send Notification
                    </button> */}
                  </div>
                </div>

                {/* Message Composer */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      New Message
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <label
                        htmlFor="recipients"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Recipients
                      </label>
                      <select
                        id="recipients"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => setRecipientstype(e.target.value)}
                      >
                        <option>All Attendees</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Message subject"
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Type your message here..."
                        onChange={(e) => setBody(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-3">
                      {/* <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        Save Draft
                      </button> */}
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        onClick={() => handleSendEmail()}
                      >
                        Send Email
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message Templates */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Message Templates
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors"
                      onClick={() => {
                        let subject =
                          "📅 Reminder: Upcoming Event - Don't Miss Out!";
                        let body = `
                        Dear Attendee,

                        This is a friendly reminder that our event, "${
                          event.title
                        }", is just around the corner! We are excited to have you join us.

                        📍 Event Details:
                        - Date: ${new Date(
                          event.startTime
                        ).toLocaleDateString()}
                        - Time: ${new Date(event.startTime).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}


                        Please mark your calendar and prepare for an engaging and insightful experience. If you have any questions, feel free to reach out to us.

                        We look forward to seeing you there!

                        Best regards,  
                        The Virtumate Team
                        `;

                        handleSendEmailmsg(subject, body);
                      }}
                    >
                      <h4 className="font-medium text-gray-900">
                        Event Reminder
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        A friendly reminder that our event is coming up soon.
                        We&apos;re looking forward to seeing you!
                      </p>
                    </div>
                    <div
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors"
                      onClick={() => {
                        let subject = "🙏 Thank You for Attending Our Event!";
                        let body = `
                        Dear Attendee,

                        We sincerely thank you for joining us at "${
                          event.title
                        }". Your presence made the event truly special, and we hope you found it valuable and engaging.

                        🌟 Event Highlights:
                        - Date: ${new Date(
                          event.startTime
                        ).toLocaleDateString()}
                        - Key Takeaways: [Add key takeaways or highlights here]

                        We would love to hear your feedback to help us improve future events. Please feel free to share your thoughts or suggestions.

                        Once again, thank you for being a part of our event. We look forward to welcoming you to our future events!

                        Warm regards,  
                        The Virtumate Team
                        `;

                        handleSendEmailmsg(subject, body);
                      }}
                    >
                      <h4 className="font-medium text-gray-900">
                        Thank You Message
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        Thank you for attending our event! We hope you found it
                        valuable and look forward to seeing you again.
                      </p>
                    </div>
                    <div
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors"
                      onClick={() => {
                        let subject = "❌ Cancellation Notice: Event Update";
                        let body = `
                      Dear Attendee,

                      We regret to inform you that our event, "${event.title}", has been canceled due to unforeseen circumstances. We sincerely apologize for any inconvenience this may cause.

                      If you have any questions or concerns, please feel free to reach out to us.

                      Thank you for your understanding.

                      Best regards,  
                      The Virtumate Team
                      `;

                        handleSendEmailmsg(subject, body);
                      }}
                    >
                      <h4 className="font-medium text-gray-900">
                        Cancellation Notice
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        We regret to inform you that we need to cancel the
                        upcoming event. We apologize for any inconvenience.
                      </p>
                    </div>
                    <div
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors"
                      onClick={() => {
                        let subject =
                          "📋 Feedback Request: Your Thoughts Matter!";
                        let body = `
                      Dear Attendee,

                      We hope you enjoyed our event, "${event.title}". Your feedback is invaluable to us, and we would greatly appreciate it if you could take a moment to share your thoughts.

                      Please click the link below to provide your feedback:
                      [Feedback Link]

                      Thank you for your time and support!

                      Best regards,  
                      The Virtumate Team
                      `;

                        handleSendEmailmsg(subject, body);
                      }}
                    >
                      <h4 className="font-medium text-gray-900">
                        Feedback Request
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        We value your feedback! Please take a moment to share
                        your thoughts on the event. Your input helps us improve
                        future experiences.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message History */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Message History
                  </h3>
                  <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Event Details Confirmation
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Sent to All Attendees • March 10, 2024
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => {
                              let subject = "Event Details Confirmation";
                              let body = `
                              Dear Attendee,
                              We are excited to confirm your registration for our event, "${
                                event.title
                              }". Here are the details:
                              - Date: ${new Date(
                                event.startTime
                              ).toLocaleDateString()}
                              - Time: ${new Date(
                                event.startTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              - Location: [Event Location]
                              - Agenda: [Event Agenda]
                              - Speaker: [Event Speaker]
                              - Contact: [Contact Information]
                              - Registration ID: ${id}
                              - Registered Email: ${user?.email}
                              - Registration Date: ${new Date(
                                event.startTime
                              ).toLocaleDateString()}
                              - Registration Time: ${new Date(
                                event.startTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              We look forward to seeing you at the event! If you have any questions or need further assistance, feel free to reach out to us.
                              Best regards,
                              The Virtumate Team
                              `;

                              navigator.clipboard.writeText(
                                `Subject: ${subject}\n\n${body}`
                              );
                              toast.success(
                                "Email format copied to clipboard!"
                              );
                            }}
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Agenda Update
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Sent to Confirmed Attendees • March 12, 2024
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                              />
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
            {activeTab === "analytics" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Event Analytics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Total Attendees */}
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Total Attendees
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600">
                      {event.registeredAttendees?.length || 0}
                    </p>
                  </div>

                  {/* Attendance Rate */}
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Attendance Rate
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600">
                      {attendeedata.length > 0
                        ? `${Math.round(
                            (attendeedata.filter(
                              (attendee) => attendee.attended
                            ).length /
                              attendeedata.length) *
                              100
                          )}%`
                        : "0%"}
                    </p>
                  </div>

                  {/* Remaining Spots */}
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Remaining Spots
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600">
                      {event.maxAttendees -
                        (event.registeredAttendees?.length || 0)}
                    </p>
                  </div>
                </div>

                {/* Attendance Breakdown */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Attendance Breakdown
                  </h3>
                  <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Attendance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {attendeedata.map((attendee) => (
                          <tr key={attendee._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {attendee.name || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {attendee.email || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {attendee.attended ? (
                                <span className="text-green-600 font-medium">
                                  Present
                                </span>
                              ) : (
                                <span className="text-red-600 font-medium">
                                  Absent
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Engagement Metrics */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Engagement Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        Emails Sent
                      </h4>
                      <p className="text-3xl font-bold text-indigo-600">--</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        Feedback Received
                      </h4>
                      <p className="text-3xl font-bold text-indigo-600">--</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        Resources Downloaded
                      </h4>
                      <p className="text-3xl font-bold text-indigo-600">--</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
