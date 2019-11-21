var Debugger = require('Debugger');
var MemoryWrapper = require('MemoryWrapper');
var AtomicCreep = require('Atomic.Creep');
var Creep = {
    ACTION_LISTS: ['harvest', 'upgrade'],
    ACTION_SIZE: function () {
        return _.size(Creep.ACTION_LISTS);
    },
    run: function (creep) {
        Debugger.clog('Creep:run');
        //here we decide.
        if (!MemoryWrapper.isCreepLocked(creep)) {
            var currentAction = _.sample(Creep.ACTION_LISTS);
            var actionIndex = 0;
            Debugger.clog(creep.name + ' Creep:run:currentAction(set): ' + currentAction + '(' + actionIndex + ')');
            MemoryWrapper.setCreepActionInfo(creep, currentAction);
        } else {
            var actionInfo = MemoryWrapper.getCreepActionInfo(creep);
            var currentAction = actionInfo.action;
            var actionIndex = actionInfo.index;
            Debugger.clog(creep.name + ' Creep:run:currentAction(get): ' + currentAction + '(' + actionIndex + ')');
        }

        Creep.execute(creep, currentAction, actionIndex);

    },
    execute: function (creep, action, index) {
        let rule = {
            'harvest': ['move', 'harvest', 'move', 'transfer'],
            'upgrade': ['move', 'harvest', 'move', 'upgrade']
        };

        Debugger.clog(rule[action][index]);
    }
};

module.exports = Creep;