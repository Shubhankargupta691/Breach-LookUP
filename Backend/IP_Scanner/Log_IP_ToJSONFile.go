package ipscanner

import (
	"fmt"
	"log"
	"os"
	"time"
)

var logFile *os.File

//  Log IP Address and Data to JSON File

func Log_IP_ToJSONFile(ipAddress string, data []byte) {
	err := os.MkdirAll("LOGS", 0666)
	if err != nil {
		log.Fatalf("Failed to create LOGS directory: %v", err)
	}

	logFile, err = os.OpenFile("LOGS/IPAdress_log.json", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatalf("Failed to create/open log file: %v", err)
	}
	log.SetOutput(logFile)
	log.SetFlags(log.Ldate | log.Ltime)

	logEntry := fmt.Sprintf("Timestamp: %s\nIP Address: %s\nData:\n%s\n\n",
		time.Now().Format(time.RFC3339), ipAddress, string(data))
	_, err = logFile.WriteString(logEntry)
	if err != nil {
		log.Printf("Failed to write to log file: %v", err)
	}

	fmt.Println("IP Report Logged Successfully")
}
