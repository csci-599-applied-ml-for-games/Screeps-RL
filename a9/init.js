var Debugger = require('Debugger');
var MemoryWrapper = require('MemoryWrapper');
var init = function () {
    // if
    if (_.size(Game.spawns) > 0) {
        if (Memory.init === undefined || Memory.init === false) {
            Memory.init = true;
            Memory.startTime = Game.time;
            // scout
            Memory.scout = {};
            Memory.scout.occupied = {};
            // information
            Memory.info = {};
            Memory.info.harvested = 1;
            Memory.info.transferred = 1;
            Memory.info.harvested_per_tick = 0.00001;
            Memory.info.transferred_per_tick = 0.00001;
            // score
            Memory.score = {};
            Memory.score.energy_per_tick = 0.0;
            MemoryWrapper.setUnitCount(0);
            // weight
            Memory.weight = {};
            // Initialize Map.
            var map = {};
            for (const i in Game.rooms) {

                Memory.scout.occupied[Game.rooms[i].name] = true;
                map[Game.rooms[i].name] = {};
                map[Game.rooms[i].name].resourceEnergy = Game.rooms[i].find(FIND_SOURCES);
                map[Game.rooms[i].name].controller = Game.rooms[i].controller.id;
                map[Game.rooms[i].name].exits = {
                    l: Game.rooms[i].find(FIND_EXIT_LEFT)[0],
                    t: Game.rooms[i].find(FIND_EXIT_TOP)[0],
                    r: Game.rooms[i].find(FIND_EXIT_RIGHT)[0],
                    b: Game.rooms[i].find(FIND_EXIT_BOTTOM)[0]
                };
            }
            Memory.map = map;

        }
    } else {
        Memory.init = false;
    }
};
module.exports = init;