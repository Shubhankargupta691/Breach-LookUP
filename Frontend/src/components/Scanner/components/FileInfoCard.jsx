import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fileInfoData as baseFileInfoData } from "../utils/fileUtils";
import { getFileDetails } from "./script/ExtractDataUtils";

const FileInfoCard = ({ fileInfo, jsonData, searchInput }) => {
  const [fileDetails, setFileDetails] = useState({
    fileName: "",
    fileSize: "",
    fileExt: "",
    fileHash: "",
    lastAnalysisDate: "",
    detected: "",
    distributors: [],
    tags: [],
  });

  const handleFileChange = async (fileInfo, jsonData, searchInput) => {
    if (fileInfo) {
      const details = getFileDetails(jsonData, fileInfo);
      setFileDetails({ ...details });
    } else if (searchInput) {
      const details = getFileDetails(jsonData, null, searchInput);
      setFileDetails({ ...details });
    }
  };

  useEffect(() => {
    if (fileInfo || searchInput) {
      handleFileChange(fileInfo, jsonData, searchInput);
    }
  }, [fileInfo, jsonData, searchInput]);

  const renderDistributors = () => {
    const { distributors } = fileDetails;
    if (distributors.length > 3) {
      return `${distributors.slice(0, 3).join(", ")} & others`;
    }
    return distributors.join(", ") || "None";
  };

  const renderTags = () => {
    const { tags } = fileDetails;
    if (tags.length === 0) {
      return <p className="text-sm text-gray-400">No tags available</p>;
    }

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-700 text-gray-200 px-2 py-1 rounded-md text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  const updatedFileInfoData = baseFileInfoData.map((item) => ({
    ...item,
    value: fileDetails[item.id] !== undefined ? fileDetails[item.id] : item.value,
  }));

  return (
    <section>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-5xl mx-auto mt-4 h-auto text-white flex flex-col">
        <div className="flex justify-start items-center mb-4">
          <p className="font-bold text-lg pr-4">Distributors:</p>
          <p className="font-bold">{renderDistributors()}</p>
        </div>

        <hr className="hidden md:block text-gray-600 mt-1" />

        <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-8">
          {updatedFileInfoData.map((item, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-1 lg:gap-2 items-start">
              <p className="text-sm flex">
                <span className="font-bold text-gray-400">{item.label}:</span>
                <span id={item.id} className="text-gray-200 pl-2 ">
                  {item.value}
                </span>
              </p>
            </div>
          ))}
        </div>
        <hr className="hidden md:block text-gray-600 mt-4" />

        <div className="flex justify-start items-center mb-4">
          <div className="font-bold text-lg">{renderTags()}</div>
        </div>
      </div>
    </section>
  );
};

FileInfoCard.propTypes = {
  fileInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string,
    lastModified: PropTypes.number,
    detected: PropTypes.number,
  }),
  jsonData: PropTypes.object,
  searchInput: PropTypes.string,
};

export default FileInfoCard;
