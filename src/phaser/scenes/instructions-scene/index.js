import Phaser from 'phaser';
import { isLandscape } from '../common/is-landscape';
import StartButton from '../common/components/start-button';

const TEXT_CSS = size => ({ fontFamily: 'Bangers', font: `${size} Bangers`, fill: '#287cc4', align: 'center' });
const TEXT_BODY_CSS = (width, size) => ({ wordWrap: { width }, fontFamily: 'Monofont', font: `${size} Monofont`, fill: '#ffffff', align: 'left' });
const MAGENTA_COLOR = 'rgba(237,117,163,1)';

const TEXTS = {
  title: 'INSTRUCCIONES',
  body: '¡Localiza a Coco en las diferentes fotos, lo más rápido que puedas!\n\nEl contador corre, así que cuando localices a Coco en una foto, pulsa sobre él. ¡Pero cuidado! Si pulsas en un lugar incorrecto, el contador se pondrá en rojo, y no podrás volver a pulsar otro lugar durante al menos otros 10 segundos.\n\nUna vez localizado a Coco, tendrás que adivinar a qué lugar se corresponde de las 4 opciones que se te presentarán. ¡Pero cuidado! Si pulsas sobre una opción incorrecta, el contador te restará 10 segundos.\n\n¡Suerte! ',
};


export default class InstructionsScene extends Phaser.Scene {

  constructor(onMenuStartClicked) {
    super('instructionsScene');
    this.startButton = new StartButton(this, onMenuStartClicked);
  }

  create() {
    const title = this.addTitle();
    const startButton = this.startButton.create();;
    this.addBodyText(title, startButton);

  }

  addTitle() {
    const baseSize = isLandscape(this) ? 10 : 9;
    const txtUnit = isLandscape(this) ? 'vh' : 'vw';

    const title = this.add.text(this.scale.width / 2, this.scale.height/ 6, TEXTS.title, TEXT_CSS(baseSize + txtUnit));
    this.style(title);
    return title;
  }

  addBodyText(title, startButton) {
    const posX = this.scale.width * 0.05;
    const posY = title.y + 0.6 * title.displayHeight;
    const maxPosY = startButton.y - 0.6 * startButton.displayHeight;
    const baseSize = isLandscape(this) ? 10 : 9;
    const txtUnit = isLandscape(this) ? 'vh' : 'vw';
    const width = this.scale.width * 0.9;
    const height = maxPosY - posY;

    const text = this.add.text(posX, posY, TEXTS.body, TEXT_BODY_CSS(width, (baseSize * 0.5)+ txtUnit));
    text.setOrigin(0, 0);
    // text.setFixedSize(width, height);

    this.setScrollable(posX, posY, width, height, text);
  }

  style(text) {
    text.setDepth(10);
    text.setOrigin(0.5, 0.5);
    text.setFixedSize(text.displayWidth + 20, text.displayHeight + 20);
    text.setShadow(3, 3, MAGENTA_COLOR, 0);
  }

  setScrollable(posX, posY, width, height, text) {
    const graphics = this.make.graphics();

    graphics.fillStyle(0xffffff);
    graphics.fillRect(posX, posY, width, height);
    const mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
    text.setMask(mask);

    //  The rectangle they can 'drag' within
    const zone = this.add.zone(0, 0, this.scale.width, this.scale.height).setOrigin(0).setInteractive();
    zone.setDepth(5);
    zone.on('pointermove', function (pointer) {
      if (pointer.isDown) {
        text.y += (pointer.velocity.y / 10);
        text.y = Phaser.Math.Clamp(text.y, -400, 300);
      }
    });
  }
}
