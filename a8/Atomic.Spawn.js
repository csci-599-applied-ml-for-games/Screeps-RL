var MemoryWrapper = require('MemoryWrapper');
var Debugger = require('Debugger');
var SpawnBody = require('Spawn.Body');
var AtomicSpawn = {
    spawnCreep: function (spawn) {
        if (spawn.memory.idle_time == null) {
            spawn.memory.idle_time = 0;
        }
        // console.log(spawn.room);
        // console.log(spawn.room.energyCapacityAvailable);
        var body_count = spawn.room.energyCapacityAvailable - spawn.memory.idle_time * Memory.info.transferred;
        if (body_count < 200) body_count = 200;
        var body = SpawnBody.constructWithBase(body_count);
        var exec = spawn.spawnCreep(body, 'u' + MemoryWrapper.getUnitCount(), {
            memory: {
                lock: false
            }
        });
        if (exec === OK) {
            MemoryWrapper.setUnitCount(MemoryWrapper.getUnitCount() + 1);
            spawn.memory.idle_time = 0;
        } else {
            spawn.memory.idle_time = spawn.memory.idle_time + 1;
        }
    }
};

module.exports = AtomicSpawn;