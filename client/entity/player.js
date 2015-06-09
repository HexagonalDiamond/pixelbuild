Player = function(game) {
	this.game = game;
	this.phaser = this.game.phaser;
}

Player.spriteImg = "player"
Player.speed = 3 // pixels per second
Player.prototype.left = 0;
Player.prototype.top = 0;
// Player.prototype.sprite = null;

Player.prototype.preload = function() {
	console.log('repload')
	game.load.image('player', 'img/player.png');
}

Player.prototype.init = function() {
	this.sprite = game.add.sprite(this.x, this.y, Player.spriteImg);
}

Player.prototype.render = function() {

}

Player.prototype.update = function(delta) {
  actualSpeed = delta * Player.speed;
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.left -= actualSpeed;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.left += actualSpeed;
	}
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.top -= actualSpeed;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.top += actualSpeed;
	}
	this.sprite.x = this.left + (WIDTH / 2);
	this.sprite.y = this.top + (HEIGHT / 2);
	this.phaser.camera.focusOn(this.sprite);
}

Player.prototype.postUpdate = function() {

}
