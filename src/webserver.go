package main
import (
	"net/http"
	"os"
	"log"
	"io/ioutil"
	"encoding/base64"
)

func main() {
	http.HandleFunc("/upload", upload)
	http.Handle("/", http.FileServer(http.Dir("web")))

	port := ":8080"
	log.Printf("[webserver] starting webserver on port %s", port)

	ip, err := ExternalIP()
	if err != nil {
		log.Printf("[webserver] error retrieving this machine's ip (%s), proceeding", err)
		ip = "<error>"
	}

	log.Printf("[webserver] webserver should be accessible via %v%s", ip, port)
	err = http.ListenAndServe(port, nil)

	if err != nil {
		log.Println("[webserver] error starting webserver: %s", err)
	}
}

func upload(rw http.ResponseWriter, req *http.Request) {
	f, err := os.Create("signature.png")
	if err != nil {
		log.Println("[signature] error in creating signature.png: %s", err)
		return
	}
	defer f.Close()

	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Println("[signature] error in reading the request body: %s", err)
		return
	}

	str := string(body)[22:] //cut away "data:image/png;base64,"
	png, err := base64.StdEncoding.DecodeString(str)
	if err != nil {
		log.Println("[signature] error in base64-decoding the upload request body: %s", err)
		return
	}

	_, err = f.Write(png)
	log.Println("[signature] received signature; saved as signature.png in this directory")
}
