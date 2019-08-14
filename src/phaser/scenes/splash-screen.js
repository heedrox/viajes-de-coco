import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class SplashScreen extends Phaser.Scene {
  constructor(menuImages, onReady) {
    super("splashScreen");
    this.menuImages = menuImages;
    this.onReady = onReady;
    this.isFontLoaded = false;
  }

  start() {
    this.scene.start(this.scene.key);
  }

  preload() {
    const loaderBg = this.add.sprite(this.game.scale.width/2, this.game.scale.height/2, 'loaderBg');
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
    this.onReady();
  }
}
