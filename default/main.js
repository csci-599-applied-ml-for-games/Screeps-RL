var AgentFactory = require('Agent.Factory');
var Debugger = require('Debugger');
module.exports.loop = function () {
    //init
    Console.log('Spawns: ' + _.size(Game.spawns));
    if (_.size(Game.spawns) > 0) {
        if (Memory.init === undefined) {
            Memory.init = true;
            Memory.debugger = new Debugger(100);
            Memory.debugger.cs('Debugger init');
            Memory.agentFactory = new AgentFactory();
            Memory.agents = new Array(1).fill(Memory.agentFactory.create(Game.spawns['starting'], 'spawn'));
        }
    }
    //end of init

    Memory.agents.forEach(function (agent) {
        agent.run();
    });
};
