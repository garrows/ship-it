export default class Resizer {
  constructor(game, canvas) {
    var resize = function() {
      let dx = canvas.width - window.innerWidth;
      let dy = canvas.height - window.innerHeight;
      canvas.setAttribute('width', window.innerWidth);
      canvas.setAttribute('height', window.innerHeight);
      if (game.camera) {
        game.camera.x += dx / 2;
        game.camera.y += dy / 2;
      }
    };
    window.onresize = resize;
    resize();
  }
}
