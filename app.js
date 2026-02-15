// Attend que le DOM (la page) soit entièrement chargé
document.addEventListener('DOMContentLoaded', () => {

    console.log("Interface Serrasika chargée. Prête à simuler.");

    // --- ÉTAPE 3 : Simulation des Capteurs ---

    // 1. On récupère les éléments HTML par leur ID
    const tempElement = document.getElementById('temp-data');
    const humidityElement = document.getElementById('humidity-data');
    const soilElement = document.getElementById('soil-data');
    const luxElement = document.getElementById('lux-data');
    const uvElement = document.getElementById('uv-data');

// 2. Fonction pour RÉCUPÉRER les données (depuis data.json)
    function recupererDonnees() {
        
        // On demande le fichier data.json au serveur
        fetch('data.json')
            .then(response => {
                // Si le fichier n'existe pas encore (au tout début), ça peut planter
                if (!response.ok) {
                    throw new Error("Pas de données reçues");
                }
                return response.json();
            })
            .then(data => {
                console.log("Données reçues :", data);

                // 3. On met à jour le texte avec les vraies valeurs du fichier
                if(data.temperature) tempElement.textContent = parseFloat(data.temperature).toFixed(1);
                if(data.humidity)    humidityElement.textContent = Math.round(data.humidity);
                if(data.soil)        soilElement.textContent = Math.round(data.soil);
                if(data.lux)         luxElement.textContent = Math.round(data.lux);
                if(data.uv)          uvElement.textContent = data.uv;
            })
            .catch(error => {
                console.log("Attente de l'ESP32...", error);
            });
    }

    // 4. On lance la récupération toutes les 2 secondes
    setInterval(recupererDonnees, 2000);

    // On lance une première fois tout de suite (sinon on attend 3s)
    recupererDonnees();





    // Dans js/app.js, à l'intérieur du DOMContentLoaded

 // Dans js/app.js, REMPLACE tout le bloc de l'étape 5

    // --- ÉTAPE 5 : Simulation du Widget Enfant (COMPLET) ---

    // 1. Nos 5 "plantes" de démo (AVEC LES COULEURS)
    const plantData = [
        {
            name: "La Tomate 🍅",
            color: "#ff6347", // Rouge Tomate
            sun: "☀️☀️☀️",
            sunDesc: "[Besoin Élevé]",
            water: "💧💧",
            waterDesc: "[Besoin Moyen]",
            fact: "La tomate est un fruit, pas un légume ! Botaniquement parlant, c'est une baie."
        },
        {
            name: "La Laitue 🥬",
            color: "#8BC34A", // Vert Laitue
            sun: "☀️☀️",
            sunDesc: "[Besoin Moyen]",
            water: "💧💧💧",
            waterDesc: "[Besoin Élevé]",
            fact: "La laitue est composée à 95% d'eau. C'est pour ça qu'elle est si rafraîchissante."
        },
        {
            name: "La Carotte 🥕",
            color: "#ff9800", // Orange
            sun: "☀️☀️☀️",
            sunDesc: "[Besoin Élevé]",
            water: "💧",
            waterDesc: "[Besoin Faible]",
            fact: "Manger trop de carottes peut *vraiment* rendre la peau orange. Ça s'appelle la 'caroténémie'."
        },
        {
            name: "Le Poivron 🫑",
            color: "#4CAF50", // Vert Poivron
            sun: "☀️☀️☀️",
            sunDesc: "[Besoin Élevé]",
            water: "💧💧",
            waterDesc: "[Besoin Moyen]",
            fact: "Les poivrons verts, jaunes et rouges sont le même légume, mais à des étapes de maturité différentes."
        },
        {
            name: "La Fraise 🍓",
            color: "#E91E63", // Rose/Rouge Fraise
            sun: "☀️☀️☀️",
            sunDesc: "[Besoin Élevé]",
            water: "💧💧",
            waterDesc: "[Besoin Moyen]",
            fact: "La fraise est le seul fruit dont les graines (akènes) sont à l'extérieur."
        }
    ];

    // 2. On récupère les 7 éléments HTML
    const plantNameEl = document.getElementById('plant-name');
    const plantSunEl = document.getElementById('plant-need-sun');
    const plantSunDescEl = document.getElementById('plant-need-sun-desc');
    const plantWaterEl = document.getElementById('plant-need-water');
    const plantWaterDescEl = document.getElementById('plant-need-water-desc');
    const plantFactEl = document.getElementById('plant-fun-fact');

    let currentPlantIndex = 0; 

    // 3. Fonction pour mettre à jour l'affichage (COMPLÈTE)
    function updateKidsWidget() {
        const plant = plantData[currentPlantIndex];

        // On met à jour TOUS les champs
        plantNameEl.textContent = plant.name;
        plantNameEl.style.color = plant.color; // La couleur
        
        plantSunEl.textContent = plant.sun; // <-- TU AS OUBLIÉ ÇA
        plantSunDescEl.textContent = plant.sunDesc; // <-- TU AS OUBLIÉ ÇA
        plantWaterEl.textContent = plant.water; // <-- TU AS OUBLIÉ ÇA
        plantWaterDescEl.textContent = plant.waterDesc; // <-- TU AS OUBLIÉ ÇA
        
        plantFactEl.textContent = `"${plant.fact}"`;

        // Logique pour passer à la suite
        currentPlantIndex++;
        if (currentPlantIndex >= plantData.length) {
            currentPlantIndex = 0;
        }
    }

    // 4. On lance la rotation
    setInterval(updateKidsWidget, 30000); // 30 secondes

    // On affiche la première plante tout de suite
    updateKidsWidget();

    // Dans js/app.js, à l'intérieur du DOMContentLoaded

    

    // --- ÉTAPE 6 : Interactivité des Contrôles ---

    // 1. On récupère les boutons
    const btnIrrigationForce = document.getElementById('btn-irrigation-force');
    const btnBlindsOpen = document.getElementById('btn-blinds-open');
    const btnBlindsClose = document.getElementById('btn-blinds-close');
    const btnVentOpen = document.getElementById('btn-vent-open');

    // 2. On récupère les "toggles" (les checkboxes)
    const toggleIrrigationAuto = document.getElementById('toggle-irrigation-auto');
    const toggleLights = document.getElementById('toggle-lights');

    // 3. On ajoute les écouteurs d'événements

    // Exemple pour le "toggle" d'irrigation
    toggleIrrigationAuto.addEventListener('change', () => {
        if (toggleIrrigationAuto.checked) {
            console.log("Mode Irrigation AUTO activé");
            // Ici, tu pourrais désactiver le bouton "Forcer l'arrosage"
            btnIrrigationForce.disabled = true;
            btnIrrigationForce.style.opacity = 0.5;
        } else {
            console.log("Mode Irrigation MANUEL activé");
            // On réactive le bouton
            btnIrrigationForce.disabled = false;
            btnIrrigationForce.style.opacity = 1;
        }
    });

    // Exemple pour le "toggle" des lumières
    toggleLights.addEventListener('change', () => {
        if (toggleLights.checked) {
            console.log("Lumières ALLUMÉES");
        } else {
            console.log("Lumières ÉTEINTES");
        }
    });

    // Exemple pour un bouton simple
    btnIrrigationForce.addEventListener('click', () => {
        console.log("Forçage de l'arrosage...");
        btnIrrigationForce.textContent = "Arrosage en cours...";
        
        // Simule la fin de l'arrosage après 5 secondes
        setTimeout(() => {
            btnIrrigationForce.textContent = "Forcer l'arrosage (5 min)";
        }, 5000);
    });

    btnBlindsOpen.addEventListener('click', () => console.log("Ouverture stores"));
    btnBlindsClose.addEventListener('click', () => console.log("Fermeture stores"));
    btnVentOpen.addEventListener('click', () => console.log("Ouverture ventilation"));

});