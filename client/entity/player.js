Player = function(game) {
	this.game = game;
	this.phaser = this.game.phaser;
}

Player.spriteImg = "player"
Player.speed = 3
Player.speedX = Player.speed * Math.sqrt(3);
Player.speedY = Player.speed;
Player.prototype.left = 0;
Player.prototype.top = 0;
// Player.prototype.sprite = null;

Player.prototype.preload = function() {
    game.load.image('player', 'img/player.png');
}

Player.prototype.init = function() {
	this.sprite = game.add.sprite(this.x, this.y, Player.spriteImg);
}

Player.prototype.render = function() {

}
  
Player.prototype.update = function(delta) {
  actualSpeedX = delta * Player.speedX;
  actualSpeedY = delta * Player.speedY;
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.left -= actualSpeedX;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.left += actualSpeedX;
	}
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.top -= actualSpeedY;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.top += actualSpeedY;
	}
	this.sprite.x = this.left + (WIDTH / 2);
	this.sprite.y = this.top + (HEIGHT / 2);
	this.phaser.camera.focusOn(this.sprite);
}

Player.prototype.postUpdate = function() {

}
