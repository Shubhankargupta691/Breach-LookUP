package scanner

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func init() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func UploadFileHandler(w http.ResponseWriter, r *http.Request) {
	APIKey := os.Getenv("API_KEY_Scanner")
	if APIKey == "" {
		log.Fatal("API_KEY is not set in the .env file")
	}

	APIUrl := os.Getenv("API_URL_Scanner")
	if APIUrl == "" {
		log.Fatal("API_URL is not set in the .env file")
	}

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

	log.Println("File received and being sent to the server for scanning.")

	req, err := http.NewRequest("POST", APIUrl, body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error creating request: %v", err), http.StatusInternalServerError)
		return
	}

	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.Header.Set("x-apikey", APIKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error uploading file: %v", err), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	bodyResp, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Unable to read response", http.StatusInternalServerError)
		return
	}

	log.Println("--------------------------------------------------")

	var result map[string]interface{}
	if err := json.Unmarshal(bodyResp, &result); err != nil {
		http.Error(w, fmt.Sprintf("Error parsing response: %v", err), http.StatusInternalServerError)
		return
	}

	logToJSONFile(map[string]interface{}{
		"status":  "success",
		"message": "File scan result",
		"data":    result,
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
