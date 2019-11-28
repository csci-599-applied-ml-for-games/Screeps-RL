var Structure = {
    run: function (structure, target) {
        if (structure != null && structure.structureType === STRUCTURE_TOWER) {
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
        }
    }
};

module.exports = Structure;