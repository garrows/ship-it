export default class Clickable {
  constructor(game, x, y, w, h) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.selected = false;
    game.addDrawable(this);
  }
  mousedown(event) {
    let camera = this.game.camera,
      x = event.clientX + camera.x,
      y = event.clientY + camera.y;

    if (
      x < this.x + this.w / 2 &&
      x > this.x - this.w / 2 &&
      y < this.y + this.w / 2 &&
      y > this.y - this.w / 2
    ) {
      this.selected = true;
      console.log('Selected', this);
      return true;
    } else {
      return this.selected = false;
    }
  }
  draw(dt, ctx, camera) {
    if (this.selected) {
      let x = this.x - camera.x,
        y = this.y - camera.y;

      ctx.strokeStyle = '#eee';
      const SELECTION_PADDING = 1.2;
      ctx.strokeRect(
        x - this.w / 2 * SELECTION_PADDING,
        y - this.w / 2 * SELECTION_PADDING,
        this.w * SELECTION_PADDING,
        this.w * SELECTION_PADDING
      );
    }
  }
}
