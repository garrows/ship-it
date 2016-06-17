import {
  EventEmitter
} from 'events';

class Game extends EventEmitter {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.players = [];
    this.drawables = [];
    this.camera = null;
    this.lastTime = null;

    //TODO: REMOVE
    // this.debug = true;
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

  update(dt) {
    this.camera.update(dt);
    this.drawables.forEach((drawable) => {
      if (typeof drawable.update === 'function') {
        drawable.update(dt, this.ctx, this.camera);
      }
    });
  }

  draw(time) {
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

    this.drawables.forEach((drawable) => {
      drawable.draw(dt, this.ctx, this.camera);
    });
    this.emit('post-draw', dt, this.ctx, this.camera);
  }

  start() {
    var draw = (time) => {
      this.draw(time);
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }
}
export default Game;
