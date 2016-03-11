const MOVE_SPEED = 2;
const ZOOM_SPEED = 0.5;

class Camera {
  constructor(x, y) {
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
  update(dt) {
    if (this.right) this.x += MOVE_SPEED * dt;
    if (this.left) this.x -= MOVE_SPEED * dt;
    if (this.up) this.y -= MOVE_SPEED * dt;
    if (this.down) this.y += MOVE_SPEED * dt;
    if (this.zoomIn) this.z += ZOOM_SPEED * dt;
    if (this.zoomOut) this.z -= ZOOM_SPEED * dt;
  }
}
export default Camera;
