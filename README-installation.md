# Module Pattern IA

## Fichiers inclus

- `pattern-ia.html`
- `assets/js/pattern-ia.js`
- `server.js`
- `package.json`

## Installation locale

Place ces fichiers dans le dossier de ton projet, par exemple :

```text
C:\xampp\htdocs\trading
```

Puis ouvre un terminal dans ce dossier :

```bash
npm install
npm start
```

Ensuite, ouvre :

```text
http://localhost:3000/pattern-ia.html
```

## Intégration dans le menu de index.html

Ajoute ce lien dans ton menu :

```html
<a href="pattern-ia.html">Analyse IA du graphique</a>
```

## Important

GitHub Pages ne peut pas exécuter `server.js`.

Donc :
- la page HTML peut être sur GitHub Pages ;
- le serveur Node.js doit être hébergé ailleurs : Render, Railway, VPS, GoDaddy avec Node.js, etc.

Dans ce cas, modifie le fichier :

```text
assets/js/pattern-ia.js
```

et remplace :

```javascript
const API_BASE_URL = "";
```

par exemple :

```javascript
const API_BASE_URL = "https://ton-serveur.onrender.com";
```

## Limite actuelle

Cette première version utilise les données Binance.

Pour XAUUSD, Nasdaq, Apple ou autres actions, il faudra brancher une API de marché compatible :
- Twelve Data
- Alpha Vantage
- Polygon
- Tiingo
- Yahoo Finance via module serveur

## Principe d'analyse

Le serveur :
1. récupère les bougies historiques ;
2. calcule RSI, EMA 20, EMA 50 et MACD ;
3. extrait le segment actuel ;
4. cherche des segments passés similaires ;
5. mesure la résultante après un certain nombre de bougies ;
6. retourne un signal : Acheter, Vendre ou Attendre.

Ce n’est pas une prédiction certaine. C’est une aide à la décision probabiliste.
