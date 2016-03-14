var PORT_SIZE = 20;

import Port from './port.js';

export default class Levels {
  constructor(game, player) {
    this.level = 1;
    this.ports = [];

    //HOME port

    this.ports.push(new Port(game, player.x, player.y, PORT_SIZE));
    this.ports[0].home = true;

    //NPC ports
    this.ports.push(new Port(game, player.x - 200, player.y + 100, PORT_SIZE));
    this.ports.push(new Port(game, player.x + 200, player.y + 100, PORT_SIZE));
    this.ports[1].addTrader(this.ports[2]);
  }
}
