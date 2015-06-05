EntityManager = function(game) {
	this.game = game;
	this.entities = [];
	this.player = new Player(game)
	this.entities.push(this.player);
}

EntityManager.prototype.preload = function() {
	for(entityIndex in this.entities) {
		entity = this.entities[entityIndex];
		if(entity.preload) {
			entity.preload();
		}
	}
}

EntityManager.prototype.init = function() {
	for(entityIndex in this.entities) {
		entity = this.entities[entityIndex];
		if(entity.init) {
			entity.init();
		}
	}
}

EntityManager.prototype.update = function() {
	for(entityIndex in this.entities) {
		entity = this.entities[entityIndex];
		if(entity.update) {
			entity.update(this.game.phaser.time.elapsedMS / 10);
		}
	}
}

EntityManager.prototype.render = function() {
	for(entityIndex in this.entities) {
		entity = this.entities[entityIndex];
		if(entity.render) {
			entity.render();
		}
	}
}
