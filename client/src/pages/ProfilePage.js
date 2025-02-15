import React, { useContext, useState } from 'react';
import UserContext from '../config/UserContext';

function ProfilePage() {
  const { user, setUser, savedJobs } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });

  if (!user || !savedJobs) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/updateUserInfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser); // Update user in context
        setIsEditing(false); // Exit edit mode
      } else {
        console.error('Failed to update profile');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Profile Picture */}
      <div className="flex justify-center my-6">
        <img
          src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg"
          alt="Profile-pic"
          className="w-1/2 h-auto rounded-full border-4 border-blue-500"
        />
      </div>

      {/* Name and Location */}
      {isEditing ? (
        <div className="text-center mb-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Location"
          />
        </div>
      ) : (
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold">{user.fullName}</h2>
          <p className="text-gray-500">{user.location}</p>
        </div>
      )}

      {/* Horizontal Line with Shadow */}
      <div className="my-4 border-t-2 border-gray-200 shadow-sm w-3/4"></div>

      {/* Bio */}
      {isEditing ? (
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="border p-2 rounded w-3/4 h-20"
          placeholder="Bio"
        ></textarea>
      ) : (
        <p className="text-gray-700 text-center mb-6 w-3/4">{user.bio}</p>
      )}

      {/* Saved Jobs Section */}
      <div className="w-full mt-8">
        <h3 className="text-2xl font-semibold mb-4">Saved Jobs</h3>

        {savedJobs.length === 0 ? (
          <p>No saved jobs.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <div key={job._id} className="bg-white p-4 rounded-lg shadow-lg">
                <h4 className="font-semibold text-lg">{job.title}</h4>
                <p className="text-gray-500">{job.company}</p>
                <p className="text-gray-700 mt-2">{job.description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                  View Job
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center my-8">
        {isEditing ? (
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
