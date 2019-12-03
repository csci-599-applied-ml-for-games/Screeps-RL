const TargetHelper = require('Target.Helper');
var TargetAtomic = {
    transfer: function (creep, action, index) {
        var energyReserviors = TargetHelper.getEnergyReservoir();
        var from = _.sample(energyReserviors);
        creep.memory.targets[index] = from;

        if (_.size(energyReserviors) === 0) creep.memory.targets[index] = false;
        // console.log('target changed');
    }
};

module.exports = TargetAtomic;