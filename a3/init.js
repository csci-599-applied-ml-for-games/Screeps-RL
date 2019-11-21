var Debugger = require('Debugger');
var MemoryWrapper = require('MemoryWrapper');
var init = function () {
    if (_.size(Game.spawns) > 0) {
        if (Memory.init === undefined) {
            Memory.init = true;
            MemoryWrapper.setUnitCount(0);
        }
    } else {
        Memory.init = false;
    }
};
module.exports = init;