const TVConfig = {
    container: "tv_chart_container",
    symbol: "BINANCE:BTCUSDT",
    interval: "60",
    theme: "dark",
    library_path: "charting_library/", // Dossier fourni par TradingView après licence
    locale: "fr",
    drawings_access: { type: 'black', tools: [{ name: "Regression Trend" }] },
    enabled_features: ["study_templates", "saved_drawings_for_user"],
    charts_storage_url: 'https://votre-serveur.com',
    charts_storage_api_version: "1.1",
    client_id: 'votre-site.com',
    user_id: 'percy_user'
};

function initAdvancedChart() {
    new TradingView.widget({
        ...TVConfig,
        autosize: true,
        studies_overrides: {
            "rsi.hlines background.color": "#f0b90b",
            "rsi.hlines background.transparency": 90
        }
    });
}

function loadProChart() {
 new TradingView.widget({
 container_id: "tv_pro_container",
 symbol: "BINANCE:BTCUSDT",
 interval: "60",
 theme: "dark",
 library_path: "/lib/charting_library/", // Chemin vers les fichiers
licenciés
 locale: "fr",
 datafeed: Datafeed,
 enabled_features: [
 "study_templates",
 "create_volume_indicator_by_default",
 "save_chart_properties_to_local_storage"
 ],
 overrides: {
 "paneProperties.background": "#0b0e11",
 "mainSeriesProperties.candleStyle.upColor": "#0ecb81",
 "mainSeriesProperties.candleStyle.downColor": "#f6465d"
 }
 });
}