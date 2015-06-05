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
}

Graphics.prototype.update = function() {

}

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
