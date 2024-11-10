package password

import (
	"fmt"
	"net/http"
)

func HandleInput(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Password")
}
