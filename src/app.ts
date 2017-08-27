 import 'p2';
 import 'pixi';
 import 'phaser';

import { Boot } from './states/boot';
import { Game } from './states/game';

export class MyGame extends Phaser.Game {
  constructor() {
    super(800, 600)

    this.state.add('boot', Boot)
    this.state.add('game', Game)
    this.state.start('boot')
  }
}

new MyGame();