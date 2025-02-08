import React from "react";

const MeetingCard = ({ title, action }) => {
  return (
    <div className="card bg-base-200 shadow-xl p-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <button className="btn btn-primary mt-4">{action}</button>
    </div>
  );
};

export default MeetingCard;
