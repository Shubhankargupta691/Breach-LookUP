import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUpload, faSyncAlt, faSpinner, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import FileInfoCard from './FileInfoCard';
import uploadAndScan from './script/uploadAndScan';
import Results from '../Results';
import HashScan from "./script/HashScan";
import { MaliciousGauge } from './Gauge'; // Updated import

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const [fileInfo, setFileInfo] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSearchChange = (event) => {
    const inputValue = event.target.value.trim();
    setSearchInput(inputValue);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      console.error("No input provided for hash scanning.");
      return;
    }

    try {
      setStatusMessage("Scanning hash...");
      setJsonData(null);
      setIsScanning(true);

      await HashScan(searchInput, setJsonData);

      // setStatusMessage("Scan completed. Results are ready.");
    } catch (error) {
      console.error("Error during hash scanning:", error);
      setStatusMessage("Error occurred while scanning. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUploadClick = () => {
    document.getElementById('fileUpload').click();
  };

  const handleFileInfo = async () => {
    const file = document.getElementById("fileUpload").files[0];
    if (file) {
      setFileInfo(file);
      setStatusMessage("File uploaded successfully");
      setJsonData(null);

      setTimeout(() => {
        setStatusMessage("Scanning File. Please wait for the results.");
      }, 2000);

      setIsScanning(true);

      try {
        await uploadAndScan(file, setJsonData);
        setStatusMessage("Scan completed. Results are ready.");
      } catch (error) {
        setStatusMessage("Error occurred while scanning the file. Please try again.");
      } finally {
        setIsScanning(false);
      }
    }
  };

  useEffect(() => {
    if (jsonData) {
      setStatusMessage("");  // Clear status message when jsonData is received
      console.log("jsonData:", jsonData); // Debugging line
    }
  }, [jsonData]);

  const reanalyze = () => {
    console.log("Reanalyze initiated");
  };

  return (
    <>
      <header className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[60%] max-w-full mt-3 flex">
        <div className="bg-gray-900 border-spacing-0 border-gray-700 rounded-lg shadow-lg p-1 mt-2 w-full max-w-8xl mx-auto text-white">
          <div className="flex flex-col sm:flex-row items-center py-1/2 pe-3 w-full gap-3 transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-4 w-full justify-end">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="w-full input-group bg-gray-800 relative flex items-center border border-gray-600 rounded-md shadow-sm mx-auto transition-all duration-300 ease-in-out hover:shadow-lg">
                  <button className="btn btn-link py-2 px-4 rounded-l-md text-gray-400 transition-colors duration-300 ease-in-out hover:text-gray-200" type="button">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <input
                    className="form-control border-0 bg-gray-800 py-2 px-4 w-full text-white rounded-r-md transition-all duration-300 ease-in-out focus:bg-gray-700 focus:outline-none"
                    type="text"
                    id="searchInput"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="URL, IP address, domain or file hash"
                    value={searchInput}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
            <div className="w-px h-5 bg-gray-600 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <span data-tooltip-text="Upload file" data-tooltip-position="bottom">
                <a role="button" className="flex items-center text-gray-400 transition-transform duration-300 ease-in-out hover:text-gray-200 hover:scale-110" aria-label="Upload file" onClick={handleFileUploadClick}>
                  <FontAwesomeIcon icon={faUpload} className="text-2xl" />
                </a>
              </span>
              <input type="file" id="fileUpload" name="file" style={{ display: 'none' }} onChange={handleFileInfo} />
              <div className="w-px h-5 bg-gray-600 hidden sm:block"></div>
              <span data-tooltip-text="ReScan file" data-tooltip-position="bottom">
                <a role="button" className="flex items-center text-gray-400 transition-transform duration-300 ease-in-out hover:text-gray-200 hover:scale-110" aria-label="ReScan" onClick={reanalyze}>
                  <FontAwesomeIcon icon={faSyncAlt} className="text-2xl" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </header>
      <section className="transition-opacity duration-500 ease-out mt-24">
        {statusMessage && (
          <div className="mt-4 flex items-center space-x-2 text-gray-300 animate-pulse">
            {statusMessage === "File uploaded successfully" ? (
              <FontAwesomeIcon icon={faCheckCircle} className="text-xl text-green-500" />
            ) : (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl" />
            )}
            <span className="text-lg">{statusMessage}</span>
          </div>
        )}

{jsonData && (
  <div 
    className={`flex flex-col lg:flex-row ${
      !window.matchMedia('(min-width: 1024px)').matches 
        ? 'justify-center items-center' 
        : 'justify-center items-start'
    } animate-fadeIn transition-all duration-500 ease-in-out`}
  >
    <div 
      className="hidden lg:flex flex-col w-60 h-64 m-4 transition-all duration-500 ease-in-out opacity-0 scale-0 lg:opacity-100 lg:scale-100"
    >
      {/* This `MaliciousGauge` appears only on large screens */}
      <MaliciousGauge jsonData={jsonData} />
    </div>
    <div 
      className="flex justify-center items-center w-full lg:w-auto transition-all duration-500 ease-in-out"
    >
      <FileInfoCard 
        fileInfo={fileInfo} 
        searchInput={fileInfo ? null : searchInput} 
        jsonData={jsonData} 
        className="w-60 h-64 m-4"
      />
    </div>
  </div>
)}



        <div className="flex w-full max-w-8xl mx-auto animate-fadeIn">
          {jsonData && <Results jsonData={jsonData} />}
        </div>
      </section>
    </>
  );
};

export default SearchBox;
