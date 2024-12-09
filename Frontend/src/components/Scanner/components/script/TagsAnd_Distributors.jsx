// renderFunctions.js
import React from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";


export const renderDistributors = (details, InputType) => {
  const { distributors } = details;

  if (InputType === 'Hash') {
    if (distributors && distributors.length >= 3) {
      return `File distributed by ${distributors.slice(0, 3).join(", ")} & others`;
    }
    return distributors ? distributors.join(", ") : null;
  } else {
    return distributors ? distributors.join(", ") : null;
  }
};



export const renderTags = (details) => {
    const { tags } = details;
    if (tags && tags.length === 0) {
      return null;
    }
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags && tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-700 text-gray-200 px-2 py-1 rounded-md text-xs transition-all duration-200 hover:bg-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };


export const renderCategory = (details) => {
    return details.detected > 0 ? (
      <FaExclamationTriangle className="inline text-red-500 mr-1 text-[2vh] transition-all duration-200 transform hover:scale-110" />
    ) : (
      <FaCheckCircle className="inline text-green-600 mr-1 text-[2vh] transition-all duration-200 transform hover:scale-110" />
    );
  };