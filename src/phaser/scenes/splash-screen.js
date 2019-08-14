import Phaser from 'phaser';

export default class SplashScreen extends Phaser.Scene {
  constructor(mainMenuScene, menuImages, onReady) {
    super("splashScreen");
    this.menuImages = menuImages;
    this.mainMenuScene = mainMenuScene;
  }

  start() {
    this.scene.start(this.scene.key);
  }

  preload() {
    this.add.sprite(this.game.scale.width/2, this.game.scale.height/2, 'loaderBg');
    const loaderBar = this.add.sprite(this.game.scale.width/2, this.game.scale.height/2, 'loaderBar');

    loaderBar.setScale(0, 1);

    this.load.on('progress', function (value) {
      loaderBar.setScale(value, 1);
    });

    this.menuImages.forEach((image, key) => {
      this.load.image(`menu-image-${key}`, image);
    });
  }

  create() {
    this.mainMenuScene.start();
  }
}
