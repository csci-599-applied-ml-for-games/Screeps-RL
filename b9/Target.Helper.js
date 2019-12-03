var Execution = require('Execution');
var TargetHelper = {
    // here, we have targets for 'atomic' to execute.
    getMapEnergies: function () {
        var energies = [];
        for (let roomName in Memory.map) {
            if (Memory.map.hasOwnProperty(roomName)) {
                for (let e in Memory.map[roomName].resourceEnergy) {
                    if (Memory.map[roomName].resourceEnergy.hasOwnProperty(e)) {
                        energies.push(Memory.map[roomName].resourceEnergy[e]);
                    }
                }
            }
        }
        //TODO: delete
        // for (ee in energies) {
        //     console.log(energies[ee].id);
        // }
        return energies;
    },
    getMapControllers: function () {
        var controllers = [];
        for (let r in Memory.map) {
            if (Memory.map.hasOwnProperty(r)) {
                var con = Game.getObjectById(Memory.map[r].controller);
                if (con !== null && con.my) {
                    controllers.push(Memory.map[r].controller);
                }
            }
        }
        return controllers;
    },
    getConstructionSites: function (creep) {
        var sites = [];
        // console.log('sites');
        var priority = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        _.map(priority, function (site) {
            sites.push(site.id);
        });
        // sites.concat(creep.room.find(FIND_MY_CONSTRUCTION_SITES));

        if (_.size(sites) < 1) {
            for (let room in Memory.map) {
                if (Memory.map.hasOwnProperty(room)) {
                    let currentRoom = Game.rooms[room];
                    if (currentRoom) {
                        var currentRoomConstructionSite =
                            currentRoom.find(FIND_MY_CONSTRUCTION_SITES);
                        for (let entry in currentRoomConstructionSite) {
                            if (currentRoomConstructionSite[entry]) {
                                if (currentRoomConstructionSite[entry].pos.getRangeTo(creep)) {
                                    sites.push(currentRoomConstructionSite[entry].id);
                                }
                            }
                        }
                    }
                }
            }
        }
        return sites;
    },
    getEnergyReservoir: function () {
        var reservoirs = [];
        for (let room in Memory.map) {
            if (Memory.map.hasOwnProperty(room)) {
                let currentRoom = Game.rooms[room];
                if (currentRoom) {
                    var reserve =
                        currentRoom.find(FIND_MY_STRUCTURES, {
                            filter: (structure) => {
                                return (
                                    structure.structureType == STRUCTURE_CONTAINER ||
                                    structure.structureType == STRUCTURE_STORAGE
                                ) && (structure.my &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                            }
                        });
                    for (let entry in reserve) {
                        if (reserve[entry]) {
                            reservoirs.push(reserve[entry].id);
                        }
                    }
                }
            }
        }
        return reservoirs;
    },
    getEnergyReservoirPriority: function (creep) {
        var reservoirs = [];
        // console.log(creep);
        var priority = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER);
            }
        });
        _.map(priority, function (structure) {
            reservoirs.push(structure.id);
        });
        // console.log(reservoirs);
        if (_.size(reservoirs) < 1) {
            for (let room in Memory.map) {
                if (Memory.map.hasOwnProperty(room)) {
                    let currentRoom = Game.rooms[room];
                    if (currentRoom) {
                        var reserve =
                            currentRoom.find(FIND_MY_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType === STRUCTURE_EXTENSION ||
                                        structure.structureType === STRUCTURE_SPAWN ||
                                        structure.structureType === STRUCTURE_TOWER);
                                }
                            });
                        // console.log(reserve);
                        for (let entry in reserve) {
                            if (reserve[entry]) {
                                reservoirs.push(reserve[entry].id);
                            }
                        }
                    }
                }
            }
        }
        // console.log(reservoirs);
        return reservoirs;
    },
    getGatherableEnergies: function (creep) {
        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
        var reservoirs = [];
        var tombs = [];
        var ruins = [];
        for (let room in Memory.map) {
            if (Memory.map.hasOwnProperty(room)) {
                let currentRoom = Game.rooms[room];
                if (currentRoom != null) {
                    var reserve = currentRoom.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_STORAGE
                            ) && (structure.my &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) !== 0);
                        }
                    });
                    for (let entry in reserve) {
                        if (reserve.hasOwnProperty(entry) && reserve[entry] != null) {
                            reservoirs.push(reserve[entry].id);
                        }
                    }

                    tombs.concat(currentRoom.find(FIND_TOMBSTONES, {
                        filter: (tombstone) => {
                            return tombstone.store.getFreeCapacity() !== 0;
                        }
                    }));

                    ruins.concat(currentRoom.find(FIND_DROPPED_RESOURCES));
                }
            }
        }
        sources.concat(reservoirs);
        sources.concat(tombs);
        sources.concat(ruins);
        return sources;
    },
    getClaimableControllers: function () {
        var controllerPos = [];
        _.map(Memory.scout_map, function (val, key) {
            if (Execution.checkAll([val.controller_pos])) {
                var controller = Game.getObjectById(val.controller_id);
                if (controller && controller.my === false) {
                    controllerPos.push(val.controller_pos);
                }
            }
        });
        return controllerPos;
    }
};

module.exports = TargetHelper;

/*
    RESOURCE_ENERGY: "energy",
    RESOURCE_POWER: "power",

    RESOURCE_HYDROGEN: "H",
    RESOURCE_OXYGEN: "O",
    RESOURCE_UTRIUM: "U",
    RESOURCE_LEMERGIUM: "L",
    RESOURCE_KEANIUM: "K",
    RESOURCE_ZYNTHIUM: "Z",
    RESOURCE_CATALYST: "X",
    RESOURCE_GHODIUM: "G",

    RESOURCE_SILICON: 'silicon',
    RESOURCE_METAL: 'metal',
    RESOURCE_BIOMASS: 'biomass',
    RESOURCE_MIST: 'mist',

    RESOURCE_HYDROXIDE: "OH",
    RESOURCE_ZYNTHIUM_KEANITE: "ZK",
    RESOURCE_UTRIUM_LEMERGITE: "UL",

    RESOURCE_UTRIUM_HYDRIDE: "UH",
    RESOURCE_UTRIUM_OXIDE: "UO",
    RESOURCE_KEANIUM_HYDRIDE: "KH",
    RESOURCE_KEANIUM_OXIDE: "KO",
    RESOURCE_LEMERGIUM_HYDRIDE: "LH",
    RESOURCE_LEMERGIUM_OXIDE: "LO",
    RESOURCE_ZYNTHIUM_HYDRIDE: "ZH",
    RESOURCE_ZYNTHIUM_OXIDE: "ZO",
    RESOURCE_GHODIUM_HYDRIDE: "GH",
    RESOURCE_GHODIUM_OXIDE: "GO",

    RESOURCE_UTRIUM_ACID: "UH2O",
    RESOURCE_UTRIUM_ALKALIDE: "UHO2",
    RESOURCE_KEANIUM_ACID: "KH2O",
    RESOURCE_KEANIUM_ALKALIDE: "KHO2",
    RESOURCE_LEMERGIUM_ACID: "LH2O",
    RESOURCE_LEMERGIUM_ALKALIDE: "LHO2",
    RESOURCE_ZYNTHIUM_ACID: "ZH2O",
    RESOURCE_ZYNTHIUM_ALKALIDE: "ZHO2",
    RESOURCE_GHODIUM_ACID: "GH2O",
    RESOURCE_GHODIUM_ALKALIDE: "GHO2",

    RESOURCE_CATALYZED_UTRIUM_ACID: "XUH2O",
    RESOURCE_CATALYZED_UTRIUM_ALKALIDE: "XUHO2",
    RESOURCE_CATALYZED_KEANIUM_ACID: "XKH2O",
    RESOURCE_CATALYZED_KEANIUM_ALKALIDE: "XKHO2",
    RESOURCE_CATALYZED_LEMERGIUM_ACID: "XLH2O",
    RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE: "XLHO2",
    RESOURCE_CATALYZED_ZYNTHIUM_ACID: "XZH2O",
    RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE: "XZHO2",
    RESOURCE_CATALYZED_GHODIUM_ACID: "XGH2O",
    RESOURCE_CATALYZED_GHODIUM_ALKALIDE: "XGHO2",

    RESOURCE_OPS: "ops",

    RESOURCE_UTRIUM_BAR: 'utrium_bar',
    RESOURCE_LEMERGIUM_BAR: 'lemergium_bar',
    RESOURCE_ZYNTHIUM_BAR: 'zynthium_bar',
    RESOURCE_KEANIUM_BAR: 'keanium_bar',
    RESOURCE_GHODIUM_MELT: 'ghodium_melt',
    RESOURCE_OXIDANT: 'oxidant',
    RESOURCE_REDUCTANT: 'reductant',
    RESOURCE_PURIFIER: 'purifier',
    RESOURCE_BATTERY: 'battery',

    RESOURCE_COMPOSITE: 'composite',
    RESOURCE_CRYSTAL: 'crystal',
    RESOURCE_LIQUID: 'liquid',

    RESOURCE_WIRE: 'wire',
    RESOURCE_SWITCH: 'switch',
    RESOURCE_TRANSISTOR: 'transistor',
    RESOURCE_MICROCHIP: 'microchip',
    RESOURCE_CIRCUIT: 'circuit',
    RESOURCE_DEVICE: 'device',

    RESOURCE_CELL: 'cell',
    RESOURCE_PHLEGM: 'phlegm',
    RESOURCE_TISSUE: 'tissue',
    RESOURCE_MUSCLE: 'muscle',
    RESOURCE_ORGANOID: 'organoid',
    RESOURCE_ORGANISM: 'organism',

    RESOURCE_ALLOY: 'alloy',
    RESOURCE_TUBE: 'tube',
    RESOURCE_FIXTURES: 'fixtures',
    RESOURCE_FRAME: 'frame',
    RESOURCE_HYDRAULICS: 'hydraulics',
    RESOURCE_MACHINE: 'machine',

    RESOURCE_CONDENSATE: 'condensate',
    RESOURCE_CONCENTRATE: 'concentrate',
    RESOURCE_EXTRACT: 'extract',
    RESOURCE_SPIRIT: 'spirit',
    RESOURCE_EMANATION: 'emanation',
    RESOURCE_ESSENCE: 'essence',
 */