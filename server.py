import http.server
import socketserver
import os

PORT = 80
DIRECTORY = "/var/www/html"

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        # C'est ici qu'on reçoit les données de l'ESP32
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        # On sauvegarde les données dans 'data.json'
        with open("data.json", "wb") as f:
            f.write(post_data)
            
        # On dit merci à l'ESP32
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Recu 5 sur 5")

    def do_GET(self):
        super().do_GET()

# On change le dossier de travail pour être sûr
os.chdir(DIRECTORY)

# Lancement du serveur
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serveur Serrasika lancé sur le port {PORT}")
    print("Prêt à recevoir les données de l'ESP32...")
    httpd.serve_forever()