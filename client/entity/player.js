Player = function(game) {
	this.game = game;
	this.phaser = this.game.phaser;
}

Player.spriteImg = "player"
Player.speed = 200
Player.prototype.left = 0;
Player.prototype.top = 0;
Player.prototype.movementTimeout = 100;
Player.prototype.movement = [0, 0];
// Player.prototype.sprite = null;

Player.prototype.preload = function() {
    game.load.image('player', 'img/player.png');
}

Player.prototype.init = function() {
  this.playerGroup = this.game.add.group()
	this.sprite = this.game.add.isoSprite(this.x, this.y, 1, Player.spriteImg);
  this.sprite.inputEnabled = true;
  // this.text = this.game.add.text(this.sprite.x, this.sprite.y - 100, "Julian", { font: "18px Arial", fill: "#FFFFFF", align: "center" })
  this.game.camera.follow(this.sprite);
}

Player.prototype.render = function() {

}
  
Player.prototype.update = function(delta) {
  if(this.movementTimeout <= 0) {
    this.game.multiplayer.sendMovementInfo(this.movement[0], this.movement[1])
    this.movement = [0,0];
    this.movementTimeout = 100;
  } else {
    this.movementTimeout -= delta * 1000;
  }
  actualSpeed = delta * Player.speed;
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    this.left -= actualSpeed;
    this.top += actualSpeed;
    this.movement[0] -= actualSpeed;
    this.movement[1] += actualSpeed;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.left += actualSpeed;
    this.top -= actualSpeed;
    this.movement[0] += actualSpeed;
    this.movement[1] -= actualSpeed;
	}
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    this.top -= actualSpeed;
    this.left -= actualSpeed;
    this.movement[0] -= actualSpeed;
    this.movement[1] -= actualSpeed;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.top += actualSpeed;
    this.left += actualSpeed;
    this.movement[0] += actualSpeed;
    this.movement[1] += actualSpeed;
	}
  this.sprite.isoX = this.left + (WIDTH / 2);
  this.sprite.isoY = this.top + (HEIGHT / 2);
  // this.sprite._project();
  // this.text.x = this.sprite.x  + (this.sprite.width / 2) - (this.text.width / 2);
  // this.text.y = this.sprite.y - 35;
}

Player.prototype.postUpdate = function() {

}
