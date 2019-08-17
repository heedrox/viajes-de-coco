import Phaser from 'phaser';

const TEXT_CSS = size => ({ fontFamily: 'Bangers', font: `${size}vh Bangers`, fill: '#287cc4', align: 'center' });
const TIMER_CSS = { fontFamily: 'Bangers', font: '48px Bangers', fill: '#287cc4', align: 'center' };

const MAGENTA_COLOR = 'rgba(237,117,163,1)';

const TEXTS = {
  'yourscoreis': 'Tu puntuación es...'
};


const getFinalScale = (game, text) => {
  const sizeInVh = 2 * Math.round((game.canvas.height  * 10 / 60) / 4);
  const finalSize = sizeInVh * game.canvas.height / 100;
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
    const text = this.add.text(this.game.canvas.width/2, this.game.canvas.height * 15 / 60, TEXTS.yourscoreis, TEXT_CSS(10));
    this.style(text);
    this.addEntranceTween(text);

    const scoreText = this.add.text(this.game.canvas.width/2, 30, this.score, TIMER_CSS);
    this.style(scoreText);
    this.addScoreTween(scoreText);

    this.addReloadButton();
  }

  style(text) {
    text.setDepth(10);
    text.setOrigin(0.5, 0.5);
    text.setFixedSize(text.displayWidth + 20, text.displayHeight + 20);
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
    const finalScale = getFinalScale(this.game, text);
    const finalY = this.game.canvas.height * 40 / 60;
    const finalSize = 2 * Math.round((game.canvas.height  * 10 / 60) / 4);

    this.tweens.add({
      targets: text,
      scale: finalScale,
      y: finalY,
      duration: 500,
      onComplete: () => {
        const scoreText = this.add.text(this.game.canvas.width/2, finalY, this.score, TEXT_CSS(finalSize));
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
    sprite.setInteractive().on('pointerup', () => {
      window.location.reload();
    });
  }
}


