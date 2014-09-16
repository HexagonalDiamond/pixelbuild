//CLIENT -> SERVER
REQUEST_MAP = 0x01;

//SERVER -> CLIENT
SEND_MAP = 0x01;

//TILESET
tileset = {
	1: "wall",
	4: "floor"
}
EntityManager = function(game) {
	this.game = game;
}
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
MultiplayerManager = function(game) {
	this.game = game;
}

MultiplayerManager.prototype.create = function() {
	this.socket = io();
}

MultiplayerManager.prototype.update = function() {
	
}

MultiplayerManager.prototype.requestChunk = function(x, y, callback, obj) {
	this.socket.emit(0x01, [x, y]);
	this.socket.on(0x01, function(data) {
		callback(data, obj);
	});
}
TileManager = function(game) {
	this.game = game;
	this.chunks = [];
}

TileManager.prototype.create = function() {
	this.requestChunk(0,0);
}

TileManager.prototype.update = function() {
	
}

TileManager.prototype.requestChunk = function(x, y) {
	this.game.multiplayer.requestChunk(x, y, this.addChunkCallback, this);
}

TileManager.prototype.addChunkCallback = function(data, tm) {
	tm.addChunk(data);
}

TileManager.prototype.addChunk = function(chunk) {
	for(chunk_index in this.chunks) {
		if(this.chunks[chunk_index]["x"] == chunk["x"] && this.chunks[chunk_index]["y"] == chunk["y"]) {
			return;
		}
	}
	this.game.graphicsmanager.addGroupToChunk(chunk);
	this.chunks.push(chunk);
}

TileManager.prototype.hasChunk = function(x, y) {
	for(chunk_index in this.chunks) {
		if(this.chunks[chunk_index]["x"] == chunk["x"] && this.chunks[chunk_index]["y"] == chunk["y"]) {
			return;
		}
	}
	this.chunks.push(chunk);
}

// TileManager.prototype.requestChunks = function
VireoGame = function() {}

VireoGame.prototype.initializeGame = function() {
	this.phaser = new Phaser.Game(
	    800,
	    480,
	    Phaser.CANVAS,
	    'vireo',
	    this
	);
	this.entitymanager = new EntityManager(this);
	this.tilemanager = new TileManager(this);
	this.multiplayer = new MultiplayerManager(this);
	this.graphicsmanager = new Graphics(this);
}

VireoGame.prototype.preload = function() {
	this.graphicsmanager.preload()
}

VireoGame.prototype.create = function() {
	this.multiplayer.create();
	this.tilemanager.create();
	this.graphicsmanager.create();
}

VireoGame.prototype.update = function() {
	this.multiplayer.update();
	this.tilemanager.update();
	this.graphicsmanager.update();
}

game = new VireoGame();
game.initializeGame();