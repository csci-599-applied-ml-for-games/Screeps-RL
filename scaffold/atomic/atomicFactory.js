var HarvestAtomic = require('harvestAtomic');
var MoveToAtomic = require('moveToAtomic');
var TransferAtomic = require('transferAtomic');

module.exports = class AtomicFactory {
    constructor(agent, atomicString) {
        this.agent = agent;
        return this.rule()[atomicString];
    }

    rule() {
        return {
            'moveTo': MoveToAtomic(this.agent),
            'harvest': HarvestAtomic(this.agent),
            'transfer': TransferAtomic(this.agent)
        }
    }
};