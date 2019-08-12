import Phaser from 'phaser';

const getImage = level => `assets/levels/${level.id}.jpg`;

export default class SplashScreen extends Phaser.Scene {
  constructor(levels) {
    super("splashScreen")
    this.levels = levels;
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
    this.levels.forEach((level) => {
      this.load.image(`image-${level.id}`, getImage(level));
    });
  }

  create() {
    this.scene.start('findCoco', {id: 0});
  }
}
