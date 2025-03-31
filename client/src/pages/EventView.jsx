import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosIntance";

const EventView = () => {
  const { id } = useParams();

  const fetchEvent = async () => {
    try {
      const response = await axiosInstance.get(`/events/${id}`);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      throw error;
    }
  };

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent()
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error loading event:", error));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-medium text-gray-700">
          Loading event...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-medium text-gray-700">
          Event not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center h-72 md:h-96 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${
            event.imageUrl ||
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
          })`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-0 ">
          <div className="absolute top-4 left-4">
            <Link
              to="/events"
              className="flex items-center px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-medium transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Events
            </Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-10 relative z-10">
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
            {(event.registeredAttendees?.length || 0) >= event.maxAttendees ? (
              <span className="text-sm font-semibold px-3 py-1 bg-red-100 text-red-800 rounded-full">
                Fully Booked
              </span>
            ) : (
              <span className="text-sm font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full">
                {event.maxAttendees - (event.registeredAttendees?.length || 0)}{" "}
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
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {event.title}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-4 max-w-2xl">
            {event.shortDescription ||
              event.description?.substring(0, 120) ||
              "No description available"}
            ...
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {event.startTime
                      ? new Date(event.startTime).toLocaleDateString()
                      : "TBD"}{" "}
                    -{" "}
                    {event.endTime
                      ? new Date(event.endTime).toLocaleDateString()
                      : "TBD"}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    {event.startTime
                      ? new Date(event.startTime).toLocaleTimeString()
                      : "TBD"}{" "}
                    -{" "}
                    {event.endTime
                      ? new Date(event.endTime).toLocaleTimeString()
                      : "TBD"}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>
                    {event.registeredAttendees?.length || 0} /{" "}
                    {event.maxAttendees || 0} attendees
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  About This Event
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {event.description || "No description available"}
                </p>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Two Column Layout for Details */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  {/* Speakers */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                      Speakers
                    </h2>
                    {event.speakers && event.speakers.length > 0 ? (
                      <ul className="space-y-2">
                        {event.speakers.map((speaker, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mr-3">
                              {speaker.name
                                ? speaker.name.charAt(0).toUpperCase()
                                : "S"}
                            </div>
                            <span>{speaker.name || "Anonymous Speaker"}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No speakers announced yet</p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  {/* Agenda */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Agenda
                    </h2>
                    {event.agenda &&
                    event.agenda.length > 0 &&
                    event.agenda.some((item) => item.title) ? (
                      <ul className="space-y-3">
                        {event.agenda
                          .filter((item) => item.title)
                          .map((item, index) => (
                            <li
                              key={index}
                              className="border-l-2 border-indigo-500 pl-4 py-1"
                            >
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-gray-500">
                                {item.startTime
                                  ? new Date(
                                      item.startTime
                                    ).toLocaleTimeString()
                                  : "TBD"}{" "}
                                -
                                {item.endTime
                                  ? new Date(item.endTime).toLocaleTimeString()
                                  : "TBD"}
                              </div>
                              {item.description && (
                                <div className="text-sm mt-1">
                                  {item.description}
                                </div>
                              )}
                              {item.speaker && (
                                <div className="text-sm italic mt-1">
                                  Speaker: {item.speaker}
                                </div>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">
                        Agenda will be announced soon
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Registration Deadline */}
              {event.registrationDeadline && (
                <div className="mt-4 mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <p className="text-yellow-700 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Registration deadline:{" "}
                    {new Date(event.registrationDeadline).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Register Button */}
              <div className="mt-8 border-t pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Event by University Name
                    </div>
                    <div className="text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          (event.registeredAttendees?.length || 0) >=
                          event.maxAttendees
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {(event.registeredAttendees?.length || 0) >=
                        event.maxAttendees
                          ? "Fully Booked"
                          : "Spots Available"}
                      </span>
                    </div>
                  </div>
                  {["live", "ongoing"].includes(event.status) ? (
                    <a
                      href={event.virtualLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Join Now
                    </a>
                  ) : ["draft"].includes(event.status) ? (
                    <span className="text-gray-500 px-4 py-2 rounded-lg bg-gray-200">
                      Draft
                    </span>
                  ) : ["ongoing"].includes(event.status) ? (
                    <span className="text-green-500 px-4 py-2 rounded-lg bg-green-100">
                      Ongoing
                    </span>  
                  ) : ["completed", "cancelled"].includes(event.status) ? (
                    <span
                      className={`text-white px-4 py-2 rounded-lg ${
                        event.status === "completed"
                          ? "bg-gray-500"
                          : "bg-red-500"
                      }`}
                    >
                      {event.status === "completed" ? "Completed" : "Cancelled"}
                    </span>
                  ) : (
                    <Link
                      to={`/events/${event._id}/register`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                        <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      Register
                    </Link>
                  )}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;
