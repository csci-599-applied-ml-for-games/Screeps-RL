var WeightStructure = {
    pre: function () {
        if (Memory.weight == null) Memory.weight = {};
        if (Memory.weight.structure == null) Memory.weight.structure = {};
    },
    set: function (structure, label, value) {
        var key = structure.id;
        // console.log(key);
        if (Memory.weight.structure[key] == null) {
            Memory.weight.structure[key] = {};
        }
        Memory.weight.structure[key][label] = value;
    },
    get: function (structure, label) {
        var key = structure.id;
        if (Memory.weight.structure[key] == null) return;
        if (Memory.weight.structure[key][label] == null) return;
        return Memory.weight.structure[key][label];
    },
    useStructure: function (structure) {
        WeightStructure.set(structure, 'LRU', Game.time);
    },
    use: function (creep) {
        // console.log('use!');
        WeightStructure.pre();
        // console.log('pre');
        var s = WeightStructure.getStructureByPosition(creep);
        if (s == null) return;
        WeightStructure.set(s, 'LRU', Game.time);
    },
    getStructureByPosition: function (creep) {
        // console.log('getSturc');
        var s = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => {
                return ((s.pos.x === creep.pos.x) && (s.pos.y === creep.pos.y));
            }
        });
        // console.log (_.size(s));
        if (_.size(s) === 1) {
            // console.log('road found!');
            s = s[0];
        } else {
            return null;
        }
        return s;
    },
    post: function () {
    }
};

module.exports = WeightStructure;