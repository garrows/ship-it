/* global document */
'use strict';

require('!style!css!./style.css');

import Ports from './ports.js';
import Game from './game.js';
import Player from './player.js';
import Camera from './camera.js';
import Hud from './hud.js';
import Resizer from './resizer.js';
import Inputter from './inputter.js';

var canvas = document.getElementById('canvas');
var PORT_COUNT = 2;

var game = new Game(canvas);

new Resizer(game, canvas);
new Inputter(game);

var player = new Player(canvas.width / 2, canvas.height / 2 / 2);
game.addPlayer(player);

var camera = new Camera(player.x - canvas.width / 2, player.y - canvas.height / 2);
game.setCamera(camera);

var ports = new Ports(game, PORT_COUNT, player);

var hud = new Hud(game, player);
game.addDrawable(hud);


game.start();


window.game = game;
window.player = player;
window.camera = camera;
window.ports = ports;
window.hud = hud;
window.canvas = canvas;


//
// var inPlanet = function(planet, x, y) {
//   if (
//     x < planet.x + planet.r &&
//     x > planet.x - planet.r &&
//     y < planet.y + planet.r &&
//     y > planet.y - planet.r &&
//     true
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// };
//
// var getVector = function(source, target) {
//   var vector = {
//     x: target.x - source.x,
//     y: target.y - source.y,
//     angle: 0,
//     distance: 0
//   };
//   if (vector.y < 0) {
//     vector.angle = -Math.atan(vector.x / vector.y);
//   } else if (vector.x > 0) {
//     vector.angle = Math.atan(vector.y / vector.x) + Math.PI / 2;
//   } else if (vector.x < 0) {
//     vector.angle = Math.atan(vector.y / vector.x) + Math.PI * 1.5;
//   }
//   //Calculate velocity
//   vector.distance = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
//   return vector;
// };
