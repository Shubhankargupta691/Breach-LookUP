package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	email "BreachLookUP/Email"
	password "BreachLookUP/Password"
)

func main() {
	// Setup router
	r := mux.NewRouter()

	// Routes
	r.HandleFunc("/api/email", email.HandleInput).Methods("GET")
	r.HandleFunc("/api/password", password.HandleInput).Methods("GET")

	// Configure CORS to allow requests from your frontend
	corsOptions := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),                                            // Frontend origin
		handlers.AllowedMethods([]string{"POST", "GET", "OPTIONS"}),                       // Allowed HTTP methods
		handlers.AllowedHeaders([]string{"Content-Type", "X-File-Hash", "Authorization"}), // Allowed headers
	)

	// Start the server with CORS middleware
	log.Println("Server started at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", corsOptions(r)))
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return
	}
}
