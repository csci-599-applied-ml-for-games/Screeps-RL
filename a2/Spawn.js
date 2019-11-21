var Debugger = require('Debugger');
var Spawn = {
    run: function (spawn) {
        Debugger.clog('[Spawn: ' + spawn.id + ']: run');
        /* TODO: if not busy, assign action among the actions from SpawnAction. */


    }
};

module.exports = Spawn;