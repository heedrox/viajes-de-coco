const TEXT_CSS = { fontFamily: 'Bangers', font: '12vh Bangers', fill: '#287cc4', align: 'center' };
const TEXT_MAGENTA_CSS = { fontFamily: 'Bangers', font: '12vh Bangers', fill: 'rgba(237,117,163,1)', align: 'center' };
const MAGENTA_COLOR = 'rgba(237,117,163,1)';

const TEXTS =  {
  title: 'LOS VIAJES DE COCO EN...',
  subtitle: 'BRETAÑA y NORMANDÍA',
  start: '¡EMPEZAR!'
};
export default class MenuText {
  constructor(scene) {
    this.scene = scene;
  }

  create(onMenuStartClicked) {
    const title = this.scene.add.text(this.scene.scale.width / 2, 1 * this.scene.scale.height/ 6, TEXTS.title, TEXT_CSS);
    const subtitle = this.scene.add.text(this.scene.scale.width / 2, 2 * this.scene.scale.height/ 6, TEXTS.subtitle, TEXT_CSS);
    const textShadow = this.scene.add.text(this.scene.scale.width / 2 + 3, 5 * this.scene.scale.height / 6 + 3, TEXTS.start, TEXT_MAGENTA_CSS);
    const text = this.scene.add.text(this.scene.scale.width / 2, 5 * this.scene.scale.height / 6, TEXTS.start, TEXT_CSS);

    this.style([title, subtitle], true);
    this.style([text, textShadow], false);
    console.log(text);
    let tweenCounter = {
      x: 0,
      y: 0
    };
    this.scene.tweens.add({
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
    this.scene.tweens.add({
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
    text.setInteractive().on('pointerup', () => {
      onMenuStartClicked();
    })

  }

  style(texts, withShadow) {
    texts.forEach(text => {
      text.setDepth(10);
      text.setOrigin(0.5, 0.5);
      text.setFixedSize(text.displayWidth + 20, text.displayHeight + 20);
      if (withShadow) {
        text.setShadow(3, 3, MAGENTA_COLOR, 0);
      }
    });
  }

}
