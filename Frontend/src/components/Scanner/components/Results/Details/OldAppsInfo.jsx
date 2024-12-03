import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractOldAppsInfo } from '../../../utils';

const OldAppsInfo = ({ jsonData }) => {
  const oldAppsData = extractOldAppsInfo(jsonData); 

  if (Object.keys(oldAppsData).length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      {Object.entries(oldAppsData).map(([key, value], index) => (
        <div key={index} className="flex">
          <span className="text-gray-400 font-semibold w-32">{key}:</span>
          <span className="text-gray-200">{value}</span>
        </div>
      ))}
    </SectionWrapper>
  );
};

export default OldAppsInfo;
