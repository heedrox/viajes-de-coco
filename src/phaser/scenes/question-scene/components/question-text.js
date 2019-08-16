const TEXT_CSS = size => ({ fontFamily: 'Bangers', font: `${size}vh Bangers`, fill: '#287cc4', align: 'center' });
const MAGENTA_COLOR = 'rgba(237,117,163,1)';

const TEXTS =  {
  whatis: '¿QUÉ LUGAR ES?',
};

export default class QuestionText {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    const title = this.scene.add.text(this.scene.scale.width / 2, this.scene.scale.height * 0.1, TEXTS.whatis, TEXT_CSS(8));
    this.style([title]);
  }

  style(texts) {
    texts.forEach(text => {
      text.setDepth(3);
      text.setOrigin(0.5, 0.5);
      text.setFixedSize(text.displayWidth + 20, text.displayHeight + 20);
      text.setShadow(3, 3, MAGENTA_COLOR, 0);
    });
  }

}
