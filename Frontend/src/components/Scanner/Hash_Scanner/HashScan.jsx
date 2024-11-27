import init from '../components/script/init';

export default async function HashScan(searchInput, setJsonData) {
  if (!searchInput) {
    console.error("No hash provided. Please provide a valid hash.");
    return;
  }

  try {
    console.log("Sending hash to init function...");
    console.log("Hash:", searchInput);
    await init(searchInput, setJsonData);
    console.log("Report generation started...");
  } catch (error) {
    console.error("Error during report generation:", error);
  }
}

