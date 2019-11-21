var MemoryWrapper = require('MemoryWrapper');
var AtomicSpawn = require('Atomic.Spawn');
var SpawnAction = {
    ACTION_LISTS: ['skip', 'spawn'],
    ACTION_SIZE: function () {
        return _.size(SpawnAction.ACTION_LISTS);
    },
    run: function (spawn) {
        var currentAction = _.sample(SpawnAction.ACTION_LISTS);
        // TODO: add weight.
        SpawnAction.rule[currentAction](spawn);
    },
    skip: function (spawn) {

    },
    spawn: function (spawn) {
        AtomicSpawn.spawnCreep(spawn);
    },
    rule: {
        'skip': SpawnAction.skip,
        'spawn': SpawnAction.spawn
    }
};

module.exports = SpawnAction;