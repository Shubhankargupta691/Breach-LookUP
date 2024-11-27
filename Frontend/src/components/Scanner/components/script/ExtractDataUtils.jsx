import React from 'react';

export function getDetectionValue(jsonData) {
  if (jsonData?.data?.attributes?.last_analysis_stats) {
    const stats = jsonData.data.attributes.last_analysis_stats;
    const totalValue = (stats.malicious || 0) + (stats.suspicious || 0);
    return totalValue;
  }
  return 0;
}

export function getDistributorsList(jsonData) {
  const stats = jsonData?.data?.attributes?.known_distributors?.distributors;
  const detected = getDetectionValue(jsonData);
  const message = `${detected > 0 
    ? `${detected} security vendors flagged this file as malicious` 
    : 'No security vendors flagged this file as malicious'}`;
  
  return stats?.map(distributor => distributor) || [message];
}

export function getTagsList(jsonData) {
  return jsonData?.data?.attributes?.tags?.map(tag => tag) || [];
}

export function getLastSubmissionTime(jsonData) {
  const timestamp = jsonData?.data?.attributes?.last_analysis_date;
  return timestamp ? new Date(timestamp * 1000).toLocaleString() : 'N/A';
}

export function getFileDetails(jsonData, fileInfo, searchInput) {
  const detectionValue = getDetectionValue(jsonData);
  const distributorsList = getDistributorsList(jsonData);
  const tagsList = getTagsList(jsonData);
  const lastAnalysisDate = getLastSubmissionTime(jsonData);

  const nameData = jsonData?.data?.attributes;
  let  hash256 = jsonData?.data?.attributes?.sha256;
  let fileName = fileInfo?.name || nameData?.names || nameData?.trusted_verdict?.filename || nameData?.known_distributors?.filenames[0] || 'no information';

    if(!hash256){
        hash256 = jsonData.data.attributes.sha256;
    }

    
    if ((!fileName || fileName === '')) {
        fileName = nameData.trusted_verdict.filename || nameData.known_distributors.filenames[0];
    }

  return {
    fileName: fileName,
    fileSize: fileInfo ? (fileInfo.size / 1024).toFixed(2) + ' KB' : (nameData?.size/1048576).toFixed(2) + ' MB' || 'no information',
    fileExt: fileInfo ? fileInfo.name.split('.').pop() : nameData?.type_extension || 'no information',
    fileHash: hash256,
    lastAnalysisDate: lastAnalysisDate,
    detected: detectionValue,
    distributors: distributorsList,
    tags: tagsList
  };
}
