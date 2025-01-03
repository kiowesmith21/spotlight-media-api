import React, { useState } from 'react';

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 
  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 
  'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 
  'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

function StateDropdown() {
  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div className="relative">
      <select 
        value={selectedState} 
        onChange={handleStateChange} 
        className="p-2 border rounded w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Select a State</option>
        {states.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
      </select>

      {/* Display the selected state */}
      {selectedState && (
        <div className="mt-2 p-2 bg-gray-100 text-gray-700 rounded">
          <strong>Selected State:</strong> {selectedState}
        </div>
      )}
    </div>
  );
}

export default StateDropdown;
