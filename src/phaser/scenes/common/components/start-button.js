import { isLandscape } from '../is-landscape';

const TEXT_CSS = size => ({ fontFamily: 'Bangers', font: `${size} Bangers`, fill: '#287cc4', align: 'center' });
const TEXT_MAGENTA_CSS = size => ({ fontFamily: 'Bangers', font: `${size} Bangers`, fill: 'rgba(237,117,163,1)', align: 'center' });

const TEXTS = {
  'start': '¡EMPEZAR!'
};

const FIRST_BOUNCE = text => ({
  targets: text,
  x: text.x - 3,
  y: text.y - 3,
  duration: 100,
  delay: 0,
  ease: 'Bounce.easeInOut',
  yoyo: true,
  loop: -1,
  repeat: -1,
  repeatDelay: 2000,
});

const SECOND_BOUNCE = text=> ({
  targets: text,
  x: text.x - 2,
  y: text.y - 2,
  duration: 100,
  delay: 300,
  ease: 'Bounce.easeInOut',
  yoyo: true,
  loop: -1,
  repeat: -1,
  repeatDelay: 2000,
});

export default class StartButton {
  constructor(scene, onButtonClicked) {
    this.scene = scene;
    this.onButtonClicked = onButtonClicked;
  }

  create() {
    const baseSize = isLandscape(this.scene) ? 10 : 9;
    const txtUnit = isLandscape(this.scene) ? 'vh' : 'vw';

    const textShadow = this.scene.add.text(this.scene.scale.width / 2 + 3, 5 * this.scene.scale.height / 6 + 3, TEXTS.start, TEXT_MAGENTA_CSS(baseSize * 1.2 + txtUnit));
    const text = this.scene.add.text(this.scene.scale.width / 2, 5 * this.scene.scale.height / 6, TEXTS.start, TEXT_CSS(baseSize * 1.2 + txtUnit));
    this.style(text);
    this.style(textShadow);

    this.scene.tweens.add(FIRST_BOUNCE(text));
    this.scene.tweens.add(SECOND_BOUNCE(text));
    text.setInteractive().on('pointerup', () => {
      this.onButtonClicked();
    });
    return text;
  }

  style(text) {
    text.setDepth(10);
    text.setOrigin(0.5, 0.5);
    text.setFixedSize(text.displayWidth + 20, text.displayHeight + 20);
  }
}
