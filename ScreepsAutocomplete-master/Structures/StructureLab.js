/**
 *
 * @class
 * @extends {OwnedStructure}
 *
 * @see {@link http://support.screeps.com/hc/en-us/articles/208436195-StructureLab}
 */
StructureLab = function () {
};

StructureLab.prototype =
    {
        /**
         * The amount of game ticks the lab has to wait until the next reaction is possible.
         *
         * @see {@link http://support.screeps.com/hc/en-us/articles/208436195-StructureLab#cooldown}
         *
         * @type {number}
         */
        cooldown: 0,

        /**
         * The amount of energy containing in the lab. Energy is used for boosting creeps.
         *
         * @see {@link http://support.screeps.com/hc/en-us/articles/208436195-StructureLab#energy}
         *
         * @type {number}
         */
        energy: 0,

        /**
         * The total amount of energy the lab can contain.
         *
         * @see {@link http://support.screeps.com/hc/en-us/articles/208436195-StructureLab#energyCapacity}
         *
         * @type {number}
         */
        energyCapacity: 0,

        /**
         * The amount of mineral resources containing in the lab.
         *
         * @see {@link http://support.screeps.com/hc/en-us/articles/208436195-StructureLab#mineralAmount}
         *
         * @type {number}
         */
        mineralAmount: 0,

        /**
         * The type of minerals containing in the lab.
         * Labs can contain only one mineral type at the same time.
         *
         * @see {@link http://support.screeps.com/hc/en-us/articles/208436195-StructureLab#mineralType}
         *
         * @type {string}
         */
        mineralType: "",

        /**
         * The total amount of minerals the lab can contain.
         *
         * @see {@link http://support.screeps.com/hc/en-us/articles/208436195-StructureLab#mineralCapacity}
         *
         * @type {number}
         */
        mineralCapacity: 0,

        /**
         * Boosts creep body part using the containing mineral compound.
         * The creep has to be at adjacent square to the lab.
         *
         * @see {@link http://support.screeps.com/hc/en-us/articles/208436195-StructureLab#boostCreep}
         *
         * @type {function}
         *
         * @param {Creep} creep The target creep.
         * @param {number|undefined|null} [bodyPartsCount] The number of body parts of the corresponding type to be boosted. Body parts are always counted left-to-right for TOUGH, and right-to-left for other types. If undefined, all the eligible body parts are boosted.
         *
         * @return {number|OK|ERR_NOT_OWNER|ERR_NOT_FOUND|ERR_NOT_ENOUGH_RESOURCES|ERR_INVALID_TARGET|ERR_NOT_IN_RANGE}
         */
        boostCreep: function (creep, bodyPartsCount) {
        },

        /**
         * Immediately remove boosts from the creep and drop 50% of the mineral compounds used to boost it onto the ground regardless of the creep's remaining time to live.
         * The creep has to be at adjacent square to the lab. Unboosting requires cooldown time equal to the total sum of the reactions needed to produce all the compounds applied to the creep.
         *
         * @see {@link https://docs.screeps.com/api/#StructureLab.unboostCreep}
         *
         * @type {function}
         *
         * @param {Creep} creep The target creep.
         *
         * @return {number|OK|ERR_NOT_OWNER|ERR_NOT_FOUND|ERR_INVALID_TARGET|ERR_NOT_IN_RANGE|ERR_TIRED}
         */
        unboostCreep: function (creep) {
        },


        /**
         * Produce mineral compounds using reagents from two another labs.
         * The same input labs can be used by many output labs.
         *
         * @see {@link http://support.screeps.com/hc/en-us/articles/208436195-StructureLab#runReaction}
         *
         * @type {function}
         *
         * @param {StructureLab} lab1 The first source lab.
         * @param {StructureLab} lab2 The second source lab.
         *
         * @return {number|OK|ERR_NOT_OWNER|ERR_NOT_ENOUGH_RESOURCES|ERR_INVALID_TARGET|ERR_FULL|ERR_NOT_IN_RANGE|ERR_INVALID_ARGS|ERR_TIRED}
         */
        runReaction: function (lab1, lab2) {
        },

    };
