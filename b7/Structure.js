const WeightStructure = require('Weight.Structure');
var Structure = {
    run: function (structure, target) {
        if (structure == null) return;
        if (structure.structureType === STRUCTURE_TOWER) {
            var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                structure.attack(closestHostile);
            }
            var targets = structure.room.find(FIND_STRUCTURES, {
                filter: (s) => (s.hits < s.hitsMax / 2)
                    && (s.ticksToDecay != null)
            });
            var target = _.sample(targets);
            structure.repair(target);
        } else if (structure.structureType === STRUCTURE_ROAD) {
            var LRU = WeightStructure.get(structure, 'LRU');
            if (LRU > 30000) {
                console.log('structure :[' + structure.id + '] destroyed due to LRU');
                structure.destroy();
            }
        }
    }
};

module.exports = Structure;