import Phaser from 'phaser';
import { phaserConfig } from './phaser-config';
import SplashScreen from './scenes/splash-screen';
import FindCoco from './scenes/find-coco';

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
    const PHASER_CONFIG = phaserConfig([
      new SplashScreen(this.levels, this.onReady),
      new FindCoco(this.onCocoClick)
    ]);

    this.game = new Phaser.Game(PHASER_CONFIG);
    window.game = this.game; //debugging purposes
  }

  showLevel(levelData, startDate) {
    this.game.scene.start('findCoco', { levelData, startDate });
  }

  showScore(score) {
    alert('score: ' + score);
  }

  showClickFailed(failedDate) {
    this.game.scene.getScene('findCoco').failed(failedDate);
  }

}
