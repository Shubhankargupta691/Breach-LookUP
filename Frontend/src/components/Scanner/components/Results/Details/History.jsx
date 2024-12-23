import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractAllData, dateFields} from '../../../utils/'; 

const formatDate = (timestamp) => {
  if (!timestamp) return 'null';
  const date = new Date(timestamp * 1000);
  const utcDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });
  const utcTime = date.toLocaleTimeString('en-GB', { timeZone: 'UTC' });

  return `${utcDate} ${utcTime}`;
};

const History = ({ jsonData }) => {
  const {attributes} = extractAllData(jsonData);

  return (
    <SectionWrapper>
      <div className="rounded-lg shadow-md">
      <div className='flex mb-3 font-bold text-white bg-slate-600 h-full pl-1 text-sm sm:text-base shadow-md'>
          <h2 className='my-1/2'>History</h2>
        </div>
        <div className="max-h-screen overflow-auto scrollbar-hide space-y-2">
          {dateFields.map((key, index) => {
            const value = attributes[key.id];
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
