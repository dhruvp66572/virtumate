import { useState } from "react";
import {
  FaUser,
  FaBell,
  FaLock,
  FaGlobe,
  FaPalette,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronRight,
  FaCheck,
  FaShieldAlt,
  FaFont,
  FaMoon,
  FaSun,
  FaDesktop,
  FaEnvelope,
  FaMobile,
  FaComment,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handlelogout = () => {
    let confirmbox = window.confirm("Are you sure you want to logout?");
    if (!confirmbox) return;
    toast.success("Logout successful!");
    logout();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "notifications":
        return <NotificationSettings />;
      case "privacy":
        return <PrivacySettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "language":
        return <LanguageSettings />;
      case "help":
        return <HelpSupport />;
      default:
        return <NotificationSettings />;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">  
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-1/4 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <h2 className="text-xl font-semibold">Settings Menu</h2>
          </div>
          <div className="p-4">
            <button
              className={`flex items-center w-full p-3 rounded-lg mb-2 transition-all duration-200 ${
                activeTab === "notifications"
                  ? "bg-blue-100 text-blue-600 shadow-sm font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <FaBell className="mr-3 text-lg" /> 
              <span className="flex-1 text-left">Notifications</span>
              {activeTab === "notifications" && <FaChevronRight className="ml-2" />}
            </button>
            <button
              className={`flex items-center w-full p-3 rounded-lg mb-2 transition-all duration-200 ${
                activeTab === "privacy"
                  ? "bg-blue-100 text-blue-600 shadow-sm font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("privacy")}
            >
              <FaLock className="mr-3 text-lg" /> 
              <span className="flex-1 text-left">Privacy & Security</span>
              {activeTab === "privacy" && <FaChevronRight className="ml-2" />}
            </button>
            <button
              className={`flex items-center w-full p-3 rounded-lg mb-2 transition-all duration-200 ${
                activeTab === "appearance"
                  ? "bg-blue-100 text-blue-600 shadow-sm font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("appearance")}
            >
              <FaPalette className="mr-3 text-lg" /> 
              <span className="flex-1 text-left">Appearance</span>
              {activeTab === "appearance" && <FaChevronRight className="ml-2" />}
            </button>
            <button
              className={`flex items-center w-full p-3 rounded-lg mb-2 transition-all duration-200 ${
                activeTab === "language"
                  ? "bg-blue-100 text-blue-600 shadow-sm font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("language")}
            >
              <FaGlobe className="mr-3 text-lg" /> 
              <span className="flex-1 text-left">Language</span>
              {activeTab === "language" && <FaChevronRight className="ml-2" />}
            </button>
            <button
              className={`flex items-center w-full p-3 rounded-lg mb-2 transition-all duration-200 ${
                activeTab === "help"
                  ? "bg-blue-100 text-blue-600 shadow-sm font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("help")}
            >
              <FaQuestionCircle className="mr-3 text-lg" /> 
              <span className="flex-1 text-left">Help & Support</span>
              {activeTab === "help" && <FaChevronRight className="ml-2" />}
            </button>
            <div className="border-t my-3"></div>
            <button 
              className="flex items-center w-full p-3 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200"
              onClick={handlelogout}
            >
              <FaSignOutAlt className="mr-3 text-lg" /> 
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-3/4 bg-white rounded-xl shadow-lg p-8"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

const NotificationSettings = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Notification Settings</h2>
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 border rounded-xl hover:shadow-md transition-all duration-200 bg-gray-50">
        <div className="flex items-start">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
            <FaEnvelope size={20} />
          </div>
          <div>
            <h3 className="text-lg font-medium">Email Notifications</h3>
            <p className="text-gray-600 mt-1">
              Receive email updates about your account activity
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      <div className="flex items-center justify-between p-5 border rounded-xl hover:shadow-md transition-all duration-200 bg-gray-50">
        <div className="flex items-start">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full mr-4">
            <FaMobile size={20} />
          </div>
          <div>
            <h3 className="text-lg font-medium">Push Notifications</h3>
            <p className="text-gray-600 mt-1">
              Receive push notifications on your device
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      <div className="flex items-center justify-between p-5 border rounded-xl hover:shadow-md transition-all duration-200 bg-gray-50">
        <div className="flex items-start">
          <div className="p-3 bg-green-100 text-green-600 rounded-full mr-4">
            <FaComment size={20} />
          </div>
          <div>
            <h3 className="text-lg font-medium">Message Notifications</h3>
            <p className="text-gray-600 mt-1">
              Get notified when you receive new messages
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center mt-6">
        <FaCheck className="mr-2" /> Save Preferences
      </button>
    </div>
  </motion.div>
);

const PrivacySettings = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Privacy & Security Settings</h2>
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 border rounded-xl hover:shadow-md transition-all duration-200 bg-gray-50">
        <div className="flex items-start">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full mr-4">
            <FaShieldAlt size={20} />
          </div>
          <div>
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <p className="text-gray-600 mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      <div className="flex items-center justify-between p-5 border rounded-xl hover:shadow-md transition-all duration-200 bg-gray-50">
        <div className="flex items-start">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-full mr-4">
            <FaUser size={20} />
          </div>
          <div>
            <h3 className="text-lg font-medium">Profile Visibility</h3>
            <p className="text-gray-600 mt-1">Control who can see your profile</p>
          </div>
        </div>
        <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option>Everyone</option>
          <option>Only Friends</option>
          <option>Private</option>
        </select>
      </div>
      
      <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center mt-6">
        <FaCheck className="mr-2" /> Save Settings
      </button>
    </div>
  </motion.div>
);

const AppearanceSettings = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Appearance Settings</h2>
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Theme</h3>
        <div className="flex gap-4">
          <button className="flex flex-col items-center justify-center bg-white border-2 border-blue-500 text-gray-800 py-4 px-6 rounded-xl hover:shadow-md transition-all duration-200 w-28">
            <FaSun className="text-2xl mb-2 text-amber-500" />
            <span>Light</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-gray-800 text-white py-4 px-6 rounded-xl hover:shadow-md transition-all duration-200 w-28">
            <FaMoon className="text-2xl mb-2 text-gray-300" />
            <span>Dark</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-gray-100 text-gray-800 py-4 px-6 rounded-xl hover:shadow-md transition-all duration-200 w-28">
            <FaDesktop className="text-2xl mb-2 text-blue-500" />
            <span>System</span>
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Font Size</h3>
        <div className="p-5 border rounded-xl bg-gray-50">
          <div className="flex items-center mb-2">
            <FaFont className="text-blue-500 mr-3" />
            <span className="font-medium">Adjust Text Size</span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            defaultValue="2"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Small</span>
            <span>Medium</span>
            <span>Large</span>
          </div>
        </div>
      </div>
      
      <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center mt-6">
        <FaCheck className="mr-2" /> Save Preferences
      </button>
    </div>
  </motion.div>
);

const LanguageSettings = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Language Settings</h2>
    <div className="space-y-6">
      <div className="p-5 border rounded-xl bg-gray-50">
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <FaGlobe className="text-blue-500 mr-2" /> App Language
        </h3>
        <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Japanese</option>
        </select>
      </div>
      
      <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center mt-6">
        <FaCheck className="mr-2" /> Save Preferences
      </button>
    </div>
  </motion.div>
);

const HelpSupport = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Help & Support</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-5 border rounded-xl bg-white hover:shadow-md transition-all duration-200">
        <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <FaQuestionCircle size={24} />
        </div>
        <h3 className="text-lg font-medium mb-2">Frequently Asked Questions</h3>
        <p className="text-gray-600 mb-4">
          Find answers to commonly asked questions about our platform
        </p>
        <button className="text-blue-600 font-medium hover:underline flex items-center">
          View FAQs <FaChevronRight className="ml-1" size={12} />
        </button>
      </div>
      
      <div className="p-5 border rounded-xl bg-white hover:shadow-md transition-all duration-200">
        <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <FaEnvelope size={24} />
        </div>
        <h3 className="text-lg font-medium mb-2">Contact Support</h3>
        <p className="text-gray-600 mb-4">
          Get personalized help from our friendly support team
        </p>
        <button className="text-blue-600 font-medium hover:underline flex items-center">
          Contact Us <FaChevronRight className="ml-1" size={12} />
        </button>
      </div>
      
      <div className="p-5 border rounded-xl bg-white hover:shadow-md transition-all duration-200 md:col-span-2">
        <div className="bg-amber-100 text-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <FaShieldAlt size={24} />
        </div>
        <h3 className="text-lg font-medium mb-2">Report a Bug</h3>
        <p className="text-gray-600 mb-4">
          Let us know if something isn't working correctly or you encounter issues
        </p>
        <button className="text-blue-600 font-medium hover:underline flex items-center">
          Report Bug <FaChevronRight className="ml-1" size={12} />
        </button>
      </div>
    </div>
  </motion.div>
);

export default Settings;
