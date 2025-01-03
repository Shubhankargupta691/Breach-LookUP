// patterns.js


// Define patterns for different types of data
const Patterns = {
  ip: /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
  domain: /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
  hash: /^[a-fA-F0-9]{32,64}$/, // For MD5, SHA1, SHA256
  url: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
};

export default Patterns;
