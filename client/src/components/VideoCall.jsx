import { LiveKitRoom, VideoConference, useParticipants, ConnectionState, RoomControls } from "@livekit/components-react";
import { useState, useEffect } from "react";
import "@livekit/components-styles";

const VideoCall = () => {
  const token = localStorage.getItem("roomToken");
  const [isConnecting, setIsConnecting] = useState(true);
  const [showAttendees, setShowAttendees] = useState(false);
  const [isHost, setIsHost] = useState(false); // Assuming you have a way to determine if the user is a host
  
  useEffect(() => {
    const timer = setTimeout(() => setIsConnecting(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const serverUrl = `wss://virtumate-tumo1evz.livekit.cloud`;

  if (isConnecting) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700">Connecting to your call...</p>
      </div>
    );
  }


  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold mb-3">Connection Error</h2>
          <p className="text-gray-600 mb-4">Missing authentication token</p>
          <button 
            onClick={() => window.location.href = "/"} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
        <h2 className="text-xl font-semibold">VirtuMate Meeting</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAttendees(!showAttendees)}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors ${showAttendees ? 'bg-blue-700' : ''}`}>
            {/* {showAttendees ? 'Hide Attendees' : 'Show Attendees'}*/}
            dsd
          </button>
          <button 
            onClick={() => {
              ConnectionState.leave();
              alert("You have left the call.");
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center">
            End Call
          </button>
        </div>
      </div>
      
      <LiveKitRoom serverUrl={serverUrl} token={token} connect>
        <div className="flex flex-1 overflow-hidden relative">
          {showAttendees && <AttendeesList />}
          <div className={`flex-1 ${showAttendees ? 'mr-64' : ''}`}>
            <VideoConference />
          </div>
        </div>
        <div className="bg-gray-800 p-4 flex justify-center">
          <CustomControls />
        </div>
      </LiveKitRoom>
    </div>
  );
};

const AttendeesList = () => {
  const participants = useParticipants();
  
  
  return (
    <div className="w-64 bg-white shadow-lg absolute right-0 top-0 bottom-16 overflow-y-auto">
      <div className="p-4 bg-blue-600 text-white font-semibold">
        Attendees ({participants.length})
      </div>
      <ul className="p-2">
        {participants.map(participant => (
          <li key={participant.sid} className="flex items-center p-2 hover:bg-gray-100 rounded-md mb-1">
            <div className={`w-3 h-3 rounded-full mr-2 ${participant.isSpeaking ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>{participant.name || 'Anonymous'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CustomControls = () => {
  return (
    <div className="flex space-x-4">
      <RoomControls
        controls={{
          microphone: true,
          camera: true,
          screenShare: true,
          leave: true
        }}
        variation="minimal"
        className="gap-4"
      />
    </div>
  );
};

export default VideoCall;
