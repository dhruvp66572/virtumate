import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@example.com',
    bio: 'Passionate about technology and education.',
    interests: ['Technology', 'AI', 'Education'],
    profileImage: 'https://randomuser.me/api/portraits/women/12.jpg',
    imagePreview: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save the updated profile (e.g., API call)
    console.log('Profile updated:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/">
            <h2 className="text-2xl font-bold text-indigo-600">UniEvents</h2>
          </Link>
          <div className="space-x-6 flex items-center">
            <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors">Dashboard</Link>
            <Link to="/events" className="text-gray-600 hover:text-indigo-600 transition-colors">Events</Link>
            <Link to="/messages" className="text-gray-600 hover:text-indigo-600 transition-colors">Messages</Link>
            <Link to="/networks" className="text-gray-600 hover:text-indigo-600 transition-colors">Network</Link>
            <div className="relative">
              <button className="flex items-center text-gray-600 hover:text-indigo-600 focus:outline-none">
                <img src={formData.profileImage} alt="Profile" className="h-8 w-8 rounded-full border-2 border-indigo-600" />
                <span className="ml-2">{formData.firstName} {formData.lastName}</span>
              </button>
            </div>
          </div>
        </div>
      </nav> 

      {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md px-6 py-8">
            {/* Profile Image */}
            <div className="mb-6 text-center">
              <img src={formData.profileImage} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
              />
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Bio */}
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Interests */}
            <div className="mb-4">
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
              <input
                type="text"
                id="interests"
                name="interests"
                value={formData.interests.join(', ')}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Comma separated interests"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
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

export default ProfilePage;
