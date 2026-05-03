// Simulation Datafeed pour compatibilité Pro
const Datafeed = {
    onReady: (cb) => setTimeout(() => cb({ supported_resolutions: ["1", "5", "60", "D"] }), 0)
};