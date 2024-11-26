// fileUtils.js
import { BasicInfo, History, KnownSources, Product, FileNames, OldAppsInfo, Names } from '../components/script/Results/Detection';
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
  


  export const fileInfoData = [
    { label: 'Hash', id: 'fileHash', value: '' },
    { label: 'File Name', id: 'fileName', value: '' },
    { label: 'Extension', id: 'fileExt', value: '' },
    { label: 'Size', id: 'fileSize', value: '' },
    { label: 'Last Analysis Date', id: 'lastAnalysisDate', value: '' },
    { label: 'Detected', id: 'detected', value: '' }
  ];
  
export const tabData = [
  { id: 'details', label: 'Details' },
  { id: 'detection', label: 'Detection' }
];

export const keyData = [
  { id: 'md5', label: 'MD5' },
  { id: 'sha1', label: 'SHA-1' },
  { id: 'sha256', label: 'SHA-256' },
  { id: 'vhash', label: 'Vhash' },
  { id: 'authentihash', label: 'Authentihash' },
  { id: 'imphash', label: 'Imphash' },
  { id: 'ssdeep', label: 'SSDEEP' },
  { id: 'tlsh', label: 'TLSH' },
  { id: 'type_tags', label: 'File Type' },
  { id: 'magic', label: 'Magic' },
  { id: 'trid', label: 'TrID' },
  { id: 'detectiteasy', label: 'DetectItEasy' },
  { id: 'magika', label: 'Magika' },
  { id: 'size', label: 'File Size' },
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
