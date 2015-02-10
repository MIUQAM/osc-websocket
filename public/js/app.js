'use strict';

var app = angular.module('osc-websocket', [])

.controller('mainController', function($scope) {
    var socket = io('//' + window.location.host);
    socket.on('connect', function (data) {
        console.log("Connected to " + window.location.host + ".");
    });

    $scope.controls = [
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

    $scope.send = function(name, value){
        console.log('Sending ' + name + ': "' + value + '"' )
        socket.emit('data', {
            name: name,
            value: value
        });
    }
    
});