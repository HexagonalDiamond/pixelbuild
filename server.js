var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan("combined"));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static(__dirname + '/public'));

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});

