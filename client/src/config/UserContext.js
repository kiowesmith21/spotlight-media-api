import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]); // Add state for saved jobs
    // Check if the user is logged in based on the presence of a token
  const isLoggedIn = !! user;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Get JWT token from localStorage
      if (token) {
        try {
          // Fetch user profile
          const userResponse = await fetch('http://localhost:5000/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!userResponse.ok) {
            throw new Error('Failed to fetch user profile');
          }

          const userData = await userResponse.json();
          setUser(userData);

          // Fetch user's saved jobs
          const jobsResponse = await fetch('http://localhost:5000/api/auth/getUserSavedJobs', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!jobsResponse.ok) {
            throw new Error('Failed to fetch saved jobs');
          }

          const jobsData = await jobsResponse.json();
          setSavedJobs(jobsData); // Set saved jobs data to state
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Function to update saved jobs in the context
  const updateSavedJobs = (newJob) => {
    setSavedJobs((prevSavedJobs) => [...prevSavedJobs, newJob]);
  };

  return (
    <UserContext.Provider value={{ user, savedJobs, setUser, setSavedJobs, updateSavedJobs, isLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
