var Execution = {
    check: function (val) {
        if (val === null || val === undefined || val == null || val == undefined) {
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
            // console.log(val);
            if (!Execution.check(val)) {
                // console.log('false: ' + val);
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