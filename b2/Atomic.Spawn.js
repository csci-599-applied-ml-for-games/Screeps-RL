var MemoryWrapper = require('MemoryWrapper');
var Debugger = require('Debugger');
var SpawnBody = require('Spawn.Body');
var TargetHelper = require('Target.Helper');
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
    },
    claim: function (spawn) {
        // console.log('claiming', spawn.memory.idle_time);
        var msg = spawn.room.energyAvailable + ' ' +
            spawn.room.energyCapacityAvailable + ' ' +
            _.size(Memory.map) + ' ' +
            Game.gcl.level + ' ' + spawn.memory.idle_time + ' lock: ' + spawn.memory.lock;
        // if(spawn.memory.idle_time % 100 === 0) {
        console.log(msg);
        // }
        // Debugger.clog(msg);
        if (spawn.room.energyCapacityAvailable >= 650 && _.size(Memory.map) < Game.gcl.level) {
            if (spawn.memory.idle_time === null) {
                spawn.memory.idle_time = 0;
            }
            spawn.memory.lock = true;
            var body = SpawnBody.constructExpander(spawn.room.energyAvailable);
            var exec = spawn.spawnCreep(body, 'e' + MemoryWrapper.getUnitCount(), {
                memory: {
                    reserved: true,
                    reserved_type: 'claim',
                    reserved_target: _.sample(TargetHelper.getClaimableControllers())
                }
            });

            if (exec === OK) {
                spawn.memory.lock = false;
                spawn.memory.idle_time = 0;
                MemoryWrapper.setUnitCount(MemoryWrapper.getUnitCount() + 1);
            } else {
                // console.log('here?');

                spawn.memory.idle_time = spawn.memory.idle_time + 1;
            }
        } else {
            // console.log('here?');

            spawn.memory.idle_time = spawn.memory.idle_time + 1;
        }
        // console.log(spawn.energyCapacityAvailable);
        if (spawn.memory.idle_time > spawn.room.energyCapacityAvailable) {
            console.log('why not');
            spawn.memory.lock = false;
            spawn.memory.idle_time = 0;
        }
    }
};

module.exports = AtomicSpawn;