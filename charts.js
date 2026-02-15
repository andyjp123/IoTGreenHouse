// Remplace TOUT le fichier charts.js par ceci

document.addEventListener('DOMContentLoaded', () => {

    console.log("Chart.js prêt pour DEUX graphiques (Corrigés).");

    // --- GRAPHIQUE 1 : TEMPÉRATURE ---

    const ctxTemp = document.getElementById('temperature-chart');
    if (ctxTemp) {
        const labels24h = Array.from({length: 24}, (_, i) => `${i}h`);
        const dataTemp = [
            18, 17.5, 17, 17, 16.5, 16, 16, 16.5,
            17, 18, 19, 20, 21, 21.5, 22, 22,
            21.5, 21, 20.5, 20, 19.5, 19, 18.5, 18
        ];

        new Chart(ctxTemp, {
            type: 'line',
            data: {
                labels: labels24h,
                datasets: [{
                    label: 'Température (°C)',
                    data: dataTemp,
                    borderColor: '#ff9800', // Orange
                    backgroundColor: 'rgba(193, 128, 31, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                }]
            },
            options: chartOptions() // On appelle la fonction corrigée
        });
    }

    // --- GRAPHIQUE 2 : HUMIDITÉ DU SOL ---

    const ctxSoil = document.getElementById('soil-humidity-chart');
    if (ctxSoil) {
        const labels24h = Array.from({length: 24}, (_, i) => `${i}h`);
        const dataSoil = [
            60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49,
            48, 47, 46, 45, 46, 47, 48, 49, 50, 51, 52, 53
        ];

        new Chart(ctxSoil, {
            type: 'line',
            data: {
                labels: labels24h,
                datasets: [{
                    label: 'Humidité Sol (%)',
                    data: dataSoil,
                    borderColor: '#3a251eff', // Marron
                    backgroundColor: 'rgba(121, 85, 72, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                }]
            },
            options: chartOptions() // On appelle la fonction corrigée
        });
    }

});


// --- FONCTION D'OPTIONS PARTAGÉE (FIX DE L'ÉCRASEMENT - Version Espace) ---

function chartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false, 
        
        plugins: {
            legend: {
                display: false 
            },
            
            tooltip: {
                enabled: true, 
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                titleColor: 'white',
                bodyColor: 'white',
                
                // On garde des polices raisonnables
                titleFont: { size: 18, weight: 'bold' },
                bodyFont: { size: 17 },
                
                cornerRadius: 5,
                usePointStyle: true,
                boxWidth: 8, 

                // --- LE VRAI FIX EST ICI ---
                // On force un grand espace intérieur
                padding: 20, // (au lieu de 10 ou 8)
                
                // On force un grand espace sous le titre
                titleSpacing: 14, // (au lieu de 6)
                
                // On force un grand espace entre les lignes
                bodySpacing: 14, // (au lieu de 4)
                // --- FIN DU FIX ---

                intersect: false, 
                mode: 'index' 
            }
        },
        scales: {
            // ... (Les scales sont OK, on ne touche pas)
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.9)',
                    autoSkip: true, 
                    maxTicksLimit: 8, 
                    maxRotation: 0 
                },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.9)' 
                },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        }
    };
}