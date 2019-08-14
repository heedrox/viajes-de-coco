import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {

  constructor(menuImages, onMenuStartClicked) {
    super('mainMenu');
    this.onMenuStartClicked = onMenuStartClicked;
  }

  start() {
    this.scene.start(this.scene.key);
  }

  preload() {

  }

  create() {
    this.onMenuStartClicked();
  }

}
