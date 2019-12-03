var Debugger = require('Debugger');
var Score = {
    energyPerTick: function (energy, energy2) {
        var time = Game.time - Memory.startTime; //TODO: average life of creep.
        var h = Memory.info.harvested;
        var t = Memory.info.transferred;

        h = ((1500 - 1) * h + energy) / 1500;
        t = ((1500 - 1) * t + energy2) / 1500;
        Memory.info.harvested = h;
        Memory.info.transferred = t;
        Memory.info.harvested_per_tick = h;
        Memory.info.transferred_per_tick = t;
        Debugger.clog(h + ' ' + t);
    }
};

module.exports = Score;