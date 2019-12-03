var Spawn = require('Spawn');
var Creep = require('Creep');
var init = require('init');
var Requirements = require('Requirements');
var Structure = require('Structure');
const Score = require('Score');
var Weight = require('Weight');
var Debugger = require('Debugger');
var Execution = require('Execution');
var TargetHelper = require('Target.Helper');
module.exports.loop = function () {
    init();

    _.map(Memory.map, function(val, roomName) {
       // console.log('val : '+val+', room name: '+roomName+'');
        var room = Game.rooms[roomName];
        if (!Execution.check(room)) {
            delete Memory.map[roomName];
        }
        if (Execution.check(room.controller.my) && room.controller.my === false) {
            delete Memory.map[roomName];
        }

    });

    for(var name in Memory.creeps) {
        if(!Execution.check(Game.creeps[name])) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    _.map(Game.rooms, function(room, val) {
       // console.log('val : '+val+', room name: '+room+'');
        if (!Execution.check(room)) {
            delete Memory.rooms[room.name];
        }
        room.memory.turn = {};
        room.memory.turn.harvested = 0.0;
        room.memory.turn.transferred = 0.0;
    });

    _.map(Game.spawns, function(val, key) {
        Spawn.run(val);
    });

    _.map(Game.creeps, function(creep) {
        if (creep.memory.reserved == null || !creep.memory.reserved) {
            Creep.run(creep);
        } else {
            Creep.reservedAction(creep);
        }
    });

    _.map(Game.rooms, function(room) {
        Requirements.structures(room);
        Requirements.constructionSites(room);
        Score.energyPerTick(room.memory.turn.harvested, room.memory.turn.transferred);
    });

    for (const i in Game.structures) {
        Structure.run(Game.structures[i]);
    }

    //Debugger.clog(Memory.weight['creep_action'].labels);
    //Debugger.clog(Memory.weight['creep_action'].probs);
    Debugger.clog('TERRITORY: ' + _.size(Memory.map));
    Debugger.clog('GCL: ' + Game.gcl.level + ' ' + Game.gcl.progress + ' ' + Game.gcl.progressTotal);
  };
