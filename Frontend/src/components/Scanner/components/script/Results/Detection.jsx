import React, { useState } from 'react';
import { keyData } from '../../../utils/fileUtils';



const formatDate = (timestamp) => {
  if (!timestamp) return 'null';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};


export function History({ jsonData }) {
  const dateFields = [
    { label: 'First Submission Date', value: jsonData?.data?.attributes?.first_submission_date },
    { label: 'Last Submission Date', value: jsonData?.data?.attributes?.last_submission_date },
    { label: 'Creation Date', value: jsonData?.data?.attributes?.creation_date },
    { label: 'Last Modification Date', value: jsonData?.data?.attributes?.last_modification_date },
  ];

  if (!dateFields.some(field => field.value)) {
    return (
      <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">

      <div className="max-h-screen overflow-auto scrollbar-hide space-y-2">
        {dateFields.map((field, index) => (
          field.value ? (
            <p key={index} className="flex items-center">
              <span className="text-gray-400 font-semibold w-56">{field.label}:</span>
              <span className="text-gray-300">{formatDate(field.value)}</span>
            </p>
          ) : null
        ))}
      </div>
    </div>
  );
}


export function Names({ jsonData }) {
  const namesData = jsonData?.data?.attributes?.names || [];

  if (namesData.length === 0) {
    return (
      <div className="mt-2">
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="max-h-80 overflow-auto scrollbar-hide">
        {namesData.map((name, index) => (
          <p key={index} className="text-gray-300 mb-2 break-words">{name || 'Not Available'}</p>
        ))}
      </div>
    </div>
  );
}



export function Product({ jsonData }) {
  const productData = jsonData?.data?.attributes?.nsrl_info?.products || [];

  if (productData.length === 0) {
    return (
      <div className="mt-2">
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="max-h-screen overflow-auto scrollbar-hide">
        {productData.map((item, index) => (
          <p key={index} className="text-gray-300 mb-2 break-words">{item}</p>
        ))}
      </div>
    </div>
  );
}


export function FileNames({ jsonData }) {
  const filenames = jsonData?.data?.attributes?.nsrl_info?.filenames || [];

  if (filenames.length === 0) {
    return (
      <div className="mt-2">
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="max-h-screen overflow-auto scrollbar-hide">
        {filenames.map((item, index) => (
          <p key={index} className="text-gray-300 mb-2 text-sm break-words">{item}</p>
        ))}
      </div>
    </div>
  );
}


export function OldAppsInfo({ jsonData }) {
  const oldAppsData = jsonData?.data?.attributes?.oldapps_info || {};

  if (Object.keys(oldAppsData).length === 0) {
    return (
      <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
      <div className="max-h-screen overflow-auto scrollbar-hide">
        {Object.entries(oldAppsData).map(([key, value], index) => (
          <div key={index} className="flex flex-col md:flex-row md:justify-start mb-2">
            <span className="text-gray-300 font-semibold md:w-48">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </span>
            <span className="text-gray-300 break-words">{value || 'Not Available'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


export function KnownSources({ jsonData }) {
  const trustedVerdict = jsonData?.data?.attributes?.trusted_verdict || {};

  if (Object.keys(trustedVerdict).length === 0) {
    return (
      <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
      <div className="max-h-screen overflow-auto scrollbar-hide">
        {Object.entries(trustedVerdict).map(([key, value], index) => (
          <div key={index} className="flex flex-col md:flex-row md:justify-start mb-2">
            <span className="text-gray-300 font-semibold md:w-48">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </span>
            <span className="text-gray-300 break-words">{value || 'Not Available'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BasicInfo({ jsonData }) {
  const attributes = jsonData?.data?.attributes || {};

  const renderMultiValues = (attributeId) => {
    const maxItemsToShow = 2; 
  
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
    return (
      <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
      <div className="max-h-screen overflow-auto scrollbar-hide">
        {keyData
          .map((key, index) => {
            const value = key.id === 'trid' || key.id === 'detectiteasy' || key.id === 'type_tags'
              ? renderMultiValues(key.id)
              : attributes[key.id];

        
            if (!value) return null;

            return (
              <div key={index} className="flex items-center mb-2">
                <span className="text-gray-400 font-semibold w-32">
                  {key.label}:
                </span>
                <span className="text-gray-300 break-words">{value}</span>
              </div>
            );
          })
          .filter(Boolean)}
      </div>
    </div>
  );
}
