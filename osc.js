
var osc = require('node-osc');
var config = require('./config');

var port = config.oscPort || 3333;

var client = new osc.Client('127.0.0.1', port);
console.log('OSC client listening on port ' + port);

module.exports = {
    send: function(name, value){
        //As node-OSC doesn't see to handle booleans, we do the work ourselves.
        if(value === true){
            value = 1;
        }
        else if(value === false){
            value = 0;
        }
        client.send('/' + name, value);
    }
}