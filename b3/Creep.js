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
            Weight.createIfNull('creep_action', _.size(Creep.ACTION_LISTS), Creep.ACTION_LISTS);
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
            // console.log(creep.name + ' Creep:run:currentAction(get): ' + currentAction + '(' + actionIndex + ')');
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
        creep.say(action.substring(0, 3) + ':' + currentAtomic.substring(0, 3) + ':' + index);
        atomicRule[currentAtomic](creep, Target.getTarget(creep, index));
    },
    reservedAction: function (creep) {
        switch (creep.memory.reserved_type) {
            case null:
            case undefined:
                return;
            case 'claim':
                var target = creep.memory.reserved_target;
                if (target === undefined) {
                    // creep.suicide();
                    return;
                }
                console.log('target(id): ', target, target.id);
                console.log(creep.name, target.roomName);
                creep.say('c');
                if (creep.memory.reserved_target === undefined || creep.memory.reserved_target === null) {
                    return;
                }
                var cont = Game.getObjectById(target.id);

                if (target.id && Game.getObjectById(target.id).structureType) {
                    if (target.structureType === STRUCTURE_CONTROLLER) {
                        var exec = creep.claimController(Game.getObjectById(target.id));
                        if (exec === OK) {
                            var map = {
                                resourceEnergy: creep.room.find(FIND_STRUCTURES),
                                controller_id: creep.room.controller.id,
                                controller_pos: creep.room.controller.pos,
                                exits: {
                                    l: creep.room.find(FIND_EXIT_LEFT)[0],
                                    t: creep.room.find(FIND_EXIT_TOP)[0],
                                    r: creep.room.find(FIND_EXIT_RIGHT)[0],
                                    b: creep.room.find(FIND_EXIT_BOTTOM)[0]
                                }
                            };
                            Memory.map[creep.room.name] = map;
                            creep.suicide();
                        }
                    }
                } else {
                    AtomicCreep.setRoad(creep, target);
                    var target_pos = new RoomPosition(target.x, target.y, target.roomName);
                    var e = creep.moveTo(target_pos);
                    console.log('tried moving:', target, e);
                    if (creep.pos.isNearTo(target_pos)) {
                        var instance = creep.room.find(FIND_STRUCTURES, {
                            filter: (s) => {
                                return s.structureType === STRUCTURE_CONTROLLER;
                            }
                        });
                        // console.log(instance);
                        if (instance !== undefined && instance[0] !== undefined) {
                            if (!instance[0].my)
                                creep.memory.reserved_target = instance[0];
                        }
                    }
                }
                break;
        }
    }
};

module.exports = Creep;