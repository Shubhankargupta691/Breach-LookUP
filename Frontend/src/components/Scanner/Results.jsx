import React, { useState } from 'react';
import AnalysisResults from './components/script/AnalysisResults';
import DetectionResult from './components/script/DetectionResult';
import { tabData } from './utils/fileUtils';

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
    <div className="col">
      <ul className="nav nav-tabs flex-nowrap pt-5 mt-4 justify-evenly" role="tablist">
        {tabData.map((tab, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link p-3 px-4 ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content mt-3 overflow-hidden">
        <div className={`tab-pane ${activeTab === "details" ? "active" : ""}`} id="details" role="tabpanel">
          <div id="report">
            <AnalysisResults jsonData={jsonData} />
          </div>
        </div>
        <div className={`tab-pane ${activeTab === "detection" ? "active" : ""}`} id="detection" role="tabpanel">
          <DetectionResult jsonData={jsonData} />
        </div>
      </div>
    </div>
  );
};

export default Results;
