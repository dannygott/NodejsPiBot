
var ws = require("nodejs-websocket")
var raspi = require('raspi');
var gpio = require('raspi-gpio');
var PwmDriver = require('adafruit-i2c-pwm-driver')
var pwm = new PwmDriver  (0x40)

raspi.init(function() {

// gpio
var solenoid = new gpio.DigitalOutput('GPIO0');




var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        gamepad = JSON.parse(str);
        pwm.setPWM(1, 0, gamepad.left);
        pwm.setPWM(2, 0, gamepad.right);
        if (gamepad.abutton == true) {
            solenoid.write(HIGH);
        }else{
            solenoid.write(LOW);
        };

    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        pwm.setPWM(1, 0, 0);
        pwm.setPWM(2, 0, 0);
        solenoid.write(LOW);

    })
}).listen(8001)

});
