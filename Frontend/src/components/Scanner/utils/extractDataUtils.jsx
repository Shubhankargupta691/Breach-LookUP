// Desc: This file contains the utility functions to extract the data from the JSON response of the API.

export const extractBasicInfo = (jsonData) => {
    return jsonData?.data?.attributes || {};
};

export const extractHistoryData = (jsonData) => {
    return jsonData?.data?.attributes || {};
};
  
export const extractNames = (jsonData) => {
    return jsonData?.data?.attributes?.names || [];
};

export const extractKnownSources = (jsonData) => {
    return jsonData?.data?.attributes?.trusted_verdict || {};
};

export const extractOldAppsInfo = (jsonData) => {
    return  jsonData?.data?.attributes?.oldapps_info || {};
};

export const extractProduct = (jsonData) => {
    return  jsonData?.data?.attributes?.nsrl_info?.products || [];
};


export const extractFileNames = (jsonData) => {
    return jsonData?.data?.attributes?.nsrl_info?.filenames || [];
};

export const extractAnalysis = (jsonData) => {
    return jsonData.data.attributes.last_analysis_results;
};

// Extracts the last analysis stats from the JSON data for FileCardData component
export const extractLastAnalysisStats = (jsonData) => {
    const analysis = jsonData.data.attributes.last_analysis_stats || {};
    return analysis;
};

export const extractTimeStamps = (jsonData) => {
    return jsonData?.data?.attributes?.last_analysis_date || {};
};

// Extracts the Distributors from the JSON data for FileCardData component
export const extractDistributors = (jsonData) => {
    return jsonData?.data?.attributes?.known_distributors?.distributors || null;
};

export const extractTags = (jsonData) => {
    return jsonData?.data?.attributes?.tags || [];
};

// export const extractIP_Details = (jsonData || searchInput) => {
//     const data = jsonData?.data?.attributes || {};
//     const netorkID = jsonData?.data?.id || searchInput || '';
//     const network = data?.network || {};
//     const country = data?.country || '';
//     const continent = data?.continent || '';
//     const ASN = data?.asn || '';
//     const ASOwner = data?.as_owner || '';

//     return {network, country, continent, ASN, ASOwner, netorkID};
// };
