var MemoryWrapper = require('MemoryWrapper');
var Debugger = require('Debugger');
var AtomicSpawn = {
    spawnCreep: function (spawn) {
        // TODO: Use Body.js for body, and name from memory.
        // Debugger.clog('AtomicSpawn:spawnCreep:' + MemoryWrapper.getUnitCount());
        spawn.spawnCreep([MOVE, CARRY, WORK], 'u' + MemoryWrapper.getUnitCount(), {
            memory: {
                lock: false
            }
        });
        MemoryWrapper.setUnitCount(MemoryWrapper.getUnitCount() + 1);
    }
};

module.exports = AtomicSpawn;