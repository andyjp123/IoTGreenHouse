import serial
import time
import requests
from urllib.parse import quote_plus

# --- CONFIGURATION (VOS INFOS DE L'ETAPE 2) ---
AUTHOR = "TOULOUSE_G4" 
SECRET_KEY = "dea26"   
URL_API = "https://bi.dev.icam.school/icebox/createTweeticam.php?"

# CONFIGURATION DU PORT SERIE (A MODIFIER SELON VOTRE PC : COM3, COM4, /dev/ttyUSB0...)
arduino_port = "COM5" 
baud_rate = 9600

try:
    # Connexion à l'Arduino
    ser = serial.Serial(arduino_port, baud_rate, timeout=1)
    print(f"Connexion réussie sur {arduino_port}. En attente du bouton...")
    time.sleep(2) # Attendre le reboot de l'Arduino

    while True:
        # Lire la ligne qui arrive du port USB
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            
            # Si la ligne commence par "SEND:", c'est le signal du bouton !
            if line.startswith("SEND:"):
                message_content = line.replace("SEND:", "") # On garde juste le texte
                print(f"Bouton pressé ! Message reçu : {message_content}")

                # --- ENVOI WEB (VOTRE CODE ETAPE 2) ---
                payload = {
                    "author": AUTHOR,
                    "secretkey": SECRET_KEY, 
                    "message": message_content
                }
                final_url = f"{URL_API}author={quote_plus(payload['author'])}&secretkey={quote_plus(payload['secretkey'])}&message={quote_plus(payload['message'])}"
                
                try:
                    r = requests.get(final_url)
                    print(f"Statut Serveur : {r.status_code}")
                    if r.status_code == 200:
                        print("✅ Message envoyé avec succès !")
                except Exception as e:
                    print(f"Erreur d'envoi : {e}")
                # ---------------------------------------

except serial.SerialException:
    print(f"Erreur : Impossible d'ouvrir le port {arduino_port}. Vérifiez qu'il n'est pas ouvert dans l'IDE Arduino !")
except KeyboardInterrupt:
    print("Fermeture du programme.")