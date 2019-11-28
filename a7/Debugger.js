var Debugger = {
    clog: function (msg) {
        if (!((Game.time - Memory.startTime) & (Debugger.DEBUG_LEVEL - 1))) {
            console.log(msg + '[AT' + (Game.time - Memory.startTime) + ']');
        }
    }, DEBUG_LEVEL: 64
};
module.exports = Debugger;