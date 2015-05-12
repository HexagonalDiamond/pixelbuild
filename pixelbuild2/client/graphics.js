Graphics = function(game) {
	this.game = game;
	this.phaser = this.game.phaser;
}

Graphics.prototype.loadAssets = function() {
	game.load.image('wall', 'img/wall.png');
	game.load.image('floor', 'img/floor.png');
}

Graphics.prototype.preload = function() {
	this.loadAssets();
	this.resizeGame();
}

Graphics.prototype.create = function() {
	// this.game.phaser.
}

Graphics.prototype.update = function() {

}

Graphics.prototype.cullChunks = function() {
	chunksNeeded = this.game.tilemanager.getChunksNeeded(this.game.camera.x, this.game.camera.y, this.game.camera.width, this.game.camera.height, 0);
	for(chunk_index in this.game.tilemanager.chunks) {
		var chunk = this.game.tilemanager.chunks[chunk_index];
		for(chunk1_index in chunksNeeded) {
			if(!array_equals(chunksNeeded[chunk1_index], [chunk["x"], chunk["y"]])) {
				chunk["group"].visible = false;
			} else {
				chunk["group"].visible = true;
			}
		}
	}
}

Graphics.prototype.addGroupToChunk = function(chunk) {
	var group = this.game.phaser.add.group();
	chunk_map = chunk["map"];
	for(y in chunk_map) {
		for(x in chunk_map[y]) {
			sprite = group.create(16*x+chunk["x"]*512, 16*y+chunk["y"]*512, tileset[chunk_map[y][x]]);
		}
	}
	chunk["group"] = group;
	return chunk;
}

Graphics.prototype.resizeGame = function() {
	if (!this.phaser.device.desktop) {
    this.phaser.stage.scale.startFullScreen();
    this.phaser.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
    this.phaser.stage.scale.minWidth = 480;
    this.phaser.stage.scale.minHeight = 260;
    this.phaser.stage.scale.maxWidth = 1024;
    this.phaser.stage.scale.maxHeight = 768;
    this.phaser.stage.scale.forceLandscape = true;
    this.phaser.stage.scale.setScreenSize(true);
    this.phaser.stage.scale.setShowAll();
    this.phaser.stage.scale.refresh();
  }
}
