import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase"; // Import Firebase authentication instance
// import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

// Create a React Context for managing authentication state
const AuthContext = React.createContext();

// Custom hook for accessing the AuthContext
export function useAuth() { 
  return useContext(AuthContext);
}

// AuthProvider component that wraps the application and provides authentication state
export function AuthProvider({ children }) {
  // State variables to manage authentication details
  const [currentUser, setCurrentUser] = useState(null); // Stores the currently authenticated user
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Tracks whether a user is logged in
  const [isEmailUser, setIsEmailUser] = useState(false); // Checks if the user logged in via email/password
  const [isGoogleUser, setIsGoogleUser] = useState(false); // Checks if the user logged in via Google
  const [loading, setLoading] = useState(true); // Tracks whether the authentication state is being initialized

  // Effect to handle changes in authentication state
  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe; // Cleanup function to unsubscribe when the component unmounts
  }, []);

  // Function to initialize the user's authentication state
  async function initializeUser(user) {
    if (user) {
      // If a user is logged in, update the current user state
      setCurrentUser({ ...user });

      // Check if the user logged in using email/password
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // Uncomment this block if you want to handle Google login
      // const isGoogle = user.providerData.some(
      //   (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      // );
      // setIsGoogleUser(isGoogle);

      setUserLoggedIn(true); // Update login status to true
    } else {
      // If no user is logged in, reset the state
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false); // Set loading to false after authentication state is initialized
  }

  // Values to be shared via AuthContext
  const value = {
    userLoggedIn, // Whether a user is logged in
    isEmailUser, // Whether the user logged in via email/password
    isGoogleUser, // Whether the user logged in via Google
    currentUser, // The currently authenticated user
    setCurrentUser, // Function to update the current user state
  };

  // Provide the authentication state and functions to children components
  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only after loading is complete */}
    </AuthContext.Provider>
  );
}
