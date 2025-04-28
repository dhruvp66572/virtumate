import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosIntance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const MyEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Virtumate | Events";

    // Fetch events from API
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user.id}/events`);
        console.log(response.data.data);
        setEvents(response.data.data.organized);
        // setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user?.id]);

  const handledelete = async (id) => {
    // First check if the user confirms deletion
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmed) {
      const toastId = toast.loading("Deleting event...");
      try {
        const response = await axiosInstance.delete(`/events/${id}`);

        if (response.status === 200) {
          // Remove the deleted event from state
          setEvents(events.filter((event) => event._id !== id));
          toast.dismiss(toastId);
          toast.success("Event Deleted Successfully!");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.dismiss(toastId);
        toast.error("Failed to create event ❌");
      }
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

  // const handleJoin = async (id) => {
  //   try {
  //     const response = await axiosInstance.post(`/events/${id}/meeting/join`);
  //     console.log(response.data);
  //     const token = response.data.token;
  //     localStorage.setItem("roomToken", token);
  //     navigate(`/video-call/${id}`);
  //   } catch (error) {
  //     console.error("Error joining meeting", error);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Organized Events
            </h1>
            <Link
              to="/event-create"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Event
            </Link>
          </div>

          {/* Event Cards */}
          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {/* Event Image Placeholder - can be replaced with actual event image */}
                  <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">
                      {event.title.substring(0, 1)}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">
                      {event.title}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-indigo-500"
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
                      <p className="text-sm">
                        {new Date(event.startTime).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm">
                        {new Date(event.startTime).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(event.endTime).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <p className="text-sm capitalize">{event.eventType}</p>
                    </div>

                    <div className="mt-5 flex flex-col space-y-4">
                      {event.status && (
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full self-start ${
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

                      <div className="flex space-x-3 pt-2 border-t">
                        <Link to={`/myevents/${event._id}`} className="flex-1">
                          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handledelete(event._id)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>

                        {!event.meetingDetails.roomName ? (
                          <button
                            onClick={() => handleSchedule(event._id)}
                            className="w-full px-4 p  y-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Schedule Meeting
                          </button>
                        ) : (
                          //   <button
                          //   onClick={() => handleSchedule(event._id)}
                          //   className="w-full px-4 p  y-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                          // >
                          //   <svg
                          //     xmlns="http://www.w3.org/2000/svg"
                          //     className="h-4 w-4 mr-2"
                          //     fill="none"
                          //     viewBox="0 0 24 24"
                          //     stroke="currentColor"
                          //   >
                          //     <path
                          //       strokeLinecap="round"
                          //       strokeLinejoin="round"
                          //       strokeWidth={2}
                          //       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          //     />
                          //   </svg>
                          //   Stop Meeting
                          // </button>
                          ""
                        )}

                        {/* Join Meeting */}
                        {/* <button
                          onClick={() => handleJoin(event._id)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Join Meeting
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white rounded-lg shadow-md p-10 max-w-lg mx-auto">
              <div className="mb-4 text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Events Yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven&apos;t created any events yet. Start organizing your
                first event now!
              </p>
              <Link
                to="/event-create"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Event
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
