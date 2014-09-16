Graphics = function(game) {
	this.game = game;
}

Graphics.prototype.loadAssets = function() {
	game.load.image('wall', 'img/wall.png');
	game.load.image('floor', 'img/floor.png');
}

Graphics.prototype.preload = function() {
	this.loadAssets();
}

Graphics.prototype.create = function() {
	// this.game.phaser.
}

Graphics.prototype.update = function() {
	
}

Graphics.prototype.addGroupToChunk = function(chunk) {
	var group = this.game.phaser.add.group();
	chunk_map = chunk["map"];
	for(y in chunk_map) {
		for(x in chunk_map[y]) {
			group.create(16*x, 16*y, tileset[chunk_map[y][x]]);
		}
	}
	chunk["group"] = group;
	return chunk;
}