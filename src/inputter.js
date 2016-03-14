export default class Inputter {
  constructor(game) {

    document.onkeydown = document.onkeyup = function(e) {
      let camera = game.camera;
      if (!camera) return;

      switch (e.which) {
        case 38: //up
          camera.up = e.type === 'keydown';
          break;
        case 37: //left
          camera.left = e.type === 'keydown';
          break;
        case 39: //right
          camera.right = e.type === 'keydown';
          break;
        case 40: //down
          camera.down = e.type === 'keydown';
          break;
        case 189: //-
          camera.zoomOut = e.type === 'keydown';
          break;
        case 187: //+
          camera.zoomIn = e.type === 'keydown';
          break;
        default:
          console.log('Key', e.which);
      }
    };

    document.onmousedown = function(e) {
      let camera = game.camera;
      if (!camera) return;

      game.drawables.forEach((drawable) => {
        typeof drawable.mousedown === 'function' && drawable.mousedown(e);
      });
    }
  }
}
