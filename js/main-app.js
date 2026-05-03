const App = {
    init: function() {
        this.updateChart();
        this.setupEventListeners();
        this.startSignalEngine();
    },

    setupEventListeners: function() {
        document.getElementById('asset-selector').addEventListener('change', () => this.updateChart());
        document.getElementById('indicator-selector').addEventListener('change', () => this.updateChart());
    },

    updateChart: function() {
        const symbol = document.getElementById('asset-selector').value;
        const indicator = document.getElementById('indicator-selector').value;
        const infoCard = document.getElementById('info-custom');
        const infoText = document.getElementById('custom-text');

        let studies = [];
        infoCard.style.display = "none";

        // Logic for Standard Indicators
        const studyMap = {
            "RSI": "RSI@tv-basicstudies",
            "MACD": "MACD@tv-basicstudies",
            "EMA": "Moving Average Exponential@tv-basicstudies",
            "SMA": "Moving Average@tv-basicstudies",
            "SUPERTREND": "Supertrend@tv-basicstudies",
            "BOLLINGER": "Bollinger Bands@tv-basicstudies"
        };

        if (studyMap[indicator]) {
            studies.push(studyMap[indicator]);
        }

        // Logic for Custom Indicators
        if (indicator === "CUSTOM:BTC_CYCLE") {
            infoCard.style.display = "block";
            infoText.innerText = "Indicateur BTC Cycle Index : Analyse des sommets et bas de cycles. Référez-vous aux zones de Fibonacci sur votre accès Whop.";
        } else if (indicator === "CUSTOM:ELITE_V2") {
            infoCard.style.display = "block";
            infoText.innerText = "Elite V2 Alarm : Surveillez les signaux de 'Squeeze' et les alertes de volume sur le graphique.";
        }

        // Reset and Rebuild Widget
        document.getElementById('tv_chart_container').innerHTML = "";
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "60",
            "theme": "dark",
            "style": "1",
            "locale": "fr",
            "toolbar_bg": "#1e2329",
            "allow_symbol_change": true,
            "container_id": "tv_chart_container",
            "studies": studies
        });
    },

    startSignalEngine: function() {
        const box = document.getElementById('signal-box');
        setInterval(() => {
            if (typeof TradingEngine !== 'undefined') {
                const rsi = Math.floor(Math.random() * 40) + 30;
                const res = TradingEngine.analyze(rsi, 60000, 58000);
                box.innerText = res.signal;
                box.className = "signal-display " + res.style;
            }
        }, 3000);
    }
};

window.onload = () => App.init();