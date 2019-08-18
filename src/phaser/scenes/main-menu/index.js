import Phaser from 'phaser';
import MenuText from './components/menu-text';
import MenuImages from './components/menu-images';
import StartButton from '../common/components/start-button';

export default class MainMenu extends Phaser.Scene {

  constructor(menuImagesList, onMenuStartClicked) {
    super('mainMenu');
    this.menuImages = new MenuImages(this, menuImagesList);
    this.menuText = new MenuText(this);
    this.startButton = new StartButton(this, onMenuStartClicked);
  }

  create() {
    this.menuImages.create();
    this.menuText.create();
    this.startButton.create();
  }

}
