import Phaser from 'phaser';
import FullScreenImage from '../components/full-screen-image';
import MenuText from './components/menu-text';

export default class Index extends Phaser.Scene {

  constructor(menuImages, onMenuStartClicked) {
    super('mainMenu');
    this.menuImages = menuImages;
    this.onMenuStartClicked = onMenuStartClicked;
    this.menuText = new MenuText(this);
  }

  create() {
    let lastImageXPos = 0;
    this.menuImages.forEach((menuImage, pos) => {
      const image = new FullScreenImage(this, menuImage, lastImageXPos, `menu-image-${pos}`);
      image.create();
      console.log(image.getImage());
      lastImageXPos = image.getImage().x + (image.getImage().displayWidth * (1-image.getImage().originX));
    });
    this.menuText.create(this.onMenuStartClicked);
  }

}
