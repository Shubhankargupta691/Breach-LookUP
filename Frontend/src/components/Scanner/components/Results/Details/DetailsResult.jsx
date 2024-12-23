import React from 'react';
import { DetailsSections, extractAllData, extractIP_Details } from '../../../utils/';

const DetailsResult = ({ jsonData, InputType }) => {
  const InputTypesMap = {
    File: 'FileAndHash',
    Hash: 'FileAndHash',
    IP: 'IP',
  };

  const type = InputTypesMap[InputType];
  const sections = type ? DetailsSections[type] : [];

  
  const getTitle = (section, jsonData, InputType) => {
    let title = null;

    if (InputType === 'IP') {
      const ipDetails = extractIP_Details(jsonData);
      title = ipDetails?.[section.id]?.length > 0 ? section.title : null;
    } else {
      const allData = extractAllData(jsonData);
      title = allData?.[section.id]?.length > 0 ? section.title : null;
    }

    return title;
  };

  return (
    <React.Fragment>
      <div className="vstack w-full p-2 sm:p-4 m-2 sm:m-4">
        {sections
          .filter(section => section.Component) // Ensure section has a valid Component
          .map((section, index) => {
            const title = getTitle(section, jsonData, InputType);
            return (
              <div className="vstack my-3" key={index}>
                {/* Conditionally render the title if it's available */}
                {title && (
                  <h3 className="font-bold text-white bg-slate-600 h-full pl-1 my-3 text-sm sm:text-base shadow-md">
                    {title}
                  </h3>
                )}

                {/* Render the component */}
                <section.Component jsonData={jsonData} className="text-white" />
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default DetailsResult;
