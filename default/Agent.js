module.exports = class Agent {

    constructor(instance) { // according to agent Type, agents...
        this.instance = instance;
    }

    setAction(atomicString) {

    }

    run() {
        Memory.debugger.cs('Agent:run');
        // if available, random(Action), random(Target)
        //  setAction()
        // if not available, keep up the good work.
        //  action.run()
    }
    // creepAgent.run(); creeplock -> action -> creepunlock;
};