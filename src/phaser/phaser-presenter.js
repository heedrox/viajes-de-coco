import Phaser from "phaser";
import GesturesPlugin from './plugins/gestures-plugin.js';
import FindCoco from './scenes/find-coco.js';
import SplashScreen from './scenes/splash-screen';


export default class PhaserPresenter {
  constructor(levels) {
    this.levels = levels;
  }

  setOnCocoClick(onCocoClick) {
    this.onCocoClick = onCocoClick;
  }

  setLevels(levels) {
    this.levels = levels;
  }

  setOnReady(onReady) {
    this.onReady = onReady;
  }

  start() {
    const PHASER_CONFIG = {
      type: Phaser.AUTO,
      parent: "content",
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      scene: [ new SplashScreen(this.levels, this.onReady), new FindCoco(this.onCocoClick) ],
      plugins: {
        scene: [{
          key: 'rexGestures',
          plugin: GesturesPlugin,
          mapping: 'rexGestures'
        }]
      }
    };

    this.game = new Phaser.Game(PHASER_CONFIG);
    // window.game = this.game;
  }

  showLevel(levelData) {
    this.game.scene.start('findCoco', {levelData});
  }

}
