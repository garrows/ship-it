class Game {
  constructor(canvas) {
    console.log('constructed game');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.players = [];
    this.drawables = [];
    this.camera = null;
    this.lastTime = null;
  }
  addPlayer(player) {
    this.players.push(player);
  }
  setCamera(camera) {
    this.camera = camera;
  }
  addDrawable(drawable) {
    this.drawables.push(drawable);
  }
  update() {

  }
  draw(time) {
    //Lazy way to prevent 0 time bugs on firt run
    if (!this.lastTime) {
      this.lastTime = time;
      return;
    }
    var dt = time - this.lastTime;
    this.lastTime = time;

    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawables.forEach((drawable) => {
      drawable.draw(dt, this.ctx, this.camera);
    });
    // drawHud(dt);
  }
}
export default Game;
