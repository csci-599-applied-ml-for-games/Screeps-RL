/* TODO: Each bodyparts with 50 dimensions will tell us, how it supposed to be clustered in the regard of score.
    e.g. [MOVE, MOVE, MOVE] -> scout score
    e.g. [WORK, WORK, CARRY, CARRY, MOVE, MOVE] -> economic score
*/
var Weight = require('Weight');
var SpawnBody = {
    constructWithBase: function (energy) {
        // TODO: Greedy approach.
        // var cost = 200;
        // var parts = [CARRY, WORK, MOVE];

        // Weight.init();
        // Weight.createIfNull('spawn.body', 3, [MOVE, WORK, CARRY]);

        var parts = [MOVE, WORK, CARRY];
        var cost = 200;
        // console.log('e' + energy);
        for (var i = 0; i < 50; ++i) {
            if (cost + SpawnBody.getCost(SpawnBody.BODY_PARTS_ECO[i % 3]) < energy) {
                parts.push(SpawnBody.BODY_PARTS_ECO[i % 3]);
                cost += SpawnBody.getCost(SpawnBody.BODY_PARTS_ECO[i % 3]);
            }

        }
        // console.log(parts);
        // console.log(cost);
        return parts;
    },
    constructExpander: function (energy) {
        var parts = SpawnBody.BODY_PARTS_CLAIM;
        var cost = 650;

        for (var i = 0; i < 50; ++i) {
            if (cost + SpawnBody.getCost(SpawnBody.BODY_PARTS_ECO[i % 3]) < energy) {
                parts.push(SpawnBody.BODY_PARTS_CLAIM[i % 2]);
                cost += SpawnBody.getCost(SpawnBody.BODY_PARTS_ECO[i % 2]);
            }
        }
        return parts;
    },
    BODY_PARTS: [MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, TOUGH, HEAL, CLAIM],
    BODY_PARTS_ECO: [MOVE, WORK, CARRY],
    BODY_PARTS_CLAIM: [MOVE, CLAIM],
    getCost: function (bodyPart) {
        return BODYPART_COST[bodyPart];
    }
};

module.exports = SpawnBody;

/*
https://docs.screeps.com/api/#Constants
    MOVE: "move",
    WORK: "work",
    CARRY: "carry",
    ATTACK: "attack",
    RANGED_ATTACK: "ranged_attack",
    TOUGH: "tough",
    HEAL: "heal",
    CLAIM: "claim",

    BODYPART_COST: {
        "move": 50,
        "work": 100,
        "attack": 80,
        "carry": 50,
        "heal": 250,
        "ranged_attack": 150,
        "tough": 10,
        "claim": 600
    },
 */