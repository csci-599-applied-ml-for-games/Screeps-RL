var Weight = {
    init: function () {
        if (Memory.weight == null) Memory.weight = {};
    },
    createIfNull: function (name, size, labels) {
        if (Memory.weight[name] == null) {
            var probs = Weight.generate(size);
            Weight.update(name, probs, labels);
        }
    },
    generate: function (size) {
        var probs = [];
        var instance = 1 / size;
        for (var i = 0; i < size; ++i) {
            probs.push(instance);
        }
        return probs;
    },
    update: function (name, probs, labels) {
        if (Memory.weight == null) {
            Memory.weight = {};
        }
        if (Memory.weight[name] == null) {
            Memory.weight[name] = {};
        }
        Memory.weight[name].probs = probs;
        Memory.weight[name].labels = labels;
    },
    adjustByFilter: function (name) {
        var probs = Memory.weight[name].probs;
        var labels = Memory.weight[name].labels;

        var adjustedProbs = [];
        var adjustedLabels = [];
        var sum = 0.0;
        for (var i = 0; i < _.size(adjustedProbs); ++i) {
            if (Weight.isPossible(labels[i])) {
                sum += probs[i];
                adjustedProbs.push(probs[i]);
                adjustedLabels.push(labels[i]);
            }
        }

        for (var i = 0; i < _.size(adjustedProbs); ++i) {
            adjustedProbs[i] = adjustedProbs[i] / sum;
        }
        return {
            probs: adjustedProbs,
            labels: adjustedLabels
        }
    },
    isPossible: function () {
        return true;
    },
    decideByWeight: function (name) {
        var adjustment = Weight.adjustByFilter(name);
        var probs = adjustment.probs;
        var labels = adjustment.labels;

        var dice = _.random(1, true);

        for (var i = 0; i < _.size(probs) - 1; ++i) {
            probs[i + 1] = probs[i] + probs[i + 1];
        }

        for (var i = 0; i < _.size(probs); ++i) {
            if (dice < probs[i]) {
                return labels[i];
            }
        }
    },
    getOccurenceByRatio: function (name, resource) {
        var adjustment = Weight.adjustByFilter(name);
        var probs = adjustment.probs;
        var labels = adjustment.labels;
        var dice = _.random()
    }
};
module.exports = Weight;