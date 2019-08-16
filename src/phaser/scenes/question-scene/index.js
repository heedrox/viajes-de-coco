import Phaser from 'phaser';

export default class QuestionScene extends Phaser.Scene {
  constructor() {
    super("questionScene");
  }

  start(levelData, currentQuestion, questions, startDate) {
    this.scene.start(this.scene.key, { levelData, startDate });
  }

  create() {

  }
}
