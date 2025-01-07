import React from 'react';
//import { useAuth } from '../contex/AuthProvider';
import { Bell, Calendar, MessageSquare, Play, Gift, HelpCircle, Search, Clock } from 'lucide-react';
import Navbar from '../components/nav/Navbar';
import Dash from './Dash';
import Dashboard from './Dashboard';

const HomePage = () => {
  const { currentUser } = useAuth(); // Get the current user from the context

  return (
    // <div className='text-2xl font-bold pt-14'>
    <div className="bg-gray-50">
     <Navbar/>
     {/* <h1 className="text-2xl font-bold pt-14 mt-10">
  Hello,{" "}
  {currentUser ? (
    currentUser.displayName ? (
      currentUser.displayName
    ) : (
      <span>
        {currentUser.email}{" "}
        <span className="text-sm text-red-500"> <a
        href="/profile"
        className="text-blue-600 underline"
      >
        Complete your profile first
      </a></span>
      </span>
    )
  ) : (
    "Guest"
  )}

</h1> */}
      <Dashboard/>

      <Dash/>
    </div>
  );
};

export default HomePage;