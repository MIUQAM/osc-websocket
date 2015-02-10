# osc-websocket


## The problem
The present OSC protocol isn't very web-friendly. Some applications like [TouchOSC](http://hexler.net/software/touchosc) allows user to remote control some parameters with soundconsole-like interface.

## What we're trying to do
We want to make a clone of the TouchOSC application with web technologies.

## Schema

```

(1)       Web application 
                | 
               JSON
                |
                v
(2)        Node.js Server
           |     |     |
          OSC   UDP   JSON
           |     |     |
           v     v     v
(3)      Final application

```

## Technologies

### Front end (1)
- jQuery UI ?
- Raphael ?
- or Backbone/Angular ?

### Back-end (2)
- Node.js
- Express Framework for serving static files
- [node-osc](https://github.com/TheAlphaNerd/node-osc) module
- [socket.io](https://github.com/Automattic/socket.io) module communication between back (2) and front end (1)


## Usage
Run ```npm install``` to install the packages  
Run ```npm start``` to start the server