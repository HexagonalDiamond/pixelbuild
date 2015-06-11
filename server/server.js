var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;
var xml = require('xml2js');
var fs = require('fs');
var util = require("util");
var map = require("./map");
var Player = require("./player");
console.log(__dirname + '../public');
app.use(express.static(__dirname + '/../public'));

console.log("Multiplayer Framework Started!");
// Action Codes
// CLIENT -> SERVER
// Request Map: 0x01
// SERVER -> CLIENT
// Send Map: 0x01

function readMap(callback) {
	map_str = fs.readFileSync("map.csv", {encoding: 'utf8'});
	game_map = new map();
	game_map.parse_map(map_str);
	callback(game_map);
}

game_map = [];
entities = [];

function updateEntities() {
  for(var entityIndex = 0; entityIndex < entities.length; entityIndex++) {
    if(entities[entityIndex].update != undefined) {
      entities[entityIndex].update();
    }
  }
}

setInterval(updateEntities, 16);

readMap(function(result) {
	game_map = result;
});

io.on("connection", function(socket) {
  player = new Player()
  entities.push(player);
	if(game_map != []) {
		console.log("User Connected");
		socket.on(0x01, function(coords) {
			console.log("REQUEST MAP"+coords[0]+coords[1]);
			socket.emit(0x01, {x: coords[0], y: coords[1], map: game_map.slice(coords[0]*32, coords[1]*32, 32, 32)});
		});
    socket.on(0x02, function(keyInfo) {
      player.move(keyInfo.x, keyInfo.y)
    });
	}
});

server.listen(port);
