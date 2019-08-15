import Phaser from 'phaser';
import MenuText from './components/menu-text';
import MenuImages from './components/menu-images';

export default class Index extends Phaser.Scene {

  constructor(menuImagesList, onMenuStartClicked) {
    super('mainMenu');
    this.menuImages = new MenuImages(this, menuImagesList);
    this.menuText = new MenuText(this);
    this.onMenuStartClicked = onMenuStartClicked;
  }

  create() {
    this.menuImages.create();
    this.menuText.create(this.onMenuStartClicked);
  }

}
