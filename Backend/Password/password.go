package password

import (
	"fmt"
	"net/http"
)

func HandleInputPassword(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Password")
}
