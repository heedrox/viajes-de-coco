import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class SplashScreen extends Phaser.Scene {
  constructor(onReady) {
    super("splashScreen");
    // this.levels = levels;
    this.onReady = onReady;
    this.isFontLoaded = false;
  }

  preload() {
/*
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
*/
    //
    // load your assets
    //
    WebFont.load({
      google: {
        families: ['Bangers'],
      },
      active: () => { this.isFontLoaded = true; }
    });
    /*this.levels.forEach((level) => {
      this.load.image(`image-${level.id}`, level.image);
    });*/
  }

  create() {
    const retryInterval = setInterval(() => {
      if (this.isFontLoaded) {
        this.onReady();
        clearInterval(retryInterval);
      }
    }, 100);
  }
}
