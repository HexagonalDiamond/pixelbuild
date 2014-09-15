/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

var state = {
    init: function() {
		// load map
    },
    preload: function() {
		// State preload logic goes here
    },
    create: function(){
		// State create logic goes here
    },
    update: function() {
		// State Update Logic goes here.
    }
};

var game = new Phaser.Game(
    400,
    240,
    Phaser.CANVAS,
    'vireo',
    state
);