import Phaser from 'phaser';
import QuestionText from './components/question-text';
import QuestionsComponent from './components/questions-component';
import SceneTimer from '../common/components/scene-timer';

const FAILED_TIMER_CSS = { fontFamily: 'Bangers', font: '48px Bangers', fill: '#Ac2800', align: 'center' };
const MAGENTA_COLOR = 'rgba(237,117,163,1)';

const MAKE_SMALLER = (image, finalSize, finalPosY) => ({
  targets: image,
  duration: 200,
  scale: finalSize,
  y: finalPosY
});

const getRatio = (image, game) => {
  if (game.scale.isGameLandscape) return game.canvas.height / image.height;
  return game.canvas.width / image.width;
};

export default class QuestionScene extends Phaser.Scene {
  constructor(onQuestionAnswered) {
    super("questionScene");
    this.onQuestionAnswered = onQuestionAnswered;
  }

  init(data) {
    this.levelData = data.levelData;
    this.questions = data.questions;
    this.startDate = data.startDate;
    this.timer = new SceneTimer(this);
  }

  create() {
    this.addText();
    this.addQuestions();
    this.addImage();
    this.timer.addTimer(this.startDate);
    this.timer.addTween({
      x: this.game.canvas.width * 0.9,
      duration: 500,
      scale: '*=0.5'
    })
  }

  addText() {
    const text = new QuestionText(this);
    text.create();
  }

  addQuestions() {
    const questionsComponent = new QuestionsComponent(this, this.questions, this.onQuestionAnswered);
    questionsComponent.create();
  }

  addImage() {
    const screenHeight = this.game.canvas.height;
    const image = this.add.image(this.game.canvas.width / 2, screenHeight / 2, 'backgroundImage');
    image.name = 'question-image';
    image.setDepth(1);
    image.setOrigin(0.5, 0.5);
    const ratio = getRatio(image, this.game);
    image.scale = ratio;
    this.tweens.add(MAKE_SMALLER(image, ratio * 0.3, 0.35 * screenHeight));
  }

  showWrongAnswer(callback) {
    const txt = this.add.text(this.timer.timerText.x, this.timer.timerText.y, '+ 10', FAILED_TIMER_CSS);
    txt.setDepth(1);
    txt.setOrigin(0.5, 0.5);
    txt.setShadow(3, 3, MAGENTA_COLOR, 0);
    txt.setFixedSize(200, 54);
    this.tweens.add({
      targets: txt,
      x: this.game.canvas.width/2,
      y: this.game.canvas.height/2,
      scale: 5,
      duration: 500,
      alpha: 0,
      onComplete: () => { callback(); }
    });
    this.cameras.main.flash(500, 255, 0, 0, false);
  }

  showRightAnswer(callback) {
    this.cameras.main.flash(500, 0, 255, 0, false, callback);
  }
}
