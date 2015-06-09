Graphics = function(game) {
	this.game = game;
	this.phaser = this.game.phaser;
}

Graphics.prototype.loadAssets = function() {
	this.game.load.image('wall', 'img/wall.png');
	this.game.load.image('floor', 'img/floor.png');
	this.game.load.atlasJSONHash('mainTileset', 'img/tileset.png', 'assets/tileset.json');
}

Graphics.prototype.preload = function() {
	this.loadAssets();
}

Graphics.prototype.create = function() {
	this.worldGroup = game.add.group();
}

Graphics.prototype.update = function() {
	// game.iso.topologicalSort(this.worldGroup);
}

Graphics.prototype.addGroupToChunk = function(chunk) {
	chunk_map = chunk["map"];
	for(y = 0; y < chunk_map.length; y++) {
		for(x = 0; x < chunk_map[y].length; x++) {
			var sprite = new Phaser.Plugin.Isometric.IsoSprite(this.game, 32*x+chunk["x"]*512, 32*y+chunk["y"]*512, 0, 'mainTileset', tileset[chunk_map[y][x]])
			this.worldGroup.add(sprite);
		}
	}
	game.iso.simpleSort(this.worldGroup);
	return chunk;
}
