import Phaser from 'phaser';
import QuestionText from './components/question-text';
import QuestionsComponent from './components/questions-component';
import SceneTimer from '../common/components/scene-timer';

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
}
