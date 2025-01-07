import React, { useState, useEffect, useRef } from "react";
// import { useAuth } from "../../contex/AuthProvider";
import {
  Bell,
  Calendar,
  MessageSquare,
  Users,
  Video,
  Search,
  LayoutGrid,
} from "lucide-react";
//import { doSignOut } from "../../config/auth"; // Adjust the path based on your project structure
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  //fetch current user
  const { currentUser } = useAuth();


  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  //logout functionality
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 fixed w-full top-0 z-50">
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Left Section with Logo and Quick Access */}
        <div className="flex items-center space-x-6">
          <span className="text-xl font-bold text-white">VirtuLink</span>
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>

        {/* Center Navigation */}
        <div className="flex items-center space-x-1">
          <a className="px-4 py-2 rounded-lg bg-white/20 text-white flex items-center">
            <Video className="w-4 h-4 mr-2" />
            Registread
            <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-xs rounded-full">
              12
            </span>
          </a>

          <a className="px-4 py-2 rounded-lg hover:bg-white/10 text-white/90 hover:text-white flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </a>

          <a className="px-4 py-2 rounded-lg hover:bg-white/10 text-white/90 hover:text-white flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Networking
            <span className="ml-2 px-1.5 py-0.5 bg-green-500 text-xs rounded-full">
              5
            </span>
          </a>

          {/* <a className="px-4 py-2 rounded-lg hover:bg-white/10 text-white/90 hover:text-white flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </a> */}
        </div>

        {/* Right Section - User Area */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <button className="p-2 rounded-lg hover:bg-white/10 text-white">
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-white/10 text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Profile */}
          {/* <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
            <div className="text-right">
              <div className="text-sm font-medium text-white">Alex Morgan</div>
              <div className="text-xs text-white/70">Attendee</div>
            </div>
            <img
              className="h-8 w-8 rounded-full ring-2 ring-white/20"
              src="/api/placeholder/32/32"
              alt="User avatar"
            />
          </div> */}
          {/* User Profile Section with Dropdown */}
          <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2"
      >
        <img
          className="h-8 w-8 rounded-full ring-2 ring-white/20"
          src="/api/placeholder/32/32"
          alt="User avatar"
        />
        <span className="text-sm font-medium text-white">
          {currentUser
            ? currentUser.displayName
              ? currentUser.displayName
              : currentUser.email
            : "Guest"}
          !
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </a>
        </div>
      )}
    </div>
  
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
