var Debugger = require('Debugger');
var Spawn = {
    run: function (spawn) {
        Debugger.clog('[Spawn: ' + spawn.id + ']: run');
    }
};

module.exports = Spawn;