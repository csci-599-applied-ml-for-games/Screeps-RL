var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        creep.say('upg: ' + creep.memory.srcs);
        if (creep.carry.energy < creep.carryCapacity && creep.memory.carried == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.srcs]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.srcs]);
            }

        } else if (creep.memory.carried == true || creep.carry.energy == creep.carryCapacity) { // return
            creep.memory.carried = true;
            var response = creep.upgradeController(creep.room.controller);
            if (response == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            } else if (response == OK && creep.carry.energy < 2) { // if our spawn dead?
                var spent = Game.time - creep.memory.st;
                console.log('Weight adjustment : ' + spent);
                creep.memory.idle = true;
                creep.memory.threshold = 0;
                creep.memory.carried = false;
                // Memory.weights[creep.memory.srcs] = Memory.weights[creep.memory.srcs] + spent;
            }
        }
    }
};

module.exports = roleUpgrader;
