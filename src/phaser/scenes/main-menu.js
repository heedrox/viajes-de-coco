import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {

  constructor(onMenuStartClicked) {
    super('mainMenu');
    this.onMenuStartClicked = onMenuStartClicked;
  }

  start() {
    this.scene.start(this.scene.key);
  }

  init(data) {
  }

  preload() {
  }

  create() {
    this.onMenuStartClicked();
  }

}
