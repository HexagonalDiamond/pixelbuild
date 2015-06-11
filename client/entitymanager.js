EntityManager = function(game) {
	this.game = game;
	this.entities = [];
}

EntityManager.prototype.preload = function() {
    this.player = new Player(game);
    this.entities.push(this.player);
	for(var entityIndex = 0; entityIndex < this.entities.length; entityIndex++) {
		var entity = this.entities[entityIndex];
		entity.preload();
	}
}

EntityManager.prototype.init = function() {
	for(var entityIndex = 0; entityIndex < this.entities.length; entityIndex++) {
		var entity = this.entities[entityIndex];
		if(entity.init) {
			entity.init();
		}
	}
}

EntityManager.prototype.update = function() {
	for(var entityIndex = 0; entityIndex < this.entities.length; entityIndex++) {
    var entity = this.entities[entityIndex];
		if(entity.update) {
			entity.update(this.game.time.elapsedMS / 1000);
		}
	}
}

EntityManager.prototype.render = function() {
	for(var entityIndex = 0; entityIndex < this.entities.length; entityIndex++) {
		var entity = this.entities[entityIndex];
		if(entity.render) {
			entity.render();
		}
	}
}
