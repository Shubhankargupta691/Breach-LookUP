package email

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"

	"github.com/joho/godotenv"
)

type InputData struct {
	Input string `json:"input"`
}

type ResponseData struct {
	Message string `json:"message"`
	Email   string `json:"email"`
}

type BreachResult struct {
	Email        string   `json:"email"`
	HashPassword bool     `json:"hash_password"`
	Password     string   `json:"password"`
	SHA1         string   `json:"sha1"`
	Hash         string   `json:"hash"`
	Sources      []string `json:"sources"`
}

type BreachResponse struct {
	Success bool           `json:"success"`
	Found   int            `json:"found"`
	Result  []BreachResult `json:"result"`
}

func HandleInput(w http.ResponseWriter, r *http.Request) {

	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL != "" {
		fmt.Println("Env loaded successfully")
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", frontendURL)

	if r.Method == http.MethodOptions {
		return
	}

	if r.Method == http.MethodPost {
		var data InputData
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response := ResponseData{
			Message: "Backend received the email.",
			Email:   data.Input,
		}

		apiUrl := os.Getenv("API_URL")
		apiKey := os.Getenv("API_KEY")
		apiHost := os.Getenv("API_HOST")

		fmt.Printf("Email is in breachDetail function %s \n", response.Email)

		encodedStr := url.QueryEscape(response.Email)

		URL := apiUrl + encodedStr

		fmt.Println(URL)

		req, _ := http.NewRequest("GET", URL, nil)

		req.Header.Add("x-rapidapi-key", apiKey)
		req.Header.Add("x-rapidapi-host", apiHost)

		res, _ := http.DefaultClient.Do(req)

		defer res.Body.Close()
		body, _ := ioutil.ReadAll(res.Body)

		var breachResponse BreachResponse
		json.Unmarshal(body, &breachResponse)

		results := BreachResponse{
			Success: bool(breachResponse.Success),
			Found:   breachResponse.Found,
			Result:  breachResponse.Result,
		}

		fmt.Println(results)

		jsonResponse, _ := json.Marshal(breachResponse)

		fmt.Println(string(jsonResponse))

		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(results)

	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}

}
