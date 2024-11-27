import React, { useState } from "react";
import { tabData } from "./utils/fileUtils";

const Results = ({ jsonData }) => {
  const [activeTab, setActiveTab] = useState("details");

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
        style={{ height: "400px" }}
      >
        {tabData.map(({id, Component}) =>(
          <div
            key={id}
            className={`tab-pane ${activeTab === id ? "active block" : "hidden"}`}
            id={id}
            role="tabpanel"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              visibility: activeTab === id ? "visible" : "hidden",
              opacity: activeTab === id ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
              <Component jsonData={jsonData} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
