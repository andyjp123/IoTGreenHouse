#include <WiFi.h>
#include <HTTPClient.h>

// 1. Tes identifiants Wifi (ceux du Raspberry Pi)
const char* ssid = "RasB_Aussonne";
const char* password = "12345678"; // Remplace par le vrai (ex: 12345678)

// 2. L'adresse du Raspberry Pi
const char* serverUrl = "http://10.3.141.1/api"; 

void setup() {
  Serial.begin(115200);

  // Connexion au Wifi
  WiFi.begin(ssid, password);
  Serial.print("Connexion au Wifi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnecté !");
}

void loop() {
  // --- SIMULATION DES CAPTEURS (CÔTÉ ESP32) ---
  // Bientôt, tu remplaceras ça par : float t = dht.readTemperature();
  float temp = 20.0 + (random(0, 50) / 10.0); 
  int hum = random(50, 70);
  int soil = random(30, 90);
  int lux = random(500, 2000);
  int uv = random(0, 5);

  // --- PRÉPARATION DU JSON ---
  // On fabrique le texte : {"temperature": 22.5, "humidity": 60, ...}
  String jsonPayload = "{";
  jsonPayload += "\"temperature\": " + String(temp) + ",";
  jsonPayload += "\"humidity\": " + String(hum) + ",";
  jsonPayload += "\"soil\": " + String(soil) + ",";
  jsonPayload += "\"lux\": " + String(lux) + ",";
  jsonPayload += "\"uv\": " + String(uv);
  jsonPayload += "}";

  // --- ENVOI AU RASPBERRY PI ---
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    Serial.println("Envoi des données : " + jsonPayload);
    
    // On POST (envoie) le message
    int httpResponseCode = http.POST(jsonPayload);

    if(httpResponseCode > 0){
      Serial.print("Réponse du Pi : ");
      Serial.println(httpResponseCode); // 200 veut dire OK
    } else {
      Serial.print("Erreur d'envoi : ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }

  // On attend 3 secondes avant le prochain envoi
  delay(3000);
}