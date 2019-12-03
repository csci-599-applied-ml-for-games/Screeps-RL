var Debugger = require('Debugger');
var AtomicSpawn = require('Atomic.Spawn');
var Spawn = {
    ACTION_LISTS: ['skip', 'spawn'],
    ACTION_SIZE: function () {
        return _.size(Spawn.ACTION_LISTS);
    },
    run: function (spawn) {
        var currentAction = _.sample(Spawn.ACTION_LISTS);
        // TODO: add weight.
        Spawn.execute(currentAction, spawn);
    },
    execute: function (action, spawn) {
        let rule = {
            'skip': function (spawn) {
                // Debugger.clog('Spawn:skip');
            },
            'spawn': function (spawn) {
                // Debugger.clog('Spawn:spawn');
                AtomicSpawn.spawnCreep(spawn);
            }
        };

        var execution = rule[action];
        execution(spawn);
    }
};

module.exports = Spawn;