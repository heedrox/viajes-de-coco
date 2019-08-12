import Phaser from "phaser";
import GesturesPlugin from './plugins/gestures-plugin.js';
import FindCoco from './scenes/find-coco.js';

const PHASER_CONFIG = {
  type: Phaser.AUTO,
  parent: "content",
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  scene: [ FindCoco ],
  plugins: {
    scene: [{
      key: 'rexGestures',
      plugin: GesturesPlugin,
      mapping: 'rexGestures'
    }]
  }
};

export default class PhaserPresenter {
  constructor() {
  }

  start() {
    this.game = new Phaser.Game(PHASER_CONFIG);
    window.game = this.game;
  }
}
