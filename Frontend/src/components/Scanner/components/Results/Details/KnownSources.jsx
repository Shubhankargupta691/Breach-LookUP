import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractKnownSources } from '../../../utils/';


const KnownSources = ({ jsonData }) => {
  const trustedVerdict = extractKnownSources(jsonData);

  if (Object.keys(trustedVerdict).length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      {Object.entries(trustedVerdict).map(([key, value], index) => (
        <div key={index} className="flex">
          <span className="text-gray-400 font-semibold w-32">{key}:</span>
          <span className="text-gray-200">{value}</span>
        </div>
      ))}
    </SectionWrapper>
  );
};

export default KnownSources;
