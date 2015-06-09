EntityManager = function(game) {
	this.game = game;
	this.entities = [];
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
	this.player = new Player(game)
	this.entities.push(this.player);
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
			entity.update(this.game.phaser.time.elapsed / 10);
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
