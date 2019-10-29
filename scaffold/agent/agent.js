module.exports = class Agent {
    #agent;
    #action;
    #type; // given
    #atomicLock;
    #actionLock;
    #rule;

    constructor(agent, type) { // according to agent Type, agents...
        this.#agent = agent;
        this.#atomicLock = false;
        this.#actionLock = false;
        this.#rule = this.constructRule(); // bring from setting file
        return this.#rule[type];
    }

    setAction(atomicString) {

    }

    constructRule() {
        return {
            'spawn': 'new agent.. spawnAgent',
            'creep': 'creepAgent',
        }
    }

    // creepAgent.run(); creeplock -> action -> creepunlock;
};