import React from "react";
import "../../../App.css";
import PropTypes from "prop-types";
import { svgPaths } from "../utils";
import { renderTags, renderDistributors, renderCategory, DetailRenderer, useFetchDetails, OtherDetailsRenderer } from "./script";

const FileInfoCard = ({ fileInfo, jsonData, InputType }) => {

  const details = useFetchDetails(InputType, jsonData, fileInfo);
  
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 card 
                    transition-all duration-300 ease-in-out hover:shadow-2xl
                    w-auto xs:w-[20rem] sm:w-[40rem] md:w-full lg:w-full">
      {/* Distributors Section */}
      <div className="card-header flex flex-wrap justify-between gap-2">

        <div className={`flex font-bold ${details.detected > 0 ? "text-red-500" : "text-gray-300"}`}>
          <i className="text-4xl place-items-center mr-1 flex transition-all duration-200 align-middle">
            {renderCategory(details)}
          </i>
          <div className="font-bold flex items-center">
            <p className="truncate transition-all duration-200">{renderDistributors(details, InputType)}</p>
          </div>
        </div>
        
        {/* Reanalyse Section */}
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
      <div className="border-y border-gray-700 "></div>

      {/* Details Section */}
      <div className="card-body flex transition-all duration-300 ease-in-out">
        <div className="vstack gap-2 my-auto min-w-0">
          <div className="hstack gap-4">
            <div className="vstack gap-2 align-self-center">
              {/* Render dynamic details based on ID */}
                <DetailRenderer details={details} InputType={InputType} />
            </div>
            <div className="border-l border-gray-300 my-3"></div>
                <OtherDetailsRenderer details={details} InputType={InputType} />
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="hastack flex gap-1 flex-wrap p-1">
        <div className="flex justify-start items-center mb-1">
          <div className="font-bold text-lg p-2">{renderTags(details)}</div>
        </div>
      </div>
    </div>
  );
};

FileInfoCard.propTypes = {
  fileInfo: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    lastModified: PropTypes.number,
  }),
  jsonData: PropTypes.object,
  InputType: PropTypes.string.isRequired,
};

export default FileInfoCard;
