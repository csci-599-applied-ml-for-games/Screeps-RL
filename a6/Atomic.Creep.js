const MemoryWrapper = require('MemoryWrapper');
const Debugger = require('Debugger');
const Map = require('Map');
const Target = require('Target');
const AtomicCreep = {
    moveToRoom: function (creep, roomName) {
        if (creep.room.name !== target.room.name) {
            creep.moveTo(new R)
        }
    },
    setRoad: function (creep, target) {
        if (_.size(Game.constructionSites) < 5) {
            creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
        }
    },
    moveAdjacentTo: function (creep, target) {
        // Debugger.clog('Creep ' + creep.name + ':AtomicCreep:moveTo');
        //move adjacent to target.
        // console.log(creep.name + ' AtomicCreep:moveAdjacentTo:target.id: ' + target.id);
        // Debugger.clog(_.size(Game.constructionSites));
        AtomicCreep.setRoad(creep, target);
        if (!target) {
            return;
        }
        if (creep.room.name !== target.room.name) {
            creep.moveTo(target.room);
        }
        var t = target.pos;
        if (creep.pos.isNearTo(target)) {
            AtomicCreep.done(creep);
        } else {
            var exec = creep.moveTo(target);
            // console.log(creep.name + ' AtomicCreep:moveAdjacentTo:execution:' + exec)
        }
    },
    moveTo: function (creep, target) {
        AtomicCreep.setRoad(creep, target);
        if (creep.room.name !== target.roomName) {
            creep.moveTo(25, 25);
            AtomicCreep.done(creep);
        } else {
            creep.moveTo(target.x, target.y);
        }
    },
    updateMap: function (creep, target) {
        creep.moveTo(25, 25);
        Map.update(creep);
        // AtomicCreep.done(creep);
    },
    harvest: function (creep, target) {
        //harvest
        if (target.energy === 0) {
            MemoryWrapper.unlockCreep(creep);
        }
        const exec = creep.harvest(target);
        if (exec === OK && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            Memory.turn.harvested += creep.store.getCapacity();
            AtomicCreep.done(creep);
        } else if (exec === ERR_INVALID_TARGET) {
            creep.pickup(target);
        }
    },
    transfer: function (creep, target, energyType = RESOURCE_ENERGY) {
        //transfer
        if (target.store.getFreeCapacity() === 0) {
            let action = MemoryWrapper.getCreepActionInfo(creep);
            Target.resetAtomicTarget(creep, action.action, action.index);
        }
        if (!creep.pos.isNearTo(target)) {
            creep.moveTo(target);
        }
        const exec = creep.transfer(target, energyType);
        if (exec === OK) {
            Memory.turn.transferred += creep.store.getCapacity();
            // console.log(creep.store.getFreeCapacity(RESOURCE_ENERGY) +' '+creep.store.getCapacity());
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) !== 0) {
                let action = MemoryWrapper.getCreepActionInfo(creep);
                Target.resetAtomicTarget(creep, action.action, action.index);
            } else {
                AtomicCreep.done(creep);
            }
        }
        if (target.structureType === STRUCTURE_SPAWN) {
            target.renewCreep(creep);
        }
    },
    moveAdjacentToForUpgradeController: function (creep, target) {
        // Debugger.clog('Creep ' + creep.name + ':AtomicCreep:moveTo');
        //move adjacent to target.
        // console.log(creep.name + ' AtomicCreep:moveAdjacentTo:target.id: ' + target.id);
        AtomicCreep.setRoad(creep, target);
        if (!target) {
            return;
        }
        if (creep.room.name !== target.room.name) {
            creep.moveTo(target.room);
        }
        var t = target.pos;
        creep.upgradeController(target);
        if (creep.pos.isNearTo(target)) {
            AtomicCreep.done(creep);
        } else {
            var exec = creep.moveTo(target);
            if (exec !== OK) {
                creep.upgradeController(target);
            }
            // console.log(creep.name + ' AtomicCreep:moveAdjacentTo:execution:' + exec)
        }
    },
    upgradeController: function (creep, target) {
        //upgradeController
        const exec = creep.upgradeController(target);
        if (creep.store[RESOURCE_ENERGY] <= 0) {
            AtomicCreep.done(creep);
        }
    },
    build: function (creep, target) {
        const exec = creep.build(target);
        if (creep.store[RESOURCE_ENERGY] <= 0) {
            AtomicCreep.done(creep);
        }
    },
    done: function (creep) {
        var actionInfo = MemoryWrapper.getCreepActionInfo(creep);
        MemoryWrapper.setCreepActionInfo(creep, actionInfo.action, actionInfo.index + 1);
    }
};

module.exports = AtomicCreep;