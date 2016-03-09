var PLANET_AREA = 10000,
  PORT_SIZE = 10;


var drawPort = function(dt, ctx, camera, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x - camera.x, y - camera.y, r, 10, 80);
  ctx.fill();
};



class Ports {
  constructor(count, player) {
    this.portsArr = new Array(count);

    //HOME port
    this.portsArr[0] = {
      x: player.x,
      y: player.y,
      r: PORT_SIZE,
      home: true
    };
    console.log(player.x, player.y)

    // Other ports
    for (let i = 1; i < this.portsArr.length; i++) {
      this.portsArr[i] = {
        x: Math.random() * PLANET_AREA - PLANET_AREA / 2,
        y: Math.random() * PLANET_AREA - PLANET_AREA / 2,
        r: PORT_SIZE,
        home: false
      };
    }
  }
  toString() {
    return 'um... ports';
  }
  draw(dt, ctx, camera) {
    var port, color;
    for (var i = 0; i < this.portsArr.length; i++) {
      port = this.portsArr[i];
      color = port.home ? '#0a0' : '#a00';

      drawPort(dt, ctx, camera, port.x, port.y, port.r, color);
    }
  }
}
export default Ports;
