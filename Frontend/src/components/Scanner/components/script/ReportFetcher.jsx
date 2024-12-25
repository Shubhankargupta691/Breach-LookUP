import React from "react";

export default async function ReportFetcher(hash, setJsonData) {
  // console.log("ReportFetcher func hash", hash);
  try {
   
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/report/hash`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-File-Hash" : hash,
      }
    });
    // console.log("Response received in ReportFetcher():", response);
    if (!response.ok) {
      throw new Error("Failed to fetch data from backend");
    }

    const jsonData = await response.json();
    // console.log(jsonData);
    setJsonData(jsonData); 

  } catch (error) {
    console.error("Error fetching hash report:", error);
  }
}
