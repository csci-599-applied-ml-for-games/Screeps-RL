var Weight = {
    init: function () {
        if (Memory.weight == null) Memory.weight = {};
    },
    pre: function () {
        if (Memory.weight == null) {
            Memory.weight = {};
        }
    },
    createIfNull: function (name, size, labels) {
        if (Memory.weight[name] == null) {
            var probs = Weight.generate(size);
            Weight.set(name, probs, labels);
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
    set: function (name, probs, labels, update_delta, update_label) {
        Weight.pre();
        if (Memory.weight[name] == null) {
            Memory.weight[name] = {};
        }
        Memory.weight[name].probs = probs;
        Memory.weight[name].labels = labels;
    },
    update: function (name, update_delta, update_label) {
        // console.log('update');
        // console.log(name);

        if (update_delta >= 2) update_delta = 1.9999;
        console.log('Weight:update:' + update_delta + ':' + update_label);
        console.log(update_delta);
        console.log(update_label);
        // console.log(Memory.weight.creep_action.probs);
        Weight.pre();
        if (Memory.weight[name] == null) {
            return;
        }
        var probs = Memory.weight[name].probs;
        var labels = Memory.weight[name].labels;
        var n = _.size(probs);
        var x = _.indexOf(labels, update_label);
        var diff = (probs[x] - (probs[x] * update_delta)) / (n - 1);
        probs[x] = probs[x] * update_delta;
        for (var i = 0; i < n; i++) {
            if (i !== x) {
                probs[i] += diff;
            }
        }
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
    }
};
module.exports = Weight;