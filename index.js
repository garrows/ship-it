/* global document, window */
'use strict';

require('!style!css!./style.css');

// var port = require('./port.js');
// import { drawPorts } from 'port.js';
import Ports from './ports.js';
var port = new Ports();

var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  seed,
  center,
  camera,
  player,
  portsArr,
  level = 1,
  attempts,
  startTime;

var PORT_HOME_DISTANCE = 450,
  PORT_HOME_DISTANCE_MULTIPLIER = 1.5,
  PORT_COUNT = 2,
  PORT_COUNT_MULTIPLIER = 1.2,
  PLANET_AREA = 10000,
  PORT_SIZE = 10,
  PLANET_BACKGROUND_SIZE = 0,
  PLANET_DENSITY_COEFFICIENT = 10,
  MAX_VELOCITY_HUD = 30,
  MAX_TARGET_DISTANCE_HUD = PLANET_AREA / 2,
  EXTRA_SEED = 3,
  HUD_TITLE = 'You wake up. You look at your blood soaked hands. No no no. Not again...\n',
  HUD_INSTRUCTIONS = 'Find your home planet. The green one. The green arrow shows the way. Avoid the red ports.',
  HUD_INSTRUCTIONS_CONTROLS = 'Use the \u2190 and \u2192 keys to turn. The \u2191 to thrust.',
  HUD_FONTSIZE_TITLE = 30,
  HUD_FONTSIZE_INSTRUCTIONS = 20;

//Bad seeded random number generator
function random() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

var initialize = function() {
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);

  startTime = Date.now();

  center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  if (!player) {
    seed = level + EXTRA_SEED;
    attempts = 1;

    player = {
      x: canvas.width / 2,
      y: canvas.height / 2 / 2,
      state: 'spawn'
    };

    camera = {
      x: player.x - canvas.width / 2,
      y: player.y - canvas.height / 2,
      z: 1,
      up: false,
      down: false,
      left: false,
      right: false
    };

    //Generate ports
    portsArr = new Array(PORT_COUNT);
    for (let i = 1; i < portsArr.length; i++) {
      portsArr[i] = {
        x: random() * PLANET_AREA - PLANET_AREA / 2,
        y: random() * PLANET_AREA - PLANET_AREA / 2,
        r: PORT_SIZE,
        home: false
      };
    }

    //HOME port
    portsArr[0] = {
      x: player.x,
      y: player.y,
      r: PORT_SIZE,
      home: true
    };

  }
};

var inPlanet = function(planet, x, y) {
  if (
    x < planet.x + planet.r &&
    x > planet.x - planet.r &&
    y < planet.y + planet.r &&
    y > planet.y - planet.r &&
    planet.r > PLANET_BACKGROUND_SIZE &&
    true
  ) {
    return true;
  } else {
    return false;
  }
};

var getVector = function(source, target) {
  var vector = {
    x: target.x - source.x,
    y: target.y - source.y,
    angle: 0,
    distance: 0
  };
  if (vector.y < 0) {
    vector.angle = -Math.atan(vector.x / vector.y);
  } else if (vector.x > 0) {
    vector.angle = Math.atan(vector.y / vector.x) + Math.PI / 2;
  } else if (vector.x < 0) {
    vector.angle = Math.atan(vector.y / vector.x) + Math.PI * 1.5;
  }
  //Calculate velocity
  vector.distance = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  return vector;
};



var drawText = function(text, fontSize, x, y, alignLeft) {
  var textWidth;
  ctx.strokeStyle = ctx.fillStyle = '#FF11FF';

  do {
    ctx.font = fontSize + 'px sans-serif';
    textWidth = ctx.measureText(text).width;
    fontSize--;
  } while (textWidth > window.innerWidth * 0.9);

  if (!alignLeft)
    x = x - textWidth / 2;

  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  return fontSize + 1;
};

var drawHud = function() {
  drawText('Level: ' + level, 18, 5, 20, true);

  if (player.state === 'spawn') {
    drawText(HUD_TITLE, HUD_FONTSIZE_TITLE, center.x, center.y * 0.4, false);
    var levelString = 'Level ' + level + '.';
    var text = level === 1 ? HUD_INSTRUCTIONS : levelString;
    var newInstructionFontSize = drawText(text, HUD_FONTSIZE_INSTRUCTIONS, center.x, center.y * 0.4 + 40, false);
    if (level === 1) {
      drawText(HUD_INSTRUCTIONS_CONTROLS, newInstructionFontSize, center.x, center.y * 0.4 + 80, false);
    }
  }

};




document.onkeydown = document.onkeyup = function(e) {
  switch (e.which) {
    case 38: //up
      camera.up = e.type === 'keydown';
      break;
    case 37: //left
      camera.left = e.type === 'keydown';
      break;
    case 39: //right
      camera.right = e.type === 'keydown';
      break;
    case 40: //down
      camera.down = e.type === 'keydown';
      break;
  }
};



var lastTime;
var draw = function(time) {
  if (!lastTime) {
    lastTime = time;
    requestAnimationFrame(draw);
    return;
  }
  var dt = time - lastTime;
  lastTime = time;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  port.drawPorts(dt, ctx, camera, portsArr);
  // port.drawPorts(dt, ctx, camera, ports);
  drawHud(dt);

  requestAnimationFrame(draw);
};

initialize();
window.onresize = initialize;

requestAnimationFrame(draw);
