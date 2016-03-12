import Clickable from './clickable.js';

export default class Port extends Clickable {
  constructor(game, x, y, z) {
    super(game, x, y, z);
    this.game = game;
    this.x = x;
    this.y = y;
    this.r = z;
    this.home = false;
    this.selected = false;
  }
  draw(dt, ctx, camera) {
    let color = this.home ? '#0a0' : '#a00';
    color = this.selected ? '#00a' : color;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(this.x - camera.x, this.y - camera.y, this.r, 10, 80);
    ctx.fill();
  }
}
