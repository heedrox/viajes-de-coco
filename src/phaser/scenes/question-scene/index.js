import Phaser from 'phaser';
import QuestionText from './components/question-text';
import QuestionsComponent from './components/questions-component';

const MAKE_SMALLER = (image, finalSize, finalPosY) => ({
  targets: image,
  duration: 300,
  scale: finalSize,
  y: finalPosY
});

const getRatio = (image, game) => {
  if (game.scale.isGameLandscape) return game.canvas.height / image.height;
  return game.canvas.width / image.width;
};

export default class QuestionScene extends Phaser.Scene {
  constructor() {
    super("questionScene");
  }

  init(data) {
    this.levelData = data.levelData;
    this.questions = data.questions;
    this.startDate = data.startDate;
  }

  create() {
    this.addText();
    this.addQuestions();
    this.addImage();
  }

  addText() {
    const text = new QuestionText(this);
    text.create();
  }

  addQuestions() {
    const questionsComponent = new QuestionsComponent(this, this.questions);
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
    this.tweens.add(MAKE_SMALLER(image, ratio * 0.25, 0.35 * screenHeight));
  }
}
