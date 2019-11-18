var CreepAgent = require('./creepAgent');
var SpawnAgent = require('./spawnAgent');

module.exports = class AgentFactory {
    #rule = {
        'spawn': SpawnAgent,
        'creep': CreepAgent
    };

    constructor(agent, agentType) {
        return new this.#rule[agentType](agent, agentType);
    }
};