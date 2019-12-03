var Rule = {
    actionRule: {
        'harvest': ['move', 'harvest', 'move', 'transfer'],
        'upgrade': ['move', 'harvest', 'move_upgrade', 'upgrade'],
        'scout': ['move_to', 'update_map'], //target = map
        'build': ['move', 'harvest', 'move', 'build'],
        'harvest_mineral': ['move', 'harvest_mineral', 'move', 'transfer'],
        'observe': ['move_to'],
        'moveRoom': ['move_to', 'update_map']

    }
};

module.exports = Rule;