import React, { useState } from 'react';

function Box() {
  const [selectedOption, setSelectedOption] = useState('Files');
  const [file, setFile] = useState(null);

  // Handle file selection and prompt confirmation
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const confirmed = window.confirm("Are you sure you want to upload this file?");
      if (confirmed) {
        setFile(selectedFile);
      } else {
        // Clear the file input if the upload is not confirmed
        event.target.value = null;
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 sm:p-6 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto mt-10 text-white">
      <div className="flex flex-wrap justify-center space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            selectedOption === 'Files' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}
          onClick={() => setSelectedOption('Files')}
        >
          Files
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            selectedOption === 'URL Scanner' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}
          onClick={() => setSelectedOption('URL Scanner')}
        >
          URL Scanner
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            selectedOption === 'Domain Scanner' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}
          onClick={() => setSelectedOption('Domain Scanner')}
        >
          Domain Scanner
        </button>
      </div>

      {selectedOption === 'Files' && (
        <div className="flex flex-col items-center space-y-4 w-full">
          <input
            type="file"
            className="border border-gray-700 bg-gray-800 text-gray-300 p-2 rounded-md w-full"
            onChange={handleFileChange}
          />
          {file && <p>Selected File: {file.name}</p>}
        </div>
      )}

      {selectedOption === 'URL Scanner' && (
        <div className="flex flex-col items-center space-y-4 w-full">
          <input
            type="text"
            placeholder="Enter URL to scan"
            className="border border-gray-700 bg-gray-800 text-gray-300 p-2 rounded-md w-full"
          />
        </div>
      )}

      {selectedOption === 'Domain Scanner' && (
        <div className="flex flex-col items-center space-y-4 w-full">
          <input
            type="text"
            placeholder="Enter Domain to scan"
            className="border border-gray-700 bg-gray-800 text-gray-300 p-2 rounded-md w-full"
          />
        </div>
      )}
    </div>
  );
}

export default Box;
