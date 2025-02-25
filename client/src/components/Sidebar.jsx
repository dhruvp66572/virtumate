import { BarChart, Calendar, HelpCircle, Home, Menu, MessageSquare, Settings, Users, X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, activeTab }) => {
    const menuItems = [
      { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
      { icon: <Calendar size={20} />, label: 'Events' , path: '/events'},
      { icon: <Users size={20} />, label: 'Attendees' , path: '/attendees'},
      { icon: <MessageSquare size={20} />, label: 'Messages' , path: '/messages'},
      { icon: <BarChart size={20} />, label: 'Analytics' , path: '/analytics'},
      { icon: <Settings size={20} />, label: 'Settings' , path: '/settings'},
      { icon: <HelpCircle size={20} />, label: 'Help' , path: '/help'},
    ];
  
    return (
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        } z-30`}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen ? (
            <span className="text-xl font-bold text-blue-600">VirtuMate</span>
          ) : (
            <span className="text-xl font-bold text-blue-600">VM</span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
  
        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                 item.active ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <span className="inline-flex">{item.icon}</span>
              {isOpen && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    );
  };

export default Sidebar;