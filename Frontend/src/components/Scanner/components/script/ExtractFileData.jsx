import React from 'react';
import {extractAllData } from '../../utils';


export function getDetectionValue(jsonData) {
  const { lastAnalysisStats } = extractAllData(jsonData);
  const maliciousCount = lastAnalysisStats?.malicious || 0;
  const suspiciousCount = lastAnalysisStats?.suspicious || 0;

  return maliciousCount + suspiciousCount;
}

export function getDistributorsList(jsonData) {
  const {distributors} = extractAllData(jsonData);
  const detected = getDetectionValue(jsonData);
  const message = `${ detected > 0 
    ? `${detected} security vendors flagged this file as malicious` 
    : 'No security vendors flagged this file as malicious'}`;

    if(!distributors || distributors.length === 0) {
      return [message];
    }

  return distributors;
}

export function getTagsList(jsonData) {
  const tags = extractAllData(jsonData).tags;
  return tags.map(tag => tag) || [];
}

export function getLastSubmissionTime(jsonData) {
  const timestamp = extractAllData(jsonData).lastAnalysisDate;
  return timestamp ? new Date(timestamp * 1000).toUTCString() : 'N/A';
}

export function getFileDetails(jsonData, fileInfo) {
  const detectionValue = getDetectionValue(jsonData);
  const distributorsList = getDistributorsList(jsonData);
  const tagsList = getTagsList(jsonData);
  const lastAnalysisDate =   getLastSubmissionTime(jsonData);
  const uploadDate = fileInfo ? fileInfo?.lastModified : null;
  const {nsrlInfo} =  extractAllData(jsonData);
  
  const nameData = extractAllData(jsonData);
  let  hash256 = nameData.sha256;
  
    const fileName = fileInfo?.name || nameData.knownSources.filename || nameData.names[0] || nameData.distributors.filenames[0] ||   'no information';
    
    if (!hash256 || !fileName || fileName === '' || nsrlInfo === null || nsrlInfo === '') {
      return null;
    }
  
  return {
    fileName: fileName,
    fileSize: fileInfo ? (fileInfo?.size / 1024).toFixed(2) + ' KB' : (nameData.size/1048576).toFixed(2) + 'MB' || 'no information',
    fileExt: fileInfo ? fileInfo?.name.split('.').pop() : nameData.extension || null,
    fileHash: hash256,
    nsrlInfo : nsrlInfo,
    lastAnalysisDate: uploadDate || lastAnalysisDate,
    detected: detectionValue,
    distributors: distributorsList,
    tags: tagsList

  };
}

