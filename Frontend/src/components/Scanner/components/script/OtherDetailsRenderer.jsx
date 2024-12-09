import React from "react";
import PropTypes from "prop-types";
import { OtherDetails } from '../../utils'; 

const OtherDetailsRenderer = ({ details = {}, InputType = '' }) => {
    const Value = OtherDetails[InputType]?.data;

    return (
        <>
            {Value?.map((key, index) => {
                const detailValue = details[key.id];
                if (detailValue) {
                    return (
                        <React.Fragment key={index}>
                            <div className="truncate transition-all duration-200">
                                <div className="text-sm truncate transition-all duration-200 font-semibold text-gray-500">{key.label}</div>
                                    <div className="truncate transition-all duration-200 mt-1" id={key.label}>
                                        {key.id === 'fileHash' ? detailValue : 
                                            <a href="#" className="truncate transition-all duration-200 text-gray-200" id={key.label}>
                                                {detailValue} 
                                            </a>
                                        }
                                    </div>
                            </div>
                            {index < Value.length - 1 && <div className="border-l border-gray-300 my-3"></div>}
                        </React.Fragment>
                    );
                }
                return null;
            })}
        </>
    );
};

OtherDetailsRenderer.propTypes = {
    details: PropTypes.object,
    InputType: PropTypes.string,
};

export default OtherDetailsRenderer;
