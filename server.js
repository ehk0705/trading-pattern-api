const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Serveur Pattern IA opérationnel.");
});

app.post("/api/analyse-pattern", async function (req, res) {
    try {
        const {
            actif = "BINANCE:BTCUSDT",
            intervalle = "1h",
            longueurPattern = 40,
            horizon = 12,
            seuil = 1.5
        } = req.body || {};

        const symbole = actif.replace("BINANCE:", "");

        const url =
            "https://api.binance.com/api/v3/klines?symbol=" +
            encodeURIComponent(symbole) +
            "&interval=" +
            encodeURIComponent(intervalle) +
            "&limit=500";

        const reponse = await fetch(url);

        if (!reponse.ok) {
            return res.status(500).json({
                ok: false,
                message: "Erreur lors de la récupération des données Binance."
            });
        }

        const donnees = await reponse.json();

        const bougies = donnees.map(function (k) {
            return {
                open: Number(k[1]),
                high: Number(k[2]),
                low: Number(k[3]),
                close: Number(k[4]),
                volume: Number(k[5])
            };
        });

        const closes = bougies.map(function (b) {
            return b.close;
        });

        const dernierPrix = closes[closes.length - 1];
        const ancienPrix = closes[closes.length - 1 - horizon];

        const variation = ((dernierPrix - ancienPrix) / ancienPrix) * 100;

        let signal = "ATTENDRE";

        if (variation > seuil) {
            signal = "ACHETER";
        } else if (variation < -seuil) {
            signal = "VENDRE";
        }

        res.json({
            ok: true,
            actif: actif,
            intervalle: intervalle,
            longueurPattern: longueurPattern,
            horizon: horizon,
            signal: signal,
            confiance: Math.min(90, Math.max(50, Math.round(Math.abs(variation) * 10))),
            scoreTechnique: Math.round(50 + variation),
            statistiques: {
                total: bougies.length,
                hausse: variation > 0 ? 60 : 30,
                baisse: variation < 0 ? 60 : 30,
                neutre: 10,
                variationMoyenne: Math.round(variation * 100) / 100
            },
            indicateurs: {
                prixActuel: dernierPrix,
                rsi: "à intégrer",
                macd: "à intégrer",
                ema20: "à intégrer",
                ema50: "à intégrer",
                tendance: variation > 0 ? "haussière" : variation < 0 ? "baissière" : "neutre"
            },
            resume:
                "Analyse basée sur les dernières bougies disponibles. Cette première version détecte la tendance récente et produit un signal provisoire.",
            recommandation:
                "Utiliser ce résultat comme aide préliminaire. Une version plus avancée devra comparer les segments historiques similaires.",
            risque: {
                stopLoss: "sous le dernier creux récent",
                takeProfit: "vers la prochaine zone de résistance",
                prudence: "ne pas entrer sans confirmation du graphique"
            }
        });

    } catch (erreur) {
        res.status(500).json({
            ok: false,
            message: "Erreur serveur pendant l'analyse."
        });
    }
});

app.listen(PORT, function () {
    console.log("Serveur lancé sur le port " + PORT);
});