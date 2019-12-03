var MemoryWrapper = require('MemoryWrapper');
var Debugger = require('Debugger');
var SpawnBody = require('Spawn.Body');
var TargetHelper = require('Target.Helper');
var AtomicSpawn = {
    spawnCreep: function (spawn) {
        if (spawn.memory.idle_time == null) {
            spawn.memory.idle_time = 0;
        }
        var currentRoomCreepSize = spawn.room.find(FIND_MY_CREEPS);
        if (_.size(currentRoomCreepSize) < 25) {
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
            body_count = spawn.room.energyCapacityAvailable - spawn.memory.idle_time * 10;
            var f = _.random(1, spawn.room.energyCapacityAvailable / 200);
            // console.log(f);
            body_count /= f;
            if (body_count < 200) body_count = 200;
            // console.log(body_count);
            var body = SpawnBody.constructWithBase(body_count);

            var exec = spawn.spawnCreep(body, 'u' + MemoryWrapper.getUnitCount(), {
                memory: {
                    lock: false,
                    idle: 0
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

    },
    claim: function (spawn) {
        // console.log('claiming', spawn.memory.idle_time);
        var msg = spawn.room.energyAvailable + ' ' +
            spawn.room.energyCapacityAvailable + ' ' +
            _.size(Memory.map) + ' ' +
            Game.gcl.level + ' ' + spawn.memory.idle_time + ' lock: ' + spawn.memory.lock;
        // if(spawn.memory.idle_time % 100 === 0) {
        //     console.log(msg);
        // }
        // Debugger.clog(msg);
        // console.log(_.size(Memory.map));
        if (spawn.room.energyCapacityAvailable >= 650 && _.size(Memory.map) < Game.gcl.level) {
            if (spawn.memory.idle_time === null) {
                spawn.memory.idle_time = 0;
            }
            spawn.memory.lock = true;
            var body = SpawnBody.constructExpander(spawn.room.energyAvailable);
            var exec = spawn.spawnCreep([MOVE, CLAIM], 'e' + MemoryWrapper.getUnitCount(), {
                memory: {
                    reserved: true,
                    reserved_type: 'claim',
                    reserved_target: _.sample(TargetHelper.getClaimableControllers()),
                    idle: 0
                }
            });

            if (exec === OK) {
                spawn.memory.lock = false;
                spawn.memory.idle_time = 0;
                MemoryWrapper.setUnitCount(MemoryWrapper.getUnitCount() + 1);
            } else {
                // console.log(exec);
                // console.log('here?');

                spawn.memory.idle_time = spawn.memory.idle_time + 1;
            }
        } else {
            // console.log('here?');

            spawn.memory.lock = false;
        }
        // console.log(spawn.energyCapacityAvailable);
        if (spawn.memory.idle_time * 10 > spawn.room.energyCapacityAvailable) {
            // console.log('why not');
            spawn.memory.lock = false;
            spawn.memory.idle_time = 0;
        }
    },
    renew: function (spawn) {
        var creeps = _.filter(Game.creeps, function (creep) {
            return creep.pos.isNearTo(spawn);
        });
        spawn.renewCreep(_.sample(creeps));
    }
};

module.exports = AtomicSpawn;