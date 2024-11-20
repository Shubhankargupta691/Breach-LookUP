// fileUtils.js

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
  { id: 'sha1', label: 'SHA1' },
  { id: 'sha256', label: 'SHA256' },
  { id: 'ssdeep', label: 'SSDEEP' },
  { id: 'tlsh', label: 'TLSH' },
  { id: 'file_type', label: 'File Type' },
  { id: 'magic', label: 'Magic' },
  { id: 'magika', label: 'Magika' },
];