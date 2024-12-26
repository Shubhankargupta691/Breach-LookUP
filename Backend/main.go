package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	email "BreachLookUP/Email"
	ipscanner "BreachLookUP/IP_Scanner"
	password "BreachLookUP/Password"
	scanner "BreachLookUP/Scanner"
)

func main() {
	// Setup router
	r := mux.NewRouter()

	// Configure CORS to allow requests from your frontend
	corsOptions := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),                                                            // Frontend origin
		handlers.AllowedMethods([]string{"POST", "GET", "OPTIONS"}),                                       // Allowed HTTP methods
		handlers.AllowedHeaders([]string{"Content-Type", "X-File-Hash", "X-IP-Address", "Authorization"}), // Allowed headers
	)

	// Routes
	r.HandleFunc("/api/email", email.HandleInput).Methods("POST")
	r.HandleFunc("/api/password", password.HandleInputPassword).Methods("GET")
	r.HandleFunc("/upload", scanner.UploadFileHandler).Methods("POST")
	r.HandleFunc("/scan/hash", scanner.ScanFileByHashHandler).Methods("POST")
	r.HandleFunc("/report/hash", scanner.FetchReportHandler).Methods("GET")
	r.HandleFunc("/ip/report", ipscanner.IPreportHandler).Methods("GET")

	// Start the server with CORS middleware
	// log.Println("Server started at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", corsOptions(r)))
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return
	}
}
