import FullScreenImage from '../../components/full-screen-image';

const getLastImageXPos = phImage => phImage.x + (phImage.displayWidth * (1-phImage.originX));

export default class MenuImages {
  constructor(scene, menuImagesList) {
    this.scene = scene;
    this.menuImagesList = menuImagesList;
  }

  create() {
    let lastImageXPos = 0;
    this.menuImagesList.forEach((menuImage, pos) => {
      const image = new FullScreenImage(this.scene, menuImage, lastImageXPos, `menu-image-${pos}`);
      image.create();
      lastImageXPos = getLastImageXPos(image.getImage());
    });
  }

}
