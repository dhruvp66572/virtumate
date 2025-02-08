import React, { useContext } from "react";
import MeetingCard from "../components/MeetingCard";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <h1 className="text-3xl">Welcome, {user ? user.username : "Guest"}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MeetingCard title="Start Instant Meeting" action="Start Now" />
        <MeetingCard title="Join a Meeting" action="Join Now" />
        <MeetingCard title="Schedule a Meeting" action="Schedule" />
        <MeetingCard title="Create an Event" action="Create Event" />
      </div>
    </div>
  );
};

export default Dashboard;
