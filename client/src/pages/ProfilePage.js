import React from 'react';

function ProfilePage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg"
          alt="Profile-pic"
          className="w-1/2 h-auto rounded-full border-4 border-blue-500"
        />
      </div>
      
      {/* Name and Location */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold">John Doe</h2>
        <p className="text-gray-500">Boston, MA</p>
      </div>

      {/* Horizontal Line with Shadow */}
      <div className="my-4 border-t-2 border-gray-200 shadow-sm w-3/4"></div>

      {/* Bio */}
      <p className="text-gray-700 text-center mb-6 w-3/4">
        A passionate actor with a love for creating impactful performances. 
        Enthusiast in singing, broadway, and rom-coms. Looking to expand my horizons and find the role for me.
      </p>

      {/* Edit Profile Button */}
      <div className="flex justify-center">
        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
