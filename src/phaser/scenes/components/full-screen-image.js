import Phaser from "phaser";

const getRatio = (image, game) => {
  if (game.scale.isGameLandscape) return game.canvas.height / image.height;
  return game.canvas.width / image.width;
};

export default class FullScreenImage {
  constructor(scene, imageSrc, position, name) {
    this.scene = scene;
    this.imageSrc = imageSrc;
    this.position = position; //position 0 is the first one, centered
    this.name = name;
  }

  preload() {
    this.scene.textures.remove(this.name);
    this.scene.load.image(this.name, this.imageSrc);
  }

  create() {
    this.image = this.addImage();
    this.setImageFitWindow();
  }

  addImage() {
    const image = this.scene.add.image((2*this.position+1) * this.scene.game.canvas.width / 2, this.scene.game.canvas.height / 2, this.name);
    image.name = this.name;
    image.setDepth(1);
    image.setOrigin(0.5, 0.5);
    return image;
  }

  setImageFitWindow() {
    this.scene.game.scale.scaleMode = Phaser.Scale.RESIZE;
    this.scene.game.scale.parentIsWindow = true;
    const ratio = getRatio(this.image, this.scene.game);
    this.image.scale = ratio;
  }

  getImage() {
    return this.image;
  }
}
