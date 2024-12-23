
export const extractAllData = (jsonData) => {
    const attribute = jsonData?.data?.attributes || {};

    function historyData(attribute) {
        return {
            creation_date: attribute?.creation_date || '',
            first_seen_itw_date: attribute?.first_seen_itw_date || '',
            first_submission_date: attribute?.first_submission_date || '',
            last_modification_date: attribute?.last_modification_date || '',
            last_submission_date: attribute?.last_submission_date || '',
            last_analysis_date: attribute?.last_analysis_date || ''
        };
    }

    function PEI(attribute) {
        const pei = attribute.pe_info || null;
        const { import_list = [], sections = {} } = pei;

        const header = {
            'Target Machine': pei?.machine_type || '',
            'Compilation Timestamp': pei?.timestamp || '',
            'Entry Point': pei?.entry_point || '',
            'Imphash': pei?.imphash || '',
        };

        const importsRow = import_list.map(item => ({
            'Library Name': item.library_name || '', 
            'Function Name': item.imported_functions || '', 
        }));

        const sectionHeaders = [
            'Name',
            'Virtual Address',
            'Virtual Size',
            'Raw Size',
            'Entropy',
            'MD5',
            'Chi2'
        ];

        const sectionRows = Object.keys(sections).map(key => {
            const section = sections[key];
            return {
                'Name': section?.name || '',
                'Virtual Address': section?.virtual_address || '',
                'Virtual Size': section?.virtual_size || '',
                'Raw Size': section?.raw_size || '',
                'Entropy': section?.entropy || '',
                'MD5': section?.md5 || '',
                'Chi2': section?.chi2 || '',
            };
        });

        return {
            'Header': header,
            'Sections': {
                'Header': sectionHeaders,
                'Rows': sectionRows,
            },
            'Imports': importsRow,
        };
    };

    function AndroGuard(attribute) {
        const androguard = attribute.androguard || {};
        const { certificate = {}, permission_details = {}, intent_filters = {}} = androguard;
      
        return {
          'Summary': {
            'Android Type': androguard?.AndroidApplicationInfo || '',
            'Package Name': androguard?.Package || '',
            'Main Activity': androguard?.main_activity || '',
            'Internal Code': androguard?.AndroidVersionCode || '',
            'Displayed Version': androguard?.AndroidVersionName || '',
            'Minimum SDK Version': androguard?.MinSdkVersion || '',
            'Target SDK Version': androguard?.TargetSdkVersion || '',
          },
          'Certificate Attributes': {
            'Valid From': certificate?.validfrom || '',
            'Valid To': certificate?.validto || '',
            'Serial Number': certificate?.serialnumber || '',
            'Thumbprint': certificate?.thumbprint || '',
          },
          'Certificate Subject': {
            'Distinguished Name': certificate?.Subject?.DN || '',
            'Common Name': certificate?.Subject?.CN || '',
            'Organization': certificate?.Subject?.O || '',
            'Organizational Unit': certificate?.Subject?.OU || '',
            'Country Code': certificate?.Subject?.C || '',
            'State': certificate?.Subject?.ST || '',
            'Locality': certificate?.Subject?.L || '',
          },
          'Certificate Issuer': {
            'Distinguished Name': certificate?.Subject?.DN || '',
            'Common Name': certificate?.Subject?.CN || '',
            'Organization': certificate?.Subject?.O || '',
            'Organizational Unit': certificate?.Subject?.OU || '',
            'Country Code': certificate?.Subject?.C || '',
            'State': certificate?.Subject?.ST || '',
            'Locality': certificate?.Subject?.L || '',
          },
          'Permissions': permission_details || {},
          'Activities': androguard?.Activities || {},
          'Services': androguard?.Services || {},
          'Receivers': androguard?.Receivers || {},
          'Providers': androguard?.Providers || {},
          'Intent Filters By Action': intent_filters?.Services || intent_filters?.Activities || {},
          'Intent Filters By Category': intent_filters?.category || intent_filters?.Services || intent_filters?.Activities || {},
          'Interesting Strings': androguard?.StringsInformation || {},
        };
    };

    return {
        attributes : attribute || {},
        basicInfo: basicInfo(attribute) || {},
        sha256: attribute.sha256 || '',
        historyData: historyData(attribute) || {},
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
        androguard : attribute.androguard ? AndroGuard(attribute) :  null,
        bundle_info : attribute.bundle_info ? bundle(attribute) : null,
        pei: attribute.pe_info ? PEI(attribute) : null,
    };
};

export const extractIP_Details = (jsonData) => {
    const attribute = jsonData?.data?.attributes || {};
    const networkIP = jsonData?.data?.id || '';
    const lhcData = getLHCData(attribute.last_https_certificate) || {};

    return {
        networkID : networkIP,
        networkName : attribute?.network || {},
        ASN : attribute?.asn || {},
        ASOwner : attribute?.as_owner || {},
        continent : attribute?.continent || {},
        country : attribute?.country || {},
        lastAnalysisDate : attribute?.last_analysis_date || {},
        lastAnalysisStats: attribute.last_analysis_stats || {},
        lastAnalysisResults: attribute.last_analysis_results || {},
        whois: attribute.whois || {},
        LHCData: attribute.last_https_certificate?  lhcData : null,
        Regional_Internet_Registry : attribute.regional_internet_registry || {},
    };
};

// getLHCData function
export const getLHCData = (last_https_certificate = {}) => {
    const {
        cert_signature = {},
        issuer = {},
        validity = {},
        subject = {},
        public_key = {},
        extensions = {},
    } = last_https_certificate;

    return {
        Data: {
            Version: last_https_certificate.version || '',
            SerialNumber: last_https_certificate.serial_number || '',
            ThumbprintSHA256: last_https_certificate.thumbprint_sha256 || '',
            Thumbprint: last_https_certificate.thumbprint || '',
            Size: last_https_certificate.size || 0.0,
        },
        Issuer: {
            Country: issuer.C || '',
            State: issuer.ST || '',
            Locality: issuer.L || '',
            Organization: issuer.O || '',
            CommonName: issuer.CN || '',
        },
        Validity: {
            NotAfter: validity.not_after || '',
            NotBefore: validity.not_before || '',
        },
        Subject: {
            CommonName: subject.CN || '',
        },
        PublicKey: {
            Algorithm: public_key.algorithm || '',
            Size: public_key?.rsa?.key_size || 0,
            Modulus: public_key?.rsa?.modulus || '',
            Exponent: public_key?.rsa?.exponent || '',
        },
        SignatureAlgorithm: {
            Algorithm: cert_signature.signature_algorithm || '',
            Signature: cert_signature.signature || '',
        },
        Extensions: {
            AuthorityKeyIdentifier: extensions?.authority_key_identifier?.keyid || '',
            KeyUsage: extensions.key_usage || '',
            CA: extensions.CA || false,
            CAInformationAccess: {
                CAIssuers: extensions?.ca_information_access?.['CA Issuers'] || '',
                OCSP: extensions?.ca_information_access?.OCSP || '',
            },
            SubjectKeyIdentifier: extensions.subject_key_identifier || '',
            SubjectAlternativeName: extensions.subject_alternative_name || '',
            ExtendedKeyUsage: extensions.extended_key_usage || '',
            CertificatePolicies: extensions.certificate_policies || '',
            '[1.3.6.1.4.1.11129.2.4.2]': extensions['1.3.6.1.4.1.11129.2.4.2'] || '',
        },
    };
};

export function bundle(attribute) {
    const bundle_info = attribute.bundle_info || {};
    const { file_types = {}, extensions = {} } = bundle_info;

    return {
       'Contents Metadata' : {
            'Type' : bundle_info?.type || '',
            'Contained Files'  : bundle_info?.num_children, 
            'Uncompressed Size' : bundle_info?.uncompressed_size,
            'Earliest Content Modification' : bundle_info?.lowest_datetime,            
            'Latest Content Modification' : bundle_info?.highest_datetime,
        },
       'Contained Files By Type' : {
            'JSON' : file_types?.JSON || 0,
            'PNG' : file_types?.PNG || 0, 
            'ELF' : file_types?.ELF || 0, 
            'UNKNOWN' : file_types?.unknown || 0, 
            'XML' : file_types?.XML || 0, 
       },
       'Contained Files By Extension' : {
            '1000': extensions?.["1000"] || 0,
            'LST': extensions?.lst || 0,
            'Object Code C': extensions?.ObjectCodec || 0,
            'PROFM': extensions?.profm || 0,
            'JSON Factory': extensions?.JsonFactory || 0,
            'Coroutine Exception Handler': extensions?.CoroutineExceptionHandler || 0,
            'PROF': extensions?.prof || 0,
            'XHTML': extensions?.xhtml || 0,
            'JS': extensions?.js || 0,
            'DAT': extensions?.dat || 0,
            'External Overridability Condition': extensions?.ExternalOverridabilityCondition || 0,
            'PNG': extensions?.png || 0,
            'Block Hound Integration': extensions?.BlockHoundIntegration || 0,
            'Built Ins Loader': extensions?.BuiltInsLoader || 0,
            'Module': extensions?.Module || 0,
            'Main Dispatcher Factory': extensions?.MainDispatcherFactory || 0,
            'JSON': extensions?.json || 0,
            'Kotlin Builtins': extensions?.kotlin_builtins || 0,
            'DEX': extensions?.dex || 0,
            'Properties': extensions?.properties || 0,
            'SO': extensions?.so || 0,
            'XML': extensions?.xml || 0,
       }
    };
}

export function basicInfo(attribute) {
    return {
        md5: attribute?.md5 || '',
        sha1: attribute?.sha1 || '',
        sha256: attribute?.sha256 || '',
        vhash: attribute?.vhash || '',
        authentihash: attribute?.authentihash || '',
        imphash: attribute?.imphash || '',
        permhash: attribute?.permhash || '',
        ssdeep: attribute?.ssdeep || '',
        tlsh: attribute?.tlsh || '',
        type_tags: attribute?.type_tags || [],
        magic: attribute?.magic || '',
        trid: attribute?.trid || '',
        detectiteasy: attribute?.detectiteasy || '',
        magika: attribute?.magika || '',
        size: attribute?.size || 0, 
        network: attribute?.network || '',
        asn: attribute?.asn || '',
        country: attribute?.country || '',
        continent: attribute?.continent || '',
        as_owner: attribute?.as_owner || '',
        regional_internet_registry: attribute?.regional_internet_registry || ''
    };
}
