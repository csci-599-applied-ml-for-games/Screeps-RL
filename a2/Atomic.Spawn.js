var MemoryWrapper = require('MemoryWrapper');
var AtomicSpawn = {
    spawnCreep: function (spawn) {
        // TODO: Use Body.js for body, and name from memory.
        spawn.spawnCreep([MOVE, CARRY, WORK], MemoryWrapper.getUnitCount());
    }
};

module.exports = AtomicSpawn;