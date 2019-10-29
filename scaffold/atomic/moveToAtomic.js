var Atomic = require('atomic.js');
module.exports = class MoveToAtomic extends Atomic {
    constructor(agent) {
        super(agent);
    }
};