import React, { useState, useEffect } from "react";
import "../../../App.css";
import PropTypes from "prop-types";
import { getFileDetails } from "./script/ExtractFileData";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

import {fileDetailsInfo, svgPaths } from "../utils";

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
      return null;
    }
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
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

  const renderCategory = () => {
    return fileDetails.detected >= 0 ? (
      <FaExclamationTriangle className="inline text-red-500 mr-1 text-[2vh] transition-all duration-200 transform hover:scale-110" />
    ) : (
      <FaCheckCircle className="inline text-green-500 mr-1 text-[2vh] transition-all duration-200 transform hover:scale-110" />
    );
  };

  return (
    <div className="card transition-all duration-300 ease-in-out hover:shadow-2xl">
      <div className="card-header flex flex-wrap justify-between gap-2">
        <div className={`flex gap-2 font-bold ${fileDetails.detected >= 0 ? "text-red-500" : "text-gray-600"}`}>
          <i className="text-4xl flex transition-all duration-200">{renderCategory()}</i>
          <div className="font-bold flex items-center">
            <p className="truncate transition-all duration-200">{renderDistributors()}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 fw-semibold">
          {svgPaths.map((svg) => (
            <a key={svg.id} id={svg.id} role="button" className="flex items-center gap-1 cursor-pointer">
              <i className="text-lg">
                <svg
                  xmlns={svg.xmlns}
                  width={svg.width}
                  height={svg.height}
                  viewBox={svg.viewBox}
                  fill={svg.fill}
                >
                  <g>
                    {svg.path.map((path, index) => (
                      <path key={index} d={path} />
                    ))}
                  </g>
                </svg>
              </i>
              Reanalyze
            </a>
          ))}
        </div>
      </div>

      <div className="card-body flex transition-all duration-300 ease-in-out">
        <div className="flex flex-col gap-2 my-auto min-w-0">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 align-self-center">
              <div className="file-id truncate transition-all duration-200" title={fileDetails.fileHash}>
                {fileDetails.fileHash}
              </div>
              <div className="file-name truncate transition-all duration-200" title={fileDetails.fileName}>
                <a href="">{fileDetails.fileName}</a>
              </div>
            </div>
            <div className="border-l border-gray-300 my-3"></div>
            {fileDetailsInfo(fileDetails).map((detail, index) => (
              <React.Fragment key={index}>
                <div>
                  <div className="text-gray-500">{detail.label}</div>
                  <a href="" className="text-nowrap truncate transition-all duration-200" title={detail.title}>
                    {detail.value}
                  </a>
                </div>
                {index < fileDetailsInfo(fileDetails).length - 1 && <div className="border-l border-gray-300 my-3"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap p-1">
        <div className="flex justify-start items-center mb-1">
          <div className="font-bold text-lg p-2">{renderTags()}</div>
        </div>
      </div>
    </div>
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
