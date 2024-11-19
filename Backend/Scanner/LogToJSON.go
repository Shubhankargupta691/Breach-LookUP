package scanner

import (
	"encoding/json"
	"log"
	"os"
)

// logToJSONFile logs the request and response data to a JSON file.
func logToJSONFile(data interface{}) {
	file, err := os.OpenFile("log.json", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
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
