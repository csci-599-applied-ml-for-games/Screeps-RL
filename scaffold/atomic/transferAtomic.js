var Atomic = require('atomic.js');
module.exports = class TransferAtomic extends Atomic {
    constructor(agent) {
        super(agent);
    }
};