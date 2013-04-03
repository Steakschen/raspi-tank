/**
* Module dependencies.
*/

var express = require('express'),
    routes = require('./routes'),
    sio = require('socket.io'),
    crypto = require('crypto'),
    async = require('async'),
    tank = {},
    _leftMotorFront = 11,
    _leftMotorBack = 12,
    _rightMotorFront = 15,
    _rightMotorBack = 16,
    app = module.exports = express.createServer(),
    io = sio.listen(app);

// Configuration
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

app.listen(3000);
console.log('Listening %d in %s mode', app.address().port, app.settings.env);

tank.initPins = function()
{
    
};

tank.moveForward = function()
{
    var exec = require('child_process').exec;
    var child = exec('echo "s7 1000 0" > /dev/ttyAMA0');
};
tank.moveBackward = function()
{
    var exec = require('child_process').exec;
    var child = exec('echo "s7 -1000 0" > /dev/ttyAMA0');
};
tank.turnLeft = function()
{
    var exec = require('child_process').exec;
    var child = exec('echo "s6 -1000 0" > /dev/ttyAMA0');
};
tank.turnRight = function()
{
    var exec = require('child_process').exec;
    var child = exec('echo "s6 1000 0" > /dev/ttyAMA0');
};

tank.stopForward = function()
{
    var exec = require('child_process').exec;
    var child = exec('echo "s7 -400 0" > /dev/ttyAMA0');
};
tank.stopBackward = function()
{
    var exec = require('child_process').exec;
    var child = exec('echo "s7 -400 0" > /dev/ttyAMA0');
};
tank.stopLeft = function()
{
    var exec = require('child_process').exec;
    var child = exec('echo "s6 200 0" > /dev/ttyAMA0');
};
tank.stopRight = function()
{
    var exec = require('child_process').exec;
    var child = exec('echo "s6 200 0" > /dev/ttyAMA0');
};

io.sockets.on('connection', function(socket) {
  
  socket.on('keydown', function(dir) {
    switch(dir){
     case 'up':
        tank.moveForward();
        break;
      case 'down':
        tank.moveBackward();
        break;
      case 'left':
        tank.turnLeft();
        break;
      case 'right':
        tank.turnRight();
        break;
    }
  });

  socket.on('keyup', function(dir){
    switch(dir){
     case 'up':
        tank.stopForward();
        break;
      case 'down':
        tank.stopBackward();
        break;
      case 'left':
        tank.stopLeft();
        break;
      case 'right':
        tank.stopRight();
        break;
    }
  });

});

tank.initPins();
