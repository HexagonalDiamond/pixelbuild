Player = function(game) {
	this.game = game;
	this.phaser = this.game.phaser;
}

Player.spriteImg = "player"
Player.speed = 3 // pixels per second
Player.prototype.x = 0;
Player.prototype.y = 0;
// Player.prototype.sprite = null;

Player.prototype.preload = function() {
	console.log('repload')
	game.load.image('player', 'img/player.png');
}

Player.prototype.init = function() {
	this.sprite = game.add.sprite(this.x, this.y, Player.spriteImg);
	// this.sprite.z = ;  // render above everything else
	console.log(this.sprite)
}

Player.prototype.render = function() {

}

Player.prototype.update = function(delta) {
  actualSpeed = delta * Player.speed;
	// console.log(delta);
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.x -= actualSpeed;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.x += actualSpeed;
	}
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.y -= actualSpeed;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.y += actualSpeed;
	}
	// console.log(this.x, this.y)
	this.sprite.x = this.x + (WIDTH / 2);
	this.sprite.y = this.y + (HEIGHT / 2);
}

Player.prototype.postUpdate = function() {

}
