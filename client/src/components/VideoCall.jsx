import {
  LiveKitRoom,
  VideoConference,
  useParticipants,
} from "@livekit/components-react";
import { useState, useEffect } from "react";
import "@livekit/components-styles";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosIntance";

const VideoCall = () => {
  const token = localStorage.getItem("roomToken");
  const [isConnecting, setIsConnecting] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsConnecting(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  const serverUrl = `wss://virtumate-tumo1evz.livekit.cloud`;
  try {
    if (isConnecting) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-5"></div>
          <p className="text-gray-800 text-lg font-medium">
            Connecting to your call...
          </p>
          <p className="text-gray-500 mt-2">
            Setting up your virtual meeting space
          </p>
        </div>
      );
    }

    if (!token) {
      return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto text-center">
            <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              Connection Error
            </h2>
            <p className="text-gray-600 mb-6">
              Unable to join the meeting because the authentication token is
              missing.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full font-medium"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error("Error in VideoCall component:", error);
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Error</h2>
          <p className="text-gray-600 mb-6">
            An error occurred while connecting to the call.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full font-medium"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <LiveKitRoom serverUrl={serverUrl} token={token} connect>
        <CallContent />
      </LiveKitRoom>
    </div>
  );
};

const CallContent = () => {
  // const room = useRoom();
  const participants = useParticipants();
  const [activePanel, setActivePanel] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [resources, setResources] = useState([
    {
      id: 1,
      type: "link",
      name: "Meeting Agenda",
      url: "https://example.com/agenda",
    },
    {
      id: 2,
      type: "document",
      name: "Project Brief",
      url: "https://example.com/brief",
    },
  ]);
  const [newResource, setNewResource] = useState({
    name: "",
    url: "",
    type: "link",
  });

  const leaveCall = () => {
    // room?.disconnect();
    window.location.href = "/";
  };

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const addResource = () => {
    if (newResource.name && newResource.url) {
      setResources([...resources, { ...newResource, id: Date.now() }]);
      setNewResource({ name: "", url: "", type: "link" });
      toast.success("Resource added successfully!");
    } else {
      toast.error("Please provide both name and URL");
    }
  };

  const { roomName } = useParams();

  const fetchEvent = async () => {
    try {
      const response = await axiosInstance.get(`/events/${roomName}`);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${roomName}:`, error);
      throw error;
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent()
      .then((data) => {
        setEventDetails(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error loading event:", error));
  }, [roomName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-medium text-gray-700">
          Loading event...
        </div>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-medium text-gray-700">
          Event not found.
        </div>
      </div>
    );
  }
  // const eventDetails = {
  //   title: "Weekly Team Sync",
  //   date: new Date().toLocaleDateString(),
  //   time: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`,
  //   organizer: "John Doe",
  //   description: "Weekly team sync to discuss project progress, blockers, and upcoming tasks."
  // };

  const saveAttendance = async () => {
    const attendanceData = participants.map((participant) => ({
      name: participant.identity,
      status: "Present",
    }));
    console.log("Attendance data:", attendanceData);

    try {
      const response = await axiosInstance.put(
        `/events/${roomName}`,
        { registeredAttendees: attendanceData } // Send the updated attendees data
      );
      console.log(response.data.data);
      // Handle success response if needed
      toast.success("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">VirtuMate Meeting</h2>
          <div className="ml-4 bg-green-500 px-2 py-1 rounded-full text-xs font-medium">
            Live
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            className={`px-3 py-2 rounded-md transition-colors flex items-center shadow-sm ${
              activePanel === "details"
                ? "bg-indigo-500 text-white"
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
            onClick={() => togglePanel("details")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Event Details
          </button>
          <button
            className={`px-3 py-2 rounded-md transition-colors flex items-center shadow-sm ${
              activePanel === "attendance"
                ? "bg-indigo-500 text-white"
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
            onClick={() => togglePanel("attendance")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Attendance ({participants.length})
          </button>
          <button
            className={`px-3 py-2 rounded-md transition-colors flex items-center shadow-sm ${
              activePanel === "resources"
                ? "bg-indigo-500 text-white"
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
            onClick={() => togglePanel("resources")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Resources
          </button>
          <button
            className="bg-white text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors flex items-center shadow-sm"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied to clipboard!");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy Link
          </button>
          <button
            onClick={leaveCall}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            End Call
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {activePanel && (
          <div className="w-80 bg-white p-4 shadow-lg overflow-y-auto border-r border-gray-200">
            {activePanel === "details" && (
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
                  Event Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">TITLE</h4>
                    <p className="text-gray-800 font-medium">
                      {eventDetails.title}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      DATE & TIME
                    </h4>
                    <p className="text-gray-800">
                      {eventDetails.date} at {eventDetails.time}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      ORGANIZER
                    </h4>
                    <p className="text-gray-800">{eventDetails.organizer}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      DESCRIPTION
                    </h4>
                    <p className="text-gray-800">{eventDetails.description}</p>
                  </div>
                </div>
              </div>
            )}

            {activePanel === "attendance" && (
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
                  Attendance
                </h3>
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.sid}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {participant.identity.charAt(0).toUpperCase()}
                        </div>
                        <span className="ml-2 font-medium text-gray-800">
                          {participant.identity}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Present
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={saveAttendance}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center"
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
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  Save Attendance
                </button>
              </div>
            )}

            {activePanel === "resources" && (
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
                  Shared Resources
                </h3>

                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Add New Resource
                  </h4>
                  <input
                    type="text"
                    placeholder="Resource name"
                    className="w-full p-2 mb-2 border rounded"
                    value={newResource.name}
                    onChange={(e) =>
                      setNewResource({ ...newResource, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    className="w-full p-2 mb-2 border rounded"
                    value={newResource.url}
                    onChange={(e) =>
                      setNewResource({ ...newResource, url: e.target.value })
                    }
                  />
                  <div className="flex mb-2">
                    <label className="mr-3">
                      <input
                        type="radio"
                        name="resourceType"
                        value="link"
                        checked={newResource.type === "link"}
                        onChange={() =>
                          setNewResource({ ...newResource, type: "link" })
                        }
                        className="mr-1"
                      />
                      Link
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="resourceType"
                        value="document"
                        checked={newResource.type === "document"}
                        onChange={() =>
                          setNewResource({ ...newResource, type: "document" })
                        }
                        className="mr-1"
                      />
                      Document
                    </label>
                  </div>
                  <button
                    onClick={addResource}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Add Resource
                  </button>
                </div>

                <div className="space-y-2">
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center p-3 bg-white border rounded-lg hover:shadow-md"
                    >
                      <div className="mr-3">
                        {resource.type === "link" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.828 14.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {resource.name}
                        </h4>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Open {resource.type}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div
          className={`flex-1 overflow-hidden border-4 border-blue-100 rounded-lg m-4 shadow-inner bg-white`}
        >
          <VideoConference />
        </div>
      </div>
    </>
  );
};

export default VideoCall;
