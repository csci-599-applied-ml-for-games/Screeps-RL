var TargetHelper = require('Target.Helper');
var Filter = {
    getPossibleActions: function (actions) {
        var possibleActions = [];

        for (let action in actions) {
            let a = actions[action];
            if (a === "build") {
                if (_.size(TargetHelper.getConstructionSites()) === 0) {
                    continue;
                }
            }
            possibleActions.push(a);
        }

        return possibleActions;
    }
};

module.exports = Filter;