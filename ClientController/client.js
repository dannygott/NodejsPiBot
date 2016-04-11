var ws = require("nodejs-websocket")
var GamepadMicro = require('gamepad-micro');
var gp = new GamepadMicro();




var comms = ws.connect("ws://raspberrypi.home:8001", function info(){
  console.log("connected to server");
    gp.onUpdate(function(gamepads) {
      if (gp.gamepadConnected) {
        JSON.parse(gamepads);
        console.log("lfkfjsdlfksdjflksdfjsdf"+gamepads);
      } else {
        console.log("Gamepad Disconnect");
      }
    });


});
