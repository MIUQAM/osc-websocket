# osc-websocket


## The problem
The present OSC protocol isn't very web-friendly. Some applications like [TouchOSC](http://hexler.net/software/touchosc) allows user to remote control some parameters with soundconsole-like interface.

## What we're trying to do
We want to make a clone of the TouchOSC application with web technologies.

## Schema

```

   Web application 
        | 
       JSON
        |
        v
   Node.js Server
   |     |     |
  OSC   UDP   JSON
   |     |     |
   v     v     v
 Final application

```