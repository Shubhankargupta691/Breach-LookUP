package scanner

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
)

// VirusTotalResponse defines the structure of the JSON response from VirusTotal
type VirusTotalResponse struct {
	Data struct {
		ID    string `json:"id"`
		Type  string `json:"type"`
		Links struct {
			Self string `json:"self"`
		} `json:"links"`
		Attributes struct {
			LastAnalysisResults map[string]struct {
				Method        string `json:"method"`
				EngineName    string `json:"engine_name"`
				EngineVersion string `json:"engine_version"`
				EngineUpdate  string `json:"engine_update"`
				Category      string `json:"category"`
				Result        string `json:"result"`
			} `json:"last_analysis_results"`

			MD5      string `json:"md5"`
			SHA1     string `json:"sha1"`
			SHA256   string `json:"sha256"`
			SSDeep   string `json:"ssdeep"`
			TLSH     string `json:"tlsh"`
			FileType string `json:"file_type"`
			Magic    string `json:"magic"`
			Magika   string `json:"magika"`

			FirstSeenITWDate    int64 `json:"first_seen_itw_date"`
			FirstSubmissionDate int64 `json:"first_submission_date"`
			LastSubmissionDate  int64 `json:"last_submission_date"`
			LastAnalysisDate    int64 `json:"last_analysis_date"`

			Names    []string `json:"names"`
			NSRLInfo struct {
				Products  []string `json:"products"`
				Filenames []string `json:"filenames"`
			} `json:"nsrl_info"`
			KnownDistributors struct {
				Distributors []string `json:"distributors"`
				Filenames    []string `json:"filenames"`
				Products     []string `json:"products"`
				DataSources  []string `json:"data_sources"`
			} `json:"known_distributors"`
			TrustedVerdict struct {
				Organization string `json:"organization"`
				Filename     string `json:"filename"`
			} `json:"trusted_verdict"`
			SandboxVerdicts struct {
				Category              string   `json:"category"`
				Confidence            int      `json:"confidence"`
				SandboxName           string   `json:"sandbox_name"`
				MalwareClassification []string `json:"malware_classification"`
				MalwareNames          []string `json:"malware_names"`
			} `json:"sandbox_verdicts"`
			Tags        []string `json:"tags"`
			OldAppsInfo struct {
				Website   string `json:"website"`
				OldApps   string `json:"oldapps"`
				Product   string `json:"product"`
				Developer string `json:"developer"`
			} `json:"oldapps_info"`
		} `json:"attributes"`
	} `json:"data"`
}

func init() {
	// Load environment variables from .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func FetchReportHandler(w http.ResponseWriter, r *http.Request) {
	// Use the FRONTEND_URL environment variable
	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL != "" {
		fmt.Println("Env loaded successfully") // Default if not set
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "X-File-Hash")

	// Load API key and URL from environment variables
	APIKey := os.Getenv("API_KEY")
	if APIKey == "" {
		log.Fatal("API_KEY is not set in the .env file")
	}

	baseURL := os.Getenv("API_URL")
	if baseURL == "" {
		log.Fatal("API_URL is not set in the .env file")
	}

	// Extract the file hash from the request header
	hash := r.Header.Get("X-File-Hash")
	if hash == "" {
		http.Error(w, "File hash is missing", http.StatusBadRequest)
		return
	}

	log.Printf("Received hash: %s", hash)

	// Construct the URL for the VirusTotal API
	url := fmt.Sprintf("%s/%s", baseURL, hash)

	// Create a GET request to the VirusTotal API
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	// Set the headers for the API request
	req.Header.Add("Content-Type", "application/json")
	req.Header.Set("x-apikey", APIKey)

	// Send the GET request to the VirusTotal API
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		http.Error(w, "Failed to fetch data from VirusTotal", http.StatusInternalServerError)
		return
	}
	defer res.Body.Close()

	// Read the response body
	body, err := io.ReadAll(res.Body)
	if err != nil {
		http.Error(w, "Failed to read response", http.StatusInternalServerError)
		return
	}

	// Log the raw response body
	log.Printf("Raw Response: %s", body)

	// Unmarshal the JSON response into the VirusTotalResponse struct
	var response VirusTotalResponse
	if err := json.Unmarshal(body, &response); err != nil {
		http.Error(w, "Failed to parse response", http.StatusInternalServerError)
		return
	}

	// Check if the report is still being processed
	if response.Data.Attributes.LastAnalysisDate == 0 {
		log.Println("Report not generated yet, retrying...")
		// Wait for 3 seconds before checking again
		time.Sleep(3 * time.Second)

		// Retry fetching the report
		FetchReportHandler(w, r)
		return
	}

	logToJSONFile(map[string]interface{}{
		"status":  "success",
		"message": "File Report by hash result",
		"data":    response,
	})

	// Send the structured response back to the frontend
	w.Write(body)
}
