VireoGame = function() {}

VireoGame.prototype.initializeGame = function() {
	this.phaser = new Phaser.Game(
	    WIDTH,
	    HEIGHT,
	    Phaser.AUTO,
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
    this.phaser.time.advancedTiming = true;
	this.phaser.plugins.add(new Phaser.Plugin.Isometric(game));
	game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
	game.iso.anchor.setTo(0.5, 0);
	this.graphicsmanager.preload();
	this.phaser.world.setBounds(0, 0, 800, 480);
	this.phaser.camera.x = 500;
	this.phaser.camera.y = 500;
	this.phaser.camera.bounds = null;
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
