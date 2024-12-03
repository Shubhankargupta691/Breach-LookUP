import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractNames } from '../../../utils/';

const Names = ({ jsonData }) => {
  const namesData = extractNames(jsonData);

  if (namesData.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
        <div className="mb-1">
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
