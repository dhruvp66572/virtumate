import React, { useState, useRef, useEffect } from "react";
import "../assets/css/EventForm.css";

const EventForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    eventDate: "",
    duration: "",
    bannerImage: null,
    outcome: "",
  });

  // Add ref for the modal content
  const modalRef = useRef(null);

  // Handle click outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Add event listener on mount and remove on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      bannerImage: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <form onSubmit={handleSubmit} className="event-form">
          <h2 className="form-title">Create New Event</h2>

          <div className="form-group">
            <label htmlFor="title">Event Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select category</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="meetup">Meetup</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="eventDate">Event Date</label>
            <input
              type="datetime-local"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (hours)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="0.5"
              step="0.5"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bannerImage">Banner Image</label>
            <input
              type="file"
              id="bannerImage"
              name="bannerImage"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="outcome">Expected Outcome</label>
            <textarea
              id="outcome"
              name="outcome"
              value={formData.outcome}
              onChange={handleChange}
              required
              className="form-textarea"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="inline-flex items-center px-7 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              onClick={onClose}
            >
              Create Event
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
