VireoGame = function() {}

VireoGame.prototype.initializeGame = function() {
	this.phaser = new Phaser.Game(
	    WIDTH,
	    HEIGHT,
	    Phaser.WEBGL,
	    'vireo',
	    this
	);
	this.phaser.config["forceSetTimeOut"] = false;
	this.entitymanager = new EntityManager(this);
	this.tilemanager = new TileManager(this);
	this.multiplayer = new MultiplayerManager(this);
	this.graphicsmanager = new Graphics(this);
	this.frameTime = new Date();
}

VireoGame.prototype.preload = function() {
	game.time.advancedTiming = true;
	this.graphicsmanager.preload();
	this.phaser.world.setBounds(0, 0, 10000, 10000);
	this.phaser.camera.x = 500;
	this.phaser.camera.y = 500;
	this.entitymanager.preload();
}

VireoGame.prototype.create = function() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	this.multiplayer.create();
	this.tilemanager.create();
	this.graphicsmanager.create();
	this.entitymanager.init();
}

VireoGame.prototype.update = function() {
	this.multiplayer.update();
	this.tilemanager.update();
	this.graphicsmanager.update();
	this.entitymanager.update();
}

VireoGame.prototype.render = function() {
	this.entitymanager.render();
	this.game.debug.cameraInfo(game.camera, 32, 32);
	this.game.debug.text(game.tilemanager.chunks.length, 2, 32, "#FFFF00")
	this.game.debug.text(game.time.fps, 2, 48, "#FFFF00")
	this.game.debug.text(game.time.fps / game.tilemanager.chunks.length, 2, 64, "#FFFF00")
}

game = new VireoGame();
game.initializeGame();
