var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');

var role = {
    all: function () {
        var a = ['harvester', 'upgrader'];
        return a;
    },
    makeChoice: function () {
        return _.sample(role.all());
    },
    hash: {
        'harvester': harvester,
        'upgrader': upgrader
    }
};

module.exports = role;
