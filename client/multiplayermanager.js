MultiplayerManager = function(game) {
	this.game = game;
}

MultiplayerManager.prototype.create = function() {
	this.socket = io();
}

MultiplayerManager.prototype.update = function() {
	
}

MultiplayerManager.prototype.requestChunk = function(x, y, callback, obj) {
	this.socket.emit(0x01, [x, y]);
	// console.log([x, y]);
	this.socket.on(0x01, function(data) {
		callback(data, obj);
	});
}