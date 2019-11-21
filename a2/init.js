var Debugger = require('Debugger');
var init = function () {
    if (_.size(Game.spawns) > 0) {
        if (Memory.init === undefined) {
            Memory.init = true;
        }
    } else {
        Memory.init = false;
    }
};
module.exports = init;