package main

import (
	"fmt"
	"net/http"

	email "BreachDirectory/Email"
	password "BreachDirectory/Password_Scanner"
)

func main() {
	// Serve static files from the "static" folder
	fs := http.FileServer(http.Dir("./frontend/dist"))
	http.Handle("/", fs) // Serve the static index.html

	// Routes
	http.HandleFunc("/api/email", email.HandleInput)
	http.HandleFunc("/api/password", password.HandleInput)

	// Server Port 8080
	fmt.Println("Server is running on port 8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return
	}
}
