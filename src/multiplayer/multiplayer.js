console.log("Multiplayer Framework Started!");
// Action Codes
// CLIENT -> SERVER
// Request Map: 0x01
// SERVER -> CLIENT
// Send Map: 0x01

var io = require('socket.io')(http);

io.on("connection", function(socket) {
	console.log("User Connected");
	socket.on(0x01, function() {
		console.log("REQUEST MAP");
		socket.emit(0x01+"bla");
	});
});