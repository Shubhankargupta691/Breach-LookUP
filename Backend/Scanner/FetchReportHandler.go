package scanner

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
)

type FinalResponse struct {
	Data struct {
		ID    string `json:"id"`
		Type  string `json:"type"`
		Links struct {
			Self string `json:"self"`
		} `json:"links"`
		Attributes struct {
			Magic                string   `json:"magic"`
			TLSH                 string   `json:"tlsh"`
			Authentihash         string   `json:"authentihash"`
			Vhash                string   `json:"vhash"`
			SHA1                 string   `json:"sha1"`
			SHA256               string   `json:"sha256"`
			MD5                  string   `json:"md5"`
			SSDeep               string   `json:"ssdeep"`
			Size                 int64    `json:"size"`
			TypeDescription      string   `json:"type_description"`
			TypeExtension        string   `json:"type_extension"`
			TypeTag              string   `json:"type_tag"`
			TypeTags             []string `json:"type_tags"`
			Names                []string `json:"names"`
			LastAnalysisDate     int64    `json:"last_analysis_date"`
			FirstSubmissionDate  int64    `json:"first_submission_date"`
			LastSubmissionDate   int64    `json:"last_submission_date"`
			CreationDate         int64    `json:"creation_date"`
			LastModificationDate int64    `json:"last_modification_date"`
			Reputation           int      `json:"reputation"`
			LastAnalysisStats    struct {
				Malicious        int `json:"malicious"`
				Suspicious       int `json:"suspicious"`
				Undetected       int `json:"undetected"`
				Harmless         int `json:"harmless"`
				Timeout          int `json:"timeout"`
				ConfirmedTimeout int `json:"confirmed-timeout"`
				Failure          int `json:"failure"`
				TypeUnsupported  int `json:"type-unsupported"`
			} `json:"last_analysis_stats"`
			TotalVotes struct {
				Harmless  int `json:"harmless"`
				Malicious int `json:"malicious"`
			} `json:"total_votes"`
			DetectItEasy struct {
				FileType string `json:"filetype"`
				Values   []struct {
					Info    string `json:"info"`
					Version string `json:"version"`
					Type    string `json:"type"`
					Name    string `json:"name"`
				} `json:"values"`
			} `json:"detectiteasy"`
			TrID []struct {
				FileType    string  `json:"file_type"`
				Probability float64 `json:"probability"`
			} `json:"trid"`
			PopularThreatClassification struct {
				PopularThreatName []struct {
					Count int    `json:"count"`
					Value string `json:"value"`
				} `json:"popular_threat_name"`
				PopularThreatCategory []struct {
					Count int    `json:"count"`
					Value string `json:"value"`
				} `json:"popular_threat_category"`
				SuggestedThreatLabel string `json:"suggested_threat_label"`
			} `json:"popular_threat_classification"`
			CrowdsourcedIDSResults []struct {
				RuleCategory   string   `json:"rule_category"`
				AlertSeverity  string   `json:"alert_severity"`
				RuleMsg        string   `json:"rule_msg"`
				RuleID         string   `json:"rule_id"`
				RuleSource     string   `json:"rule_source"`
				RuleURL        string   `json:"rule_url"`
				RuleRaw        string   `json:"rule_raw"`
				RuleReferences []string `json:"rule_references"`
				AlertContext   []struct {
					DestIP   string `json:"dest_ip"`
					DestPort int    `json:"dest_port"`
				} `json:"alert_context"`
			} `json:"crowdsourced_ids_results"`
			CrowdsourcedIDSStats struct {
				High   int `json:"high"`
				Medium int `json:"medium"`
				Low    int `json:"low"`
				Info   int `json:"info"`
			} `json:"crowdsourced_ids_stats"`
			PEInfo struct {
				TimeStamp   int64  `json:"timestamp"`
				Imphash     string `json:"imphash"`
				MachineType int    `json:"machine_type"`
				EntryPoint  int64  `json:"entry_point"`
				Sections    []struct {
					Name           string  `json:"name"`
					Chi2           float64 `json:"chi2"`
					VirtualAddress int64   `json:"virtual_address"`
					Entropy        float64 `json:"entropy"`
					RawSize        int64   `json:"raw_size"`
					Flags          string  `json:"flags"`
					VirtualSize    int64   `json:"virtual_size"`
					Md5            string  `json:"md5"`
				} `json:"sections"`
				ImportList []struct {
					LibraryName       string   `json:"library_name"`
					ImportedFunctions []string `json:"imported_functions"`
				} `json:"import_list"`
			} `json:"pe_info"`
			FileCondis struct {
				RawMd5 string `json:"raw_md5"`
				Dhash  string `json:"dhash"`
			} `json:"filecondis"`
			SigmaAnalysisStats struct {
				Critical int `json:"critical"`
				High     int `json:"high"`
				Medium   int `json:"medium"`
				Low      int `json:"low"`
			} `json:"sigma_analysis_stats"`
			SigmaAnalysisResults []struct {
				RuleLevel       string `json:"rule_level"`
				RuleID          string `json:"rule_id"`
				RuleSource      string `json:"rule_source"`
				RuleTitle       string `json:"rule_title"`
				RuleDescription string `json:"rule_description"`
				RuleAuthor      string `json:"rule_author"`
				MatchContext    []struct {
					Values map[string]string `json:"values"`
				} `json:"match_context"`
			} `json:"sigma_analysis_results"`
			Tags []string `json:"tags"`
		} `json:"attributes"`
	} `json:"data"`
}

func init() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func FetchReportHandler(w http.ResponseWriter, r *http.Request) {

	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL != "" {
		fmt.Println("Env loaded successfully") // Default if not set
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "X-File-Hash")

	APIKey := os.Getenv("API_KEY_Scanner")
	if APIKey == "" {
		log.Fatal("API_KEY is not set in the .env file")
	}

	baseURL := os.Getenv("API_URL_Scanner")
	if baseURL == "" {
		log.Fatal("API_URL is not set in the .env file")
	}

	hash := r.Header.Get("X-File-Hash")
	if hash == "" {
		http.Error(w, "File hash is missing", http.StatusBadRequest)
		return
	}

	log.Printf("Received hash: %s", hash)

	url := fmt.Sprintf("%s/%s", baseURL, hash)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	req.Header.Add("Content-Type", "application/json")
	req.Header.Set("x-apikey", APIKey)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		http.Error(w, "Failed to fetch data from VirusTotal", http.StatusInternalServerError)
		return
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		http.Error(w, "Failed to read response", http.StatusInternalServerError)
		return
	}

	log.Printf("Raw Response: %s", body)

	var response FinalResponse
	if err := json.Unmarshal(body, &response); err != nil {
		http.Error(w, "Failed to parse response", http.StatusInternalServerError)
		return
	}

	if response.Data.Attributes.LastAnalysisDate == 0 {
		log.Println("Report not generated yet, retrying...")

		time.Sleep(3 * time.Second)

		FetchReportHandler(w, r)
		return
	}

	logToJSONFile(map[string]interface{}{
		"status":  "success",
		"message": "File Report by hash result",
		"data":    response,
	})

	w.Write(body)
}
