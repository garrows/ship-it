/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* global document */
	'use strict';

	var _levels = __webpack_require__(1);

	var _levels2 = _interopRequireDefault(_levels);

	var _game = __webpack_require__(5);

	var _game2 = _interopRequireDefault(_game);

	var _player = __webpack_require__(7);

	var _player2 = _interopRequireDefault(_player);

	var _camera = __webpack_require__(8);

	var _camera2 = _interopRequireDefault(_camera);

	var _hud = __webpack_require__(9);

	var _hud2 = _interopRequireDefault(_hud);

	var _resizer = __webpack_require__(10);

	var _resizer2 = _interopRequireDefault(_resizer);

	var _inputter = __webpack_require__(11);

	var _inputter2 = _interopRequireDefault(_inputter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(12);

	var canvas = document.getElementById('canvas');

	var game = new _game2.default(canvas);

	new _resizer2.default(game, canvas);
	new _inputter2.default(game);

	var player = new _player2.default(canvas.width / 2, canvas.height / 2 / 2);
	game.addPlayer(player);

	var camera = new _camera2.default(player.x - canvas.width / 2, player.y - canvas.height / 2);
	game.setCamera(camera);

	var levels = new _levels2.default(game, player);

	var hud = new _hud2.default(game, player);

	game.start();

	window.game = game;
	window.player = player;
	window.camera = camera;
	window.levels = levels;
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _port = __webpack_require__(2);

	var _port2 = _interopRequireDefault(_port);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PORT_SIZE = 20;

	var Levels = function Levels(game, player) {
	  _classCallCheck(this, Levels);

	  this.level = 1;
	  this.ports = [];

	  //HOME port
	  this.ports.push(new _port2.default(game, player.x, player.y, PORT_SIZE));
	  this.ports[0].home = true;

	  //NPC ports
	  this.ports.push(new _port2.default(game, player.x - 200, player.y + 100, PORT_SIZE));
	  this.ports.push(new _port2.default(game, player.x + 200, player.y + 100, PORT_SIZE));
	  this.ports[1].addTrader(this.ports[2]);
	};

	exports.default = Levels;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _clickable = __webpack_require__(3);

	var _clickable2 = _interopRequireDefault(_clickable);

	var _ship = __webpack_require__(4);

	var _ship2 = _interopRequireDefault(_ship);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CARGO_COUNT = 1000;

	var Port = function (_Clickable) {
	  _inherits(Port, _Clickable);

	  function Port(game, x, y, w) {
	    _classCallCheck(this, Port);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Port).call(this, game, x, y, w));

	    _this.home = false;
	    _this.traders = [];
	    game.on('post-draw', _this.postDraw);
	    return _this;
	  }

	  _createClass(Port, [{
	    key: 'update',
	    value: function update(dt, ctx, camera) {
	      var _this2 = this;

	      this.traders.forEach(function (trader) {
	        if (trader.ships.length === 0) {
	          trader.ships.push(new _ship2.default(_this2.game, _this2.x, _this2.y, _this2, trader.port, CARGO_COUNT));
	        }
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw(dt, ctx, camera) {
	      _get(Object.getPrototypeOf(Port.prototype), 'draw', this).call(this, dt, ctx, camera);
	      var color = this.home ? '#0a0' : '#a00';
	      ctx.fillStyle = color;
	      ctx.strokeStyle = color;
	      var x = this.x - camera.x,
	          y = this.y - camera.y,
	          r = this.w / 2;
	      ctx.beginPath();
	      ctx.arc(x, y, r, 10, 80);
	      ctx.fill();
	    }
	  }, {
	    key: 'postDraw',
	    value: function postDraw(dt, ctx, camera) {
	      console.log('blah');
	    }
	  }, {
	    key: 'addTrader',
	    value: function addTrader(port) {
	      this.traders.push({
	        port: port,
	        ships: []
	      });
	    }
	  }]);

	  return Port;
	}(_clickable2.default);

	exports.default = Port;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Clickable = function () {
	  function Clickable(game, x, y, w, h) {
	    _classCallCheck(this, Clickable);

	    this.game = game;
	    this.x = x;
	    this.y = y;
	    this.w = w;
	    this.h = h;
	    this.selected = false;
	    game.addDrawable(this);
	  }

	  _createClass(Clickable, [{
	    key: 'mousedown',
	    value: function mousedown(event) {
	      var camera = this.game.camera,
	          x = event.clientX + camera.x,
	          y = event.clientY + camera.y;

	      if (x < this.x + this.w / 2 && x > this.x - this.w / 2 && y < this.y + this.w / 2 && y > this.y - this.w / 2) {
	        this.selected = true;
	        console.log('Selected', this);
	        return true;
	      } else {
	        return this.selected = false;
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(dt, ctx, camera) {
	      if (this.selected) {
	        var x = this.x - camera.x,
	            y = this.y - camera.y;

	        ctx.strokeStyle = '#eee';
	        var SELECTION_PADDING = 1.2;
	        ctx.strokeRect(x - this.w / 2 * SELECTION_PADDING, y - this.w / 2 * SELECTION_PADDING, this.w * SELECTION_PADDING, this.w * SELECTION_PADDING);
	      }
	    }
	  }]);

	  return Clickable;
	}();

	exports.default = Clickable;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _clickable = __webpack_require__(3);

	var _clickable2 = _interopRequireDefault(_clickable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SHIP_WIDTH = 20,
	    SHIP_HEIGHT = 40,
	    SHIP_CARGO_LOAD_MULTIPLIER = 50,
	    SHIP_CARGO_MAX = 1000,
	    SHIP_SPEED_MULTIPLIER = 0.3,
	    SHIP_TIP = 10;

	var Ship = function (_Clickable) {
	  _inherits(Ship, _Clickable);

	  function Ship(game, x, y, homePort, tradePort, cargo) {
	    _classCallCheck(this, Ship);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ship).call(this, game, x, y, SHIP_WIDTH, SHIP_HEIGHT));

	    _this.d = Math.PI / 2; //direction
	    _this.homePort = homePort;
	    _this.tradePort = tradePort;
	    _this.target = tradePort;
	    _this.cargo = cargo;
	    _this.state = 'MOVING';
	    return _this;
	  }

	  _createClass(Ship, [{
	    key: 'update',
	    value: function update(dt) {
	      var dx = this.x - this.target.x,
	          dy = this.y - this.target.y;

	      //State actor
	      switch (this.state) {
	        case 'MOVING':
	          if (dy < 0) {
	            this.d = -Math.atan(dx / dy);
	          } else if (dx > 0) {
	            this.d = Math.atan(dy / dx) + Math.PI / 2;
	          } else if (dx < 0) {
	            this.d = Math.atan(dy / dx) + Math.PI * 1.5;
	          }
	          this.d -= Math.PI;

	          this.x += Math.sin(this.d) * dt * SHIP_SPEED_MULTIPLIER;
	          this.y += -Math.cos(this.d) * dt * SHIP_SPEED_MULTIPLIER;
	          break;
	        case 'LOADING':
	          this.cargo += dt * SHIP_CARGO_LOAD_MULTIPLIER;
	          break;
	        case 'UNLOADING':
	          this.cargo -= dt * SHIP_CARGO_LOAD_MULTIPLIER;
	          break;
	        default:
	          console.warn('unknown ship state');

	      }

	      // State switcher
	      switch (this.state) {
	        case 'MOVING':
	          var maxD = Math.max(Math.abs(dx), Math.abs(dy));
	          if (maxD < 3) {
	            this.state = this.target === this.tradePort ? 'UNLOADING' : 'LOADING';
	          }
	          break;
	        case 'LOADING':
	          if (this.cargo >= SHIP_CARGO_MAX) {
	            this.cargo = SHIP_CARGO_MAX;
	            this.state = 'MOVING';
	            this.target = this.tradePort;
	          }
	          break;
	        case 'UNLOADING':
	          if (this.cargo <= 0) {
	            this.cargo = 0;
	            this.state = 'MOVING';
	            this.target = this.homePort;
	          }
	          break;
	        default:
	          console.warn('unknown ship state');
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(dt, ctx, camera) {
	      _get(Object.getPrototypeOf(Ship.prototype), 'draw', this).call(this, dt, ctx, camera);
	      var color = '#aaa';
	      ctx.fillStyle = color;
	      ctx.strokeStyle = color;
	      var x = this.x - camera.x,
	          y = this.y - camera.y;

	      ctx.save();
	      ctx.translate(x, y);
	      ctx.rotate(this.d);

	      ctx.fillRect(0, 0 - SHIP_TIP, this.w, this.h - SHIP_TIP);
	      ctx.beginPath();
	      ctx.moveTo(0, 0 - this.h / 2 + SHIP_TIP);
	      ctx.lineTo(0 + this.w / 2, 0 - this.h / 2);
	      ctx.lineTo(0 + this.w, 0 - this.h / 2 + SHIP_TIP);
	      ctx.fill();

	      ctx.restore();
	    }
	  }]);

	  return Ship;
	}(_clickable2.default);

	exports.default = Ship;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _events = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Game = function (_EventEmitter) {
	  _inherits(Game, _EventEmitter);

	  function Game(canvas) {
	    _classCallCheck(this, Game);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this));

	    _this.canvas = canvas;
	    _this.ctx = canvas.getContext('2d');
	    _this.players = [];
	    _this.drawables = [];
	    _this.camera = null;
	    _this.lastTime = null;

	    //TODO: REMOVE
	    // this.debug = true;
	    return _this;
	  }

	  _createClass(Game, [{
	    key: 'addPlayer',
	    value: function addPlayer(player) {
	      this.players.push(player);
	    }
	  }, {
	    key: 'setCamera',
	    value: function setCamera(camera) {
	      this.camera = camera;
	    }
	  }, {
	    key: 'addDrawable',
	    value: function addDrawable(drawable) {
	      this.drawables.push(drawable);
	    }
	  }, {
	    key: 'update',
	    value: function update(dt) {
	      var _this2 = this;

	      this.camera.update(dt);
	      this.drawables.forEach(function (drawable) {
	        if (typeof drawable.update === 'function') {
	          drawable.update(dt, _this2.ctx, _this2.camera);
	        }
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw(time) {
	      var _this3 = this;

	      //Lazy way to prevent 0 time bugs on firt run
	      if (!this.lastTime) {
	        this.lastTime = time;
	        return;
	      }

	      var dt = time - this.lastTime;
	      this.lastTime = time;

	      this.update(dt, this.ctx);

	      this.ctx.fillStyle = '#000000';
	      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	      this.drawables.forEach(function (drawable) {
	        drawable.draw(dt, _this3.ctx, _this3.camera);
	      });
	      this.emit('post-draw', dt, this.ctx, this.camera);
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this4 = this;

	      var draw = function draw(time) {
	        _this4.draw(time);
	        requestAnimationFrame(draw);
	      };
	      requestAnimationFrame(draw);
	    }
	  }]);

	  return Game;
	}(_events.EventEmitter);

	exports.default = Game;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = function () {
	  function Player(x, y) {
	    _classCallCheck(this, Player);

	    this.x = x;
	    this.y = y;
	    this.state = 'spawn';
	    this.gold = 1000;
	  }

	  _createClass(Player, [{
	    key: 'update',
	    value: function update() {}
	  }, {
	    key: 'draw',
	    value: function draw() {}
	  }]);

	  return Player;
	}();

	exports.default = Player;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MOVE_SPEED = 2;
	var ZOOM_SPEED = 0.5;

	var Camera = function () {
	  function Camera(x, y) {
	    _classCallCheck(this, Camera);

	    this.x = x;
	    this.y = y;
	    this.z = 1;
	    this.up = false;
	    this.down = false;
	    this.left = false;
	    this.right = false;
	    this.zoomIn = false;
	    this.zoomOut = false;
	  }

	  _createClass(Camera, [{
	    key: "update",
	    value: function update(dt) {
	      if (this.right) this.x += MOVE_SPEED * dt;
	      if (this.left) this.x -= MOVE_SPEED * dt;
	      if (this.up) this.y -= MOVE_SPEED * dt;
	      if (this.down) this.y += MOVE_SPEED * dt;
	      if (this.zoomIn) this.z += ZOOM_SPEED * dt;
	      if (this.zoomOut) this.z -= ZOOM_SPEED * dt;
	    }
	  }]);

	  return Camera;
	}();

	exports.default = Camera;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HUD_TITLE = 'You\'re a pirate. There are 2 ports doing trade. Time to get your prize.\n',
	    HUD_GOAL_INSTRUCTION = 'Steal 2000 gold from the trade ships.',
	    HUD_FONTSIZE_TITLE = 30,
	    HUD_FONTSIZE_INSTRUCTIONS = 20,
	    INSTRUCTIONS_NEGATIVE_Y_GOAL = HUD_FONTSIZE_INSTRUCTIONS * 2.3,
	    INSTRUCTIONS_SPEED_MULTIPLIER = 0.02,
	    GOALS_FINISHED_FADEOUT_TIME = 5000;

	var goalsIterator = 0;
	var GOAL_MOVE_MAP = goalsIterator++,
	    GOAL_SELECT_BASE = goalsIterator++,
	    GOAL_FINISHED = goalsIterator++;

	var INSTRUCTIONS_MOVE_MAP = 'Use the arrow keys to move the map.',
	    INSTRUCTIONS_SELECT_BASE = 'Good. Now select your base by clicking on it.',
	    INSTRUCTIONS_FINISHED = 'Excellent. Now go take over the world.';

	var Hud = function () {
	  function Hud(game, player) {
	    _classCallCheck(this, Hud);

	    this.game = game;
	    this.player = player;
	    this.goals = 0;
	    this.instructionsY = null;
	    this.goalsFinishedTimer = 0;
	    game.addDrawable(this);

	    if (game.debug) {
	      this.goals = GOAL_FINISHED + 1;
	    }
	  }

	  _createClass(Hud, [{
	    key: 'update',
	    value: function update(dt, ctx) {
	      // console.log(dt);
	      var camera = this.game.camera;
	      switch (this.goals) {
	        case GOAL_MOVE_MAP:
	          if (camera && (camera.up || camera.down || camera.left || camera.right)) {
	            this.goals++;
	          }
	          break;
	        case GOAL_SELECT_BASE:
	          if (ctx.canvas.height - this.instructionsY <= INSTRUCTIONS_NEGATIVE_Y_GOAL) {
	            //Set to desired position to correct for dt craziness
	            this.instructionsY = ctx.canvas.height - INSTRUCTIONS_NEGATIVE_Y_GOAL;
	            var hasSelected = this.game.drawables.some(function (drawable) {
	              return drawable.selected;
	            });
	            if (hasSelected) {
	              this.goals++;
	            }
	          } else {
	            //Take a second to move to the bottom
	            this.instructionsY = this.instructionsY + INSTRUCTIONS_NEGATIVE_Y_GOAL * dt * INSTRUCTIONS_SPEED_MULTIPLIER;
	          }
	          break;
	        case GOAL_FINISHED:
	          if (this.goalsFinishedTimer > GOALS_FINISHED_FADEOUT_TIME) {
	            this.goals++;
	            //Corect for dt
	            this.goalsFinishedTimer = GOALS_FINISHED_FADEOUT_TIME;
	          } else {
	            this.goalsFinishedTimer += dt;
	          }
	          break;
	        default:
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(dt, ctx) {
	      this.drawText(ctx, 'Gold: ' + this.player.gold, 18, 5, 20, true);
	      var center = {
	        x: ctx.canvas.width / 2,
	        y: ctx.canvas.height / 2
	      };
	      this.instructionsY = this.instructionsY || center.y * 0.4 + 80;

	      switch (this.goals) {
	        case GOAL_MOVE_MAP:
	          this.drawText(ctx, HUD_TITLE, HUD_FONTSIZE_TITLE, center.x, center.y * 0.4, false);
	          var newInstructionFontSize = this.drawText(ctx, HUD_GOAL_INSTRUCTION, HUD_FONTSIZE_INSTRUCTIONS, center.x, center.y * 0.4 + 40, false);
	          this.drawText(ctx, INSTRUCTIONS_MOVE_MAP, newInstructionFontSize, center.x, this.instructionsY, false);
	          break;
	        case GOAL_SELECT_BASE:
	          this.drawText(ctx, INSTRUCTIONS_SELECT_BASE, HUD_FONTSIZE_INSTRUCTIONS, center.x, this.instructionsY, false);
	          break;
	        case GOAL_FINISHED:
	          this.drawText(ctx, INSTRUCTIONS_FINISHED, HUD_FONTSIZE_INSTRUCTIONS, center.x, this.instructionsY, false);
	          break;
	        default:

	      }
	    }
	  }, {
	    key: 'drawText',
	    value: function drawText(ctx, text, fontSize, x, y, alignLeft) {
	      var textWidth;
	      var opacity = (GOALS_FINISHED_FADEOUT_TIME - this.goalsFinishedTimer) / GOALS_FINISHED_FADEOUT_TIME;
	      ctx.strokeStyle = ctx.fillStyle = 'rgba(255,20,255,' + opacity + ')';

	      do {
	        ctx.font = fontSize + 'px sans-serif';
	        textWidth = ctx.measureText(text).width;
	        fontSize--;
	      } while (textWidth > window.innerWidth * 0.9);

	      if (!alignLeft) x = x - textWidth / 2;

	      ctx.strokeText(text, x, y);
	      ctx.fillText(text, x, y);
	      return fontSize + 1;
	    }
	  }]);

	  return Hud;
	}();

	exports.default = Hud;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Resizer = function Resizer(game, canvas) {
	  _classCallCheck(this, Resizer);

	  var resize = function resize() {
	    var dx = canvas.width - window.innerWidth;
	    var dy = canvas.height - window.innerHeight;
	    canvas.setAttribute('width', window.innerWidth);
	    canvas.setAttribute('height', window.innerHeight);
	    if (game.camera) {
	      game.camera.x += dx / 2;
	      game.camera.y += dy / 2;
	    }
	  };
	  window.onresize = resize;
	  resize();
	};

	exports.default = Resizer;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Inputter = function Inputter(game) {
	  _classCallCheck(this, Inputter);

	  document.onkeydown = document.onkeyup = function (e) {
	    var camera = game.camera;
	    if (!camera) return;

	    switch (e.which) {
	      case 38:
	        //up
	        camera.up = e.type === 'keydown';
	        break;
	      case 37:
	        //left
	        camera.left = e.type === 'keydown';
	        break;
	      case 39:
	        //right
	        camera.right = e.type === 'keydown';
	        break;
	      case 40:
	        //down
	        camera.down = e.type === 'keydown';
	        break;
	      case 189:
	        //-
	        camera.zoomOut = e.type === 'keydown';
	        break;
	      case 187:
	        //+
	        camera.zoomIn = e.type === 'keydown';
	        break;
	      default:
	        console.log('Key', e.which);
	    }
	  };

	  document.onmousedown = function (e) {
	    var camera = game.camera;
	    if (!camera) return;

	    game.drawables.forEach(function (drawable) {
	      typeof drawable.mousedown === 'function' && drawable.mousedown(e);
	    });
	  };
	};

	exports.default = Inputter;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports


	// module
	exports.push([module.id, "body {\n  padding: 0;\n  margin: 0;\n  text-align: center;\n}", ""]);

	// exports


/***/ },
/* 14 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);