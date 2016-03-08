const PLANET_BACKGROUND_SIZE = 0;

var drawPort = function(dt, ctx, camera, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x - camera.x, y - camera.y, r, 10, 80);
  ctx.fill();
};

//
// module.exports.drawPorts = function(dt, ctx, camera, ports) {
//   var port, color;
//   for (var i = 0; i < ports.length; i++) {
//     port = ports[i];
//     color = port.home ? '#0a0' : '#a00';
//
//     if (port.r < PLANET_BACKGROUND_SIZE) color = 'rgba(255,0,0,0.3)';
//
//     drawPort(dt, ctx, camera, port.x, port.y, port.r, color);
//   }
// };

function drawPorts(dt, ctx, camera, ports) {
  var port, color;
  for (var i = 0; i < ports.length; i++) {
    port = ports[i];
    color = port.home ? '#0a0' : '#a00';

    if (port.r < PLANET_BACKGROUND_SIZE) color = 'rgba(255,0,0,0.3)';

    drawPort(dt, ctx, camera, port.x, port.y, port.r, color);
  }
}

class Port {
  constructor() {
    console.log('constructed port');
  }
  toString() {
    return 'um... portsz';
  }
  drawPorts(dt, ctx, camera, ports) {
    return drawPorts(dt, ctx, camera, ports);
  }
}
export default Port;
