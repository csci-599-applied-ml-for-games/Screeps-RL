var Structure = {
    run: function (structure, target) {
        if (structure.structureType === STRUCTURE_TOWER) {
            var target = structure.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax
            });
            structure.repair(target);
        }
    }
};

module.exports = Structure;