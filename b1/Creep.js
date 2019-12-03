var Debugger = require('Debugger');
var MemoryWrapper = require('MemoryWrapper');
var AtomicCreep = require('Atomic.Creep');
var Rule = require('Rule');
var Target = require('Target');
var Filter = require('Filter');
var Weight = require('Weight');
var Creep = {
    // ACTION_LISTS: ['harvest', 'upgrade', 'scout', 'build'],
    ACTION_LISTS: ['harvest', 'build', 'upgrade', 'scout'],
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
            Weight.createIfNull('creep_action', 3, Creep.ACTION_LISTS);
            if (_.size(Game.creeps) < 2) {
                var currentAction = 'harvest';
            } else {
                var currentAction = Weight.decideByWeight('creep_action');
                // var currentAction = _.sample(filteredAction);
            }
            // console.log('setting creep score:' + _.max([Memory.info.harvested_per_tick, 0.00001]));
            creep.memory.score = _.max([Memory.info.harvested_per_tick, 0.00001]);
            // creep.memory.score_timme = Game.time;
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
        var afterRunActionInfo = MemoryWrapper.getCreepActionInfo(creep);
        if (afterRunActionInfo.index >= _.size(actionRule[action])) {
            // Action done.
            // update action score here
            // console.log('done, start update: ' + _.max([Memory.info.harvested_per_tick, 0.00001]));
            Weight.update('creep_action', _.max([Memory.info.harvested_per_tick, 0.00001]) / creep.memory.score, action);
            MemoryWrapper.unlockCreep(creep);
            return;
        }
        //Execute and check if it is done here:
        var currentAtomic = actionRule[action][index];
        // creep.say(action.substring(0,3)+':'+currentAtomic.substring(0,3) + ':' + index);
        atomicRule[currentAtomic](creep, Target.getTarget(creep, index));
    }
};

module.exports = Creep;