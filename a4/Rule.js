var Rule = {
    actionRule: {
        'harvest': ['move', 'harvest', 'move', 'transfer'],
        'upgrade': ['move', 'harvest', 'move_upgrade', 'upgrade'],
        'scout': ['move_to', 'update_map'],
        'build': ['move', 'harvest', 'move', 'build']
    }
};

module.exports = Rule;