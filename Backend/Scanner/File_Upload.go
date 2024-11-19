package scanner

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func init() {
	// Load environment variables from .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func UploadFileHandler(w http.ResponseWriter, r *http.Request) {
	APIKey := os.Getenv("API_KEY")
	if APIKey == "" {
		log.Fatal("API_KEY is not set in the .env file")
	}

	APIUrl := os.Getenv("API_URL")
	if APIUrl == "" {
		log.Fatal("API_URL is not set in the .env file")
	}

	// Parse the form data to get the file
	err := r.ParseMultipartForm(10 << 20) // Limit file size to 10 MB
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	file, _, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Unable to get file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Prepare the file for uploading using a multipart form
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	part, err := writer.CreateFormFile("file", "upload.tmp")
	if err != nil {
		http.Error(w, "Unable to create form file", http.StatusInternalServerError)
		return
	}

	_, err = io.Copy(part, file)
	if err != nil {
		http.Error(w, "Unable to copy file to multipart form", http.StatusInternalServerError)
		return
	}
	writer.Close()

	// Create the request to the external server
	req, err := http.NewRequest("POST", APIUrl, body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error creating request: %v", err), http.StatusInternalServerError)
		return
	}

	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.Header.Set("x-apikey", APIKey)

	// Send the file to the API server
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error uploading file: %v", err), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Read and parse the response from the API
	bodyResp, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Unable to read response", http.StatusInternalServerError)
		return
	}

	var result map[string]interface{}
	if err := json.Unmarshal(bodyResp, &result); err != nil {
		http.Error(w, fmt.Sprintf("Error parsing response: %v", err), http.StatusInternalServerError)
		return
	}

	// Log and return the scan result
	log.Printf("Scan result: %+v\n", result)

	logToJSONFile(map[string]interface{}{
		"status":  "success",
		"message": "File scan result",
		"data":    result,
	})

	// Return the result as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
