export const extractIP_Details = (jsonData || searchInput) => {
    const data = jsonData?.data?.attributes || {};
    const netorkID = jsonData?.data?.id || searchInput || '';
    const network = data?.network || {};
    const country = data?.country || '';
    const continent = data?.continent || '';
    const ASN = data?.asn || '';
    const ASOwner = data?.as_owner || '';

    return {network, country, continent, ASN, ASOwner, netorkID};
};
