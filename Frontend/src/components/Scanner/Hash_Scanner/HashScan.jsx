import ReportFetcher from '../components/script/ReportFetcher';

export default async function HashScan(searchInput, setJsonData) {
  if (!searchInput) {
    console.error("No hash provided. Please provide a valid hash.");
    return;
  }

  try {
    console.log("Sending hash to ReportFetcher function...");
    console.log("Hash:", searchInput);
    await ReportFetcher(searchInput, setJsonData);
    console.log("Report generation started...");
  } catch (error) {
    console.error("Error during report generation:", error);
  }
}

