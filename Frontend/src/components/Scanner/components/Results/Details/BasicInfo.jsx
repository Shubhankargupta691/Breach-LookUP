import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractBasicInfo, keyData } from '../../../utils/';

const BasicInfo = ({ jsonData }) => {
  const attributes = extractBasicInfo(jsonData);

  const renderMultiValues = (attributeId) => {
    const maxItemsToShow = 5;

    if (attributes[attributeId]) {
      if (attributeId === 'trid' && Array.isArray(attributes[attributeId])) {
        const values = attributes[attributeId].map(
          item => `${item.file_type} | ${item.probability}%`
        );
        return values.length > maxItemsToShow
          ? `${values.slice(0, maxItemsToShow).join(' | ')} | ...`
          : values.join(' | ');
      }

      if (attributeId === 'detectiteasy') {
        const detectItEasy = attributes[attributeId];
        const fileType = detectItEasy.filetype || '';
        const values = detectItEasy.values?.map(item =>
          `${item.info || ''} | ${item.version || ''} | ${item.type || ''} | ${item.name || ''}`
        );

        const truncatedValues =
          values && values.length > maxItemsToShow
            ? `${values.slice(0, maxItemsToShow).join(' | ')} | ...`
            : values?.join(' | ');

        return fileType && truncatedValues
          ? `${fileType} | ${truncatedValues}`
          : fileType || truncatedValues || null;
      }

      if (attributeId === 'type_tags' && Array.isArray(attributes[attributeId])) {
        const tags = attributes[attributeId];
        return tags.length > maxItemsToShow
          ? `${tags.slice(0, maxItemsToShow).join(', ')}, ...`
          : tags.join(', ');
      }
    }

    return null;
  };


  if (!Object.keys(attributes).length) {
    return null;
  }

  return (
    <SectionWrapper>
      <div className="max-h-screen overflow-auto">
        {keyData
          .map((key, index) => {
            const value =
              key.id === 'trid' || key.id === 'detectiteasy' || key.id === 'type_tags'
                ? renderMultiValues(key.id)
                : attributes[key.id];


            if (!value) return null;

            return (
              <div key={index} className="flex items-start mb-2">
                <span className="text-gray-400 font-semibold flex-shrink-0 w-40">{key.label}:</span>
                <span className="text-gray-300 break-words flex-grow ml-10">{value}</span>
              </div>

            );
          })
          .filter(Boolean)}
      </div>
    </SectionWrapper>
  );
}

export default BasicInfo;
