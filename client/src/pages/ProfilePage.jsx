import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosIntance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    interests: [],
    profileImage: "https://randomuser.me/api/portraits/lego/1.jpg", // Default image
    department: "",
    position: "",
    eventsAttended: [], // Renamed to match what's used in the render code
    lastLogin: [], // Initialize as empty array
  });

  useEffect(() => {
    // Logic to fetch the user's profile data (e.g., API call)
    const fetchdata = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user.id}`);
        console.log('token', response.data); // Update the token in local storage
        setFormData(response.data.data);
      
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchdata();
    console.log("Profile data fetched:", formData);
  }, [user?.id]); // Only depend on user.id to prevent infinite loops

  const [activeTab, setActiveTab] = useState("profile");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "interests") {
      setFormData({
        ...formData,
        interests: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, profileImage: reader.result });
        };
        reader.readAsDataURL(file);

        console.log(reader)
      }    
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to save the updated profile (e.g., API call)
    try {
      console.log(formData)
      let response = await axiosInstance.put(`/users/${user.id}`, formData);
      
      if (response.status === 200) {
        setFormData(response.data.data);        
        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("Profile updated successfully!");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Your Profile
          </h1>

          {/* Tabs Navigation */}
          <div className="mb-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 mr-2 rounded-lg ${
                activeTab === "profile"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Profile Overview
            </button>
            <button
              onClick={() => setActiveTab("pastEvents")}
              className={`px-4 py-2 mr-2 rounded-lg ${
                activeTab === "pastEvents"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Past Events
            </button>
            <button
              onClick={() => setActiveTab("Logs")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "Logs"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Other Past Data
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-md p-6 flex space-x-6">
              {/* Profile Overview */}
              <div className="flex-none w-1/3 text-center">
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-indigo-500"
                />
                <h2 className="text-xl font-semibold">{formData.name}</h2>
                <p className="text-gray-600">{formData.bio}</p>
                <p className="text-sm text-gray-500">
                  Department: {formData.department}
                </p>
                <p className="text-sm text-gray-500">
                  Position: {formData.position}
                </p>
                <p className="text-sm text-gray-500">Email: {formData.email}</p>
                <div className="mt-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Change Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
                  />
                </div>
              </div>

              {/* Profile Form */}
              <div className="flex-grow">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
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
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Your position or role"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Your department"
                    />
                  </div>

                  {/* Interests */}
                  <div>
                    <label
                      htmlFor="interests"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Interests
                    </label>
                    <input
                      type="text"
                      id="interests"
                      name="interests"
                      value={formData.interests.join(", ")}
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
          {activeTab === "pastEvents" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Events</h2>
              {formData.eventsAttended.length > 0 ? (
                <ul className="space-y-4">
                  {formData.eventsAttended.map((event) => (
                    <li
                      key={event._id}
                      className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-indigo-600 cursor-pointer" onClick={()=>{
                          
                          navigate(`/event-details/${event._id}`) // Assuming you have a route for event details
                        }} >
                          {event.title}
                        </h3>
                        <p className="text-gray-600">{event.description}</p>
                        <p className="text-sm text-gray-500">
                          Tags: {event.tags.join(", ")}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 sm:text-right mt-2 sm:mt-0">
                        <p>
                          Start:{" "}
                          <span className="font-medium">
                            {new Date(event.startTime).toLocaleDateString()}
                          </span>
                        </p>
                        <p>
                          End:{" "}
                          <span className="font-medium">
                            {new Date(event.endTime).toLocaleDateString()}
                          </span>
                        </p>
                        <p>Status: {event.status}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No past events found.</p>
              )}
            </div>
          )}
          {activeTab === "Logs" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Other Past Data
              </h2>
              {formData.lastLogin.length > 0 ? (
                <ul className="space-y-4">
                  {formData.lastLogin.map((data) => (
                    <li key={data.id} className="border-b border-gray-200 pb-2">
                      <p className="text-gray-600">
                        {data} -{" "}
                        <span className="font-semibold">
                          {new Date(data.date).toLocaleDateString()}
                        </span>
                      </p>
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
