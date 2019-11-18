var Action = require('scaffold/action/action');
module.exports.loop = function () {
    var action = new Action('name');
    action.consoleName();
};
