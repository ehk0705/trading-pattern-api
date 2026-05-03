// Interface pour connecter les données au graphique TradingView
const Datafeed = {
 onReady: (callback) => {
 setTimeout(() => callback({ supported_resolutions: ["1", "5", "15",
"60", "D"] }), 0);
 },
 searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
 // Logique de recherche de symboles
 },
 resolveSymbol: (symbolName, onSymbolResolvedCallback,
onResolutionErrorCallback) => {
 const symbolInfo = {
 name: symbolName,
 type: 'crypto',
 session: '24x7',
 timezone: 'Etc/UTC',
 ticker: symbolName,
 minmov: 1, pricescale: 100, has_intraday: true,
 };
 setTimeout(() => onSymbolResolvedCallback(symbolInfo), 0);
 },
 ,
 getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback,
onErrorCallback) => {
 // Ici, vous appelez votre API (ex: Binance ou GoldAPI)
 console.log("Fetching history for", symbolInfo.name);
 },
 subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
 // Connexion WebSocket pour le temps réel
 }
};
