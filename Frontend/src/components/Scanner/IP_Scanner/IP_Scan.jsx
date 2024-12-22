import React from 'react';

const IP_Scan = async (ip, setJsonData) => {
  try {
    console.log('IP Scan started...', ip);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ip/report`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-IP-Address': ip,
      },
    });

 
    if (!response.ok) {
      throw new Error(`Failed to fetch IP report. Status: ${response.status}`);
    }
    const jsonData = await response.json();
    console.log("IP jsonData",jsonData);
    setJsonData(jsonData); 


  } catch (error) {
    console.error('Error during IP scan:', error);
   
    setJsonData(null);
  }
};

export default IP_Scan;