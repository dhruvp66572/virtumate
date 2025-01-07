import React from 'react';
import { useAuth } from '../contex/AuthProvider';
import { Bell, Calendar, MessageSquare, Play, Gift, HelpCircle, Search, Clock } from 'lucide-react';

const HomePage = () => {
  const { currentUser } = useAuth(); // Get the current user from the context

  return (
    // <div className='text-2xl font-bold pt-14'>
    <div className="min-h-screen bg-gray-50 p-4">
      <nav className="bg-white rounded-lg p-4 mb-6 flex items-center justify-between shadow-sm">
        <div className="text-xl font-bold text-blue-600">EventPro</div>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-500" />
          <Bell className="w-5 h-5 text-gray-500" />
          <img src="/api/placeholder/40/40" alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
      </nav>
      <h1 >
        Hello, {currentUser ? (currentUser.displayName ? currentUser.displayName : currentUser.email) : "Guest"}! 
        <a href="/dashboard">
  <button>View More</button>

</a>
      </h1>
      <p>
        {currentUser ? "You are now logged in." : "Please log in to access the features."}
      </p>
    </div>
  );
};

export default HomePage;