var WeightCreepAction = {
    pre: function () {
        if (Memory.weight == null) Memory.weight = {};
        if (Memory.weight.creep_action == null) Memory.weight.creep_action = {};
    },
    set: function (creep, label, value) {
        var key = creep.id;
        // console.log(key);
        if (Memory.weight.creep_action[key] == null) {
            Memory.weight.creep_action[key] = {};
        }
        Memory.weight.creep_action[key][label] = value;
    },
    get: function (creep, label) {
        var key = creep.id;
        if (Memory.weight.creep_action[key] == null) return;
        if (Memory.weight.creep_action[key][label] == null) return;
        return Memory.weight.creep_action[key][label];
    },
};

module.exports = WeightCreepAction;