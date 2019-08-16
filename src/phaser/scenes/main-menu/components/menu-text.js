const TEXT_CSS = { fontFamily: 'Bangers', font: '12vh Bangers', fill: '#287cc4', align: 'center' };
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
    const text = this.scene.add.text(this.scene.scale.width / 2, 5 * this.scene.scale.height / 6, TEXTS.start, TEXT_CSS);

    this.style([title, subtitle, text]);
    text.setInteractive().on('pointerup', () => {
      onMenuStartClicked();
    })

  }

  style(texts) {
    texts.forEach(text => {
      text.setDepth(10);
      text.setOrigin(0.5, 0.5);
      text.setShadow(3, 3, MAGENTA_COLOR, 0);
      text.setFixedSize(text.displayWidth + 20, text.displayHeight + 20);
    });
  }

}
