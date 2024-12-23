import React from 'react';
import { extractIP_Details, countries } from '../../utils';

export function getFlags(countries, country){
  const item = countries.find((item) => item.isoCode === country);
  return item ? <img src={item.flag} alt={item.name} /> : null;
}

export function getCountryName(countries, countryCode) {
  const item = countries.find((item) => item.isoCode === countryCode);
  return item ? item.name : null;
}



export function getDetectionValue(jsonData) {
  const { lastAnalysisStats } = extractIP_Details(jsonData);
  const maliciousCount = lastAnalysisStats?.malicious || 0;
  const suspiciousCount = lastAnalysisStats?.suspicious || 0;

  return maliciousCount + suspiciousCount;
}

export function getDistributorsList(jsonData) {
  const detected = getDetectionValue(jsonData);
  const message = `${ detected > 0 
    ? `${detected} security vendors flagged this IP as malicious` 
    : 'No security vendors flagged this file as malicious'}`;
  
  return [message];
}



export function getLastSubmissionTime(jsonData) {
  const timestamp = extractIP_Details(jsonData).lastAnalysisDate;
  return timestamp ? new Date(timestamp * 1000).toUTCString() : 'N/A';
}

export function getIPDetails(jsonData) {
  const detectionValue = getDetectionValue(jsonData);
  const lastAnalysisDate = getLastSubmissionTime(jsonData);
  const distributorsList = getDistributorsList(jsonData);
 
  
  const nameData = extractIP_Details(jsonData);
  const networkName = nameData.networkName || null;
  const networkID = nameData.networkID || null;
  const ASN   = nameData.ASN || null;
  const ASOwner = nameData.ASOwner || null;
  const countryCode = nameData.country || null;
  const continent = nameData.continent || null;
  const whois = nameData.whois || null;
  const Regional_Internet_Registry = nameData.Regional_Internet_Registry || null;
  const lastAnalysisStats = nameData.lastAnalysisStats || null;
  const Flag = getFlags(countries, countryCode);
  const Country = getCountryName(countries, countryCode);

    return {
      ASN   : ASN,
      ASOwner : ASOwner,
      Country : Country,
      countryCode : countryCode,
      continent : continent,
      flag : Flag,
      networkID: networkID,
      networkName: networkName,
      whois: whois,
      lastAnalysisDate: lastAnalysisDate,
      detectedValue: detectionValue,
      distributors: distributorsList,
      lastAnalysisStats: lastAnalysisStats,
      Regional_Internet_Registry : Regional_Internet_Registry
  };
}