import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractAllData } from '../../../utils/';

const Names = ({ jsonData }) => {
  const namesData = extractAllData(jsonData).names;

  if (namesData.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      <div className='flex  font-bold text-white bg-slate-600 h-full pl-1 text-sm sm:text-base shadow-md'>
                <h2 className='my-1'>Names</h2>
            </div>
        <div className="my-2">
         <div className="max-h-80 overflow-auto scrollbar-hide">
           {namesData.map((name, index) => (
             <p key={index} className="text-gray-300 mb-2 break-words">{name}</p>
           ))}
         </div>
       </div>
    </SectionWrapper>
  );
};

export default Names;
