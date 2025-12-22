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

func init() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file")
	}
}

func FetchReportHandler(w http.ResponseWriter, r *http.Request) {
	// Load environment variables
	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		log.Println("FRONTEND_URL not set in the environment variables")
	}

	APIKey := os.Getenv("API_KEY_Scanner")
	if APIKey == "" {
		http.Error(w, "API key is missing", http.StatusInternalServerError)
		return
	}

	baseURL := os.Getenv("API_URL_Scanner")
	if baseURL == "" {
		http.Error(w, "Base URL is missing", http.StatusInternalServerError)
		return
	}

	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", frontendURL) // Restrict to specific URL
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "X-File-Hash")

	hash := r.Header.Get("X-File-Hash")
	if hash == "" {
		http.Error(w, "File hash is missing", http.StatusBadRequest)
		return
	}

	// Fetch report
	report, err := fetchReportWithLastAnalysisCheck(baseURL, APIKey, hash)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Log the fetched data
	if err := logFetchData(hash, report); err != nil {
		log.Printf("Failed to log data: %v", err)
	}

	// Write the response
	w.Write(report)
}

func fetchReportWithLastAnalysisCheck(baseURL, apiKey, hash string) ([]byte, error) {
	url := fmt.Sprintf("%s/%s", baseURL, hash)

	for {
		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			return nil, fmt.Errorf("failed to create request: %w", err)
		}

		req.Header.Add("Content-Type", "application/json")
		req.Header.Set("x-apikey", apiKey)

		res, err := http.DefaultClient.Do(req)
		if err != nil {
			log.Printf("Error fetching data: %v", err)
			time.Sleep(3 * time.Second)
			continue
		}
		defer res.Body.Close()

		body, err := io.ReadAll(res.Body)
		if err != nil {
			return nil, fmt.Errorf("failed to read response: %w", err)
		}

		var response map[string]interface{}
		if err := json.Unmarshal(body, &response); err != nil {
			return nil, fmt.Errorf("failed to parse response: %w", err)
		}

		// Check if the report is ready
		if isReportReady(response) {
			return body, nil

		}

		// Retry if the report is not ready
		log.Println("Report not generated yet, retrying...")
		time.Sleep(3 * time.Second)

		log.Println("--------------------------------------------------")
	}
}

func isReportReady(response map[string]interface{}) bool {
	data, dataOk := response["data"].(map[string]interface{})
	if !dataOk {
		return false
	}

	attributes, attributesOk := data["attributes"].(map[string]interface{})
	if !attributesOk {
		return false
	}

	lastAnalysisDate, dateOk := attributes["last_analysis_date"].(float64)
	return dateOk && lastAnalysisDate > 0
}
