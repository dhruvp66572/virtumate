import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosIntance";
import { useAuth } from "../context/AuthContext";

const Eventcreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming you have a user context
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "webinar", // Changed from category to eventType
    startTime: "",
    endTime: "",
    organizerId: "", // Assuming you'll set this based on user context
    isPublic: true,
    maxAttendees: 100, // Default value
    registrationDeadline: "",
    agenda: [
      {
        id: 1,
        title: "",
        startTime: "",
        endTime: "",
        description: "",
        speaker: "",
      },
    ],
    tags: [],
    tagInput: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle tag input
  const handleTagInput = (e) => {
    setFormData({ ...formData, tagInput: e.target.value });
  };

  // Add tag to list
  const addTag = () => {
    if (formData.tagInput && !formData.tags.includes(formData.tagInput)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput],
        tagInput: "",
      });
    }
  };

  // Remove tag from list
  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  // Add new agenda item
  const addAgendaItem = () => {
    const newId =
      formData.agenda.length > 0
        ? Math.max(...formData.agenda.map((item) => item.id)) + 1
        : 1;

    setFormData({
      ...formData,
      agenda: [
        ...formData.agenda,
        {
          id: newId,
          title: "",
          startTime: "",
          endTime: "",
          description: "",
          speaker: "",
        },
      ],
    });
  };

  // Update agenda item
  const updateAgendaItem = (id, field, value) => {
    setFormData({
      ...formData,
      agenda: formData.agenda.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // Remove agenda item
  const removeAgendaItem = (id) => {
    setFormData({
      ...formData,
      agenda: formData.agenda.filter((item) => item.id !== id),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(currentStep);

    // // Here you would send `formData` to your backend
    // console.log("Form data submitted:", formData);

    if (formData.agenda.length < 0) {
      alert("Please add at least one agenda item.");
      return;
    }

    // Assuming you have an API endpoint to create events
    try {
      const response = await axiosInstance.post("/events", {
        ...formData,
        organizerId: user.id,
      }); // Replace '1234' with actual organizer ID
      console.log(response.data);

      // Redirect to event page
      if (response.status === 201) {
        navigate(`/events/${response.data.data._id}`);
      }

    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred. Please try again.");
      return;
    }
    alert("Event created successfully!");
  };

  // Form validation for each step
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.eventType;
      case 2:
        return formData.startTime && formData.endTime; // Require start and end time
      case 3:
        return true; // No validation needed for step 3
      default:
        return true;
    }
  };

  // // Go to next step if validation passes

  const goToNextStep = (e) => {
    // Add this line to prevent form submission when clicking "Next"
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      alert("Please fill in all required fields.");
    }
  };
  
  // Go to previous step
  const goToPreviousStep = (e) => {
    // Also add this to the previous step function
    e.preventDefault();
    
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  Dashboard
                </Link>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link
                  to="/events"
                  className="ml-2 text-gray-500 hover:text-indigo-600"
                >
                  Events
                </Link>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-indigo-600 font-medium">
                  Create Event
                </span>
              </li>
            </ol>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Event
            </h1>
            <p className="mt-2 text-gray-600">
              Fill in the details below to create your event
            </p>
          </div>

          <div className="mb-8">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div
                    className={`h-2 ${
                      currentStep >= 1 ? "bg-indigo-600" : "bg-gray-200"
                    } rounded-l-full`}
                  ></div>
                </div>
                <div className="flex-1">
                  <div
                    className={`h-2 ${
                      currentStep >= 2 ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
                <div className="flex-1">
                  <div
                    className={`h-2 ${
                      currentStep >= 3 ? "bg-indigo-600" : "bg-gray-200"
                    } rounded-r-full`}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm font-medium">
                <div
                  className={
                    currentStep === 1 ? "text-indigo-600" : "text-gray-500"
                  }
                >
                  Basic Info
                </div>
                <div
                  className={
                    currentStep === 2 ? "text-indigo-600" : "text-gray-500"
                  }
                >
                  Date{" "}
                </div>
                <div
                  className={
                    currentStep === 3 ? "text-indigo-600" : "text-gray-500"
                  }
                >
                  Details & Publish
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Basic Information
                    </h2>

                    {/* Event Title */}
                    <div className="mb-6">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Event Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter a descriptive title for your event"
                        required
                      />
                    </div>

                    {/* Event Description */}
                    <div className="mb-6">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Provide details about your event"
                        required
                      ></textarea>
                      <p className="mt-1 text-sm text-gray-500">
                        Clearly describe what participants can expect.
                      </p>
                    </div>

                    {/* Event Type */}
                    <div className="mb-6">
                      <label
                        htmlFor="eventType"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Event Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      >
                        <option value="webinar">Webinar</option>
                        <option value="workshop">Workshop</option>
                        <option value="conference">Conference</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Tags */}
                    <div className="mb-6">
                      <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Tags
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          id="tagInput"
                          name="tagInput"
                          value={formData.tagInput}
                          onChange={handleTagInput}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Add tags (press Enter)"
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                          Add
                        </button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {formData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700`}
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-white bg-opacity-25"
                              >
                                <svg
                                  className="h-3 w-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Location */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Date
                    </h2>

                    {/* Event Start Time */}
                    <div className="mb-6">
                      <label
                        htmlFor="startTime"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Start Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    {/* Event End Time */}
                    <div className="mb-6">
                      <label
                        htmlFor="endTime"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        End Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    {/* Registration Deadline */}
                    <div className="mb-6">
                      <label
                        htmlFor="registrationDeadline"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Registration Deadline
                      </label>
                      <input
                        type="date"
                        id="registrationDeadline"
                        name="registrationDeadline"
                        value={formData.registrationDeadline}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Leave blank to allow registration until the event
                        starts.
                      </p>
                    </div>

                    {/* Max Attendees */}
                    <div className="mb-6">
                      <label
                        htmlFor="maxAttendees"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Maximum Attendees
                      </label>
                      <input
                        type="number"
                        id="maxAttendees"
                        name="maxAttendees"
                        min="1"
                        value={formData.maxAttendees}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Enter the maximum number of attendees allowed.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Details & Publish */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Additional Details & Publish
                    </h2>

                    {/* Event Visibility */}
                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          id="isPublic"
                          name="isPublic"
                          type="checkbox"
                          checked={formData.isPublic}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="isPublic"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          This event is public and can be discovered by all
                          users
                        </label>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 ml-6">
                        If unchecked, only people with the direct link can see
                        this event.
                      </p>
                    </div>

                    {/* Agenda Items */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Event Agenda/Schedule
                        </label>
                        <button
                          type="button"
                          onClick={addAgendaItem}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
                        >
                          Add Item
                        </button>
                      </div>

                      <div className="space-y-4">
                        {formData.agenda.map((item) => (
                          <div
                            key={item.id}
                            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-sm font-medium text-gray-700">
                                Agenda Item #{item.id}
                              </h4>
                              <button
                                type="button"
                                onClick={() => removeAgendaItem(item.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <label
                                  htmlFor={`title-${item.id}`}
                                  className="block text-xs font-medium text-gray-700 mb-1"
                                >
                                  Title
                                </label>
                                <input
                                  type="text"
                                  id={`title-${item.id}`}
                                  value={item.title}
                                  onChange={(e) =>
                                    updateAgendaItem(
                                      item.id,
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                  placeholder="e.g., Opening Keynote"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={`speaker-${item.id}`}
                                  className="block text-xs font-medium text-gray-700 mb-1"
                                >
                                  Speaker Name
                                </label>
                                <input
                                  type="text"
                                  id={`speaker-${item.id}`}
                                  value={item.speaker}
                                  onChange={(e) =>
                                    updateAgendaItem(
                                      item.id,
                                      "speaker",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                  placeholder="Speaker Name"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor={`description-${item.id}`}
                                className="block text-xs font-medium text-gray-700 mb-1"
                              >
                                Description
                              </label>
                              <textarea
                                id={`description-${item.id}`}
                                value={item.description}
                                onChange={(e) =>
                                  updateAgendaItem(
                                    item.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                rows={2}
                                placeholder="Brief description of this session"
                              ></textarea>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                      Create Event
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventcreate;
