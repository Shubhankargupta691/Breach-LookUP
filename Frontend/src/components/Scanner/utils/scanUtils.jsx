import { inputTypes } from "../utils";
import {IP_Scan} from '../IP_Scanner';
import HashScan from '../Hash_Scanner/HashScan';

export function detectInputType(input) {
    
    const matches = inputTypes.map((item) => ({
      type: item.type,
      isMatch: item.regex.test(input),
    }));
  
    const allMatches = matches.filter((match) => match.isMatch);
  
    
    if (allMatches.length === 0) {
      return { allMatches: ["Unknown"], firstMatch: "Unknown" };
    }
  
    // Return the types of the matches and the first match
    const result = allMatches.map((match) => match.type);
    const firstMatch = allMatches[0].type; 
  
    return {
      allMatches: result, 
      firstMatch: firstMatch, 
    };
  }
  
  
  export const getScanActions = (searchInput, setJsonData) => ({
    Hash: async () => {  
      console.log("Starting Hash scan...");
      await HashScan(searchInput, setJsonData); 
      console.log("Hash scan completed.");
    },
    
    IP  : async () => { await IP_Scan(searchInput, setJsonData) },


    Domain: async () => {
      console.log("Performing Domain scan...");
    },
    URL: async () => {
      console.log("Performing URL scan...");
    },
  });
