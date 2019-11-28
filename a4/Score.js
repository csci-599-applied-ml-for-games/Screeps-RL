var Debugger = require('Debugger');
var Score = {
    energyPerTick: function (energy, energy2) {
        var time = Game.time - Memory.startTime;
        var h = Memory.info.harvested;
        var t = Memory.info.transferred;

        h = ((time - 1) * h + energy) / time;
        t = ((time - 1) * t + energy2) / time;
        Memory.info.harvested = h;
        Memory.info.transferred = t;

        Debugger.clog(h + ' ' + t);
    }
};

module.exports = Score;