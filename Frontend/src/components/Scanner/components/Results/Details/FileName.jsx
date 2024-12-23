import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractAllData } from '../../../utils/';

const FileNames = ({ jsonData }) => {
  const filenames = extractAllData(jsonData).fileNames;

  if (filenames.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      <div className='flex  font-bold text-white bg-slate-600 h-full pl-1 text-sm sm:text-base shadow-md'>
                <h2 className='my-1'>File Names</h2>
            </div>
      {filenames.map((item, index) => (
        <p key={index} className="text-gray-200">{item}</p>
      ))}
    </SectionWrapper>
  );
};

export default FileNames;
