// Code to upload a file scan it and fetch report using the ReportFetcher function.
import {hashFile} from "../utils";
import ReportFetcher from "../components/script/ReportFetcher";


export default async function uploadAndScan(file, setJsonData) {
  if (!file) {
    console.error("Please provide a file to upload.");

    return;
  }

  try {
    const File_Hash_SHA256 = await hashFile(file);

    if (!File_Hash_SHA256) {
      console.error("File hash generation failed.");

      return;
    }
    // console.log("File hash generated successfully:", File_Hash_SHA256);
    const formData = new FormData();

    formData.append("file", file);

    const uploadResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
      method: "POST",

      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error(
        `Error uploading file: ${uploadResponse.status} - ${uploadResponse.statusText}`
      );
    }

    const uploadData = await uploadResponse.json();

    console.log("Upload successful:", uploadData);

    setTimeout(async () => {
      try {
        console.log("Sending hash to ReportFetcher function...");

        await ReportFetcher(File_Hash_SHA256, setJsonData);

        console.log("Report generation started...");
      } catch (ReportFetcherError) {
        console.error("Error during report generation:", ReportFetcherError);
      }
    }, 1000);
  } catch (error) {
    console.error("Error during file upload process:", error);
  }
}
