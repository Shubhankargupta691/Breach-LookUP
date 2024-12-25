package ipscanner

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

type IPResponse struct {
	Data interface{} `json:"data"`
}

func init() {

	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

// Function to fetch data
func fetchReport(apiKey, ipAddress string) ([]byte, error) {
	APIUrl := os.Getenv("IP_URL")
	if APIUrl == "" {
		log.Fatal("API_URL is not set in the .env file")
	}

	url := fmt.Sprintf("%s/%s", APIUrl, ipAddress)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("accept", "application/json")
	req.Header.Add("x-apikey", apiKey)

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	return body, nil
}

func IPreportHandler(w http.ResponseWriter, r *http.Request) {

	APIKey := os.Getenv("API_KEY_Scanner")
	if APIKey == "" {
		log.Fatal("API_KEY is not set in the .env file")
	}

	ipAddress := r.Header.Get("X-IP-Address")
	if ipAddress == "" {
		http.Error(w, "IP address is required", http.StatusBadRequest)
		return
	}

	body, err := fetchReport(APIKey, ipAddress)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to fetch report: %v", err), http.StatusInternalServerError)
		return
	}

	Log_IP_ToJSONFile(ipAddress, body)

	fmt.Println("Response received successfully") // Debugging

	var vtResponse IPResponse
	err = json.Unmarshal(body, &vtResponse)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to parse API response: %v", err), http.StatusInternalServerError)
		return
	}

	fmt.Println("-----------------------------------------------------------------")

	// Send the response as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(vtResponse)
}
