import React from 'react';
import { useAuth } from '../contex/AuthProvider';

const HomePage = () => {
  const { currentUser } = useAuth(); // Get the current user from the context

  return (
    <div className='text-2xl font-bold pt-14'>
      <h1>
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