module.exports = class Debugger {
    constructor(debugLevel) {
        this.debugLevel = debugLevel;
    }

    cs(msg) {
        if (this.debugLevel > 50) {
            console.log(msg);
        }
    }
};