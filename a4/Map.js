var Map = {
    update: function (creep) {
//        console.log('updating map: ' + creep.room.name);
        const roomName = creep.room.name;
        if (!Memory.map.hasOwnProperty(roomName)) {
            const room = Game.rooms[roomName];
            if (room === null || room === undefined) {
            } else {
                Memory.map[roomName] = {};
                Memory.map[roomName].resourceEnergy = room.find(FIND_SOURCES);
                if (room.controller) {
                    Memory.map[roomName].controller = room.controller.id;
                }
                Memory.map[roomName].exits = {
                    l: room.find(FIND_EXIT_LEFT)[0],
                    t: room.find(FIND_EXIT_TOP)[0],
                    r: room.find(FIND_EXIT_RIGHT)[0],
                    b: room.find(FIND_EXIT_BOTTOM)[0]
                };
            }
        }
    }
};

module.exports = Map;