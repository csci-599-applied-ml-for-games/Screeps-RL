var Debugger = {
    clog: function (msg) {
        if (Debugger.DEBUG_LEVEL > 50) {
            console.log(msg);
        }
    }, DEBUG_LEVEL: 100

};
module.exports = Debugger;