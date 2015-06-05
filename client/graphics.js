Graphics = function(game) {
	this.game = game;
	this.phaser = this.game.phaser;
}

Graphics.prototype.loadAssets = function() {
	this.game.load.image('wall', 'img/wall.png');
	this.game.load.image('floor', 'img/floor.png');
}

Graphics.prototype.preload = function() {
	this.loadAssets();
}

Graphics.prototype.create = function() {
	// this.game.phaser.
	this.worldGroup = []
	this.worldMap = []
	this.lastTile = []
}

Graphics.prototype.update = function() {

	// if(![Math.floor(game.entitymanager.player.x / 32), Math.floor(game.entitymanager.player.y / 32)].equals(this.lastTile)) {
	// 	var x = new Date();
	// 	this.addTiles();
	// 	console.log(new Date() - x);
	// }
	// this.lastTile = [Math.floor(game.entitymanager.player.x / 32), Math.floor(game.entitymanager.player.y / 32)]
}

// Graphics.prototype.addTiles = function() {
// 	var tiles = []
// 	var tilesNeeded = []
// 	var fromTileX = Math.floor(this.game.camera.view.left / 16.0)
// 	var fromTileY = Math.floor(this.game.camera.view.top / 16.0)
// 	var toTileX = Math.ceil(this.game.camera.view.right / 16.0)
// 	var toTileY = Math.ceil(this.game.camera.view.bottom / 16.0)
// 	for(var tileX = fromTileX; tileX < toTileX; tileX++) {
// 		for(var tileY = fromTileY; tileY < toTileY; tileY++) {
// 			tilesNeeded.push({x: tileX, y:tileY});
// 		}
// 	}
// 	tiles = tilesNeeded.filter(function(i) {
// 		for(var index; index < this.worldGroup.length; index++) {
// 			if(this.worldGroup[index].x / 16 == i.x && this.worldGroup[index].y / 16 == i.y) {
// 				return false;
// 			}
// 		}
// 		return true;
// 	}, this);
// 	this.addTileList(tiles);
// }
//
// Graphics.prototype.addTileList = function(list) {
// 	list.forEach(function(item, index, array) {
// 		var sprite = new Tile(this.game, 16*item.x, 16*item.y, 16, 16, tileset[this.game.tilemanager.getTiles(item.x, item.y)]);
// 		this.game.world.add(sprite);
// 		this.worldGroup.push(sprite);
// 	}, this);
// }

Graphics.prototype.addGroupToChunk = function(chunk) {
	chunk_map = chunk["map"];
	this.worldMap.push(chunk);
	for(y in chunk_map) {
		for(x in chunk_map[y]) {
			var sprite = new Tile(this.game, 16*x+chunk["x"]*512, 16*y+chunk["y"]*512, 16, 16, tileset[chunk_map[y][x]]);
			this.game.world.add(sprite);
			this.worldGroup.push(sprite);
			// console.log(sprite);
		}
	}
	return chunk;
}
