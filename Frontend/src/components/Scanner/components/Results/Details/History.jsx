import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractAllData, dateFields} from '../../../utils/'; 

const formatDate = (timestamp) => {
  if (!timestamp) return 'null';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

const History = ({ jsonData }) => {
  const historyData = extractAllData(jsonData).historyData; 

  return (
    <SectionWrapper>
      <div className="rounded-lg shadow-md">
        <div className="max-h-screen overflow-auto scrollbar-hide space-y-2">
          {dateFields.map((key, index) => {
            const value = historyData[key.id];
            if (!value) return null;
            return (
              <p key={index} className="flex items-center">
                <span className="text-gray-400 font-semibold w-56">{key.label}:</span>
                <span className="text-gray-300">{formatDate(value)}</span>
              </p>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default History;
