Player = function(game) {
	this.game = game;
	this.phaser = this.game.phaser;
}

Player.spriteImg = "player"
Player.speed = 3
Player.prototype.left = 0;
Player.prototype.top = 0;
// Player.prototype.sprite = null;

Player.prototype.preload = function() {
    game.load.image('player', 'img/player.png');
}

Player.prototype.init = function() {
  this.playerGroup = this.game.add.group()
	this.sprite = this.game.add.isoSprite(this.x, this.y, 1, Player.spriteImg);
  this.text = this.game.add.text(this.sprite.x, this.sprite.y - 100, "Julian", { font: "18px Arial", fill: "#FFFFFF", align: "center" })
  this.game.camera.follow(this.sprite);
}

Player.prototype.render = function() {

}
  
Player.prototype.update = function(delta) {
  actualSpeed = delta * Player.speed;
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    this.left -= actualSpeed;
    this.top += actualSpeed;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.left += actualSpeed;
    this.top -= actualSpeed;
	}
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    this.top -= actualSpeed;
    this.left -= actualSpeed;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.top += actualSpeed;
    this.left += actualSpeed;
	}
  this.sprite.isoX = this.left + (WIDTH / 2);
  this.sprite.isoY = this.top + (HEIGHT / 2);
  this.sprite._project();
  this.text.x = this.sprite.x  + (this.sprite.width / 2) - (this.text.width / 2);
  this.text.y = this.sprite.y - 35;
}

Player.prototype.postUpdate = function() {

}
