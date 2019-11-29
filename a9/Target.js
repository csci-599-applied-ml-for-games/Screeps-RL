var TargetHelper = require('Target.Helper');
var TargetAction = require('Target.Action');
var Rule = require('Rule');
var MemoryWrapper = require('MemoryWrapper');
var TargetAtomic = require('Target.Atomic');
var Execution = require('Execution');
var Target = {
    setTargetForAction: function (creep, action) {
        let behavior = {
            'harvest': TargetAction.harvest,
            'upgrade': TargetAction.upgrade,
            'scout': TargetAction.scout,
            'build': TargetAction.build
        };
        // console.log('setTargetForAction');
        if (behavior[action] == null) {
            //probably testing obj.
            return;
        }
        creep.memory.targets = behavior[action](creep);
        // console.log(creep.memory.targets);
    },
    get: function (creep, id) {
        var obj = Game.getObjectById(id);
        if (obj == null) {
            MemoryWrapper.unlockCreep(creep);
            return;
        }
        return Game.getObjectById(id);
    },
    getTarget: function (creep, index) {
        console.log(creep);
        console.log(creep.memory.targets);
        console.log(index);

        if (Execution.checkAll([
            creep,
            creep.memory.targets,
            creep.memory.targets[index],
            index
        ])) {
            return;
        }
        if (typeof creep.memory.targets[index] === "string" ||
            creep.memory.targets[index] instanceof String) {
            return Target.get(creep, creep.memory.targets[index]);
        }
        return creep.memory.targets[index];
    },
    resetAtomicTarget: function (creep, action, index) {
        let behavior = {
            'transfer': TargetAtomic.transfer
        };
        var atomic = Rule.actionRule[action][index];
        behavior[atomic](creep, action, index);
    }
};

module.exports = Target;