import { useState } from 'react';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@example.com',
    bio: 'Passionate about technology and education.',
    interests: ['Technology', 'AI', 'Education'],
    profileImage: 'https://randomuser.me/api/portraits/women/12.jpg',
    department: 'Engineering',
    position: 'Software Engineer',
    pastEvents: [
      { id: 1, title: 'Tech Conference 2023', date: '2023-04-15' },
      { id: 2, title: 'AI Workshop', date: '2023-05-20' },
    ],
    otherData: [
      { id: 1, description: 'Completed React.js course', date: '2023-01-10' },
      { id: 2, description: 'Attended leadership seminar', date: '2023-02-20' },
    ],
  });
  
  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'interests') {
      setFormData({ ...formData, interests: value.split(',').map(item => item.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
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
      <div className="flex-grow py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
          
          {/* Tabs Navigation */}
          <div className="mb-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 mr-2 rounded-lg ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Profile Overview
            </button>
            <button
              onClick={() => setActiveTab('pastEvents')}
              className={`px-4 py-2 mr-2 rounded-lg ${activeTab === 'pastEvents' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Past Events
            </button>
            <button
              onClick={() => setActiveTab('otherData')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'otherData' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Other Past Data
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6 flex space-x-6">
              {/* Profile Overview */}
              <div className="flex-none w-1/3 text-center">
                <img src={formData.profileImage} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-indigo-500" />
                <h2 className="text-xl font-semibold">{formData.firstName} {formData.lastName}</h2>
                <p className="text-gray-600">{formData.bio}</p>
                <p className="text-sm text-gray-500">Department: {formData.department}</p>
                <p className="text-sm text-gray-500">Position: {formData.position}</p>
                <p className="text-sm text-gray-500">Email: {formData.email}</p>
                <div className="mt-4">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Change Profile Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200" />
                </div>
              </div>

              {/* Profile Form */}
              <div className="flex-grow">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name */}
                  <div>
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
                  <div>
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
                  <div>
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
                  <div>
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
                  <div>
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
          )}

          {/* Past Events Tab */}
          {activeTab === 'pastEvents' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Events</h2>
              {formData.pastEvents.length > 0 ? (
                <ul className="space-y-4">
                  {formData.pastEvents.map(event => (
                    <li key={event.id} className="border-b border-gray-200 pb-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No past events found.</p>
              )}
            </div>
          )}

          {/* Other Past Data Tab */}
          {activeTab === 'otherData' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Past Data</h2>
              {formData.otherData.length > 0 ? (
                <ul className="space-y-4">
                  {formData.otherData.map(data => (
                    <li key={data.id} className="border-b border-gray-200 pb-2">
                      <p className="text-gray-600">{data.description} - <span className="font-semibold">{new Date(data.date).toLocaleDateString()}</span></p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No other past data found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
