import Phaser from 'phaser';
import { isLandscape } from '../common/is-landscape';
import StartButton from '../common/components/start-button';

const TEXT_CSS = size => ({ fontFamily: 'Bangers', font: `${size} Bangers`, fill: '#287cc4', align: 'center' });
const MAGENTA_COLOR = 'rgba(237,117,163,1)';

const TEXTS = {
  title: 'INSTRUCCIONES',
  subtitle: '¡Localiza a Coco en las diferentes fotos, lo más rápido que puedas!\n\nEl contador corre, así que cuando localices a Coco en una foto, pulsa sobre él. ¡Pero cuidado! Si pulsas en un lugar incorrecto, el contador se pondrá en rojo, y no podrás volver a pulsar otro lugar durante al menos otros 10 segundos.\n\nUna vez localizado a Coco, tendrás que adivinar a qué lugar se corresponde de las 4 que se te presentarán. ¡Pero cuidado! Si pulsas sobre una opción incorrecta, el contador te restará 10 segundos.\n\n¡Suerte! ',
};


export default class InstructionsScene extends Phaser.Scene {

  constructor(onMenuStartClicked) {
    super('instructionsScene');
    this.startButton = new StartButton(this, onMenuStartClicked);
  }

  create() {
    this.addTitle();
    this.startButton.create();
  }

  addTitle() {
    const baseSize = isLandscape(this) ? 10 : 9;
    const txtUnit = isLandscape(this) ? 'vh' : 'vw';

    const title = this.add.text(this.scale.width / 2, this.scale.height/ 6, TEXTS.title, TEXT_CSS(baseSize + txtUnit));
    this.style(title);
  }

  style(text) {
    text.setDepth(10);
    text.setOrigin(0.5, 0.5);
    text.setFixedSize(text.displayWidth + 20, text.displayHeight + 20);
    text.setShadow(3, 3, MAGENTA_COLOR, 0);
  }

}
