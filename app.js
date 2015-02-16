
var express = require('express');
var app = express();

// server.listen(80);
var config = require('./config');
var osc = require('./osc');
var port =  process.env.PORT || config.port || 3000 ;

app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port);
});

var schema = config.shema;

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('schema', {
        schema: schema
    });
    socket.on('data', function (data) {
        console.log(data);
        osc.send(data.name, data.value);
    });
});
