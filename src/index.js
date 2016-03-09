/* global document, window */
'use strict';

require('!style!css!./style.css');

import Ports from './ports.js';
import Game from './game.js';
import Player from './player.js';
import Camera from './camera.js';
import Hud from './hud.js';

var canvas = document.getElementById('canvas'),
  center,
  game,
  camera,
  player,
  hud,
  ports;

var PORT_COUNT = 2;

var initialize = function() {
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);

  game = new Game(canvas);

  center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  if (!player) {

    player = new Player(canvas.width / 2, canvas.height / 2 / 2);
    game.addPlayer(player);

    camera = new Camera(player.x - canvas.width / 2, player.y - canvas.height / 2);
    game.setCamera(camera);

    ports = new Ports(PORT_COUNT, player);
    game.addDrawable(ports);
    hud = new Hud(player);
    game.addDrawable(hud);

  }
};

var inPlanet = function(planet, x, y) {
  if (
    x < planet.x + planet.r &&
    x > planet.x - planet.r &&
    y < planet.y + planet.r &&
    y > planet.y - planet.r &&
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



var draw = function(time) {
  game.draw(time);
  requestAnimationFrame(draw);
};

initialize();
window.onresize = initialize;

requestAnimationFrame(draw);
