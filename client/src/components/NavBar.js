import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="flex justify-between items-center py-3 bg-white border-b shadow text-black px-10 font-bold">
      {/* Left side links */}
      <div className="flex space-x-4 items-center">
        <Link to="/" className="text-black text-3xl">Spot<span class="text-yellow-300">Light</span></Link>
        <Link to="/profile" className="hover:text-gray-400 px-10">Profile</Link>
        <Link to="/job-board" className="hover:text-gray-400">Find Jobs</Link>
      </div>

      {/* Right side links */}
      <div className="flex space-x-4 items-center">
        <Link to="/login" className="hover:text-gray-400">Sign In</Link>
        <Link to="/register" className="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600">Join Spotlight</Link>
      </div>
    </nav>
  );
}

export default NavBar;
