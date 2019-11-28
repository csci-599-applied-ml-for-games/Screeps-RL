/* TODO: Each bodyparts with 50 dimensions will tell us, how it supposed to be clustered in the regard of score.
    e.g. [MOVE, MOVE, MOVE] -> scout score
    e.g. [WORK, WORK, CARRY, CARRY, MOVE, MOVE] -> economic score
*/
var SpawnBody = {
    construct: function (maxEnergy) {
        // TODO: Greedy approach.
        var cost = 0;
        var parts = [];

        while (true) {
            var part = _.sample(SpawnBody.BODY_PARTS);
            if (SpawnBody.getCost(part) + cost > maxEnergy) {
                break;
            }
            cost += SpawnBody.getCost(part);
            parts.push(part);
        }
        return parts;
    }, BODY_PARTS: [MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, TOUGH, HEAL, CLAIM],
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