TileManager = function(game) {
	this.game = game;
	this.chunks = [];
	this.awaiting_response = [];
}

TileManager.prototype.create = function() {

}

TileManager.prototype.cleanChunks = function(x, y, w, h) {
	// var chunksNotToClear = this.getChunksNeeded(x, y, w, h);
	// toClear = this.chunks
	// chunksNotToClear.forEach(function(chunkNotToClear, chunkNotIndex, chunksNotToClearArray) {
	// 	toClear.forEach(function(chunk, chunkIndex, chunkArray) {
	// 		if(chunk.equals(chunkNotToClear)) {
	// 			toClear.splice(chunkIndex, 1);
	// 		}
	// 	})
	// })
	// // for(var chunkIndex in chunksNotToClear) {
	// // 	for(var chunkToCheckIndex in this.chunks) {
	// // 		if(chunksNotToClear[chunkIndex].equals(this.chunks[chunkToCheckIndex])) {
	// // 			console.log("clear" + chunk[0] + ", " + chunk[1]);
	// // 		}
	// // 	}
	// // }
}


TileManager.prototype.update = function() {
	var chunks_needed = this.getChunksNeeded(this.game.camera.x, this.game.camera.y, this.game.camera.width, this.game.camera.height);
	this.cleanChunks(this.game.camera.x, this.game.camera.y, this.game.camera.width, this.game.camera.height);
	this.requestChunks(chunks_needed);
}

// TileManager.

TileManager.prototype.requestChunks = function(chunks) {
	chunks.forEach(function(chunk, index, array) {
		this.requestChunk(chunk[0], chunk[1]);
		console.log("request",chunk[0], chunk[1])
	}, this)
}

TileManager.prototype.inQueue = function(x, y) {
	for(var index = 0; index < this.awaiting_response.length; index++) {
		if(this.awaiting_response[index].equals([x,y])) {
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
	if(this.chunks[x] != null && this.chunks[x][y] != null) {
		return true;
	}
	return false;
}

TileManager.prototype.getTiles = function(x, y) {
	var chunkX = Math.floor(x / 32);
	var chunkY = Math.floor(y / 32);
	var insideX = x % 32;
	var insideY = y % 32;
	// console.log(chunkX, chunkY, insideX, insideY	)
	if(this.chunks[chunkX] == null || this.chunks[chunkX][chunkY] == null) {
		return false;
	}

	return this.chunks[chunkX][chunkY]["map"][insideY][insideX];
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
			if(chunkX >= 0 && chunkY >= 0 && !this.hasChunk(chunkX, chunkY) && this.inQueue(chunkX, chunkY) == false) {
				chunks.push([chunkX, chunkY]);
			}
		}
	}
	return chunks;
}
