import Phaser from 'phaser';

const TEXT_CSS = { fontFamily: 'Bangers', font: '48px Bangers', fill: '#287cc4', align: 'center' };
const MAGENTA_COLOR = 'rgba(237,117,163,1)';

export default class MainMenu extends Phaser.Scene {

  constructor(menuImages, onMenuStartClicked) {
    super('mainMenu');
    this.onMenuStartClicked = onMenuStartClicked;
  }

  preload() {

    const text = this.add.text(this.scale.width / 2, this.scale.height / 2, '¡EMPEZAR!', TEXT_CSS);
    this.style(text);
    text.setInteractive().on('pointerup', () => {
      this.onMenuStartClicked();
    })
  }

  style(text) {
    text.setDepth(10);
    text.setOrigin(0.5, 0.5);
    text.setShadow(3, 3, MAGENTA_COLOR, 0);
    text.setFixedSize(200, 54);
  }
}
