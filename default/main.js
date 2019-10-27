var job = require('job');
var util = require('util');
var role = require('role');

module.exports.loop = function () {
    //initialize
    // console.log(Memory.initialized);
    if (Memory.initialized == undefined) {
        Memory.weights = [0, 0, 0, 0, 0, 0, 0, 0];
        Memory.creepCount = 0;
        Memory.creepID = 0;
        Memory.naive = false;
        Memory.startTime = Game.time;
        Memory.totalEnergy = 0;
    }
    Memory.initialized = true;

    var avgEnergy = Memory.totalEnergy / (Game.time - Memory.startTime);
    console.log('avg energy / tick : ' + avgEnergy + ' w: ' + Memory.weights);

    for (var weight in Memory.weights) {
        if (weight > 10000000) {
            for (var weight in Memory.weights) {
                weight = weight / 100000;
            }
            break;
        }
    }

    var hyper_worker_lo = 20;
    var hyper_worker_hi = 500;
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            Memory.weights[Memory.creeps[i].srcs] += 300000;
            Memory.creepCount--;
            // console.log(Memory.creeps[i]);
            delete Memory.creeps[i];
        }
    }

    // console.log('next ID: ' + Memory.creepCount);
    // console.log(Memory.weights);
    // this should be unique id, or else, or ,...
    // util._spawn(Game.spawns['Spawn1'], 'a' + Memory.creepCount, role.all()[0]);

    for (var name in Game.spawns) {
        if (Memory.creepCount < hyper_worker_hi) {
            var sp = Game.spawns[name];
            // util._spawn(sp, creepCount, role.makeChoice());
            if (Memory.creepCount > hyper_worker_lo) {
                util._spawn(Game.spawns['Spawn1'], 'a' + Memory.creepID, _.sample(role.all()));
            } else {
                util._spawn(Game.spawns['Spawn1'], 'a' + Memory.creepID, role.all()[0]);
            }
        }

    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.ticksToLive < 2) {
            Memory.creepCount--;
            // console.log(Memory.creeps[i]);
            delete Memory.creeps[name];
            creep = null;
            continue;
        }
        creep.memory.threshold++;
        // if (creep.memory.idle == true) {
        //     creep.memory.role = _.sample(role.all()[0]);
        // }
        var r = job.match(creep.memory.role);
        job.perform(r, creep);
        if (creep.memory.idle == true) {
            if (Memory.creepCount > hyper_worker_lo) {

                creep.memory.role = _.sample(role.all());

            } else {
                creep.memory.role = role.all()[0];
            }
        }

        if (creep.memory.threshold > 200) {
            var spent = Game.time - creep.memory.st;
            console.log('Weight adjustment : ' + spent * 200);
            creep.memory.idle = true;
            creep.memory.threshold = 0;
            Memory.weights[creep.memory.srcs] = Memory.weights[creep.memory.srcs] + spent * 200;
        }


        // creep.say(creep.memory.role);
    }
};
