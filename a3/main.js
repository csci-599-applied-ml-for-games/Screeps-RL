var Spawn = require('Spawn');
var Creep = require('Creep');
var init = require('init');
module.exports.loop = function () {
    init();

    for (const i in Game.spawns) {
        Spawn.run(Game.spawns[i]);
    }

    for (const i in Game.creeps) {
        Creep.run(Game.creeps[i]);
    }
};
