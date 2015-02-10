
var express = require('express');
var app = express();

// server.listen(80);
var config = {};
try { config = require('./config.json'); }catch (e) { console.warn('⚠ Missing config.json'); }

var port = config.port || 3000 ;

app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('news', {
        hello: 'world'
    });
    socket.on('data', function (data) {
        console.log(data);
    });
});