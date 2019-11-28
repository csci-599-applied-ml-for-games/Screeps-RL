var MemoryWrapper = require('MemoryWrapper');
var Debugger = require('Debugger');
var AtomicSpawn = {
    spawnCreep: function (spawn) {
        if (spawn.memory.idle_time == null) {
            spawn.memory.idle_time = 0;
        }
        // TODO: Use Spawn.Body.js for body, and name from memory.
        // Debugger.clog('AtomicSpawn:spawnCreep:' + MemoryWrapper.getUnitCount());
        var body_count = spawn.room.energyCapacityAvailable - spawn.memory.idle_time * Memory.info.transferred;
        // console.log(body_count);
        if (body_count < 200) body_count = 200;
        var body = [];
        for (var i = 1; i <= (body_count / 200); i++) {
            body.push(MOVE);
            body.push(CARRY);
            body.push(WORK);
        }
        var exec = spawn.spawnCreep(body, 'u' + MemoryWrapper.getUnitCount(), {
            memory: {
                lock: false
            }
        });
        if (exec === OK) {
            MemoryWrapper.setUnitCount(MemoryWrapper.getUnitCount() + 1);
            spawn.memory.idle_time = 0;
        } else if (exec === ERR_NOT_ENOUGH_ENERGY) {
            spawn.memory.idle_time = spawn.memory.idle_time + 1;
        }
    }
};

module.exports = AtomicSpawn;