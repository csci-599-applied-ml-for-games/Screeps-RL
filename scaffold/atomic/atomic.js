module.exports = class Atomic {
    #atomicLock;
    #agent;

    constructor(agent) {
        this.#atomicLock = false;
        this.#agent = agent;
    }

    run() {
        if (this.isAtomicLocked() === false) {
            this.begin();
        } else {

        }
        this.spendTick();
    }

    lock() {
        this.#atomicLock = true;
    }

    begin() {
        this.lock();
    }

    unlock() {
        this.#atomicLock = false;
    }

    end() {
        this.unlock();
    }

    spendTick() {

    }

    isAtomicLocked() {
        return this.#atomicLock;
    }
};
