import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractFileNames } from '../../../utils/';

const FileNames = ({ jsonData }) => {
  const filenames = extractFileNames(jsonData);

  if (filenames.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      {filenames.map((item, index) => (
        <p key={index} className="text-gray-200">{item}</p>
      ))}
    </SectionWrapper>
  );
};

const ExportComponent = FileNames.length > 0 ? FileNames : null;

export default ExportComponent;