import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import {
  FaVideo,
  FaVideoSlash,
  FaPhoneAlt,
  FaStopCircle,
} from "react-icons/fa";
import { LuScreenShareOff, LuScreenShare } from "react-icons/lu";

import "../styles/Room.css";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState(null);
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const userVideo = useRef();
  const screenStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const socketRef = useRef();
  const peersRef = useRef([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket"], // Force WebSocket transport (avoids CORS issues)
      withCredentials: true, // Ensures proper cookie handling
    });

    const getMediaStream = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!userStream) throw new Error("No media stream available");

        setStream(userStream);
        if (userVideo.current) userVideo.current.srcObject = userStream;
      } catch (error) {
        console.error("Error accessing media devices:", error);

        if (error.name === "NotAllowedError") {
          alert(
            "Please allow camera and microphone access in your browser settings."
          );
        } else if (error.name === "NotFoundError") {
          alert("No camera found. Please connect a camera.");
        } else {
          alert("An error occurred while accessing media devices.");
        }
      }
    };

    getMediaStream().then(() => {
      socketRef.current.emit(
        "join-room",
        roomId,
        socketRef.current.id,
        "Guest"
      );

      socketRef.current.on("all-users", (users) => {
        const peers = users.map((user) => {
          const peer = createPeer(user.id, socketRef.current.id, stream);
          peersRef.current.push({ peerID: user.id, peer });
          return { peer, id: user.id };
        });
        setPeers(peers);
      });

      socketRef.current.on("user-joined", ({ signal, callerID }) => {
        const peer = addPeer(signal, callerID, stream);
        peersRef.current.push({ peerID: callerID, peer });
        setPeers((users) => [...users, { peer, id: callerID }]);
      });

      socketRef.current.on("receiving-returned-signal", ({ signal, id }) => {
        const peerObj = peersRef.current.find((p) => p.peerID === id);
        if (peerObj) peerObj.peer.signal(signal);
      });

      socketRef.current.on("user-disconnected", (id) => {
        setPeers((users) => users.filter((p) => p.id !== id));
        peersRef.current = peersRef.current.filter((p) => p.peerID !== id);
      });
    });

    return () => endCall();
  }, [roomId]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (signal) => {
      socketRef.current.emit("sending-signal", {
        userToSignal,
        callerID,
        signal,
      });
    });
    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (signal) => {
      socketRef.current.emit("returning-signal", { signal, callerID });
    });
    peer.signal(incomingSignal);
    return peer;
  };

  const toggleMute = () => {
    setMuted(!muted);
    stream.getAudioTracks()[0].enabled = !muted;
  };

  const toggleVideo = () => {
    setVideoOn(!videoOn);
    stream.getVideoTracks()[0].enabled = !videoOn;
  };

  const startScreenShare = async () => {
    if (!screenSharing) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      screenStreamRef.current = screenStream;
      setScreenSharing(true);
      socketRef.current.emit("screen-share");
    } else {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      setScreenSharing(false);
    }
  };

  const startRecording = () => {
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.ondataavailable = (event) =>
      recordedChunks.current.push(event.data);
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    const blob = new Blob(recordedChunks.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    a.click();
  };

  const endCall = () => {
    if (socketRef.current) socketRef.current.disconnect();
    if (stream) stream.getTracks().forEach((track) => track.stop());
    peersRef.current.forEach(({ peer }) => peer.destroy());
    setPeers([]);
    peersRef.current = [];
    setStream(null);
    alert("Thank you for joining the call!");
    navigate("/dashboard");    
  };

  return (
    <div className="video-call-container">
      <div className="header">
        <h3>Meeting Room: {roomId}</h3>
        <span>{peers.length + 1} in the call</span>
      </div>

      <div className="video-grid">
        <div className="video-tile">
          <video ref={userVideo} autoPlay playsInline muted={muted} />
          <div className="participant-name">You</div>
        </div>
        {peers.map(({ peer, id }) => (
          <Video key={id} peer={peer} id={id} />
        ))}
      </div>

      <div className="controls">
        <button
          className={`control-button ${muted ? "inactive" : "active"}`}
          onClick={toggleMute}
        >
          {muted ? <IoMdMicOff size={24} /> : <IoMdMic size={24} />}
        </button>
        <button
          className={`control-button ${videoOn ? "active" : "inactive"}`}
          onClick={toggleVideo}
        >
          {videoOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
        </button>
        <button
          className={`control-button ${screenSharing ? "active" : "inactive"}`}
          onClick={startScreenShare}
        >
          {screenSharing ? (
            <LuScreenShare size={24} />
          ) : (
            <LuScreenShareOff size={24} />
          )}
        </button>
        <button
          className={`control-button ${recording ? "active" : "inactive"}`}
          onClick={recording ? stopRecording : startRecording}
        >
          {recording ? <FaStopCircle size={24} /> : <LuScreenShare size={24} />}
        </button>

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
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);
  return (
    <div className="video-tile">
      <video ref={ref} autoPlay playsInline />
      <div className="participant-name">User {id}</div>
    </div>
  );
};

export default Room;
