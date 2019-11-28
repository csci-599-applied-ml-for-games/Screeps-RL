var Debugger = require('Debugger');
var MemoryWrapper = require('MemoryWrapper');
var AtomicCreep = require('Atomic.Creep');
var Rule = require('Rule');
var Target = require('Target');
var Filter = require('Filter');
var Creep = {
    // ACTION_LISTS: ['harvest', 'upgrade', 'scout', 'build'],
    ACTION_LISTS: ['harvest', 'build', 'upgrade'],
    ACTION_SIZE: function () {
        return _.size(Creep.ACTION_LISTS);
    },
    run: function (creep) {
        // Debugger.clog('Creep:run');
        //here we decide.
        if (creep.spawning) return;
        if (!MemoryWrapper.isCreepLocked(creep)) {
            var actions = Creep.ACTION_LISTS;
            var filteredAction = Filter.getPossibleActions(actions);
            if (_.size(filteredAction) === 0) {
                MemoryWrapper.unlockCreep(creep);
                return;
            }
            if (_.size(Game.creeps) < 8) {
                var currentAction = 'harvest';
            } else {
                var currentAction = _.sample(filteredAction);
            }
            var actionIndex = 0;
            // Debugger.clog(creep.name + ' Creep:run:currentAction(set): ' + currentAction + '(' + actionIndex + ')');
            MemoryWrapper.setCreepActionInfo(creep, currentAction);
            Target.setTargetForAction(creep, currentAction);
        } else {
            var actionInfo = MemoryWrapper.getCreepActionInfo(creep);
            var currentAction = actionInfo.action;
            var actionIndex = actionInfo.index;
            // Debugger.clog(creep.name + ' Creep:run:currentAction(get): ' + currentAction + '(' + actionIndex + ')');
        }

        Creep.execute(creep, currentAction, actionIndex);

    },
    execute: function (creep, action, index) {
        let actionRule = Rule.actionRule;
        let atomicRule = {
            'move': AtomicCreep.moveAdjacentTo,
            'move_to': AtomicCreep.moveTo,
            'harvest': AtomicCreep.harvest,
            'transfer': AtomicCreep.transfer,
            'upgrade': AtomicCreep.upgradeController,
            'update_map': AtomicCreep.updateMap,
            'build': AtomicCreep.build,
            'move_upgrade': AtomicCreep.moveAdjacentToForUpgradeController
        };
        //Execute and check if it is done here:
        var currentAtomic = actionRule[action][index];
        // creep.say(action.substring(0,3)+':'+currentAtomic.substring(0,3) + ':' + index);
        atomicRule[currentAtomic](creep, Target.getTarget(creep, index));
        var afterRunActionInfo = MemoryWrapper.getCreepActionInfo(creep);
        if (afterRunActionInfo.index >= actionRule[action].length) {
            // Action done.
            MemoryWrapper.unlockCreep(creep);
        }
    }
};

module.exports = Creep;