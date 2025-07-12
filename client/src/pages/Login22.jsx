import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axiosInstance from "../utils/axiosIntance";

const Login = ({ isOpen, toggleModal }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const [message, setMessage] = useState(""); // Error message for login
  const [message2, setMessage2] = useState(""); // Error message for registration
  const switchForm = () => setIsLogin(!isLogin);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formData2, setFormData2] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Placeholder function for Google login
  const handleGoogleLogin = () => {
    console.log("Login with Google");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await login(email, password);
  //   navigate("/dashboard");
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message state

    try {
      // Validate email and password
      if (!formData.email || !formData.password) {
        setMessage("Please fill in all fields");
        return;
      }

      // Password length validation
      if (formData.password.length < 6) {
        setMessage("Password must be at least 6 characters long");
        return;
      }

      // Fetch user data from database
      const response = await login(formData.email, formData.password);

      console.log("Login response:", response);

      // Check if login was successful
      if (response) {
        //localStorage.setItem("token", response.token);
        //await login(response.token);
        // await login(formData.email, formData.password);
        setMessage("Login successful! Redirecting...");

        // Simulating redirect after successful login
        setTimeout(() => {
          toggleModal(); // Close modal
          navigate("/dashboard"); // Redirect to profile page
          //window.location.reload(); // Reload page to update UI
        }, 2000);
      } else {
        setMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const registerhandlesubmit = async (e) => {
    e.preventDefault();
    setMessage2(""); // Reset message state

    try {
      // Validate all fields
      if (!formData2.name || !formData2.email || !formData2.password) {
        setMessage2("Please fill in all fields");
        return;
      }

      // Name length validation
      if (formData2.name.length < 3) {
        setMessage2("Name must be at least 3 characters long");
        return;
      }

      // Password length validation
      if (formData2.password.length < 6) {
        setMessage2("Password must be at least 6 characters long");
        return;
      }

      // const response = await registe(formData2);
      const response = await axiosInstance.post(
        "/auth/register",
        { name: formData2.name, email: formData2.email, password: formData2.password }
      );

      if (response.status === 200) {
        setMessage2(
          "Registration successful! Please login with your credentials."
        );

        setTimeout(() => {
          //toggleModal(); // Close modal after registration
          switchForm(); // Switch to login form
          // window.location.reload();
        }, 1500);
      } else {
        setMessage2("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage2("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button
          onClick={toggleModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {isLogin ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            {message && <p className="text-red-500 text-sm mb-2">{message}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={registerhandlesubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your name"
                onChange={handleChange2}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your email"
                onChange={handleChange2}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your password"
                onChange={handleChange2}
              />
            </div>
            {message2 && (
              <p className="text-red-500 text-sm mb-2">{message2}</p>
            )}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Register
            </button>
          </form>
        )}

        <div className="my-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2  bg-blue-500 hover:underline text-white px-4 py-2 rounded-lg w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Login with Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={switchForm}
                className="text-blue-500 hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={switchForm}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
