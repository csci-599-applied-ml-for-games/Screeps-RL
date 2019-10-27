var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        creep.say('harv: ' + creep.memory.srcs);

        if (creep.carry.energy < creep.carryCapacity) {
            // console.log(creep.name + ': goingto harvest');
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.srcs]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.srcs]);
            }
        } else { // return
            var targets = Game.spawns;
            var cnt = 0;
            var tgt = null;
            for (var name in Game.spawns) {
                if (cnt == creep.memory.sps) {
                    tgt = Game.spawns[name];
                    break;
                }
                cnt++;
            }
            if (tgt != null) {
                var response = creep.transfer(tgt, RESOURCE_ENERGY);
                if (response == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tgt);
                } else if (response == OK) { // if our spawn dead?
                    var spent = Game.time - creep.memory.st;
                    console.log('Weight adjustment : ' + spent);
                    creep.memory.idle = true;
                    creep.memory.threshold = 0;
                    Memory.weights[creep.memory.srcs] = Memory.weights[creep.memory.srcs] + spent;
                    Memory.totalEnergy += 50;
                }
            }
        }
    }
};

module.exports = roleHarvester;
