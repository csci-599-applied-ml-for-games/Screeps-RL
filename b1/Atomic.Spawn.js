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
        var time = _.max([1.0, Memory.info.transferred]);
        var body_count = _.min([spawn.room.energyCapacityAvailable - spawn.memory.idle_time,
            spawn.room.energyCapacityAvailable / 200 * 3 * time - spawn.memory.idle_time]);
        // console.log(body_count);
        // var body_count = spawn.room.energyCapacityAvailable - spawn.memory.idle_time * Memory.info.harvested;
        if (body_count < 200) body_count = 200;
        if (body_count > spawn.room.energyCapacityAvailable - spawn.memory.idle_time)
            body_count = spawn.room.energyCapacityAvailable - spawn.memory.idle_time;
        var body = SpawnBody.constructWithBase(body_count);
        var exec = spawn.spawnCreep(body, 'u' + MemoryWrapper.getUnitCount(), {
            memory: {
                lock: false
            }
        });
        // console.log(exec);
        if (exec === OK) {
            MemoryWrapper.setUnitCount(MemoryWrapper.getUnitCount() + 1);
            spawn.memory.idle_time = 0;
        } else {
            spawn.memory.idle_time = spawn.memory.idle_time + 1;
        }
    }
};

module.exports = AtomicSpawn;