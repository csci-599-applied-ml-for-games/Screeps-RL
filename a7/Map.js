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
        }
        Memory.scout_map[roomName].exits = {
            l: room.find(FIND_EXIT_LEFT)[0],
            t: room.find(FIND_EXIT_TOP)[0],
            r: room.find(FIND_EXIT_RIGHT)[0],
            b: room.find(FIND_EXIT_BOTTOM)[0]
        };
    }
};

module.exports = Map;