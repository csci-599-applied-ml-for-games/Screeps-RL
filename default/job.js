var role = require('role');
var job = {
    perform: function (r, creep) {

        if (r == undefined) {
            creep.memory.idle = true;
            return;
        }

        if (creep.memory.idle == true) {
            creep.memory.srcs = _.random(_.size(creep.room.find(FIND_SOURCES)) - 1);

            while (true && (Memory.naive == true || creep.spawning != true || Memory.naive == true)) {
                Memory.naive == true;
                creep.memory.srcs = _.random(_.size(creep.room.find(FIND_SOURCES)) - 1);
                var u = Memory.weights[creep.memory.srcs];
                var d = _.reduce(Memory.weights, function (sum, n) {
                    return sum + n;
                }, 0);
                var prob = u / d;
                console.log(prob);

                var hat = _.random(0, 1, true);
                console.log(hat);

                if ((1 - prob) > hat) {
                    break;
                }
            }

            console.log('created: ' + creep.memory.srcs);
            creep.memory.sps = _.random(_.size(Game.spawns) - 1);
            creep.memory.st = Game.time;
            job.assign(creep);
        }
        r.run(creep);
    },

    assign: function (unit) {
        unit.memory.idle = false;
    },

    unassign: function (unit) {
        // here we update job weight
        var spent = Game.time - unit.memory.st;
        console.log(spent);
        unit.memory.idle = true;
    },

    match: function (roleString) {
        return role.hash[roleString];
    }
};

module.exports = job;
