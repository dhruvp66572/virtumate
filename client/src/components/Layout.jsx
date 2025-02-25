import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate(); // ✅ Fixed: Import useNavigate from react-router-dom
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab} // ✅ Fixed: Pass setActiveTab as prop
      />
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab} // ✅ Fixed: Pass setActiveTab as prop
        />
        <main
          className={`transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
    
    
};

export default Layout;
