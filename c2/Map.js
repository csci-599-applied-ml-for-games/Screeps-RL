var Map = {
    update: function (creep) {
//        console.log('updating map: ' + creep.room.name);
        const roomName = creep.room.name;
        if (Memory.scout_map == null) {
            Memory.scout_map = {};
        }
        Memory.scout_map[roomName] = {};
        const room = Game.rooms[roomName];
        if (room == null) return;

        Memory.scout_map[roomName] = {};
        Memory.scout_map[roomName].resource_energy = room.find(FIND_SOURCES);
        if (room.controller) {
            Memory.scout_map[roomName].controller_id = room.controller.id;
            Memory.scout_map[roomName].controller_pos = room.controller.pos;
        }
        Memory.scout_map[roomName].name = room.name;

        var conditions = [FIND_HOSTILE_CREEPS, FIND_HOSTILE_CONSTRUCTION_SITES, FIND_HOSTILE_POWER_CREEPS, FIND_HOSTILE_SPAWNS, FIND_HOSTILE_STRUCTURES];
        Memory.scout_map[roomName].enemy = false;
        _.map(conditions, function (condition) {
            var found = creep.room.find(condition, {
                filter: (f) => {
                    var owner = f.owner.username;
                    if (owner !== "Power Bank") {

                        return true;
                    } else {
                        Memory.scout_map[roomName].enemy_type = owner;
                        return false;
                    }
                }
            });
            if (_.size(found) > 0) {
                var owner = found[0].owner.username;
                Memory.scout_map[roomName].enemy_type = owner;
                Memory.scout_map[roomName].enemy = true;
            }
        });

        Memory.scout_map[roomName].exits = {
            l: room.find(FIND_EXIT_LEFT)[0],
            t: room.find(FIND_EXIT_TOP)[0],
            r: room.find(FIND_EXIT_RIGHT)[0],
            b: room.find(FIND_EXIT_BOTTOM)[0]
        };
    },
    claimed: function (creep) {
        const roomName = creep.room.name;
        if (Memory.map == null) {
            Memory.map = {};
        }
        Memory.map[roomName] = {};
        const room = Game.rooms[roomName];
        if (room == null) return;

        Memory.map[roomName] = {};
        Memory.map[roomName].resource_energy = room.find(FIND_SOURCES);
        if (room.controller) {
            Memory.map[roomName].controller_id = room.controller.id;
            Memory.map[roomName].controller_pos = room.controller.pos;
            Memory.map[roomName].name = room.name;
        }
        Memory.map[roomName].exits = {
            l: room.find(FIND_EXIT_LEFT)[0],
            t: room.find(FIND_EXIT_TOP)[0],
            r: room.find(FIND_EXIT_RIGHT)[0],
            b: room.find(FIND_EXIT_BOTTOM)[0]
        };
    }
};

module.exports = Map;