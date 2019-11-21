var CreepAgent = require('./Agent.CreepAgent');
var SpawnAgent = require('./Agent.SpawnAgent');

module.exports = class AgentFactory {
    // TODO: singleton
    constructor() {
    }

    create(agent, agentType) {
        Memory.debugger.cs('AgentFactory:create:(' + agent + ', ' + agentType + ')');
        let rule = {
            'spawn': new SpawnAgent(agent),
            'creep': new CreepAgent(agent)
        };
        return rule[agentType];
    }
};