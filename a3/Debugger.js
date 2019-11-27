var Debugger = {
    clog: function (msg) {
        if (!Memory.debug_buffer) {
            Memory.debug_buffer = 0;
        }
        if (Memory.debug_buffer > 100) {
            Memory.debug_buffer = 0;
            console.log(msg);
        } else {
            Memory.debug_buffer++;
        }
    }, DEBUG_LEVEL: 100

};
module.exports = Debugger;