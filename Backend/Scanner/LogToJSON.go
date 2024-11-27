package scanner

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

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

	fmt.Println("Hash Report Logged Successfully") // Debugging

	file.WriteString(string(logData) + "\n")
}
