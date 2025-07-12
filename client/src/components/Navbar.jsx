import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosIntance";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Logic to fetch the user's profile data (e.g., API call)
    const fetchdata = async () => {
      if (!user || !user.id) return; // Skip if user or user.id is not available
      
      try {
        const response = await axiosInstance.get(`/users/${user.id}`);
        console.log(response.data.data); 
        setProfileImg(response.data.data.profileImage || "")       
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchdata();
  }, [user?.id]);

  // Handle clicks outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {    
    let confirmbox = window.confirm("Are you sure you want to logout?");
    if (!confirmbox) return; // If user clicks "Cancel", do nothing
    toast.success("Logout successful!");
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center">
          <Link to="/">
            <h2 className="text-2xl font-bold text-indigo-600">Virtumate</h2>
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="space-x-6 flex items-center">
            <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors">Dashboard</Link>
            <Link to="/events" className="text-gray-600 hover:text-indigo-600 transition-colors">Events</Link>                   
            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="flex items-center">
                <img 
                  src={profileImg || "Profile"} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full border-2 border-indigo-600"

                />
                <span className="ml-2">{user?.name || "User"}</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                    <Link to="/myevents" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Events</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/events" className="text-gray-600 hover:text-indigo-600">Events</Link>
            <Link to="/login" className="text-indigo-600 font-semibold">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
