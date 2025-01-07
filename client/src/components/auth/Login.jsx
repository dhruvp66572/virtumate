import React, { useState } from "react";

const Login = ({ isOpen, toggleModal }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const switchForm = () => setIsLogin(!isLogin);

  // Placeholder function for Google login
  const handleGoogleLogin = () => {
    // Implement your Google login logic here
    console.log("Login with Google");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Form Header */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Login Form */}
        {isLogin ? (
          <form>
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your email"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Login
            </button>
          </form>
        ) : (
          /* Registration Form */
          <form>
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your name"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your email"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Register
            </button>
          </form>
        )}

        {/* Login with Google */}
        <div className="my-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </div>

        {/* Toggle between Login and Register */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
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
