/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

var map_palette = {
	"4": "floor",
	"1": "wall"
}
function getMapData(socket, fn) {
	socket.emit(0x01)
	socket.on(0x01, function(data) {
		fn(data["map"]);
	});
}
window.state = {
    init: function() {
		// load map
		this.socket = io();
		this.map = [];
    },
    preload: function() {
		game.load.image('floor', 'img/floor.png');
		game.load.image('wall', 'img/wall.png');
		m = null;
		getMapData(this.socket, function(map) {
			window.state.map = map;
		});
    },
    create: function(){
		// console.log(this.map);
		// for(y in this.map) {
		// 	row = this.map[y];
		// 	for(x in row) {
		// 		node = row[x]
		// 		// console.log(row);
		// 		game.add.sprite(x*16, y*16, map_palette[node]);
		// 	}
		// }
    },
    update: function() {
		for(y in this.map) {
			row = this.map[y];
			for(x in row) {
				node = row[x]
				// console.log(row);
				game.add.sprite(x*16, y*16, map_palette[node]);
			}
		}
    }
};

var game = new Phaser.Game(
    800,
    480,
    Phaser.CANVAS,
    'vireo',
    window.state
);