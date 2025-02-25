import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Bell, LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
console.log(user);
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <User size={20} className="text-gray-500" />
            <span className="text-gray-700 font-medium">{user ? user.username : "Guest"}</span>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Bell size={20} />
          </button>
          <button onClick={logout} className="p-2 text-gray-500 hover:text-gray-700">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
