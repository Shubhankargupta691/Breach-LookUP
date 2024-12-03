// fileUtils.jsx
import { BasicInfo, History, KnownSources, Product, FileNames, OldAppsInfo, Names, DetailsResult } from '../components/Results/Details';
import { AnalysisResults } from '../components/Results/Detection';

/**
 * Hashes a file using SHA-256.
 * 
 * @param {File} file - The file to hash.
 * @returns {Promise<string>} The SHA-256 hash of the file.
 */
export default async function hashFile(file) {
    if (!file) {
      throw new Error("No file provided for hashing");
    }
  
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.error("Error during file hashing:", error);
      throw new Error("Hashing failed");
    }
  }
  

 
export const fileDetailsInfo = (fileDetails) => [
  { label: "Size", value: fileDetails.fileSize, id: 'fileSize' },
  { label: "Last Analysis Date", value: fileDetails.lastAnalysisDate, id: 'lastAnalysisDate' },
  { label: "File Extension", value: fileDetails.fileExt, id: 'fileExt' },

];


export const tabData = [
  { id: 'detection', label: 'Detection', Component: AnalysisResults},
  { id: 'details', label: 'Details', Component: DetailsResult},
];

export const keyData = [
  { id: 'md5', label: 'MD5' },
  { id: 'sha1', label: 'SHA-1' },
  { id: 'sha256', label: 'SHA-256' },
  { id: 'vhash', label: 'Vhash' },
  { id: 'authentihash', label: 'Authentihash' },
  { id: 'imphash', label: 'Imphash' },
  {id: 'permhash', label: 'Permhash'},
  { id: 'ssdeep', label: 'SSDEEP' },
  { id: 'tlsh', label: 'TLSH' },
  { id: 'type_tags', label: 'File Type' },
  { id: 'magic', label: 'Magic' },
  { id: 'trid', label: 'TrID' },
  { id: 'detectiteasy', label: 'DetectItEasy' },
  { id: 'magika', label: 'Magika' },
  { id: 'size', label: 'File Size' },
  {id: 'network', label: 'Network'},
  {id: 'asn', label: 'Autonomous System Number'},
  {id: 'country', label: 'Country'},
  {id: 'continent', label: 'Continent'},
  {id: 'as_owner', label: 'Autonomous System Label'},
  {id: 'regional_internet_registry', label: 'Regional Internet Registry'}
];


  // Define all sections with corresponding data keys for conditional rendering
  export const sections = [
    { id: 'basicInfo', title: 'Basic Info', Component: BasicInfo },
    { id: 'history', title: 'History', Component: History },
    { id: 'names', title: 'Names', Component: Names },
    { id: 'knownSources', title: 'Known Sources', Component: KnownSources },
    { id: 'oldAppsInfo', title: 'Old Applications Info', Component: OldAppsInfo },
    
  ];

  // Define tabs for the NSRL info section
  export const tabs = [
    { name: 'Product', key: 'product', component: Product },
    { name: 'FileNames', key: 'filenames', component: FileNames },
  ];

export const dateFields = [
  {id: 'creation_date',  label: 'Creation Date' },
  { id: 'first_seen_itw_date',  label: 'First Seen In The Wild'},
  { id: 'first_submission_date',  label: 'First Submission Date' },
  { id: 'last_modification_date',  label: 'Last Modification Date'},
  { id: 'last_submission_date',  label: 'Last Submission Date'},
  {id: 'last_analysis_date',  label: 'Last Analysis' },
];


// reanalyse icon
export const svgPaths = [
  {
    id: 'reanalyze',
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    path: [
              'M5.038 18.616a8.256 8.256 0 0 0 2.817 1.871 8.606 8.606 0 0 0 3.193.62 8.606 8.606 0 0 0 3.193-.62 8.256 8.256 0 0 0 2.817-1.87l-1.06-1.062c-1.379 1.38-3.029 2.069-4.95 2.069-1.92 0-3.57-.69-4.95-2.069-1.378-1.378-2.068-3.028-2.068-4.95 0-1.92.69-3.57 2.068-4.949 1.38-1.379 3.03-2.068 4.95-2.068 1.921 0 3.571.69 4.95 2.068l.188.188h-2.247l-.022 1.512 4.848-.007-.007-4.861-1.512.021v2.274l-.188-.188a8.256 8.256 0 0 0-2.817-1.87 8.607 8.607 0 0 0-3.193-.62 8.607 8.607 0 0 0-3.193.62 8.256 8.256 0 0 0-2.817 1.87 8.255 8.255 0 0 0-1.871 2.818 8.606 8.606 0 0 0-.62 3.193c0 1.084.206 2.148.62 3.193a8.256 8.256 0 0 0 1.87 2.817Z',
          ],
    },
];


