const TargetHelper = require('Target.Helper');
var TargetAction = {
    harvest: function (creep, action, index) {
        // from - to relationship.
        var mapEnergies = TargetHelper.getMapEnergies();
        var to = _.sample(mapEnergies).id;
        var energyReserviors = TargetHelper.getEnergyReservoir();
        var from = _.sample(energyReserviors);
        for (const i in energyReserviors) {
            // console.log(energyReserviors[i]);
        }
        return [to, to, from, from];
    },
    upgrade: function (creep, action, index) {
        // from - to relationship.
        var mapEnergies = TargetHelper.getGatherableEnergies();
        var mapControllers = TargetHelper.getMapControllers();
        var to = _.sample(mapEnergies).id;
        var from = _.sample(mapControllers);
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
        return [to, to];
    },
    build: function (creep, action, index) {
        // move, harvest, move, build
        var mapEnergies = TargetHelper.getGatherableEnergies();
        var to = _.sample(mapEnergies).id;
        var constructionSites = TargetHelper.getConstructionSites();
        var from = _.sample(constructionSites);
        return [to, to, from, from];
    }
};

module.exports = TargetAction;
