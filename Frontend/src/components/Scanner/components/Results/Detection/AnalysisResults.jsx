import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaQuestionCircle, FaCheckCircle } from "react-icons/fa"; 
import {sortAnalysisResults, extractAllData} from "../../../utils";

const AnalysisResults = ({ jsonData }) => {
  const [analysisResults, setAnalysisResults] = useState([]);

  const {lastAnalysisResults} = extractAllData(jsonData);
  
  useEffect(() => {
    if (lastAnalysisResults) {
      const resultsArray = Object.entries(lastAnalysisResults);
      const sortedArray = sortAnalysisResults(resultsArray);
      setAnalysisResults(sortedArray);
    } else {
      console.error("Invalid JSON structure");
    }
  }, [lastAnalysisResults]);

  // Helper function to render icons and category text
  const renderCategory = (category, result) => {
    let icon = null;
    let displayText = result ? result : category;

    if (category === "malicious") {
      icon = <FaExclamationTriangle className="inline ml-2 text-red-500 mr-2" />;
    } else if (category === "undetected" || category === "harmless") {
      icon = <FaCheckCircle className="inline ml-2 text-green-500 mr-2" />;
    } else if (category === "type-unsupported" || category === "failure" ) {
      icon = <FaQuestionCircle className="inline ml-2 text-yellow-500 mr-2" />;
      displayText = category === "type-unsupported" ? "Unable to process file type" : "Failed to Scan";
    }else if (category === "suspicious") {
      icon = <FaExclamationTriangle className="inline ml-2 text-yellow-500 mr-2" />;
    }
    return (
      <>
        {icon}
        {displayText}
      </>
    );
  };

  return (
    <>
        <div id="analysis-container" className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700
               rounded-lg shadow-lg p-6 text-sm">
              {/* Table Header */}
              <div className="grid grid-cols-2 md:grid-cols-12 gap-4 border-b border-gray-600 pb-2 mb-4">
                <div className="col-span-1 md:col-span-3 font-semibold whitespace-nowrap text-left">Engine Name</div>
                <div className="col-span-1 md:col-span-3 font-semibold whitespace-nowrap text-left">Category</div>
                <div className="hidden md:block md:col-span-3 pl-5 font-semibold whitespace-nowrap text-left">Engine Name</div>
                <div className="hidden md:block md:col-span-3 font-semibold whitespace-nowrap text-left">Category</div>
              </div>

              {/* analysis results */}
              {analysisResults.map(([key, result], index) => {
                const isEven = index % 2 === 0;

                if (isEven) {
                  return (
                    <div
                      className="grid grid-cols-2 md:grid-cols-12 gap-4 py-2 border-b border-gray-600 items-center transition-transform duration-200 ease-in-out hover:bg-gray-700"
                      key={index}
                    >
                      {/* 1st Engine Name column */}
                      <div className="col-span-1 md:col-span-3 pl-3 text-left whitespace-nowrap truncate">{result.engine_name}</div>

                      {/* 1st Category column */}
                      <div
                        className="col-span-1 md:col-span-3 text-left whitespace-nowrap truncate"
                        style={{ color: result.category === "malicious" ? "red" : "inherit" }}
                      >
                        {renderCategory(result.category, result.result)}
                      </div>

                      {/* 2nd Engine Name & Category column */}
                      {analysisResults[index + 1] ? (
                        <>
                          <div className="hidden md:block md:col-span-3 pl-[5rem] text-left whitespace-nowrap truncate">
                            {analysisResults[index + 1][1].engine_name}
                          </div>
                          <div
                            className="hidden md:block md:col-span-3 text-left whitespace-nowrap truncate"
                            style={{
                              color: analysisResults[index + 1][1].category === "malicious" ? "red" : "inherit",
                            }}
                          >
                            {renderCategory(analysisResults[index + 1][1].category, analysisResults[index + 1][1].result)}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="hidden md:block md:col-span-3 text-left"></div>
                          <div className="hidden md:block md:col-span-3 text-left"></div>
                        </>
                      )}
                    </div>
                  );
                }

                return null;
              })}
        </div>
        
    </>

  );
};

export default AnalysisResults;
