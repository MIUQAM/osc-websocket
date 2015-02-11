
var express = require('express');
var app = express();

// server.listen(80);
var config = {};
try { config = require('./config.json'); }catch (e) { console.warn('⚠ Missing config.json'); }

var port = config.port || process.env.PORT || 3000 ;

app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port);
});

var schema = [
    {
        name: "myText",
        type: "text"
    },
    {
        name: "myRange",
        type: "range"
    },
    {
        name: "myCheckbox",
        type: "checkbox"
    },
    {
        name: "myButton",
        type: "button",
        color: "red"
    }
];

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('schema', {
        schema: schema
    });
    socket.on('data', function (data) {
        console.log(data);
    });
});