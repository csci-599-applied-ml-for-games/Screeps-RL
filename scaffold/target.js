module.exports = class Target {
    constructor() {

    }

    // map
    example() {
        var mapMemory = Memory.mapMemory;

        var resourceTarget = _.sample(mapMemory.getAllResources());
    }
};
