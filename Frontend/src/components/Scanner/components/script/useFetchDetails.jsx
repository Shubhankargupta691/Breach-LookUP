import { useState, useEffect } from "react";
import { NameAndID, OtherDetails } from "../../utils";

const useFetchDetails = (InputType, jsonData, fileData) => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    let fileInfoToPass = null;
    if (InputType === "File" || InputType === "Hash") {
      fileInfoToPass = fileData;
    }

    let updatedDetails = {};

    if (NameAndID[InputType] && typeof NameAndID[InputType].getDetails === "function") {
      updatedDetails = NameAndID[InputType].getDetails(jsonData, fileInfoToPass);
    }

    if (OtherDetails[InputType] && typeof OtherDetails[InputType].getDetails === "function") {
      updatedDetails = OtherDetails[InputType].getDetails(jsonData, fileInfoToPass);
    }

    setDetails(updatedDetails);
  }, [fileData, jsonData, InputType]);

  return details;
};

export default useFetchDetails;
