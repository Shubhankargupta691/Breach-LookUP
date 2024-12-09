package scanner

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"
)

// log Response of File Upload and Hash Data to JSON File
func logToJSONFile(data interface{}) {

	err := os.MkdirAll("LOGS", 0666)
	if err != nil {
		log.Fatalf("Failed to create LOGS directory: %v", err)
	}

	file, err := os.OpenFile("LOGS/Hash_log.json", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal("Error opening log file:", err)
	}
	defer file.Close()

	logData, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		log.Fatal("Error marshaling log data:", err)
	}

	file.WriteString(string(logData) + "\n")
}

// Logs Fetched File Upload and Hash Data to JSON File
func logFetchData(hash string, body []byte) error {

	err := os.MkdirAll("LOGS", 0666)
	if err != nil {
		return fmt.Errorf("failed to create LOGS directory: %v", err)
	}

	logFile, err := os.OpenFile("LOGS/Hash_log.json", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return fmt.Errorf("failed to open log file: %v", err)
	}
	defer logFile.Close()

	File_logEntry := map[string]interface{}{
		"timestamp":       time.Now().Format(time.RFC3339),
		"hash":            hash,
		"server_response": json.RawMessage(body),
	}

	logEntryJSON, err := json.Marshal(File_logEntry)
	if err != nil {
		return fmt.Errorf("failed to marshal log entry: %v", err)
	}

	_, err = logFile.Write(append(logEntryJSON, '\n'))
	if err != nil {
		return fmt.Errorf("failed to write to log file: %v", err)
	}

	return nil
}
