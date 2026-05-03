/*
    Module frontal : Analyse IA du graphique
    ----------------------------------------------------
    Cette page appelle le serveur Node.js :
    POST /api/analyse-pattern

    Si le serveur est hébergé ailleurs que le site HTML,
    remplacer API_BASE_URL par l'adresse du serveur, par exemple :
    const API_BASE_URL = "https://mon-serveur-pattern.onrender.com";
*/

const API_BASE_URL = "";

function remplirDepuisIndex() {
    /*
        Cette fonction permet de reprendre des paramètres sauvegardés
        depuis index.html si tu ajoutes dans ta page principale :

        localStorage.setItem("trading_actif", symbole);
        localStorage.setItem("trading_intervalle", intervalle);
    */

    const actif = localStorage.getItem("trading_actif");
    const intervalle = localStorage.getItem("trading_intervalle");

    if (actif) {
        const actifSelect = document.getElementById("actif");
        const optionExiste = Array.from(actifSelect.options).some(opt => opt.value === actif);

        if (optionExiste) {
            actifSelect.value = actif;
        }
    }

    if (intervalle) {
        const intervalleSelect = document.getElementById("intervalle");
        const optionExiste = Array.from(intervalleSelect.options).some(opt => opt.value === intervalle);

        if (optionExiste) {
            intervalleSelect.value = intervalle;
        }
    }

    alert("Paramètres repris si disponibles.");
}

async function analyserPatternIA() {
    const zoneResultat = document.getElementById("zone-resultat");
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");

    error.style.display = "none";
    error.textContent = "";
    loading.style.display = "block";

    zoneResultat.innerHTML = "Analyse en cours...";

    const payload = {
        actif: document.getElementById("actif").value,
        intervalle: document.getElementById("intervalle").value,
        longueurPattern: Number(document.getElementById("longueurPattern").value),
        horizon: Number(document.getElementById("horizon").value),
        seuil: Number(document.getElementById("seuil").value)
    };

    try {
        const reponse = await fetch(`${API_BASE_URL}/api/analyse-pattern`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!reponse.ok) {
            throw new Error(`Erreur serveur : ${reponse.status}`);
        }

        const resultat = await reponse.json();

        if (!resultat.ok) {
            throw new Error(resultat.message || "Analyse impossible.");
        }

        afficherResultat(resultat);
    } catch (err) {
        zoneResultat.innerHTML = "";
        error.style.display = "block";
        error.textContent =
            "Impossible d'obtenir l'analyse. Vérifie que le serveur Node.js est lancé avec : npm start";
        console.error(err);
    } finally {
        loading.style.display = "none";
    }
}

function afficherResultat(data) {
    const zoneResultat = document.getElementById("zone-resultat");

    const signalClasse = data.signal.toLowerCase()
        .replace("acheter", "acheter")
        .replace("vendre", "vendre")
        .replace("attendre", "attendre");

    zoneResultat.className = "";

    zoneResultat.innerHTML = `
        <div class="result-head">
            <div>
                <div class="signal ${signalClasse}">${echapper(data.signal)}</div>
                <div class="confidence">Confiance : ${data.confiance}%</div>
            </div>
            <div class="confidence">
                ${echapper(data.actif)} · ${echapper(data.intervalle)}<br>
                Pattern : ${data.longueurPattern} bougies · Horizon : ${data.horizon} bougies
            </div>
        </div>

        <div class="metrics">
            <div class="metric">
                <span>Cas similaires</span>
                <strong>${data.statistiques.total}</strong>
            </div>
            <div class="metric">
                <span>Hausse</span>
                <strong>${data.statistiques.hausse}%</strong>
            </div>
            <div class="metric">
                <span>Baisse</span>
                <strong>${data.statistiques.baisse}%</strong>
            </div>
        </div>

        <div class="metrics">
            <div class="metric">
                <span>Neutre</span>
                <strong>${data.statistiques.neutre}%</strong>
            </div>
            <div class="metric">
                <span>Variation moyenne</span>
                <strong>${data.statistiques.variationMoyenne}%</strong>
            </div>
            <div class="metric">
                <span>Score technique</span>
                <strong>${data.scoreTechnique}/100</strong>
            </div>
        </div>

        <div class="bloc">
            <h3>Lecture technique</h3>
            <p>${echapper(data.resume)}</p>
        </div>

        <div class="bloc">
            <h3>Recommandation</h3>
            <p>${echapper(data.recommandation)}</p>
            <ul>
                <li><strong>Stop loss suggéré :</strong> ${echapper(data.risque.stopLoss)}</li>
                <li><strong>Take profit suggéré :</strong> ${echapper(data.risque.takeProfit)}</li>
                <li><strong>Point de prudence :</strong> ${echapper(data.risque.prudence)}</li>
            </ul>
        </div>

        <div class="bloc">
            <h3>Indicateurs actuels</h3>
            <ul>
                <li>Prix actuel : ${data.indicateurs.prixActuel}</li>
                <li>RSI : ${data.indicateurs.rsi}</li>
                <li>MACD : ${data.indicateurs.macd}</li>
                <li>EMA 20 : ${data.indicateurs.ema20}</li>
                <li>EMA 50 : ${data.indicateurs.ema50}</li>
                <li>Tendance : ${echapper(data.indicateurs.tendance)}</li>
            </ul>
        </div>

        <div class="bloc">
            <h3>Note importante</h3>
            <p>
                Ce module ne prédit pas l’avenir. Il compare une configuration actuelle avec des configurations passées
                et produit une aide à la décision probabiliste.
            </p>
        </div>
    `;
}

function echapper(texte) {
    return String(texte)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
