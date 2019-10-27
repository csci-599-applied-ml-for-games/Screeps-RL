var util = {
    _spawn: function (spawn, id, r) {
        var response = spawn.spawnCreep([WORK, CARRY, MOVE], id, {
            memory: {
                role: r,
                threshold: 0,
                idle: true,
                carried: false
            }
        });
        if (response == OK) {
            Memory.creepCount++;
            Memory.creepID++;
        }
    }
};

module.exports = util;
