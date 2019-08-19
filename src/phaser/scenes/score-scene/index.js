import Phaser from 'phaser';
import { isLandscape } from '../common/is-landscape';

const TEXT_CSS = size => ({ fontFamily: 'Bangers', font: `${size} Bangers`, fill: '#287cc4', align: 'center' });
const TIMER_CSS = { fontFamily: 'Bangers', font: '48px Bangers', fill: '#287cc4', align: 'center' };

const MAGENTA_COLOR = 'rgba(237,117,163,1)';

const TEXTS = {
  'yourscoreis': 'Tu puntuación es...',
  'lessthan1000': '¿Puedes conseguir menos\n de 1000 ptos.?',
  'welldone': '¡ENHORABUENA!'
};


const getFinalScale = (scene, text) => {
  const sizeInVhw = isLandscape(scene) ?
    (2 * Math.round((scene.game.canvas.height  * 10 / 60) / 7)) :
    (2 * Math.round((scene.game.canvas.width  * 10 / 60) / 20));
  const finalSize = isLandscape(scene) ?
    (sizeInVhw * scene.game.canvas.height / 100) :
    (sizeInVhw * scene.game.canvas.width / 100);

  return finalSize / text.style.fontSize.replace('px', '');
};

export default class ScoreScene extends Phaser.Scene {

  constructor(onClickStart) {
    super("score-scene");
    this.onClickStart = onClickStart;
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    const baseSize = isLandscape(this) ? 10 : 9;
    const txtUnit = isLandscape(this) ? 'vh' : 'vw';

    const text = this.add.text(this.game.canvas.width/2, this.game.canvas.height * 15 / 60, TEXTS.yourscoreis, TEXT_CSS(baseSize + txtUnit));
    this.style(text);
    this.addEntranceTween(text);

    const scoreStr = parseInt(this.score) > 1000 ? `${this.score}\n${TEXTS.lessthan1000}` : `${this.score}\n${TEXTS.welldone}`;
    const scoreText = this.add.text(this.game.canvas.width/2, 30, scoreStr, TIMER_CSS);
    this.style(scoreText);
    this.addScoreTween(scoreText);

    this.addReloadButton();
  }

  style(text) {
    text.setDepth(10);
    text.setOrigin(0.5, 0.5);
    text.setFixedSize(text.displayWidth + 100, text.displayHeight + 20);
    text.setShadow(3, 3, MAGENTA_COLOR, 0);
  }

  addEntranceTween(text) {
    text.setScale(0,0);
    this.tweens.add({
      targets: text,
      scaleX: 1,
      scaleY: 1,
      duration: 500,
    });
  }

  addScoreTween(text) {
    const finalScale = getFinalScale(this, text);
    const finalSize = finalScale * text.style.fontSize.replace('px', '');

    const finalY = this.game.canvas.height * 40 / 60;

    this.tweens.add({
      targets: text,
      scale: finalScale,
      y: finalY,
      duration: 500,
      onComplete: () => {
        const scoreText = this.add.text(this.game.canvas.width/2, finalY, text.text, TEXT_CSS(finalSize+'px'));
        this.style(scoreText);
        text.destroy();
      }
    });
  }

  addReloadButton() {
    const padding = this.game.canvas.width * 0.05;
    const sprite = this.add.sprite(this.game.canvas.width - padding, this.game.canvas.height - padding, 'reload');
    const scale = game.canvas.height / 1000;
    sprite.setScale(scale, scale);
    sprite.setOrigin(1, 1);
    sprite.setInteractive().on('pointerup', () => {
      window.location.reload();
    });
  }
}


