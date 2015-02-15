
var express = require('express');
var app = express();
var osc = require('node-osc');

// server.listen(80);
var config = {};
try { config = require('./config.json'); }catch (e) { console.warn('⚠ Missing config.json'); }

var port = config.port || process.env.PORT || 3000 ;
var oscPort = config.oscPort || 3333;

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
        sendOsc(data.name, data.value);
    });
});

var oscClient = new osc.Client('127.0.0.1', oscPort);
console.log('OSC client listening on port ' + oscPort);

function sendOsc(name, value){
    //As node-OSC doesn't see to handle booleans, we do the work ourselves.
    if(value === true){
        value = 1;
    }
    else if(value === false){
        value = 0;
    }
    oscClient.send('/' + name, value);
}
