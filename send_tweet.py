import requests
from urllib.parse import quote_plus
import datetime

# --- 1. DEFINITION DES PARAMETRES ---
AUTHOR = "hortelio.moube@2028.icam.fr"
SECRET_KEY = "dea26" # Votre clé secrète (key)

# Le contenu du message
MESSAGE_CONTENT = f"Groupe 4 test depuis python"


BASE_URL = "https://bi.dev.icam.school/icebox/createTweeticam.php?" 


# --- 2. ENCODAGE DU MESSAGE ---
# Le serveur attend les paramètres 'author', 'key' et 'message'.
payload = {
    "author": AUTHOR,
    "key": SECRET_KEY,
    "message": MESSAGE_CONTENT  
}

# Utilisation de quote_plus pour encoder chaque valeur
encoded_payload = f"author={quote_plus(payload['author'])}&secretkey={quote_plus(payload['key'])}&message={quote_plus(payload['message'])}"

# --- 3. CONCATENATION DE L'URL ---
FINAL_URL = BASE_URL + encoded_payload

# --- 4. ENVOI DE LA REQUETE GET ---
try:
    # Envoi de la requête GET
    response = requests.get(FINAL_URL)

    print("-" * 50)
    print(f"URL de la requête envoyée: {FINAL_URL}")
    print("-" * 50)
    print(f"Statut de la réponse du serveur: {response.status_code}")
    print(f"Contenu de la réponse du serveur: \n{response.text}")
    print("-" * 50)

    # Vérification du succès. Le statut 200 est bon, il faut juste que le corps confirme le succès.
    if response.status_code == 200 and "successfully" in response.text:
        print(" Message posté avec succès sur bi.dev.icam.school!")
        print(f"Vérifiez ici : https://bi.dev.icam.school/icebox/listTweeticam.php")
    elif response.status_code == 200 and "Error" in response.text:
        print(f" Erreur du serveur malgré le statut 200. Vérifiez l'auteur ou la clé ({response.text.strip()}).")
    else:
        print(f" Échec de la publication (Code {response.status_code}).")

except requests.exceptions.RequestException as e:
    print(f"Une erreur s'est produite lors de l'envoi de la requête: {e}")