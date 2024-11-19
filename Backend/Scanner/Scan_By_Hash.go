package scanner

import (
	"encoding/json"
	"net/http"
)

func ScanFileByHashHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, x-apikey")
	w.Header().Set("Content-Type", "application/json")

	// Handle preflight request
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var requestBody struct {
		Hash string `json:"hash"`
	}
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	result := map[string]interface{}{
		"status":  "success",
		"hash":    requestBody.Hash,
		"message": "Scan result for hash: " + requestBody.Hash,
	}

	logToJSONFile(map[string]interface{}{
		"status":  "success",
		"message": "File scan by hash result",
		"data":    result,
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
