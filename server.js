var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;
var xml = require('xml2js');
var fs = require('fs');
var util = require("util");

app.use(express.static(__dirname + '/public'));

console.log("Multiplayer Framework Started!");
// Action Codes
// CLIENT -> SERVER
// Request Map: 0x01
// SERVER -> CLIENT
// Send Map: 0x01

function readMap() {
	map = fs.readFileSync("map.tmx", {encoding: 'utf8'});
	xml.parseString(map, function(err, result) {
		console.log(util.inspect(result['map']['layer'][0]['data'], false, null));
	});
}
readMap();
io.on("connection", function(socket) {
	console.log("User Connected");
	socket.on(0x01, function() {
		console.log("REQUEST MAP");
		socket.emit(0x01, {x: 0, y: 0, map: "yep"});
	});
});

server.listen(port);
