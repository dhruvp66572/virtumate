// import { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import { IoMdMic, IoMdMicOff } from "react-icons/io";
// import {
//   FaVideo,
//   FaVideoSlash,
//   FaPhoneAlt,
//   FaStopCircle,
// } from "react-icons/fa";
// import { LuScreenShareOff, LuScreenShare } from "react-icons/lu";
// import PropTypes from "prop-types";
// import Peer from "simple-peer";

// import "../styles/Room.css";

// const Room = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();

//   const [peers, setPeers] = useState([]);
//   const [stream, setStream] = useState(null);
//   const [muted, setMuted] = useState(false);
//   const [videoOn, setVideoOn] = useState(true);
//   const [screenSharing, setScreenSharing] = useState(false);
//   const [recording, setRecording] = useState(false);

//   const userVideo = useRef();
//   const socketRef = useRef();
//   const peersRef = useRef([]);
//   const screenStreamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const recordedChunks = useRef([]);

//   useEffect(() => {
//     const socket = io.connect("http://localhost:3000");
//     socketRef.current = socket;

//     let localStream = null;

//     // Check for available devices
//     navigator.mediaDevices
//       .enumerateDevices()
//       .then((devices) => {
//         const hasCamera = devices.some(
//           (device) => device.kind === "videoinput"
//         );
//         if (!hasCamera) {
//           console.warn("No camera found.");
//           alert("No camera detected. Please connect a webcam.");
//           return;
//         }

//         return navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//       })
//       .then((stream) => {
//         if (!stream) return;

//         setStream(stream);
//         localStream = stream;
//         if (userVideo.current) userVideo.current.srcObject = stream;

//         socket.emit("join-room", roomId, socket.id, "Guest");

//         socket.on("all-users", (users) => {
//           const peers = users.map((user) => {
//             const peer = createPeer(user.id, socket.id, stream);
//             peersRef.current.push({ peerID: user.id, peer });
//             return { peer, id: user.id };
//           });
//           setPeers(peers);
//         });

//         socket.on("user-joined", ({ signal, callerID }) => {
//           const peer = addPeer(signal, callerID, stream);
//           peersRef.current.push({ peerID: callerID, peer });
//           setPeers((users) => [...users, { peer, id: callerID }]);
//         });

//         socket.on("receiving-returned-signal", ({ signal, id }) => {
//           const peerObj = peersRef.current.find((p) => p.peerID === id);
//           if (peerObj) peerObj.peer.signal(signal);
//         });

//         socket.on("user-disconnected", (id) => {
//           setPeers((users) => users.filter((p) => p.id !== id));
//           peersRef.current = peersRef.current.filter((p) => p.peerID !== id);
//         });
//       })
//       .catch((error) => {
//         console.error("Error accessing media devices:", error);
//         alert("Camera or microphone access failed. Please check permissions.");
//       });

//     return () => {
//       socket.disconnect();
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }
//       peersRef.current.forEach(({ peer }) => peer.destroy());
//       setPeers([]);
//       peersRef.current = [];
//       setStream(null);
//     };
//   }, [roomId]);

//   const createPeer = (userToSignal, callerID, stream) => {
//     const peer = new Peer({ initiator: true, trickle: false, stream });
//     peer.on("signal", (signal) => {
//       socketRef.current.emit("sending-signal", {
//         userToSignal,
//         callerID,
//         signal,
//       });
//     });
//     return peer;
//   };

//   const addPeer = (incomingSignal, callerID, stream) => {
//     const peer = new Peer({ initiator: false, trickle: false, stream });
//     peer.on("signal", (signal) => {
//       socketRef.current.emit("returning-signal", { signal, callerID });
//     });
//     peer.signal(incomingSignal);
//     return peer;
//   };

//   const toggleMute = () => {
//     setMuted((prev) => {
//       stream.getAudioTracks()[0].enabled = prev;
//       return !prev;
//     });
//   };

//   const toggleVideo = () => {
//     setVideoOn((prev) => {
//       stream.getVideoTracks()[0].enabled = !prev;
//       return !prev;
//     });
//   };

//   const startScreenShare = async () => {
//     if (!screenSharing) {
//       try {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({
//           video: true,
//         });
//         screenStreamRef.current = screenStream;

//         const videoTrack = screenStream.getVideoTracks()[0];
//         videoTrack.onended = () => startScreenShare(); // Automatically revert on stop

//         peersRef.current.forEach(({ peer }) => {
//           peer.replaceTrack(stream.getVideoTracks()[0], videoTrack, stream);
//         });

//         setScreenSharing(true);
//       } catch (error) {
//         console.error("Screen sharing error:", error);
//       }
//     } else {
//       // Revert to webcam stream
//       const videoTrack = stream.getVideoTracks()[0];
//       peersRef.current.forEach(({ peer }) => {
//         peer.replaceTrack(
//           screenStreamRef.current.getVideoTracks()[0],
//           videoTrack,
//           stream
//         );
//       });

//       screenStreamRef.current.getTracks().forEach((track) => track.stop());
//       setScreenSharing(false);
//     }
//   };

//   const startRecording = () => {
//     if (!stream) return;
//     mediaRecorderRef.current = new MediaRecorder(stream, {
//       mimeType: "video/webm",
//     });
//     mediaRecorderRef.current.ondataavailable = (event) =>
//       recordedChunks.current.push(event.data);
//     mediaRecorderRef.current.start();
//     setRecording(true);
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);

//       const blob = new Blob(recordedChunks.current, { type: "video/webm" });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "recording.webm";
//       a.click();
//       recordedChunks.current = []; // Clear previous recordings
//     }
//   };

//   const endCall = () => {
//     if (socketRef.current) socketRef.current.disconnect();
//     if (stream) stream.getTracks().forEach((track) => track.stop());
//     if (screenStreamRef.current)
//       screenStreamRef.current.getTracks().forEach((track) => track.stop());

//     peersRef.current.forEach(({ peer }) => peer.destroy());
//     setPeers([]);
//     peersRef.current = [];
//     setStream(null);
//     navigate("/");
//   };

//   return (
//     <div className="video-call-container">
//       <div className="header">
//         <h3>Meeting Room: {roomId}</h3>
//         <span>{peers.length + 1} in the call</span>
//       </div>

//       <div className="video-grid">
//         <div className="video-tile">
//           <video ref={userVideo} autoPlay playsInline muted={muted} />
//           <div className="participant-name">You</div>
//         </div>
//         {peers.map(({ peer, id }) => (
//           <Video key={id} peer={peer} id={id} />
//         ))}
//       </div>

//       <div className="controls">
//         <button className="control-button" onClick={toggleMute}>
//           {muted ? <IoMdMicOff size={24} /> : <IoMdMic size={24} />}
//         </button>
//         <button className="control-button" onClick={toggleVideo}>
//           {videoOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
//         </button>
//         <button className="control-button" onClick={startScreenShare}>
//           {screenSharing ? (
//             <LuScreenShare size={24} />
//           ) : (
//             <LuScreenShareOff size={24} />
//           )}
//         </button>
//         <button
//           className="control-button"
//           onClick={recording ? stopRecording : startRecording}
//         >
//           {recording ? <FaStopCircle size={24} /> : <LuScreenShare size={24} />}
//         </button>
//         <button className="control-button end-call" onClick={endCall}>
//           <FaPhoneAlt size={24} />
//         </button>
//       </div>
//     </div>
//   );
// };

// const Video = ({ peer, id }) => {
//   const ref = useRef(null);

//   useEffect(() => {
//     if (!peer) return;

//     const handleStream = (stream) => {
//       if (ref.current) {
//         ref.current.srcObject = stream;
//       }
//     };

//     peer.on("stream", handleStream);

//     return () => {
//       peer.off("stream", handleStream); // Cleanup to prevent memory leaks
//     };
//   }, [peer]);

//   return (
//     <div className="video-tile">
//       <video ref={ref} autoPlay playsInline />
//       <div className="participant-name">User {id}</div>
//     </div>
//   );
// };

// Video.propTypes = {
//   peer: PropTypes.instanceOf(Peer).isRequired,
//   id: PropTypes.string.isRequired,
// };
// export default Room;

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { FaVideo, FaVideoSlash, FaPhoneAlt, FaStopCircle } from 'react-icons/fa';
import { LuScreenShareOff, LuScreenShare } from 'react-icons/lu';

import "../styles/Room.css";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  
  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState(null);
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const userVideo = useRef();
  const socketRef = useRef();
  const peersRef = useRef([]);

    useEffect(() => {
      console.log(`Connecting to socket server...`);
      socketRef.current = io.connect('http://localhost:5173');
    
      socketRef.current.on("connect", () => {
        console.log(` Socket connected with ID: ${socketRef.current.id}`);
      });
    
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          console.log("📹 Media stream obtained");
          setStream(stream);
          if (userVideo.current) userVideo.current.srcObject = stream;
    
          console.log(`Joining room: ${roomId}`);
          socketRef.current.emit('join-room', roomId, socketRef.current.id, 'Guest');
    
          socketRef.current.on('all-users', users => {
            console.log(`👥 Existing users in the room:`, users);
    
            if (!users || users.length === 0) {
              console.warn("No existing users found. This might be the first user in the room.");
              return;
            }
    
            const peersArray = users.map(user => {
              console.log(`🔗 Connecting to existing user: ${user.id}`);
              const peer = createPeer(user.id, socketRef.current.id, stream);
              peersRef.current.push({ peerID: user.id, peer });
              return { peer, id: user.id };
            });
    
            setPeers(prevPeers => [...prevPeers, ...peersArray]);  // Merge new peers properly
            console.log()
          });
    
          socketRef.current.on('user-joined', ({ signal, callerID }) => {
            console.log(`New user joined: ${callerID}`);
            const peer = addPeer(signal, callerID, stream);
            if (!peer) return;
    
            peersRef.current.push({ peerID: callerID, peer });
    
            setPeers(prevPeers => [...prevPeers, { peer, id: callerID }]);
          });
    
          socketRef.current.on('receiving-returned-signal', ({ signal, id }) => {
            console.log(`Received returned signal from: ${id}`);
            const item = peersRef.current.find(p => p.peerID === id);
            if (item) {
              item.peer.signal(signal);
            }
          });
    
          socketRef.current.on('user-disconnected', id => {
            console.log(`User disconnected: ${id}`);
            setPeers(prevPeers => prevPeers.filter(p => p.id !== id));
            peersRef.current = peersRef.current.filter(p => p.peerID !== id);
          });
    
        })
        .catch(err => {
          console.error(" Error accessing media devices:", err);
          alert("Could not access camera or microphone. Please check permissions.");
        });
    
      return () => endCall();
    }, [roomId]);
    

  const createPeer = (userToSignal, callerID, stream) => {

    if (!stream) {
      console.error(" Error: Media stream is undefined when creating peer.");
      return null;
    }
    console.log(`Creating peer connection to: ${userToSignal}`);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      console.log(` Sending signal to: ${userToSignal}`);
      socketRef.current.emit('sending-signal', { userToSignal, callerID, signal });
    });

    peer.on('error', err => console.error("Peer connection error:", err));

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    console.log(` Adding peer for caller: ${callerID}`);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      console.log(` Returning signal to: ${callerID}`);
      socketRef.current.emit('returning-signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    peer.on('error', err => console.error(" Peer connection error:", err));
    return peer;
  };

  const endCall = () => {
    console.log(" Ending call...");
    if (socketRef.current) socketRef.current.disconnect();
    if (stream) stream.getTracks().forEach(track => track.stop());
    peersRef.current.forEach(({ peer }) => {
      if (peer) peer.destroy();
    });
    setPeers([]);
    peersRef.current = [];
    setStream(null);
    navigate('/');
  };

  return (
    <div className="video-call-container">
      <div className="header">
        <h3>Meeting Room: {roomId}</h3>
        <span>{peers.length + 1} in the call</span>
        {console.log(` Current participants count: ${peers.length + 1}`)}
      </div>
      
      <div className="video-grid">
        <div className="video-tile">
          <video ref={userVideo} autoPlay playsInline muted />
          <div className="participant-name">You</div>
        </div>
        {peers.map(({ peer, id }) => (
          <Video key={id} peer={peer} id={id} />
        ))}
      </div>

      <div className="controls">
        <button className="control-button end-call" onClick={endCall}>
          <FaPhoneAlt size={24} />
        </button>
      </div>
    </div>
  );
};

const Video = ({ peer, id }) => {
  const ref = useRef();
  
  useEffect(() => {
    peer.on('stream', stream => {
      console.log(`📡 Received stream from peer: ${id}`);
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });

    return () => {
      if (ref.current) {
        ref.current.srcObject = null;
      }
    };
  }, [peer, id]);

  return (
    <div className="video-tile">
      <video ref={ref} autoPlay playsInline />
      <div className="participant-name">User {id.slice(0, 5)}</div>
    </div>
  );
};

export default Room;

