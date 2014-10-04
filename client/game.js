VireoGame = function() {}

VireoGame.prototype.initializeGame = function() {
  //changeme!
  window.requestAnimationFrame = null;
	this.phaser = new Phaser.Game(
	    800,
	    480,
	    Phaser.WEBGL,
	    'vireo',
	    this,
	    false,
	    true
	);
/* 	this.phaser.config["forceSetTimeOut"] = true; */
	this.entitymanager = new EntityManager(this);
	this.tilemanager = new TileManager(this);
	this.multiplayer = new MultiplayerManager(this);
	this.graphicsmanager = new Graphics(this);
	this.frameTime = new Date();
}

VireoGame.prototype.preload = function() {
	this.graphicsmanager.preload();
	this.phaser.world.setBounds(0, 0, 20000, 20000);
	this.phaser.camera.x = 0;
	this.phaser.camera.y = 0;
}

VireoGame.prototype.create = function() {
	this.multiplayer.create();
	this.tilemanager.create();
	this.graphicsmanager.create();
}

VireoGame.prototype.update = function() {
	msSinceLastFrame = new Date() - this.frameTime;
	this.frameTime = new Date();
	this.multiplayer.update();
	this.tilemanager.update();
	this.graphicsmanager.update();
	speed = msSinceLastFrame / 10 * 3;
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.phaser.camera.x -= speed;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.phaser.camera.x += speed;
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.phaser.camera.y -= speed;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.phaser.camera.y += speed;
	}
}

VireoGame.prototype.render = function() {
}

game = new VireoGame();
game.initializeGame();