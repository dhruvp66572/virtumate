import { useState } from "react";
import {
  FaUser,
  FaBell,
  FaLock,
  FaGlobe,
  FaPalette,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      // case 'profile':
      //     return <ProfileSettings />;
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
      // return <ProfileSettings />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4">
          {/* <button
            className={`flex items-center w-full p-3 rounded-md mb-2 transition ${
              activeTab === "profile"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser className="mr-3" /> Profile
          </button> */}
          <button
            className={`flex items-center w-full p-3 rounded-md mb-2 transition ${
              activeTab === "notifications"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <FaBell className="mr-3" /> Notifications
          </button>
          <button
            className={`flex items-center w-full p-3 rounded-md mb-2 transition ${
              activeTab === "privacy"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("privacy")}
          >
            <FaLock className="mr-3" /> Privacy & Security
          </button>
          <button
            className={`flex items-center w-full p-3 rounded-md mb-2 transition ${
              activeTab === "appearance"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("appearance")}
          >
            <FaPalette className="mr-3" /> Appearance
          </button>
          <button
            className={`flex items-center w-full p-3 rounded-md mb-2 transition ${
              activeTab === "language"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("language")}
          >
            <FaGlobe className="mr-3" /> Language
          </button>
          <button
            className={`flex items-center w-full p-3 rounded-md mb-2 transition ${
              activeTab === "help"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("help")}
          >
            <FaQuestionCircle className="mr-3" /> Help & Support
          </button>
          <button className="flex items-center w-full p-3 rounded-md text-red-500 hover:bg-red-50 transition">
            <FaSignOutAlt className="mr-3" /> Log Out
          </button>
        </div>
        <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// const ProfileSettings = () => (
//   <div>
//     <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
//     <div className="flex flex-col md:flex-row gap-8">
//       <div className="flex flex-col items-center">
//         <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
//           <img
//             src="https://via.placeholder.com/150"
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
//           Change Photo
//         </button>
//       </div>
//       <div className="flex-1">
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Full Name</label>
//             <input
//               type="text"
//               defaultValue="John Doe"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Username</label>
//             <input
//               type="text"
//               defaultValue="johndoe123"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               defaultValue="john.doe@example.com"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Bio</label>
//             <textarea
//               rows="4"
//               defaultValue="Software developer and tech enthusiast."
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// );

// Continue with other components converted to Tailwind CSS

const NotificationSettings = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div>
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <p className="text-gray-600">
            Receive email updates about your account activity
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div>
          <h3 className="text-lg font-medium">Push Notifications</h3>
          <p className="text-gray-600">
            Receive push notifications on your device
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div>
          <h3 className="text-lg font-medium">Message Notifications</h3>
          <p className="text-gray-600">
            Get notified when you receive new messages
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition">
        Save Preferences
      </button>
    </div>
  </div>
);

// Define the missing components
const PrivacySettings = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Privacy & Security Settings</h2>
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div>
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <p className="text-gray-600">
            Add an extra layer of security to your account
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div>
          <h3 className="text-lg font-medium">Profile Visibility</h3>
          <p className="text-gray-600">Control who can see your profile</p>
        </div>
        <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Everyone</option>
          <option>Only Friends</option>
          <option>Private</option>
        </select>
      </div>
      <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition">
        Save Settings
      </button>
    </div>
  </div>
);

const AppearanceSettings = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Appearance Settings</h2>
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Theme</h3>
        <div className="flex gap-4">
          <button className="bg-white border-2 border-blue-500 text-gray-800 py-2 px-4 rounded-md">
            Light
          </button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-md">
            Dark
          </button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md">
            System Default
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-3">Font Size</h3>
        <input
          type="range"
          min="1"
          max="3"
          defaultValue="2"
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Small</span>
          <span>Medium</span>
          <span>Large</span>
        </div>
      </div>
      <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition">
        Save Preferences
      </button>
    </div>
  </div>
);

const LanguageSettings = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Language Settings</h2>
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">App Language</h3>
        <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Japanese</option>
        </select>
      </div>
      <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition">
        Save Preferences
      </button>
    </div>
  </div>
);

const HelpSupport = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Help & Support</h2>
    <div className="space-y-6">
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">FAQs</h3>
        <p className="text-gray-600 mb-3">
          Find answers to commonly asked questions
        </p>
        <button className="text-blue-500 font-medium hover:underline">
          View FAQs
        </button>
      </div>
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">Contact Support</h3>
        <p className="text-gray-600 mb-3">Get help from our support team</p>
        <button className="text-blue-500 font-medium hover:underline">
          Contact Us
        </button>
      </div>
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">Report a Bug</h3>
        <p className="text-gray-600 mb-3">
          Let us know if you encounter any issues
        </p>
        <button className="text-blue-500 font-medium hover:underline">
          Report Bug
        </button>
      </div>
    </div>
  </div>
);

export default Settings;
