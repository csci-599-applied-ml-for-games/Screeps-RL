const TargetHelper = require('Target.Helper');
const MemoryWrapper = require('MemoryWrapper');
var Execution = require('Execution');
var TargetAction = {
    checkNull: function (creep, arr) {
        _.map(arr, function (val) {
            if (val == null) {
                MemoryWrapper.unlockCreep(creep);

            }
        })
    },
    harvest: function (creep, action, index) {
        var mapEnergies = creep.room.find(FIND_SOURCES_ACTIVE);
        var to = _.sample(mapEnergies).id;

        var energyReserviors = TargetHelper.getEnergyReservoirPriority(creep);
        if (_.size(energyReserviors) < 1) energyReserviors = TargetHelper.getEnergyReservoir();
        var from = _.sample(energyReserviors);
        TargetAction.checkNull(creep, [to, from]);
        return [to, to, from, from];
    },
    upgrade: function (creep, action, index) {
        var mapEnergies = TargetHelper.getGatherableEnergies(creep);
        // var mapEnergies = creep.room.
        // var mapControllers = TargetHelper.getMapControllers();
        var to = _.sample(mapEnergies).id;
        // var from = _.sample(mapControllers);

        // TargetAction.checkNull(creep, [to, from]);
        return [to, to, null, null];
    },
    scout: function (creep, action, index) {

        // creep.say('scout');
        var room = creep.room;
        var exits = {
            l: creep.room.find(FIND_EXIT_LEFT)[0],
            t: creep.room.find(FIND_EXIT_TOP)[0],
            r: creep.room.find(FIND_EXIT_RIGHT)[0],
            b: creep.room.find(FIND_EXIT_BOTTOM)[0]
        };
        // var exits = creep.room.exits;
        // console.log(exits);
        var to = _.sample(exits);
        // console.log(to);
        TargetAction.checkNull(creep, [to]);
        return [to, to];
    },
    moveRoom: function (creep, action, index) {
        // console.log('move_room');
        if (!Execution.checkAll([creep, Memory.scout_map[creep.room.name]])) {
            return;
        }
        var exits = _.sample(Memory.map);
        var to = Game.rooms[exits.name];
        // console.log(to);
        TargetAction.checkNull(creep, [to]);
        return [to, to];
    },
    build: function (creep, action, index) {
        // move, harvest, move, build
        // console.log('is Creep empty: ' , creep);
        var mapEnergies = TargetHelper.getGatherableEnergies(creep);
        var to = _.sample(mapEnergies).id;
        var constructionSites = TargetHelper.getConstructionSites(creep);
        var from = _.sample(constructionSites);

        TargetAction.checkNull(creep, [to, from]);
        return [to, to, from, from];
    }
};

module.exports = TargetAction;
