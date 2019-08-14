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
    this.mainMenuScene = new MainMenu(this.onMenuStartClicked);
    this.findCocoScene = new FindCoco(this.onCocoClick);
    const PHASER_CONFIG = phaserConfig([
      new SplashScreen(this.onReady),
      this.mainMenuScene,
      this.findCocoScene
    ]);

    this.game = new Phaser.Game(PHASER_CONFIG);
    window.game = this.game; //debugging purposes
  }

  showMenu() {
    console.log(this.mainMenuScene);
    this.mainMenuScene.start();
  }

  showLevel(levelData, startDate) {
    this.findCocoScene.start(levelData, startDate);
  }

  showScore(score) {
    alert('score: ' + score);
  }

  showClickFailed(failedDate) {
    this.game.scene.getScene('findCoco').failed(failedDate);
  }

}
