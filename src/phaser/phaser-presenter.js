import Phaser from 'phaser';
import { phaserConfig } from './phaser-config';
import SplashScreen from './scenes/splash-screen';
import FindCoco from './scenes/find-coco';
import MainMenu from './scenes/main-menu';

export default class PhaserPresenter {
  constructor() {
  }

  setOnCocoClick(onCocoClick) {
    this.onCocoClick = onCocoClick;
  }

  setOnReady(onReady) {
    this.onReady = onReady;
  }

  setOnMenuStartClicked(onMenuStartClicked) {
    this.onMenuStartClicked = onMenuStartClicked;
  }

  start() {
    const PHASER_CONFIG = phaserConfig([
      new SplashScreen(this.onReady),
      new MainMenu(this.onMenuStartClicked),
      new FindCoco(this.onCocoClick)
    ]);

    this.game = new Phaser.Game(PHASER_CONFIG);
    window.game = this.game; //debugging purposes
  }

  showMenu() {
    this.game.scene.start('mainMenu');
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
