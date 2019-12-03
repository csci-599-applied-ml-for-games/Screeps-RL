var Debugger = require('Debugger');
var AtomicSpawn = require('Atomic.Spawn');
var Spawn = {
    ACTION_LISTS: ['skip', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'claim'],
    ACTION_SIZE: function () {
        return _.size(Spawn.ACTION_LISTS);
    },
    run: function (spawn) {
        // Debugger.clog('[Spawn: ' + spawn.id + ']: run');i
        var currentActipn = null;
        if (spawn.memory.lock !== null && spawn.memory.lock === true) {
            currentAction = 'claim';
        } else {
            currentAction = _.sample(Spawn.ACTION_LISTS);
        }
        // Debugger.clog(currentAction);
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
            },
            'claim': function (spawn) {
                AtomicSpawn.claim(spawn);
            }
        };

        var execution = rule[action];
        // Debugger.clog('Execution: ' + execution);
        execution(spawn);
    }
};

module.exports = Spawn;