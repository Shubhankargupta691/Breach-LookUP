import React, { useState, useEffect } from "react";

const AnalysisResults = ({ jsonData }) => {
  const [analysisResults, setAnalysisResults] = useState([]);

  useEffect(() => {
    if (jsonData && jsonData.data && jsonData.data.attributes && jsonData.data.attributes.last_analysis_results) {
      const resultsArray = Object.entries(jsonData.data.attributes.last_analysis_results);
      setAnalysisResults(resultsArray);
    } else {
      console.error("Invalid JSON structure");
    }
  }, [jsonData]);

  return (
    <div id="analysis-container" className="space-y-4  from-gray-800 bg-gray-900 border-spacing-0 border-gray-700 rounded-lg shadow-lg p-4">
      {/* Grid Header Row */}
      <div className="grid-cols-2 sm:grid-cols-4 gap-4 mb-2 flex text-center justify-around">
        <div className="font-semibold text-center col-span-2 sm:col-span-1">Engine Name</div>
        <div className="font-semibold text-center col-span-2 sm:col-span-1">Category</div>
        <div className="hidden sm:block font-semibold text-center">Engine Name</div>
        <div className="hidden sm:block font-semibold text-center">Category</div>
      </div>

   
      {analysisResults.map(([key, result], index) => {
        
        const isEven = index % 2 === 0;
        
        if (isEven) {
          return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2" key={index}>
              <div className="text-center">{result.engine_name}</div>
              <div className="text-center">{result.category}</div>
              {analysisResults[index + 1] ? (
                <>
                  <div className="text-center">{analysisResults[index + 1][1].engine_name}</div>
                  <div className="text-center">{analysisResults[index + 1][1].category}</div>
                </>
              ) : (
              
                <>
                  <div className="text-center"></div>
                  <div className="text-center"></div>
                </>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export default AnalysisResults;
