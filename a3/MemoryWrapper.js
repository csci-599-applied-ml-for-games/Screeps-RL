var MemoryWrapper = {
    setSpawnWeight: function (value) {
        Memory.spawn_weight = value;
    },

    getSpawnWeight: function () {
        return Memory.spawn_weight;
    },

    setUnitCount: function (value) {
        Memory.unit_count = value;
    },

    getUnitCount: function () {
        // TODO: remove below 3 lines when deployed.
        if (Memory.unit_count === undefined) {
            Memory.unit_count = 0;
        }
        return Memory.unit_count;
    },

    lockCreep: function (creep) {
        creep.memory.lock = true;
    },

    unlockCreep: function (creep) {
        creep.memory.lock = false;
    },

    isCreepLocked: function (creep) {
        return creep.memory.lock;
    },

    setCreepActionInfo: function (creep, action) {
        MemoryWrapper.lockCreep(creep);
        creep.memory.action = {
            action: action,
            index: 0
        };
    },
    getCreepActionInfo: function (creep) {
        return creep.memory.action;
    }

};

module.exports = MemoryWrapper;