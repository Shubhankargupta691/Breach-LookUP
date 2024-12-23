import React from "react";
import '../../../../App.css';
import PropTypes from "prop-types";
import { NameAndID } from '../../utils';

const renderIPDetails = (details, Value) => {
  return (
    <div className="vstack justify-center items-center my-auto gap-3 h-[5rem] lg:w-[43rem] truncate transition-all duration-300 ease-in-out">
      <div className="hstack gap-2">
        {Value.slice(0, 2).map((key, index) => {
          const detailValue = details[key.id];
          return detailValue ? (
            <React.Fragment key={index}>
              {key.id === 'networkID' ? (
                <span className="truncate transition-all duration-300 ease-in-out">{detailValue}</span>
              ) : key.id === 'networkName' ? (
                <span className="truncate transition-all duration-300 ease-in-out">
                  {"("}<a>{detailValue}</a>{")"}
                </span>
              ) : (
                <span className="transition-all duration-300 ease-in-out">{detailValue}</span>
              )}
            </React.Fragment>
          ) : null;
        })}
      </div>

      <div className="hstack gap-2">
        {Value.slice(2).map((key, index) => {
          const detailValue = details[key.id];
          return detailValue ? (
            <React.Fragment key={index}>
              {key.id === 'continent' ? (
                <span className="truncate transition-all duration-300 ease-in-out">{detailValue}</span>
              ) : key.id === 'ASN' ? (
                <a className="truncate transition-all duration-300 ease-in-out">{detailValue}</a>
              ) : (
                <span className="truncate transition-all duration-300 ease-in-out">
                  {"("}<a>{detailValue}</a>{")"}
                </span>
              )}
            </React.Fragment>
          ) : null;
        })}
      </div>
    </div>
  );
};

const DetailRenderer = ({ details = {}, InputType = '' }) => {
  const Value = NameAndID[InputType]?.data;

  if (InputType === 'IP') {
    return <>{renderIPDetails(details, Value)}</>;
  }

  return (
    <>
      {Value?.map((key, index) => {
        const detailValue = details[key.id];
        if (detailValue && InputType === 'Hash') {
          return (
            <React.Fragment key={index}>
              <div className="hstack gap-2 truncate transition-all duration-300 ease-in-out" id={key.label}>
                {key.id === 'fileHash' ? (
                  detailValue
                ) : (
                  <a href="#" className="truncate transition-all duration-300 ease-in-out text-gray-200">
                    {detailValue}
                  </a>
                )}
              </div>
            </React.Fragment>
          );
        }
        return null;
      })}
    </>
  );
};

DetailRenderer.propTypes = {
  details: PropTypes.object,
  InputType: PropTypes.string,
};

export default DetailRenderer;
