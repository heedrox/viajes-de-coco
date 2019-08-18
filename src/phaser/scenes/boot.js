import Phaser from 'phaser';
import WebFont from 'webfontloader';
import loaderBar from '../assets/images/loader-bar.png'
import loaderBg from '../assets/images/loader-bg.png'
import '../assets/fonts/monofont.css'
import '../assets/fonts/bangers.css'

const getCurrentScene = game =>  game.scene.scenes.filter(x => x.scene.isActive())[0];

export default class Boot extends Phaser.Scene {
  constructor(nextScene) {
    super("boot");
    this.nextScene = nextScene;
  }

  init() {
    this.isFontLoaded = false;
  }

  preload() {
    WebFont.load({
      custom: {
        families: ['Bangers', 'Monofont'],
      },
      active: () => { this.isFontLoaded = true; },
      inactive: () => { this.isFontLoaded = true; }
    });

    const text = this.add.text(this.game.scale.width/2, this.game.scale.height/2, '...', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    text.setOrigin(0.5, 0.5);

    this.load.image('loaderBg', loaderBg);
    this.load.image('loaderBar', loaderBar);
  }

  create() {
    this.checkFontsLoaded();
    this.allowScreenChange();
  }

  checkFontsLoaded() {
    const retryInterval = setInterval(() => {
      if (this.isFontLoaded) {
        clearInterval(retryInterval);
        this.scene.start(this.nextScene.scene.key);
      }
    }, 100);
  }

  allowScreenChange() {
    this.game.scale.on('orientationchange', () => {
      getCurrentScene(this.game).scene.restart();
    });
  }
}
