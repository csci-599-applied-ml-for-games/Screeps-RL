var Debugger = {
    clog: function (msg) {

        if (Memory.debug_buffer > Debugger.DEBUG_LEVEL) {
            Memory.debug_buffer = 0;
            console.log(msg + '[AT' + (Memory.startTime - Game.time) + ']');
        } else {
            Memory.debug_buffer++;
        }
    }, DEBUG_LEVEL: 200

};
module.exports = Debugger;