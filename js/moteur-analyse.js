const TradingEngine = {
    analyze: function(rsi, price, ma200) {
        let score = 0;
        if (rsi < 35) score += 2;
        else if (rsi > 65) score -= 2;
        if (price > ma200) score += 1;

        if (score >= 2) return { signal: "ACHAT FORT", style: "buy-bg" };
        if (score <= -1) return { signal: "VENTE / PRUDENCE", style: "sell-bg" };
        return { signal: "NEUTRE / ATTENTE", style: "neutral" };
    }
};