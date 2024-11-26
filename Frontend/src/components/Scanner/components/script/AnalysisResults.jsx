import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaQuestionCircle, FaCheckCircle } from "react-icons/fa"; 

const AnalysisResults = ({ jsonData }) => {
  const [analysisResults, setAnalysisResults] = useState([]);

  useEffect(() => {
    if (jsonData && jsonData.data && jsonData.data.attributes && jsonData.data.attributes.last_analysis_results) {
      const resultsArray = Object.entries(jsonData.data.attributes.last_analysis_results);
      const sortedArray = resultsArray.sort(
        ([, a], [, b]) => (b.category === "malicious") - (a.category === "malicious")
      );

      setAnalysisResults(sortedArray);
    } else {
      console.error("Invalid JSON structure");
    }
  }, [jsonData]);

  // Helper function to render icons and category text
  const renderCategory = (category, result) => {
    let icon = null;
    let displayText = result ? result : category;

    if (category === "malicious") {
      icon = <FaExclamationTriangle className="inline ml-2 text-red-500 mr-2" />;
    } else if (category === "undetected") {
      icon = <FaCheckCircle className="inline ml-2 text-green-500 mr-2" />;
    } else if (category === "type-unsupported" || category === "failure") {
      icon = <FaQuestionCircle className="inline ml-2 text-yellow-500 mr-2" />;
      displayText = category === "type-unsupported" ? "Unable to process file type" : "Failed to Scan";
    }

    return (
      <>
        {icon}
        {displayText}
      </>
    );
  };

  return (
    <div id="analysis-container" className="space-y-4 bg-black border-spacing-0 rounded-lg shadow-lg p-4 text-sm">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2 text-center">
        <div className="font-semibold text-left sm:text-center ml-4">Engine Name</div>
        <div className="font-semibold text-left sm:text-center ml-4">Category</div>
        <div className="hidden sm:block font-semibold text-left">Engine Name</div>
        <div className="hidden sm:block font-semibold text-left">Category</div>
      </div>

      {/* Rendering analysis results */}
      {analysisResults.map(([key, result], index) => {
        const isEven = index % 2 === 0;

        if (isEven) {
          return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2" key={index}>
              <div className="text-left ml-4">{result.engine_name}</div>

              <div
                className="text-left ml-4"
                style={{ color: result.category === "malicious" ? "red" : "inherit" }}
              >
                {renderCategory(result.category, result.result)}
              </div>


              {analysisResults[index + 1] ? (
                <>
                  <div className="text-left ml-4">{analysisResults[index + 1][1].engine_name}</div>

                  <div
                    className="text-left ml-4"
                    style={{
                      color: analysisResults[index + 1][1].category === "malicious" ? "red" : "inherit",
                    }}
                  >
                    {renderCategory(analysisResults[index + 1][1].category, analysisResults[index + 1][1].result)}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-left ml-4"></div>
                  <div className="text-left ml-4"></div>
                </>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default AnalysisResults;
