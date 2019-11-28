var Spawn = require('Spawn');
var Creep = require('Creep');
var init = require('init');
var Requirements = require('Requirements');
var Structure = require('Structure');
const Score = require('Score');
var Weight = require('Weight');
var Debugger = require('Debugger');
module.exports.loop = function () {
    init();
    // init every turn
    Memory.turn = {};
    Memory.turn.harvested = 0;
    Memory.turn.transferred = 0;

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    for (const i in Game.spawns) {
        Spawn.run(Game.spawns[i]);
    }

    for (const i in Game.creeps) {
        Creep.run(Game.creeps[i]);
    }

    for (const i in Game.rooms) {
        Requirements.structures(Game.rooms[i]);
    }

    for (const i in Game.structures) {
        Structure.run(Game.structures[i]);
    }


//    console.log(Memory.turn.harvested + ' ' + Memory.turn.transferred);
    Score.energyPerTick(Memory.turn.harvested, Memory.turn.transferred);
    Debugger.clog(Memory.weight['creep_action'].labels);
    Debugger.clog(Memory.weight['creep_action'].probs);

  };
