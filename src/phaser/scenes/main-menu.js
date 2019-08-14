import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {

  constructor(onMenuStartClicked) {
    super('mainMenu');
    this.onMenuStartClicked = onMenuStartClicked;
  }

  init(data) {
  }

  preload() {
  }

  create() {
    this.onMenuStartClicked();
  }

}
