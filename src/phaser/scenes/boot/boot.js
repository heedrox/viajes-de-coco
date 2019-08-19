import Phaser from 'phaser';
import WebFont from 'webfontloader';
import loaderBar from '../../assets/images/loader-bar.png'
import loaderBg from '../../assets/images/loader-bg.png'
import '../../assets/fonts/monofont.css'
import '../assets/fonts/bangers.css'

const TEXTS = {
  "fullscreen": "Pulsa para modo pantalla completa",
};

export default class Boot extends Phaser.Scene {
  constructor(nextScene) {
    super("boot");
    this.nextScene = nextScene;
  }

  init() {
    this.isFontLoaded = false;
    this.isButtonPressed = false;
  }

  preload() {
    WebFont.load({
      custom: {
        families: ['Bangers', 'Monofont'],
      },
      active: () => { this.isFontLoaded = true; },
      inactive: () => { this.isFontLoaded = true; }
    });

    this.proposeFullScreen();

    this.load.image('loaderBg', loaderBg);
    this.load.image('loaderBar', loaderBar);
  }

  checkFontsLoadedAndButtonPressed() {
    const retryInterval = setInterval(() => {
      if (this.isFontLoaded && this.isButtonPressed) {
        clearInterval(retryInterval);
        this.scene.start(this.nextScene.scene.key);
      }
    }, 1000);
  }

  proposeFullScreen() {
    const text = this.add.text(this.game.scale.width/2, this.game.scale.height/2, TEXTS.fullscreen, { font: '16px Arial', fill: '#dddddd', align: 'center' });
    text.setOrigin(0.5, 0.5);
    text.setInteractive().on('pointerup', () => {
      if (!this.scale.isFullscreen) {
        try {
          this.scale.startFullscreen();
        } catch (e) {
          console.error(e);
        }
        text.destroy();
        this.isButtonPressed = true;
        this.checkFontsLoadedAndButtonPressed();
      }
    });
  }


}
