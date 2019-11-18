var Action = require('./action/action');
var AgentFactory = require('./agent/agentFactory');
module.exports.loop = function () {
    //init
    if (Memory.init === undefined) {
        Memory.init = true;
        Memory.agents = new Array(1).fill(new AgentFactory(Game.spawns[0], 'spawn'));

    }
    //end of init

    Memory.agents.forEach(function (agent) {
        agent.run();
    });
};
