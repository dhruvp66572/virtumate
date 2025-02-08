import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  // console.log(user);
  return (
    <nav className="flex justify-between bg-gray-800 p-4 text-white">
      <h1 className="text-xl">VirtuMate</h1>
      <h2 className="text-xl">Welcome, {user ? user.username : "Guest"}!</h2>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.name}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
