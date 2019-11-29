const TargetHelper = require('Target.Helper');
const MemoryWrapper = require('MemoryWrapper');
var TargetAction = {
    checkNull: function (creep, arr) {
        _.map(arr, function (val) {
            if (val == null) {
                MemoryWrapper.unlockCreep(creep);

            }
        })
    },
    harvest: function (creep, action, index) {
        // from - to relationship.
        var mapEnergies = TargetHelper.getMapEnergies();
        var to = _.sample(mapEnergies).id;
        var energyReserviors = TargetHelper.getEnergyReservoirPriority();
        if (_.size(energyReserviors) < 1) energyReserviors = TargetHelper.getEnergyReservoir();
        var from = _.sample(energyReserviors);
        TargetAction.checkNull(creep, [to, from]);
        return [to, to, from, from];
    },
    upgrade: function (creep, action, index) {
        // from - to relationship.
        var mapEnergies = TargetHelper.getGatherableEnergies();
        var mapControllers = TargetHelper.getMapControllers();
        var to = _.sample(mapEnergies).id;
        var from = _.sample(mapControllers);

        TargetAction.checkNull(creep, [to, from]);
        return [to, to, from, from];
    },
    scout: function (creep, action, index) {
        // console.log(creep);
        // console.log(creep.room);
        // console.log(creep.room.name);
        var exits = Memory.map[creep.room.name].exits;
        // console.log(exits);
        var to = _.sample(exits);
        // console.log(to);
        // console.log(to.toString());
        // while(to !== undefined) {
        //     to = _.sample(exits);
        //     console.log(to);
        // }

        TargetAction.checkNull(creep, [to]);
        return [to, to];
    },
    build: function (creep, action, index) {
        // move, harvest, move, build
        var mapEnergies = TargetHelper.getGatherableEnergies();
        var to = _.sample(mapEnergies).id;
        var constructionSites = TargetHelper.getConstructionSites();
        var from = _.sample(constructionSites);

        TargetAction.checkNull(creep, [to, from]);
        return [to, to, from, from];
    }
};

module.exports = TargetAction;
