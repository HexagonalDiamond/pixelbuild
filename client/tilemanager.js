TileManager = function(game) {
	this.game = game;
	this.chunks = [];
}

TileManager.prototype.create = function() {
	this.requestChunk(0,0);
}

TileManager.prototype.update = function() {
	
}

TileManager.prototype.requestChunk = function(x, y) {
	this.game.multiplayer.requestChunk(x, y, this.addChunkCallback, this);
}

TileManager.prototype.addChunkCallback = function(data, tm) {
	tm.addChunk(data);
}

TileManager.prototype.addChunk = function(chunk) {
	for(chunk_index in this.chunks) {
		if(this.chunks[chunk_index]["x"] == chunk["x"] && this.chunks[chunk_index]["y"] == chunk["y"]) {
			return;
		}
	}
	this.game.graphicsmanager.addGroupToChunk(chunk);
	this.chunks.push(chunk);
}

TileManager.prototype.hasChunk = function(x, y) {
	for(chunk_index in this.chunks) {
		if(this.chunks[chunk_index]["x"] == chunk["x"] && this.chunks[chunk_index]["y"] == chunk["y"]) {
			return;
		}
	}
	this.chunks.push(chunk);
}

// TileManager.prototype.requestChunks = function