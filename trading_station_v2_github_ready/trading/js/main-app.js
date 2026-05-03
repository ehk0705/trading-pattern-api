const App = {
    init: function() {
        this.updateChart("BINANCE:BTCUSDT");
        this.setupSelector();
        this.startEngine();
    },

    updateChart: function(symbol) {
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
            "withdateranges": true,
            "container_id": "tv_chart_container"
        });
    },

    setupSelector: function() {
        const selector = document.getElementById('asset-selector');
        if(selector) {
            selector.addEventListener('change', (e) => this.updateChart(e.target.value));
        }
    },

    startEngine: function() {
        const box = document.getElementById('signal-box');
        setInterval(() => {
            if (typeof TradingEngine !== 'undefined') {
                const rsi = Math.floor(Math.random() * 50) + 25;
                const decision = TradingEngine.analyze(rsi, 65000, 62000);
                box.innerText = decision.signal;
                box.className = "signal-display " + decision.style;
            }
        }, 2000);
    }
};

window.onload = () => App.init();