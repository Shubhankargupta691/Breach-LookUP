import React, { useState, useEffect } from "react";
import { getTabs } from "./utils"; 

const Results = ({ jsonData, InputType }) => {

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("detection");

  useEffect(() => {

    setTabs(getTabs(InputType));
  }, [InputType]);

  if (tabs.length === 0) {
    return <div>No tabs available for the selected input type.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="absolute w-[100%] sm:w-[80%] md:w-[90%] max-w-full vstack my-5">
        {/* Scrollable container for tabs */}
        <div className="overflow-x-auto">
          <ul className="nav nav-tabs flex-nowrap w-full border-b border-gray-600 inline-flex">
            {tabs.map((tab) => (      
              <li className="nav-item" role="presentation" key={tab.id}>
                <button
                  className={`nav-link p-3 px-4 relative bg-transparent border-0 shadow-none whitespace-nowrap ${
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
        </div>

        {/* Tab content */}
        <div className="tab-content mt-3 position-relative" style={{ height: "400px" }}>
          {tabs.map(({ id, Component }) => (
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
              <Component jsonData={jsonData}  InputType={InputType} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
