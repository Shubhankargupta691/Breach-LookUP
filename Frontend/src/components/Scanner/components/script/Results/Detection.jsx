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
        <h4 className="text-lg font-semibold text-gray-200">History</h4>
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-200">History</h4>
      <br />
      <div className="space-y-2">
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
  const [showMoreNames, setShowMoreNames] = useState(false);
  const namesData = jsonData?.data?.attributes?.names || [];
  const displayedNames = showMoreNames ? namesData : namesData.slice(0, 2);

  if (namesData.length === 0) {
    return (
      <div className="mt-2">
        <h4 className="text-lg font-semibold text-gray-200">Names</h4>
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <h4 className="text-lg font-semibold text-gray-200">Names</h4>
      <br />
      <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
        {displayedNames.map((name, index) => (
          <p key={index} className="text-gray-300 mb-2">{name || 'Not Available'}</p>
        ))}
      </div>
      {namesData.length > 2 && (
        <button
          onClick={() => setShowMoreNames(!showMoreNames)}
          className="text-sm text-gray-400 mt-2 hover:text-gray-200"
        >
          {showMoreNames ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}


export function Product({ jsonData }) {
  const [showMoreNSRL, setShowMoreNSRL] = useState(false);
  const productData = jsonData?.data?.attributes?.nsrl_info?.products || [];

  if (productData.length === 0) {
    return (
      <div className="mt-2">
        <h4 className="text-lg font-semibold text-gray-200">Product</h4>
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <h4 className="text-lg font-semibold text-gray-200">Product</h4>
      <br />
      <div className={`transition-all duration-300 ease-in-out ${showMoreNSRL ? 'max-h-screen' : 'max-h-32 overflow-hidden'}`}>
        {productData.slice(0, showMoreNSRL ? productData.length : 2).map((item, index) => (
          <p key={index} className="text-gray-300 mb-2">{item}</p>
        ))}
        {productData.length > 2 && (
          <button
            onClick={() => setShowMoreNSRL(!showMoreNSRL)}
            className="text-sm text-gray-400 mt-2 hover:text-gray-200"
          >
            {showMoreNSRL ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
}


export function FileNames({ jsonData }) {
  const [showMoreNSRL, setShowMoreNSRL] = useState(false);
  const filenames = jsonData?.data?.attributes?.nsrl_info?.filenames || [];

  if (filenames.length === 0) {
    return (
      <div className="mt-2">
        <h4 className="text-lg font-semibold text-gray-200">FileNames</h4>
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <h4 className="text-lg font-semibold text-gray-200">FileNames</h4>
      <br />
      <div className={`transition-all duration-300 ease-in-out ${showMoreNSRL ? 'max-h-screen' : 'max-h-32 overflow-hidden'}`}>
        {filenames.slice(0, showMoreNSRL ? filenames.length : 2).map((item, index) => (
          <p key={index} className="text-gray-300 mb-2 text-sm">{item}</p>
        ))}
        {filenames.length > 2 && (
          <button
            onClick={() => setShowMoreNSRL(!showMoreNSRL)}
            className="text-sm text-gray-400 mt-2 hover:text-gray-200"
          >
            {showMoreNSRL ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
}


export function OldAppsInfo({ jsonData }) {
  const [showMoreOldApps, setShowMoreOldApps] = useState(false);
  const oldAppsData = jsonData?.data?.attributes?.oldapps_info || {};

  if (Object.keys(oldAppsData).length === 0) {
    return (
      <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-gray-200">Old Apps Info</h4>
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-200">Old Apps Info</h4>
      <br />
      <div className={`transition-all duration-300 ease-in-out ${showMoreOldApps ? 'max-h-screen' : 'max-h-32 overflow-hidden'}`}>
        {Object.entries(oldAppsData).slice(0, showMoreOldApps ? Object.entries(oldAppsData).length : 2).map(([key, value], index) => (
          <div key={index} className="flex flex-col md:flex-row md:justify-start mb-2">
            <span className="text-gray-300 font-semibold md:w-48">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </span>
            <span className="text-gray-300">{value || 'Not Available'}</span>
          </div>
        ))}
        {Object.keys(oldAppsData).length > 2 && (
          <button
            onClick={() => setShowMoreOldApps(!showMoreOldApps)}
            className="text-sm text-gray-400 mt-2 hover:text-gray-200"
          >
            {showMoreOldApps ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
}


export function KnownSources({ jsonData }) {
  const [showMoreSources, setShowMoreSources] = useState(false);
  const trustedVerdict = jsonData?.data?.attributes?.trusted_verdict || {};

  if (Object.keys(trustedVerdict).length === 0) {
    return (
      <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-gray-200">Known Sources</h4>
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-200">Known Sources</h4>
      <br />
      <div className={`transition-all duration-300 ease-in-out ${showMoreSources ? 'max-h-screen' : 'max-h-32 overflow-hidden'}`}>
        {Object.entries(trustedVerdict).slice(0, showMoreSources ? Object.entries(trustedVerdict).length : 2).map(([key, value], index) => (
          <div key={index} className="flex flex-col md:flex-row md:justify-start mb-2">
            <span className="text-gray-300 font-semibold md:w-48">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </span>
            <span className="text-gray-300">{value || 'Not Available'}</span>
          </div>
        ))}
        {Object.keys(trustedVerdict).length > 2 && (
          <button
            onClick={() => setShowMoreSources(!showMoreSources)}
            className="text-sm text-gray-400 mt-2 hover:text-gray-200"
          >
            {showMoreSources ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
}

export function BasicInfo({ jsonData }) {
  const [showMore, setShowMore] = useState(false);

  const attributes = jsonData?.data?.attributes || {};

  if (!Object.keys(attributes).length) {
    return (
      <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-gray-200">Basic Info</h4>
        <p className="text-gray-300">No Information Available</p>
      </div>
    );
  }

  return (
    <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-200">Basic Info</h4>
      <br />
      <div className={`transition-all duration-300 ease-in-out ${showMore ? 'max-h-screen' : 'max-h-32 overflow-hidden'}`}>
        {keyData.slice(0, showMore ? keyData.length : 3).map((key, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="text-gray-400 font-semibold w-32">
              {key.label}:
            </span>
            <span className="text-gray-300">
              {attributes[key.id] || 'Not Available'}
            </span>
          </div>
        ))}
      </div>
      {keyData.length > 3 && (
        <button onClick={() => setShowMore(!showMore)} className="text-sm text-gray-400 mt-2 hover:text-gray-200">
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}
