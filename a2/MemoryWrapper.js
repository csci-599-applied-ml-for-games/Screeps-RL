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
        return Memory.unit_count;
    }
};

module.exports = MemoryWrapper;