// Desc: This file contains the utility functions to extract the data from the JSON response of the API.

export const extractAllData = (jsonData) => {
    const attribute = jsonData?.data?.attributes || {};

    return {
        basicInfo: attribute,
        sha256: attribute.sha256 || '',
        historyData: attribute || {},
        names: attribute.names || [],
        size: attribute.size || 0.0,
        extension: attribute.type_extension || '',
        knownSources: attribute.trusted_verdict || {},
        oldAppsInfo: attribute.oldapps_info || {},
        nsrlInfo: attribute.nsrl_info || {},
        product: attribute.nsrl_info?.products || [],
        fileNames: attribute.nsrl_info?.filenames || [],
        lastAnalysisResults: attribute.last_analysis_results || {},
        lastAnalysisStats: attribute.last_analysis_stats || {},
        lastAnalysisDate: attribute.last_analysis_date || {},
        distributors: attribute.known_distributors?.distributors || [],
        tags: attribute.tags || [],
    };
};


export const extractIP_Details = (jsonData) => {
    const attribute = jsonData?.data?.attributes || {};
    const networkIP = jsonData?.data?.id || '';

    return {
        networkID : networkIP,
        networkName : attribute?.network || {},
        ASN : attribute?.asn || '',
        ASOwner : attribute?.as_owner || '',
        continent : attribute?.continent || '',
        country : attribute?.country || '',
        lastAnalysisDate : attribute?.last_analysis_date || '',
        lastAnalysisStats: attribute.last_analysis_stats || {},
        lastAnalysisResults: attribute.last_analysis_results || {},
        whois: attribute.whois || '',
        Regional_Internet_Registry : attribute.regional_internet_registry || '',
    };
};
