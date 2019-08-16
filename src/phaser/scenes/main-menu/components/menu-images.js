import FullScreenImage from '../../components/full-screen-image';

const getLastImageXPos = phImage => phImage.x + (phImage.displayWidth * (1-phImage.originX));
const GROUP_CONFIG = {
  classType: Phaser.GameObjects.Image
};

export default class MenuImages {
  constructor(scene, menuImagesList) {
    this.scene = scene;
    this.menuImagesList = menuImagesList;
  }

  create() {
    const group = this.scene.add.group(GROUP_CONFIG);
    group.addMultiple(this.addRightImages());
    group.addMultiple(this.addLeftImages());
    this.addAnimation(group);
  }

  addRightImages() {
    const images = [];
    let lastImageXPos = 0;
    this.menuImagesList.forEach((menuImage, pos) => {
      const image = new FullScreenImage(this.scene, menuImage, lastImageXPos, `menu-image-${pos}`, `menu-image-${pos}`);
      image.create();
      lastImageXPos = getLastImageXPos(image.getImage());
      images.push(image.getImage());
    });
    return images;
  }

  addLeftImages() {
    const images = [];
    let lastImageXPos = getLastImageXPos(this.scene.children.getByName('menu-image-0'));
    this.menuImagesList.reverse().forEach((menuImage, pos) => {
      const name = `menu-image-${this.menuImagesList.length - pos - 1}`;
      const textureName = `menu-image-left-${this.menuImagesList.length - pos - 1}`;
      const currentImage = this.scene.children.getByName(name);
      if (lastImageXPos>0) {
        const image = new FullScreenImage(this.scene, menuImage, lastImageXPos - currentImage.displayWidth, name, textureName);
        image.create();
        lastImageXPos = lastImageXPos - currentImage.displayWidth;
        images.push(image.getImage());
      }
    });
    return images;
  }

  addAnimation(group) {

  }
}
