import { File, URL, AllSearch } from "./Component"

export const HeaderContent =[ 
    {
        id: 1,
        title1: "BREACH",
        title2: "LOOKUP",
        content: [
            "Analyze potentially suspicious files, domains, IPs, and URLs to identify malware or security breaches. Automate the process of sharing these findings with the security community to enhance collective threat intelligence.",
        ],
    }
];


export const FooterContent = [
    {
        id: 1,
        content: [
            "By providing the data above, you acknowledge and agree to our Terms of Service and Privacy Policy. You also consent to sharing your submission with the security community. Avoid including personal information, such as passports, IDs, or confidential files, as we are not liable for the content of your submission. Learn more for additional details.",
        ],
    }
];

// Updated tabs configuration with more descriptive naming
export const tabSections = [
    {
        id: "file",
        label: "File",
        Component: File,
    },
    {
        id: "url",
        label: "URL",
        Component: URL,
    },
    {
        id: "search",
        label: "Search",
        Component: AllSearch,
    },
];
