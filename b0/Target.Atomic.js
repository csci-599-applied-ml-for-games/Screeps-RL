const TargetHelper = require('Target.Helper');
var TargetAtomic = {
    transfer: function (creep, action, index) {
        var energyReserviors = TargetHelper.getEnergyReservoir();
        var from = _.sample(energyReserviors);
        creep.memory.targets[index] = from;
        // console.log('target changed');
    }
};

module.exports = TargetAtomic;