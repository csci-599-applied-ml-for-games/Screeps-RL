// MoveTo

let _moveTo = {
    name: 'atomic._moveTo',

    run: function (agent) {
        // TODO(sungpi): what if memory.target['moveTo'] is null.
        action.assignAtomic(_moveTo.name);
        agent.memory.atomic = '_moveTo';

        var executionResult = agent.moveTo(agent.memory.target['moveTo']);
        _moveTo.errors[executionResult](); // deal with errors
    }
};

module.exports = _moveTo;