import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Creating your account...");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      if (res.status === 201) {
        toast.success("Account created successfully!");
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
    catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
    // Reset form fields after submission
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Navigation Bar */}
          {/* <nav className="bg-white shadow-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center">
                <Link to="/">
                  <h2 className="text-2xl font-bold text-indigo-600">Virtumate</h2>
                </Link>
              </div>
              <div className="space-x-8">
                <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
                <Link to="/events" className="text-gray-600 hover:text-indigo-600 transition-colors">Events</Link>
                <Link to="/login" className="text-indigo-600 font-semibold">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">Register</Link>
              </div>
            </div>
          </nav> */}
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100">  
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        <p className="text-center text-gray-600 mb-6">Sign up to manage and discover events</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
            Sign Up
          </button>
        </form>

        {/* <div className="mt-4 text-center text-gray-600">Or continue with</div>
        <div className="flex space-x-4 justify-center mt-2">
          <button className="border px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-100">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Google" className="w-5 h-5" />
            <span>Google</span>
          </button>
          <button className="border px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-100">
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" className="w-5 h-5" />
            <span>Facebook</span>
          </button>
        </div> */}

        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;
