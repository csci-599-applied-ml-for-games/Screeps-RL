var Debugger = {
    clog: function (msg) {

        if (!((Game.time - Memory.startTime) & 255)) {
            console.log(msg + '[AT' + (Game.time - Memory.startTime) + ']');
        }
    }, DEBUG_LEVEL: 256

};
module.exports = Debugger;