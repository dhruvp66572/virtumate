// src/api/axiosInstance.js

import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding JWT token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming you store the token in local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors here
    if (error.response && error.response.status === 401) {
      // Optionally, redirect to login or show a message
      console.error('Unauthorized access - redirecting to login');
      
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
