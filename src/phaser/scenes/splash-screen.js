import Phaser from 'phaser';

export default class SplashScreen extends Phaser.Scene {
  constructor(mainMenuScene, menuImages, levels) {
    super('splashScreen');
    this.menuImages = menuImages;
    this.mainMenuScene = mainMenuScene;
    this.levels = levels;
  }

  preload() {
    this.menuImages.forEach((image, key) => {
      this.load.image(`menu-image-${key}`, image);
    });

    this.levels.forEach(level => {
      this.load.image(`background-image-${level.id}`, level.image);
    });

    this.addProgressbar();
  }

  create() {
    this.scene.start(this.mainMenuScene.scene.key);
  }

  addProgressbar() {
    this.add.sprite(this.game.scale.width / 2, this.game.scale.height / 2, 'loaderBg');
    const loaderBar = this.add.sprite(this.game.scale.width / 2, this.game.scale.height / 2, 'loaderBar');
    loaderBar.setScale(1, 1);
    loaderBar.setCrop(0,0,0,0);

    const imageWidth = loaderBar.displayWidth;
    const totalImagesToProcess = this.menuImages.length + this.levels.length;
    let imagesProcessed = 0;

    this.load.on('filecomplete', function () {
      imagesProcessed++;
      loaderBar.setCrop(0, 0, imagesProcessed / totalImagesToProcess*imageWidth, loaderBar.displayHeight)
    });

    this.load.on('complete', function() {
      loaderBar.setScale(1,1);
    });
  }
}
