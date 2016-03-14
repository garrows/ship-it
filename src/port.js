const CARGO_COUNT = 1000;

import Clickable from './clickable.js';
import Ship from './ship.js';

export default class Port extends Clickable {
  constructor(game, x, y, w) {
    super(game, x, y, w);

    this.home = false;
    this.traders = [];
  }
  update(dt, ctx, camera) {
    this.traders.forEach((trader) => {
      if (trader.ships.length === 0) {
        trader.ships.push(new Ship(this.game, this.x, this.y, this, trader.port, CARGO_COUNT));
      }
    });
  }
  draw(dt, ctx, camera) {
    super.draw(dt, ctx, camera);
    let color = this.home ? '#0a0' : '#a00';
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    let x = this.x - camera.x,
      y = this.y - camera.y,
      r = this.w / 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 10, 80);
    ctx.fill();

  }
  addTrader(port) {
    this.traders.push({
      port: port,
      ships: []
    });
  }
}
