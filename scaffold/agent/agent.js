module.exports = class Agent {
    #instance;
    #action;

    constructor(instance, type) { // according to agent Type, agents...
        this.#instance = instance;
        this.#atomicLock = false;
        this.#actionLock = false;
    }

    setAction(atomicString) {

    }

    run() {
        // if available, random(Action), random(Target)
        //  setAction()
        // if not available, keep up the good work.
        //  action.run()

    }
    // creepAgent.run(); creeplock -> action -> creepunlock;
};