/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

var map_palette = {
	0x00: "floor",
	0x04: "wall"
}
function getMapData(socket) {
	socket.emit(0x01)
	socket.on(0x01, function(data) {
		map = data["map"]
	});
}
var state = {
    init: function() {
		// load map
		this.socket = io();
    },
    preload: function() {
		game.load.image('floor', 'img/floor.png');
		game.load.image('wall', 'img/wall.png');
    },
    create: function(){
		
    },
    update: function() {
		// State Update Logic goes here.
    }
};

var game = new Phaser.Game(
    800,
    480,
    Phaser.CANVAS,
    'vireo',
    state
);