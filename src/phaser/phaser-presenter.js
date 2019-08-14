import Phaser from "phaser";
import GesturesPlugin from './plugins/gestures-plugin.js';
import FindCoco from './scenes/find-coco.js';
import SplashScreen from './scenes/splash-screen';


const phaserConfig = (levels, onReady, onCocoClick) => ({
  type: Phaser.AUTO,
  parent: "content",
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  scene: [ new SplashScreen(levels, onReady), new FindCoco(onCocoClick) ],
  plugins: {
    scene: [{
      key: 'rexGestures',
      plugin: GesturesPlugin,
      mapping: 'rexGestures'
    }]
  }
});

export default class PhaserPresenter {
  constructor() {
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
    const PHASER_CONFIG = phaserConfig(this.levels, this.onReady, this.onCocoClick);

    this.game = new Phaser.Game(PHASER_CONFIG);
    window.game = this.game;
  }

  showLevel(levelData, startDate) {
    this.game.scene.start('findCoco', {levelData, startDate});
  }

  showScore(score) {
    alert('score: ' + score);
  }

  showClickFailed(failedDate) {
    this.game.scene.getScene('findCoco').failed(failedDate);
  }

}
