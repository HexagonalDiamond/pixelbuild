EntityManager = function(game) {
	this.game = game;
	this.entities = [];
}

EntityManager.prototype.preload = function() {
    this.player = new Player(game);
    this.entities.push(this.player);
	for(var entityIndex = 0; entityIndex < this.entities.length; entityIndex++) {
		entity = this.entities[entityIndex];
		entity.preload();
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
			entity.update(this.game.time.elapsed / 10);
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
