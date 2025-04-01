import { LiveKitRoom, VideoConference, ConnectionState } from "@livekit/components-react";
import { useState, useEffect } from "react";
import "@livekit/components-styles";

const VideoCall = () => {
  const token = localStorage.getItem("roomToken");
  const [isConnecting, setIsConnecting] = useState(true);
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
      {/* <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
        <h2 className="text-xl font-semibold">VirtuMate Meeting</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => {
              ConnectionState.leave();
              alert("You have left the call.");
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center">
            End Call
          </button>
        </div>
      </div> */}
      
      <LiveKitRoom serverUrl={serverUrl} token={token} connect>
        <div className="flex flex-1 overflow-hidden relative">
          <div className={`flex-1`}>
            <VideoConference />
          </div>
        </div>       
      </LiveKitRoom>
    </div>
  );
};


export default VideoCall;
