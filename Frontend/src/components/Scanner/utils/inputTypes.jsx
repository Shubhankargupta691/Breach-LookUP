// inputTypes.js
import Patterns  from './Patterns';


// Define the input types and their corresponding regex Patterns
const inputTypes = [
  { type: "IP", regex: Patterns.ip },
  { type: "Domain", regex: Patterns.domain },
  { type: "Hash", regex: Patterns.hash },
  { type: "URL", regex: Patterns.url }
];

export default inputTypes;