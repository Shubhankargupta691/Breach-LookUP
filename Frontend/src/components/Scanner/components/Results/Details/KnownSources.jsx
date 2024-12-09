import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractAllData } from '../../../utils/';

const KnownSources = ({ jsonData }) => {
  const { knownSources } = extractAllData(jsonData);

  // If knownSources is empty or null, don't render anything
  if (!knownSources || Object.keys(knownSources).length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      {Object.entries(knownSources).map(([key, value]) => (
        <div key={key} className="flex">
          <span className="text-gray-400 font-semibold w-32">{key}:</span>
          <span className="text-gray-200">{value}</span>
        </div>
      ))}
    </SectionWrapper>
  );
};

export default KnownSources;
