var Execution = {
    check: function (val) {
        if (val === null || val === undefined) {
            return false;
        }
        if (val === Infinity || val === -Infinity) {
            console.log('err: val = ' + val);
            return false;
        }
        return true;
    },
    checkAll: function (valList) {
        _.map(valList, function (val) {
            if (!Execution.check(val)) {
                return false;
            }
        });
        return true;
    },
    checkOrExecute: function (val, func) {
        if (Execution.check(val)) {
            func();
        }
    }
};

module.exports = Execution;