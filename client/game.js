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