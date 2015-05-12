//CLIENT -> SERVER
REQUEST_MAP = 0x01;

//SERVER -> CLIENT
SEND_MAP = 0x01;

//TILESET
tileset = {
	1: "wall",
	4: "floor"
}

LOAD_RADIUS = 1 // 1 outside what the player can see


// Taken from: http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
// attach the .equals method to Array's prototype to call it on any array
array_equals = function (array1, array2) {
    // if the other array is a falsy value, return
    if (!array1)
        return false;

    // compare lengths - can save a lot of time 
    if (array2.length != array1.length)
        return false;

    for (var i = 0, l=array2.length; i < l; i++) {
        // Check if we have nested arrays
        if (array2[i] instanceof Array && array1[i] instanceof Array) {
            // recurse into the nested arrays
            if (!array2[i].equals(array1[i]))
                return false;       
        }           
        else if (array2[i] != array1[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
EntityManager = function(game) {
	this.game = game;
}
Graphics = function(game) {
	this.game = game;
}

Graphics.prototype.loadAssets = function() {
	game.load.image('wall', 'img/wall.png');
	game.load.image('floor', 'img/floor.png');
}

Graphics.prototype.preload = function() {
	this.loadAssets();
}

Graphics.prototype.create = function() {
	// this.game.phaser.
}

Graphics.prototype.update = function() {
	
}

Graphics.prototype.cullChunks = function() {
	chunksNeeded = this.game.tilemanager.getChunksNeeded(this.game.camera.x, this.game.camera.y, this.game.camera.width, this.game.camera.height, 0);
	for(chunk_index in this.game.tilemanager.chunks) {
		var chunk = this.game.tilemanager.chunks[chunk_index];
		for(chunk1_index in chunksNeeded) {
			if(!array_equals(chunksNeeded[chunk1_index], [chunk["x"], chunk["y"]])) {
				chunk["group"].visible = false;
			} else {
				chunk["group"].visible = true;
			}
		}
	}
}

Graphics.prototype.addGroupToChunk = function(chunk) {
	var group = this.game.phaser.add.group();
	chunk_map = chunk["map"];
	for(y in chunk_map) {
		for(x in chunk_map[y]) {
			sprite = group.create(16*x+chunk["x"]*512, 16*y+chunk["y"]*512, tileset[chunk_map[y][x]]);
		}
	}
	chunk["group"] = group;
	return chunk;
}
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
VireoGame = function() {}

VireoGame.prototype.initializeGame = function() {
  //changeme!
  window.requestAnimationFrame = null;
	this.phaser = new Phaser.Game(
	    800,
	    480,
	    Phaser.WEBGL,
	    'vireo',
	    this,
	    false,
	    true
	);
/* 	this.phaser.config["forceSetTimeOut"] = true; */
	this.entitymanager = new EntityManager(this);
	this.tilemanager = new TileManager(this);
	this.multiplayer = new MultiplayerManager(this);
	this.graphicsmanager = new Graphics(this);
	this.frameTime = new Date();
}

VireoGame.prototype.preload = function() {
	this.graphicsmanager.preload();
	this.phaser.world.setBounds(0, 0, 20000, 20000);
	this.phaser.camera.x = 0;
	this.phaser.camera.y = 0;
}

VireoGame.prototype.create = function() {
	this.multiplayer.create();
	this.tilemanager.create();
	this.graphicsmanager.create();
}

VireoGame.prototype.update = function() {
	msSinceLastFrame = new Date() - this.frameTime;
	this.frameTime = new Date();
	this.multiplayer.update();
	this.tilemanager.update();
	this.graphicsmanager.update();
	speed = msSinceLastFrame / 10 * 3;
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.phaser.camera.x -= speed;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.phaser.camera.x += speed;
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.phaser.camera.y -= speed;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.phaser.camera.y += speed;
	}
}

VireoGame.prototype.render = function() {
}

game = new VireoGame();
game.initializeGame();