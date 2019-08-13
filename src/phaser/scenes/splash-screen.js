import Phaser from 'phaser';

export default class SplashScreen extends Phaser.Scene {
  constructor(levels, onReady) {
    super("splashScreen");
    this.levels = levels;
    this.onReady = onReady;
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
    console.log(this.levels);
    /*this.levels.forEach((level) => {
      this.load.image(`image-${level.id}`, level.image);
    });*/
  }

  create() {
    this.onReady();
  }
}
