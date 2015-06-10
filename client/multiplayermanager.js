MultiplayerManager = function(game) {
	this.game = game;
}

MultiplayerManager.prototype.create = function() {
	this.socket = io();
}

MultiplayerManager.prototype.update = function() {
	
}
MultiplayerManager.prototype.sendMovementInfo = function(x, y) {
  this.socket.emit(KEY_INFO, {
    x: x,
    y: y
  });
}

MultiplayerManager.prototype.requestChunk = function(x, y, callback, obj) {
	this.socket.emit(REQUEST_MAP, [x, y]);
	// console.log([x, y]);
	this.socket.on(SEND_MAP, function(data) {
		callback(data, obj);
	});
}