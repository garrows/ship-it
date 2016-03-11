export default class Clickable {
  constructor(game, x, y, z) {
    // super(game, x, y, z);
  }
  mousedown(event) {
    let camera = this.game.camera,
      x = event.clientX + camera.x,
      y = event.clientY + camera.y;

    if (
      x < this.x + this.r &&
      x > this.x - this.r &&
      y < this.y + this.r &&
      y > this.y - this.r
    ) {
      return this.selected = true;
    } else {
      return this.selected = false;
    }
  }
}
