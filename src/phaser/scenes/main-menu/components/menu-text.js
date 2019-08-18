import { isLandscape } from '../../common/is-landscape';

const TEXT_CSS = size => ({ fontFamily: 'Bangers', font: `${size} Bangers`, fill: '#287cc4', align: 'center' });
const TEXT_MAGENTA_CSS = size => ({ fontFamily: 'Bangers', font: `${size} Bangers`, fill: 'rgba(237,117,163,1)', align: 'center' });
const MAGENTA_COLOR = 'rgba(237,117,163,1)';

const TEXTS =  {
  title: 'LOS VIAJES DE COCO EN...',
  subtitle: 'BRETAÑA y NORMANDÍA',
};

export default class MenuText {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    const baseSize = isLandscape(this.scene) ? 10 : 9;
    const txtUnit = isLandscape(this.scene) ? 'vh' : 'vw';
    const title = this.scene.add.text(this.scene.scale.width / 2, 1 * this.scene.scale.height/ 6, TEXTS.title, TEXT_CSS(baseSize + txtUnit));
    const subtitle = this.scene.add.text(this.scene.scale.width / 2, 2 * this.scene.scale.height/ 6, TEXTS.subtitle, TEXT_CSS(baseSize * 1.4 + txtUnit));

    this.style([title, subtitle], true);
  }

  style(texts) {
    texts.forEach(text => {
      text.setDepth(10);
      text.setOrigin(0.5, 0.5);
      text.setFixedSize(text.displayWidth + 20, text.displayHeight + 20);
      text.setShadow(3, 3, MAGENTA_COLOR, 0);
    });
  }
}
