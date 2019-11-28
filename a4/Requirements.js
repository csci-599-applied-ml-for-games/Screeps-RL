var Debugger = require('Debugger');
var Requirements = {
    closeToRoad: function (room, x, y) {
        if (x < 1 || x > 48 || y < 1 || y > 48) return false;
        var positions = room.lookAtArea(
            y - 1, x - 1, y + 1, x + 1, true
        );
        for (const i in positions) {
            var pos = positions[i];
            if (pos != null && pos.type === 'structure') {
                if (pos.structure.structureType === STRUCTURE_ROAD) {
                    return true;
                }
            }
        }
        return false;
    },
    structures: function (room) {
        var debug_log = "";
        if (room != null && room.controller !== undefined) {
            var lv = room.controller.level;
            if (lv == null || lv === undefined) return;
            var structureRequirements = {
                1: {
                    STRUCTURE_ROAD: -1,
                    extension: 0,
                    container: 5,
                    extractor: 0,
                    factory: 0,
                    lab: 0,
                    link: 0,
                    nuker: 0,
                    observer: 0,
                    powerSpawn: 0,
                    rampart: 0,
                    spawn: 1,
                    storage: 0,
                    terminal: 0,
                    tower: 0,
                    wall: 0,
                },
                2: {
                    STRUCTURE_ROAD: -1,
                    extension: 5,
                    container: 5,
                    extractor: 0,
                    factory: 0,
                    lab: 0,
                    link: 0,
                    nuker: 0,
                    observer: 0,
                    powerSpawn: 0,
                    rampart: 0,
                    spawn: 1,
                    storage: 0,
                    terminal: 0,
                    tower: 0,
                    wall: 0,
                },
                3: {
                    STRUCTURE_ROAD: -1,
                    extension: 10,
                    container: 5,
                    extractor: 0,
                    factory: 0,
                    lab: 0,
                    link: 0,
                    nuker: 0,
                    observer: 0,
                    powerSpawn: 0,
                    rampart: 0,
                    spawn: 1,
                    storage: 0,
                    terminal: 0,
                    tower: 1,
                    wall: 0,
                },
                4: {
                    STRUCTURE_ROAD: -1,
                    extension: 20,
                    container: 5,
                    extractor: 0,
                    factory: 0,
                    lab: 0,
                    link: 0,
                    nuker: 0,
                    observer: 0,
                    powerSpawn: 0,
                    rampart: 0,
                    spawn: 1,
                    storage: 1,
                    terminal: 0,
                    tower: 1,
                    wall: 0,
                },
                5: {
                    STRUCTURE_ROAD: -1,
                    extension: 30,
                    container: 5,
                    extractor: 0,
                    factory: 0,
                    lab: 0,
                    link: 2,
                    nuker: 0,
                    observer: 0,
                    powerSpawn: 0,
                    rampart: 0,
                    spawn: 1,
                    storage: 1,
                    terminal: 0,
                    tower: 2,
                    wall: 0,
                },
                6: {
                    STRUCTURE_ROAD: -1,
                    extension: 40,
                    container: 5,
                    extractor: 1,
                    factory: 0,
                    lab: 3,
                    link: 3,
                    nuker: 0,
                    observer: 0,
                    powerSpawn: 0,
                    rampart: 0,
                    spawn: 1,
                    storage: 1,
                    terminal: 1,
                    tower: 2,
                    wall: 0,
                },
                7: {
                    STRUCTURE_ROAD: -1,
                    extension: 50,
                    container: 5,
                    extractor: 1,
                    factory: 1,
                    lab: 6,
                    link: 4,
                    nuker: 0,
                    observer: 0,
                    powerSpawn: 0,
                    rampart: 0,
                    spawn: 1,
                    storage: 1,
                    terminal: 0,
                    tower: 3,
                    wall: 0,
                },
                8: {
                    STRUCTURE_ROAD: -1,
                    extension: 60,
                    container: 5,
                    extractor: 1,
                    factory: 1,
                    lab: 10,
                    link: 6,
                    nuker: 0,
                    observer: 1,
                    powerSpawn: 0,
                    rampart: 0,
                    spawn: 1,
                    storage: 1,
                    terminal: 0,
                    tower: 6,
                    wall: 0,
                }
            };

            var requirement = structureRequirements[lv];

            var structureType = [STRUCTURE_EXTENSION, STRUCTURE_TOWER, STRUCTURE_CONTAINER, STRUCTURE_EXTRACTOR,
                STRUCTURE_FACTORY, STRUCTURE_LAB, STRUCTURE_SPAWN, STRUCTURE_STORAGE, STRUCTURE_LINK,
                STRUCTURE_TERMINAL, STRUCTURE_OBSERVER];

            // var debug_log = "";
            for (const st in structureType) {
                // console.log(structureType[st]);
                // console.log(requirement.extension);
                if (structureType.hasOwnProperty(st)) {
                    var x = _.random(0, 50);
                    var y = _.random(0, 50);
                    // console.log(_.toJ);
                    var z = _.size(room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType === structureType[st];
                        }
                    }));
                    // console.log(structureType[st] + ': ' + z + '/' + requirement[structureType[st]]);
                    if (_.size(room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType === structureType[st];
                        }
                    })) < requirement[structureType[st]]) {
                        // console.log(structureType[st] + ': ' + z + '/' + requirement[structureType[st]]);
                        if (Requirements.closeToRoad(room, x, y)) {
                            room.createConstructionSite(x, y, structureType[st]);
                        }
                    }
                }
            }
        }
    }
};

module.exports = Requirements;

/*
    STRUCTURE_SPAWN: "spawn",
    STRUCTURE_EXTENSION: "extension",
    STRUCTURE_ROAD: "road",
    STRUCTURE_WALL: "constructedWall",
    STRUCTURE_RAMPART: "rampart",
    STRUCTURE_KEEPER_LAIR: "keeperLair",
    STRUCTURE_PORTAL: "portal",
    STRUCTURE_CONTROLLER: "controller",
    STRUCTURE_LINK: "link",
    STRUCTURE_STORAGE: "storage",
    STRUCTURE_TOWER: "tower",
    STRUCTURE_OBSERVER: "observer",
    STRUCTURE_POWER_BANK: "powerBank",
    STRUCTURE_POWER_SPAWN: "powerSpawn",
    STRUCTURE_EXTRACTOR: "extractor",
    STRUCTURE_LAB: "lab",
    STRUCTURE_TERMINAL: "terminal",
    STRUCTURE_CONTAINER: "container",
    STRUCTURE_NUKER: "nuker",
    STRUCTURE_FACTORY: "factory",
    STRUCTURE_INVADER_CORE: "invaderCore"
 */