const SHIP_WIDTH = 20,
  SHIP_HEIGHT = 40,
  SHIP_CARGO_LOAD_MULTIPLIER = 50,
  SHIP_CARGO_MAX = 1000,
  SHIP_SPEED_MULTIPLIER = 0.3,
  SHIP_TIP = 10;

import Clickable from './clickable.js';

export default class Ship extends Clickable {
  constructor(game, x, y, homePort, tradePort, cargo) {
    super(game, x, y, SHIP_WIDTH, SHIP_HEIGHT);
    this.d = Math.PI / 2; //direction
    this.homePort = homePort;
    this.tradePort = tradePort;
    this.target = tradePort;
    this.cargo = cargo;
    this.state = 'MOVING';
  }
  update(dt) {
    let dx = this.x - this.target.x,
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
        let maxD = Math.max(Math.abs(dx), Math.abs(dy));
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
  draw(dt, ctx, camera) {
    super.draw(dt, ctx, camera);
    let color = '#aaa';
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    let x = this.x - camera.x,
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
}
