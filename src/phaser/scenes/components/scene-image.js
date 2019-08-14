import Phaser from "phaser";
import { allowZoomAndMove } from './characteristics/zoom-move';

const IMAGE_NAME = "backgroundImage";

const getRatio = (image, game) => {
  if (game.scale.isGameLandscape) return game.canvas.height / image.height;
  return game.canvas.width / image.width;
};

export default class SceneImage {
  constructor(scene, levelData) {
    this.scene = scene;
    this.levelData = levelData;
  }

  preload() {
    this.scene.textures.remove(IMAGE_NAME);
    this.scene.load.image(IMAGE_NAME, this.levelData.image);
  }

  create() {
    const image = this.addImage();
    allowZoomAndMove(image, this.scene);
  }

  addImage() {
    const image = this.scene.add.image(this.scene.game.canvas.width / 2, this.scene.game.canvas.height / 2, IMAGE_NAME);
    image.name = IMAGE_NAME;
    this.scene.game.scale.scaleMode = Phaser.Scale.RESIZE;
    this.scene.game.scale.parentIsWindow = true;
    image.setDepth(1);
    this.setImageFitWindow(image);
    return image;
  }

  setImageFitWindow(image) {
    const ratio = getRatio(image, this.scene.game);
    image.scale = ratio;
  }

}
