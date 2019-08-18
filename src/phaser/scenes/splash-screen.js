import Phaser from 'phaser';
import reloadImage from '../assets/images/reload.png';

export default class SplashScreen extends Phaser.Scene {
  constructor(menuImages, levels, onSplashScreenFinished) {
    super('splashScreen');
    this.menuImages = menuImages;
    this.onSplashScreenFinished = onSplashScreenFinished;
    this.levels = levels;
  }

  preload() {
    this.menuImages.forEach((image, key) => {
      this.load.image(`menu-image-${key}`, image);
    });

    this.levels.forEach(level => {
      this.load.image(`background-image-${level.id}`, level.image);
    });

    this.load.image(`reload`, reloadImage);

    this.addProgressbar();
  }

  create() {
    this.onSplashScreenFinished(this);
  }

  addProgressbar() {
    this.add.sprite(this.game.scale.width / 2, this.game.scale.height / 2, 'loaderBg');
    const loaderBar = this.add.sprite(this.game.scale.width / 2, this.game.scale.height / 2, 'loaderBar');
    loaderBar.setScale(1, 1);
    loaderBar.setCrop(0,0,0,0);

    const imageWidth = loaderBar.displayWidth;
    const totalImagesToProcess = this.menuImages.length + this.levels.length;
    let imagesProcessed = 0;

    this.load.on('filecomplete', function (key, type, data) {
      imagesProcessed++;
      // console.log(key, type, data);
      loaderBar.setCrop(0, 0, imagesProcessed / totalImagesToProcess*imageWidth, loaderBar.displayHeight)
    });

    this.load.on('complete', function() {
      loaderBar.setScale(1,1);
    });

    this.load.on('loaderror', function(fileRef) {
      // console.log('load error on', fileRef);
      alert('Error cargando imágenes. Asegúrate que estás en un sitio con cobertura y pulsa ACEPTAR para reintentar');
      window.location.reload();
    });

    this.load.on('load', function(x) {
      // console.log('load file', x);
    });
  }
}
