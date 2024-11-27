// inputTypes.js
import { patterns } from './Patterns';


// Define the input types and their corresponding regex patterns
export const inputTypes = [
  { type: "IP", regex: patterns.ip },
  { type: "Domain", regex: patterns.domain },
  { type: "Hash", regex: patterns.hash },
  { type: "URL", regex: patterns.url }
];
