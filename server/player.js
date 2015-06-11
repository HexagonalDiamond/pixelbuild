Player = function() {
  
}

Player.prototype.x = 400;
Player.prototype.y = 240;

Player.speed = 200;

Player.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
}

// console.log(new Player())

module.exports = Player;