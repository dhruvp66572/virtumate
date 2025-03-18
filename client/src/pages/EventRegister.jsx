import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosIntance';

const EventRegister = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isConfirming, setIsConfirming] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);      
      return;
    }
    try {
      const response = await axiosInstance.put(`/events/${id}/register`);

      if (response.status === 200) {
        console.log(response.data);
        alert('You have successfully registered for the event!');
        window.location.href = `/events/`;
      }      

    } catch (error) {
      console.log(error)
    }
    // Logic to handle registration (e.g., API call)
    console.log('Registration data submitted:');
    alert('You have successfully registered for the event!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">    

      {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Register for Event</h1>
          <p className="text-gray-600 mb-4">Please confirm your registration details below.</p>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md px-6 py-8">
            {/* User Information Section */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Information</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={user?.name || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>                         
            </div>

            {isConfirming && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800">
                  Please confirm your registration for this event. This action cannot be undone.
                </p>
              </div>
            )}

            <div className="flex justify-between">
              <Link to={`/events/${id}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                Back to Event Details
              </Link>
              <button
                type="submit"
                className={`${isConfirming ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-lg transition-colors`}
              >
                {isConfirming ? 'Confirm Registration' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>  
    </div>
  );
};

export default EventRegister;
