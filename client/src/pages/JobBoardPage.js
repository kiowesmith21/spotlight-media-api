import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StateDropdown from '../components/StateDropdown';

function JobBoardPage() {
  // Hardcoded job data (name, description, location)
  const jobs = [
    { id: 1, title: 'Software Engineer', location: 'New York, NY', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, title: 'Frontend Developer', location: 'San Francisco, CA', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 3, title: 'Backend Developer', location: 'Austin, TX', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
    { id: 4, title: 'Full Stack Developer', location: 'Los Angeles, CA', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.' },
    { id: 5, title: 'Product Manager', location: 'Chicago, IL', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 6, title: 'Data Scientist', location: 'Boston, MA', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 7, title: 'UX/UI Designer', location: 'Miami, FL', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
    { id: 8, title: 'Project Manager', location: 'Seattle, WA', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.' },
    // Add more jobs as needed
  ];

  // Pagination setup
  const jobsPerPage = 3;  // Number of jobs per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Get the current jobs based on the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col">
        {/* Location dropdown and Union button */}
        <div className="flex flex-col md:flex-row items-center justify-center p-10">
          <StateDropdown />
          <button className="ml-10 text-black bg-white p-4 border rounded-3xl hover:bg-slate-200">Union</button>
        </div>

        {/* Job cards */}
        <div className="flex flex-col items-center">
          {currentJobs.map((job) => (
            <div key={job.id} className="flex flex-col md:flex-row bg-white border border-gray-200 shadow rounded-3xl p-8 w-3/4 items-center mb-4">
              <div className="flex flex-col w-3/4">
                <Link to="/job-board" className="inline-flex justify-center w-1/6 p-2 text-xs font-xs text-center bg-black text-white rounded-full">
                  {job.location}
                </Link>
                <a href="#">
                  <h1 className="text-2xl font-bold my-5 hover:text-blue-500">{job.title}</h1>
                </a>
                <p>{job.description}</p>
              </div>
              <a href="#" className="m-auto inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-blue-500 text-white border border-gray-300 rounded-lg hover:bg-blue-800">
                View Job
              </a>
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
