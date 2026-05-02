const express = require("express");
const cors = require("cors");

const app = express();

/* CORS */
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

/* Lecture du JSON */
app.use(express.json());

/* Route principale */
app.get("/", function (req, res) {
    res.send("Serveur Node.js actif sur Render");
});

/* Route de test */
app.get("/api/test", function (req, res) {
    res.json({
        statut: "ok",
        message: "API accessible"
    });
});

/* Fonction commune d'analyse */
function analyserDonnees(donnees) {
    return {
        statut: "ok",
        message: "Analyse reçue avec succès",
        donneesRecues: donnees,
        recommandation: "Attendre une confirmation claire avant d’entrer en position.",
        conseil: "Toujours utiliser un stop loss et limiter le risque."
    };
}

/* Test navigateur : GET */
app.get("/api/analyse", function (req, res) {
    res.json({
        statut: "ok",
        message: "Route /api/analyse accessible en GET",
        explication: "Pour une vraie analyse depuis la page HTML, il faut utiliser POST.",
        exempleAttendu: {
            actif: "BINANCE:BTCUSDT",
            indicateur: "EMA",
            intervalle: "1h"
        }
    });
});

/* Analyse réelle : POST */
app.post("/api/analyse", function (req, res) {
    const donnees = req.body || {};
    const resultat = analyserDonnees(donnees);
    res.json(resultat);
});

/* Gestion des routes inexistantes */
app.use(function (req, res) {
    res.status(404).json({
        statut: "erreur",
        message: "Route introuvable",
        routeDemandee: req.originalUrl
    });
});

/* Démarrage du serveur */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", function () {
    console.log("Serveur lancé sur le port " + PORT);
});