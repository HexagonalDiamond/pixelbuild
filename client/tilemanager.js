TileManager = function(game) {
	this.game = game;
	this.chunks = [];
	this.awaiting_response = [];
}

TileManager.prototype.create = function() {

}

TileManager.prototype.update = function() {
	chunks_needed = this.getChunksNeeded(this.game.camera.x, this.game.camera.y, this.game.camera.width, this.game.camera.height);
	this.requestChunks(chunks_needed);
}

// TileManager.

TileManager.prototype.requestChunks = function(chunks) {
	for(chunk in chunks) {
		if(!this.hasChunk(chunks[chunk][0], chunks[chunk][1]) && this.inQueue(chunks[chunk][0], chunks[chunk][1])==false) {
			this.requestChunk(chunks[chunk][0], chunks[chunk][1]);
			console.log("request"+chunks[chunk][0]+","+chunks[chunk][1])
		}
	}
}

TileManager.prototype.inQueue = function(x, y) {
	for(index in this.awaiting_response) {
		if(array_equals(this.awaiting_response[index], ([x, y]))) {
			return true;
		}
	}
	return false;
}

TileManager.prototype.requestChunk = function(x, y) {
	this.awaiting_response.push([x, y]);
	this.game.multiplayer.requestChunk(x, y, this.addChunkCallback, this);
}

TileManager.prototype.addChunkCallback = function(data, tm) {
	tm.addChunk(data);
}

TileManager.prototype.addChunk = function(chunk) {
	var index = this.awaiting_response.indexOf([chunk["x"], chunk["y"]]);
	this.awaiting_response.splice(index, 1);
	if(chunk["x"] in this.chunks && chunk["y"] in this.chunks[chunk["x"]]) {
		return;
	}
	chunk = this.game.graphicsmanager.addGroupToChunk(chunk);
	if(!(chunk["x"] in this.chunks)) {
		this.chunks[chunk["x"]] = [];
	}
	this.chunks[chunk["x"]][chunk["y"]] = chunk
}

TileManager.prototype.hasChunk = function(x, y) {
	if(x in this.chunks) {
		return y in this.chunks[x];
	}
	return false;
}

TileManager.prototype.getChunksNeeded = function(x, y, width, height, radius) {
	chunks = [];
	if(radius==null) {
		radius = LOAD_RADIUS;
	}
	currentChunkX = Math.floor(x/512) - LOAD_RADIUS;
	currentChunkY = Math.floor(y/512) - LOAD_RADIUS;
	sizeX = Math.ceil(width/512) + LOAD_RADIUS * 2;
	sizeY = Math.ceil(height/512) + LOAD_RADIUS * 2;
	for(var chunkX = currentChunkX; chunkX < currentChunkX + sizeX; chunkX++) {
		for(var chunkY = currentChunkY; chunkY < currentChunkY + sizeY; chunkY++) {
			if(chunkX >= 0 && chunkY >= 0) {
				chunks.push([chunkX, chunkY]);
			}
		}
	}
	return chunks;
} 