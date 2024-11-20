import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { BasicInfo, History, KnownSources, Product, FileNames, OldAppsInfo, Names } from './Results/Detection';


const DetectionResult = ({ jsonData }) => {
  

  const [activeTab, setActiveTab] = useState('product');


  const displayData = (data, showMoreState, toggleShowMore) => (
    <>
      {data.slice(0, showMoreState ? data.length : 2).map((item, index) => (
        <p key={index} className="text-gray-300 mb-2">{item}</p>
      ))}
      {data.length > 2 && (
        <button
          onClick={toggleShowMore}
          className="flex items-center text-sm text-gray-400 mt-2 hover:text-gray-200 focus:outline-none"
        >
          {showMoreState ? 'Show Less' : 'Show More'}
          <FontAwesomeIcon icon={showMoreState ? faChevronUp : faChevronDown} className="ml-2" />
        </button>
      )}
    </>
  );
    
  return (
    <div className="p-6 rounded-lg shadow-md">
        <div className="mb-6 bg-gray-900 p-6 rounded-lg shadow-md"> 
          <BasicInfo jsonData={jsonData}/>
        </div>
      
      <div className="mb-6 bg-gray-900 p-6 rounded-lg shadow-md">
        <History  jsonData={jsonData}/>
      </div>

     
      <div className="mb-6 bg-gray-900 p-6 rounded-lg shadow-md">
        <Names jsonData={jsonData}/>
      </div>

    
        <div className="mb-6 bg-gray-900 p-6 rounded-lg shadow-md">
          <KnownSources jsonData={jsonData} />
        </div>

    
      <div className="mb-6 bg-gray-900 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-300">National Software Reference Library Info</h3>
        <div className="col">
          <ul className="nav nav-tabs flex pt-5 justify-evenly" role="tablist">
            <li className="nav-item" role="presentation">
              <span className="text-gray-200">
                <a
                  href="#product"
                  className={`p-3 ${activeTab === 'product' ? 'text-white' : 'text-gray-200'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("product");
                  }}
                >
                  Product
                </a>
              </span>
            </li>
            <li className="nav-item" role="presentation">
              <span className="text-gray-200">
                <a
                  href="#filenames"
                  className={`p-3 ${activeTab === 'filenames' ? 'text-white' : 'text-gray-200'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("filenames");
                  }}
                >
                  FileNames
                </a>
              </span>
            </li>
          </ul>

          <div className="tab-content mt-3">
            {activeTab === "product" && <Product jsonData={jsonData} />}
            {activeTab === "filenames" && <FileNames jsonData={jsonData} />}
          </div>
        </div>
      </div>

    
      <div className="mb-6 bg-gray-900 p-6 rounded-lg shadow-md">
        <OldAppsInfo jsonData={jsonData} />
        
      </div>
    </div>
  );
};

export default DetectionResult;
