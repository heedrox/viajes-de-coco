import FullScreenImage from '../../components/full-screen-image';

const getLastImageXPos = phImage => phImage.x + (phImage.displayWidth * (1-phImage.originX));

const MOVE_LEFT = (container, x, callback) => ({
  targets: container,
  x: `-=${x}`,
  duration: 300,
  loop: false,
  ease: 'Sine.easeInOut',
  delay: 5000,
  onComplete: callback,
});

const moveNextImage = (scene, container, movementWidths, imageNumber) => {
  if (imageNumber === movementWidths.length - 1) {
    container.x = 0;
    imageNumber = 0;
  }
  scene.tweens.add(MOVE_LEFT(container, movementWidths[imageNumber], () => { moveNextImage(scene, container, movementWidths, imageNumber+1) }));
};

const buildContainer = (scene, images) => {
  const container = scene.add.container(0,0);
  images.forEach((image) => {
    container.add(image);
  });
  return container;
};

export default class MenuImages {
  constructor(scene, menuImagesList) {
    this.scene = scene;
    this.menuImagesList = menuImagesList;
  }

  create() {

    const leftImages = this.addRightImages();
    const rightImages = this.addLeftImages();
    this.addAnimation(leftImages.concat(rightImages));
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

  addAnimation(images) {
    const container = buildContainer(this.scene, images);
    const movementWidths = images.map((image, pos) => images[pos + 1] ? (images[pos].displayWidth + images[pos + 1].displayWidth)/2 : 0).slice(0, this.menuImagesList.length);
    moveNextImage(this.scene, container, movementWidths, 0);
  }

}
