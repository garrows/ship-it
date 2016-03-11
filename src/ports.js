var PLANET_AREA = 10000,
  PORT_SIZE = 10;

import Port from './port.js';

class Ports {
  constructor(game, count, player) {
    this.portsArr = new Array(count);

    //HOME port
    this.portsArr[0] = new Port(game, player.x, player.y, PORT_SIZE);
    this.portsArr[0].home = true;
    game.addDrawable(this.portsArr[0]);

    // Other ports
    for (let i = 1; i < this.portsArr.length; i++) {
      let x = Math.random() * PLANET_AREA - PLANET_AREA / 2;
      let y = Math.random() * PLANET_AREA - PLANET_AREA / 2;
      let r = PORT_SIZE;
      this.portsArr[i] = new Port(game, x, y, r);
      game.addDrawable(this.portsArr[i]);
    }
  }
  toString() {
    return 'um... ports';
  }
}
export default Ports;
