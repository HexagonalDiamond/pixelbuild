var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;
var xml = require('xml2js');
var fs = require('fs');
var util = require("util");
var map = require("./lib/map");

app.use(express.static(__dirname + '/public'));

console.log("Multiplayer Framework Started!");
// Action Codes
// CLIENT -> SERVER
// Request Map: 0x01
// SERVER -> CLIENT
// Send Map: 0x01

function readMap(async) {
	map_str = fs.readFileSync("map.tmx", {encoding: 'utf8'});
	xml.parseString(map_str, function(err, result) {
		game_map = new map();
		game_map.parse_map(result['map']['layer'][0]['data'][0]["_"]);
		async(game_map);
	});
}

game_map = [];

readMap(function(result) {
	game_map = result;
});

io.on("connection", function(socket) {
	if(game_map != []) {
		console.log("User Connected");
		socket.on(0x01, function(coords) {
			console.log("REQUEST MAP");
			socket.emit(0x01, {x: coords[0], y: coords[1], map: game_map.slice(coords[0]*32, coords[1]*32, 32, 32)});
		});
	}
});

server.listen(port);
