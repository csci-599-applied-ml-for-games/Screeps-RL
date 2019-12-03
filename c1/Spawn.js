var Debugger = require('Debugger');
var AtomicSpawn = require('Atomic.Spawn');
var Spawn = {
    ACTION_LISTS: ['skip', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'spawn', 'claim', 'renew'],
    ACTION_SIZE: function () {
        return _.size(Spawn.ACTION_LISTS);
    },
    run: function (spawn) {
        // Debugger.clog('[Spawn: ' + spawn.id + ']: run');i
        var currentAction = _.sample(Spawn.ACTION_LISTS);
        // console.log(currentAction);
        if (spawn.memory.lock === undefined || spawn.memory.lock === false) {

        } else {
            if (spawn.room.energyCapacityAvailable >= 650) {
                currentAction = 'claim';
            }
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
            },
            'renew': function (spawn) {
                AtomicSpawn.renew(spawn);
            }
        };

        var execution = rule[action];
        // Debugger.clog('Execution: ' + execution);
        execution(spawn);
    }
};

module.exports = Spawn;