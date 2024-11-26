import React, { useState } from "react";
import AnalysisResults from "./components/script/AnalysisResults";
import DetectionResult from "./components/script/DetectionResult";
import { tabData } from "./utils/fileUtils";

const Results = ({ jsonData }) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!jsonData) {
    // Display "Generating Report..." with a loading indicator when jsonData is not yet available
    return (
      <div className="text-center mt-5">
        <p>Generating Report...</p>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="col w-full max-w-screen-xl mx-auto px-4">
      <ul className="nav nav-tabs flex-wrap pt-5 mt-4 justify-evenly border-b border-gray-600">
        {tabData.map((tab, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link p-3 px-4 relative bg-transparent border-0 shadow-none ${
                activeTab === tab.id
                  ? "text-white font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab.id)}
              style={{ outline: "none" }}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div
        className="tab-content mt-3 position-relative"
        style={{ height: "400px" }} // Set a fixed height for the tab content container
      >
        <div
          className={`tab-pane ${
            activeTab === "details" ? "active block" : "hidden"
          }`}
          id="details"
          role="tabpanel"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            visibility: activeTab === "details" ? "visible" : "hidden",
            opacity: activeTab === "details" ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <div id="report">
            <AnalysisResults jsonData={jsonData} />
          </div>
        </div>

        <div
          className={`tab-pane ${
            activeTab === "detection" ? "active block" : "hidden"
          }`}
          id="detection"
          role="tabpanel"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            visibility: activeTab === "detection" ? "visible" : "hidden",
            opacity: activeTab === "detection" ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <DetectionResult jsonData={jsonData} />
        </div>
      </div>
    </div>
  );
};

export default Results;
