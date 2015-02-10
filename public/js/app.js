'use strict';

var app = angular.module('osc-websocket', [])

.controller('mainController', function($scope, socket, SchemaFactory) {
    var socket = io('//' + window.location.host);

    SchemaFactory.getSchema().then(null, null, function(schema) {
        $scope.controls = schema;
    });

    socket.on('connect', function (data) {
        console.log("Connected to " + window.location.host + ".");
    });

    $scope.send = function(name, value){
        console.log('Sending ' + name + ': "' + value + '"' )
        socket.emit('data', {
            name: name,
            value: value
        });
    }
    
})

.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
})

.factory('SchemaFactory', function(socket, $q){
    
    return {
        getSchema: function(){
            var deferred = $q.defer(); 
            socket.on('schema', function(data){
                console.log('Recieved schema :');
                deferred.notify(data.schema);
                console.log(data.schema);
            });
            return deferred.promise;
        }
    }
});