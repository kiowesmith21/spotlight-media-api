import React, { useState, useEffect, useContext } from 'react'; 
import { Link } from 'react-router-dom';
import StateDropdown from '../components/StateDropdown';
import UserContext from '../config/UserContext';

function JobBoardPage() {
  const { updateSavedJobs } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState('');  // State to track the selected state

  // Call API to fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auditions');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle the state selection
  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  // Filter jobs by selected state
  const filteredJobs = selectedState
    ? jobs.filter((job) => {
        const state = job.location.split(',')[1]?.trim().split(' ')[0]; // Extract the state code from location
        return state === selectedState;
      })
    : jobs;

  // Pagination setup
  const jobsPerPage = 10; // Number of jobs per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Get the current jobs based on the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // saveJob function with added fetch for job details after saving
const saveJob = async (jobId) => {
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

  if (!token) {
    alert('Please log in to save a job.');
    return;
  }

  try {
    // Save the job by calling the saveJobForUser endpoint
    const response = await fetch('http://localhost:5000/api/auth/saveJobForUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ jobId }), // Send the jobId in the body
    });

    if (!response.ok) {
      // If the response status is 400 (Job already saved), handle it specifically
      if (response.status === 400) {
        const errorData = await response.json();
        console.log(errorData.message); // Logs 'Job already saved'
        alert(errorData.message); // Optionally, show an alert with the message
      } else {
        throw new Error('Failed to save job');
      }
      return;
    }

    // Get the job details by calling getJobById with the jobId
    const jobDetailsResponse = await fetch(`http://localhost:5000/api/auditions/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!jobDetailsResponse.ok) {
      throw new Error('Failed to fetch job details');
    }

    const jobDetails = await jobDetailsResponse.json();
    
    // Update the saved jobs in the context with the full job details
    updateSavedJobs(jobDetails); 

    alert('Job saved successfully!');
  } catch (err) {
    console.error('Error saving job:', err);
  }
};


  // Handle load time and errors
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full">
      <div className="flex flex-col">
        {/* Location dropdown and Union button */}
        <div className="flex flex-col md:flex-row items-center justify-center p-10">
          <StateDropdown onStateChange={handleStateChange} /> {/* Pass handleStateChange to the dropdown */}
        </div>

        {/* Job cards */}
        <div className="flex flex-col items-center">
          {currentJobs.map((job) => (
            <div key={job.id} className="flex flex-col md:flex-row bg-white border border-gray-200 shadow rounded-3xl p-8 w-3/4 items-center mb-4">
              <div className="flex flex-col w-3/4">
                <Link to="/job-board" className="inline-flex justify-center max-w-fit p-2 text-xs font-xs text-center bg-black text-white rounded-full">
                  {job.location}
                </Link>
                <a href={job.link} target="_blank">
                  <h1 className="text-2xl font-bold my-5 hover:text-blue-500">{job.title}</h1>
                </a>
                <p>{job.description}</p>
              </div>
              <a href={job.link} target="_blank" className="m-auto inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-blue-500 text-white border border-gray-300 rounded-lg hover:bg-blue-800">
                View Job
              </a>
              {/* Save Job Button */}
              <button
                onClick={() => saveJob(job._id)} // Call the saveJob function on button click
                className="mt-4 px-5 py-2 text-base font-medium text-center bg-green-500 text-white border border-gray-300 rounded-lg hover:bg-green-700"
              >
                Save Job
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex items-center justify-center mb-10">
          {/* Previous Button */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {/* Page Number Buttons */}
          <div className="flex space-x-2 mx-4">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobBoardPage;
