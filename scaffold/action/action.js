var AtomicFactory = require('../atomic/atomicFactory');
module.exports = class Action {
    #agent;
    #atomics; // list of Atomic
    #atomicsIndex; // list of Atomic (index)
    #timeStart;
    #queued;
    #actionQueue;

    constructor(agent) {
        this.#agent = agent;
        this.#timeStart = Game.time;
        this.#reserved = false;
        this.#queued = false;
        this.#actionQueue = [];
        this.#atomics = [];
        this.#atomicsIndex = 0;
    }

    lock() {
    }

    start() {
    }

    run() {
    }

    end() {
    }

    unlock() {
    }

    getAgent() {
        return this.#agent;
    }

    setAtomics(atomicsString) {
        _.forEach(atomicsString, function (atomicString) {
            this.#atomics.append(new AtomicFactory(this.getAgent(), atomicString));
        });
    }

    behavior() {

    }

    // all_actions?
    // filter_available_actions

    //action lists now target
    // inherited action: harvest [moveTo(target), harvest(target), moveTo(base), transfer(base)]
    // action.run() lock -> run lists of atomicts -> unlock
};

// random behavior class
// weight class
