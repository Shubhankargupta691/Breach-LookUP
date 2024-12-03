import React from 'react';
import {extractLastAnalysisStats, extractDistributors, extractTags, extractBasicInfo, extractTimeStamps } from '../../utils';


// Rename this File to FileCardDataExtractor

export function getDetectionValue(jsonData) {
  const stats = extractLastAnalysisStats(jsonData);
  if (stats) {
    const totalValue = (stats.malicious || 0) + (stats.suspicious || 0);
    return totalValue;
  }
  return 0;
}

export function getDistributorsList(jsonData) {
  const stats = extractDistributors(jsonData);
  const detected = getDetectionValue(jsonData);
  const message = `${detected > 0 
    ? `${detected} security vendors flagged this file as malicious` 
    : 'No security vendors flagged this file as malicious'}`;
  
  return stats?.map(distributor => distributor) || [message];
}

export function getTagsList(jsonData) {
  const tags = extractTags(jsonData);
  return tags.map(tag => tag) || [];
}

export function getLastSubmissionTime(jsonData) {
  const timestamp = extractTimeStamps(jsonData);
  return timestamp ? new Date(timestamp * 1000).toLocaleString() : 'N/A';
}

export function getFileDetails(jsonData, fileInfo) {
  const detectionValue = getDetectionValue(jsonData);
  const distributorsList = getDistributorsList(jsonData);
  const tagsList = getTagsList(jsonData);
  const lastAnalysisDate = getLastSubmissionTime(jsonData);
  
  const nameData = extractBasicInfo(jsonData);
  let  hash256 = nameData.sha256;
  let fileName = fileInfo?.name || nameData?.names[0] || nameData?.trusted_verdict?.filename || nameData?.known_distributors?.filenames[0] || 'no information';

    if(!hash256){
       return null;
    }
    if ((!fileName || fileName === '')) {
       return null;
    }

  return {
    fileName: fileName,
    fileSize: fileInfo ? (fileInfo.size / 1024).toFixed(2) + ' KB' : (nameData?.size/1048576).toFixed(2) + 'MB' || 'no information',
    fileExt: fileInfo ? fileInfo.name.split('.').pop() : nameData?.type_extension || 'no information',
    fileHash: hash256,
    lastAnalysisDate: lastAnalysisDate,
    detected: detectionValue,
    distributors: distributorsList,
    tags: tagsList
  };
}
