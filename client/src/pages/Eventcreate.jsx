import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Eventcreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'academic',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    isVirtual: false,
    virtualLink: '',
    capacity: 20,
    isPublic: true,
    allowRegistration: true,
    registrationDeadline: '',
    image: null,
    imagePreview: null,
    tags: [],
    tagInput: '',
    agenda: [
      { id: 1, title: '', startTime: '', endTime: '', speaker: '', description: '' }
    ]
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
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
        tagInput: ''
      });
    }
  };

  // Remove tag from list
  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  // Handle keypress event for tag input
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // Add new agenda item
  const addAgendaItem = () => {
    const newId = formData.agenda.length > 0 
      ? Math.max(...formData.agenda.map(item => item.id)) + 1 
      : 1;
    
    setFormData({
      ...formData,
      agenda: [
        ...formData.agenda,
        { id: newId, title: '', startTime: '', endTime: '', speaker: '', description: '' }
      ]
    });
  };

  // Update agenda item
  const updateAgendaItem = (id, field, value) => {
    setFormData({
      ...formData,
      agenda: formData.agenda.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  // Remove agenda item
  const removeAgendaItem = (id) => {
    setFormData({
      ...formData,
      agenda: formData.agenda.filter(item => item.id !== id)
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form data submitted:', formData);
    alert('Event created successfully!');    
  };

  // Form validation for each step
  const validateStep = (step) => {
    switch(step) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return formData.date && formData.startTime && formData.endTime && 
          (formData.location || (formData.isVirtual && formData.virtualLink));
      case 3:
        return true; // All fields in step 3 are optional
      default:
        return true;
    }
  };

  // Go to next step if validation passes
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  // Go to previous step
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  // Get tag color based on tag name
  const getTagColor = (tag) => {
    const colors = [
      'bg-indigo-100 text-indigo-700',
      'bg-purple-100 text-purple-700',
      'bg-pink-100 text-pink-700',
      'bg-blue-100 text-blue-700',
      'bg-green-100 text-green-700',
      'bg-yellow-100 text-yellow-700',
    ];
    
    // Deterministic color based on tag string
    const index = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">     

      {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/dashboard" className="text-gray-500 hover:text-indigo-600">Dashboard</Link>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link to="/events" className="ml-2 text-gray-500 hover:text-indigo-600">Events</Link>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-indigo-600 font-medium">Create Event</span>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
            <p className="mt-2 text-gray-600">Fill in the details below to create your event</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className={`h-2 ${currentStep >= 1 ? 'bg-indigo-600' : 'bg-gray-200'} rounded-l-full`}></div>
              </div>
              <div className="flex-1">
                <div className={`h-2 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex-1">
                <div className={`h-2 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'} rounded-r-full`}></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm font-medium">
              <div className={currentStep === 1 ? 'text-indigo-600' : 'text-gray-500'}>Basic Info</div>
              <div className={currentStep === 2 ? 'text-indigo-600' : 'text-gray-500'}>Date & Location</div>
              <div className={currentStep === 3 ? 'text-indigo-600' : 'text-gray-500'}>Details & Publish</div>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
                  
                  {/* Event Title */}
                  <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <p className="mt-1 text-sm text-gray-500">Clearly describe what participants can expect.</p>
                  </div>
                  
                  {/* Event Category */}
                  <div className="mb-6">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    >
                      <option value="academic">Academic</option>
                      <option value="workshop">Workshop</option>
                      <option value="conference">Conference</option>
                      <option value="social">Social</option>
                      <option value="cultural">Cultural</option>
                      <option value="sports">Sports</option>
                      <option value="career">Career</option>
                    </select>
                  </div>
                  
                  {/* Tags */}
                  <div className="mb-6">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        id="tagInput"
                        name="tagInput"
                        value={formData.tagInput}
                        onChange={handleTagInput}
                        onKeyPress={handleTagKeyPress}
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
                    <p className="mt-1 text-sm text-gray-500">Add tags that describe your event (e.g., technology, research, networking)</p>
                    
                    {formData.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTagColor(tag)}`}
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-white bg-opacity-25"
                            >
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Cover Image */}
                  <div className="mb-6">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {formData.imagePreview ? (
                          <div>
                            <img 
                              src={formData.imagePreview} 
                              alt="Cover preview" 
                              className="mx-auto h-32 w-auto object-cover" 
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({...formData, image: null, imagePreview: null})}
                              className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                <span>Upload a file</span>
                                <input 
                                  id="image" 
                                  name="image" 
                                  type="file" 
                                  className="sr-only"
                                  accept="image/*" 
                                  onChange={handleImageChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Location */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Date & Location</h2>
                  
                  {/* Event Date */}
                  <div className="mb-6">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  {/* Event Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                        End Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Virtual Event Toggle */}
                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        id="isVirtual"
                        name="isVirtual"
                        type="checkbox"
                        checked={formData.isVirtual}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isVirtual" className="ml-2 block text-sm text-gray-700">
                        This is a virtual event
                      </label>
                    </div>
                  </div>
                  
                  {/* Location/Virtual Link */}
                  {formData.isVirtual ? (
                    <div className="mb-6">
                      <label htmlFor="virtualLink" className="block text-sm font-medium text-gray-700 mb-1">
                        Virtual Meeting Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="virtualLink"
                        name="virtualLink"
                        value={formData.virtualLink}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="e.g., Zoom, Microsoft Teams, or Google Meet link"
                        required={formData.isVirtual}
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        You can update this later if you don't have the link yet
                      </p>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="e.g., Building name, Room number, Campus area"
                        required={!formData.isVirtual}
                      />
                    </div>
                  )}
                  
                  {/* Capacity */}
                  <div className="mb-6">
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Capacity
                    </label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      min="1"
                      value={formData.capacity}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Maximum number of attendees allowed (leave at default for no limit)
                    </p>
                  </div>
                  
                  {/* Registration Options */}
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <input
                        id="allowRegistration"
                        name="allowRegistration"
                        type="checkbox"
                        checked={formData.allowRegistration}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="allowRegistration" className="ml-2 block text-sm text-gray-700">
                        Enable registration for this event
                      </label>
                    </div>
                    
                    {formData.allowRegistration && (
                      <div>
                        <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
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
                          Leave blank to allow registration until the event starts
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Details & Publish */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Details & Publish</h2>
                  
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
                      <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                        This event is public and can be discovered by all users
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 ml-6">
                      If unchecked, only people with the direct link can see this event
                    </p>
                  </div>
                  
                  {/* Agenda Items */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-gray-700">Event Agenda/Schedule</label>
                      <button
                        type="button"
                        onClick={addAgendaItem}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Item
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {formData.agenda.map((item) => (
                        <div key={item.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-sm font-medium text-gray-700">Agenda Item #{item.id}</h4>
                            <button
                              type="button"
                              onClick={() => removeAgendaItem(item.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <label htmlFor={`title-${item.id}`} className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                              <input
                                type="text"
                                id={`title-${item.id}`}
                                value={item.title}
                                onChange={(e) => updateAgendaItem(item.id, 'title', e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                placeholder="e.g., Opening Keynote"
                              />
                            </div>
                            <div>
                              <label htmlFor={`speaker-${item.id}`} className="block text-xs font-medium text-gray-700 mb-1">Speaker</label>
                              <input
                                type="text"
                                id={`speaker-${item.id}`}
                                value={item.speaker}
                                onChange={(e) => updateAgendaItem(item.id, 'speaker', e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                placeholder="Speaker name"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <label htmlFor={`startTime-${item.id}`} className="block text-xs font-medium text-gray-700 mb-1">Start Time</label>
                              <input
                                type="time"
                                id={`startTime-${item.id}`}
                                value={item.startTime}
                                onChange={(e) => updateAgendaItem(item.id, 'startTime', e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                              />
                            </div>
                            <div>
                              <label htmlFor={`endTime-${item.id}`} className="block text-xs font-medium text-gray-700 mb-1">End Time</label>
                              <input
                                type="time"
                                id={`endTime-${item.id}`}
                                value={item.endTime}
                                onChange={(e) => updateAgendaItem(item.id, 'endTime', e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor={`description-${item.id}`} className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              id={`description-${item.id}`}
                              value={item.description}
                              onChange={(e) => updateAgendaItem(item.id, 'description', e.target.value)}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                              rows={2}
                              placeholder="Brief description of this session"
                            ></textarea>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {formData.agenda.length === 0 && (
                      <div className="text-center py-4 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                        <p>No agenda items added yet. Click "Add Item" to create your event schedule.</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Event Preview */}
                  <div className="mb-6">
                    <h3 className="block text-sm font-medium text-gray-700 mb-3">Event Preview</h3>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      {formData.imagePreview ? (
                        <div className="h-48 overflow-hidden bg-gray-200">
                          <img 
                            src={formData.imagePreview} 
                            alt="Event cover" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-medium">
                          {formData.title || 'Your Event Title Will Appear Here'}
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                            {formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}
                          </span>
                          {formData.isPublic ? (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              Public
                            </span>
                          ) : (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                              Private
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {formData.title || 'Event Title'}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {formData.description || 'Event description will appear here.'}
                        </p>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formData.date ? (
                            <span>
                              {new Date(formData.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          ) : (
                            'Date'
                          )}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-4">
                          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {formData.isVirtual ? (
                            <span>Virtual Event</span>
                          ) : (
                            <span>{formData.location || 'Location'}</span>
                          )}
                        </div>
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {formData.tags.slice(0, 3).map((tag, index) => (
                              <span 
                                key={index} 
                                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                              >
                                #{tag}
                              </span>
                            ))}
                            {formData.tags.length > 3 && (
                              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                +{formData.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
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
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
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
                    <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Create Event
                    <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Connecting university communities through meaningful events</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors">Browse Events</Link>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 University Event Management Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Eventcreate;
