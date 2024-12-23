// Shared/SectionWrapper.js
import React from 'react';

const SectionWrapper = ({ children }) => {
  return (
    <div className="mt-2"> 
      <div className="max-h-screen overflow-auto">{children}</div> 
    </div>
  );
};

export default SectionWrapper;
