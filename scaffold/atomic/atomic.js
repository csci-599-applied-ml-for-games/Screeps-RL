module.exports = class Atomic {
    #atomicLock;
    #agent;

    constructor(agent) {
        this.#atomicLock = false;
        this.#agent = agent;
    }

    run() {
    }

    lock() {
        this.#atomicLock = true;
    } //set 3 locks

    begin() {
    }

    unlock() {
        this.#atomicLock = false;
    }

    end() {
    }
};
