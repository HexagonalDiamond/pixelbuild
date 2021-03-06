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
}

Graphics.prototype.addGroupToChunk = function(chunk) {
	chunk_map = chunk["map"];
	for(y = 0; y < chunk_map.length; y++) {
		for(x = 0; x < chunk_map[y].length; x++) {
			var sprite = new Phaser.Plugin.Isometric.IsoSprite(this.phaser, (32*x)+(chunk["x"]*1024), (32*y)+(chunk["y"]*1024), 0, 'mainTileset', tileset[chunk_map[y][x]])
			this.worldGroup.add(sprite);
		}
	}
  // REMEMBER TO USE this.phaser.iso! this.game.iso does not work!
  this.phaser.iso.simpleSort(this.worldGroup); // sort when adding new tiles
	return chunk;
}
