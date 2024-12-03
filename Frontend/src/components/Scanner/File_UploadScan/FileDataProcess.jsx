import React, { useState, useEffect } from "react";
import {fileDetailsInfo, svgPaths } from '../utils';
import { getFileDetails } from "./script";


const FileDataProcess = ({ fileInfo, jsonData }) => {
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
  return (
    <div>FileDataProcess</div>
  )
}

export default FileDataProcess;