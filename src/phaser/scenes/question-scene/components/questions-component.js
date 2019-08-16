const TEXT_COLOR = 0xed75a3;
const BACKGROUND_COLOR = 0x287cc4;

export default class QuestionsComponent {
  constructor(scene, questions) {
    this.scene = scene;
    this.questions = questions;
  }

  create() {
    this.addQuestion(0, 0, this.questions[0]);
    this.addQuestion(0, 1, this.questions[1]);
    this.addQuestion(1, 0, this.questions[2]);
    this.addQuestion(1, 1, this.questions[3]);
  }

  addQuestion(coordX, coordY, question) {
    const graphics = this.scene.add.graphics();
    const buttonWidth= this.scene.game.canvas.width * 0.3;
    const buttonHeight = this.scene.game.canvas.height * 0.18;
    const radius = this.scene.game.canvas.width * 0.02;

    const posOffsetX = 0.25 + 0.5 * coordX;
    const posOffsetY = 0.625 + 0.25 * coordY
    const posX = this.scene.game.canvas.width * posOffsetX  - buttonWidth / 2;
    const posY = this.scene.game.canvas.height * posOffsetY - buttonHeight / 2;
    graphics.fillStyle(BACKGROUND_COLOR, 1);

    const textWidth = buttonWidth - radius * 2;
    graphics.fillRoundedRect(posX, posY, buttonWidth, buttonHeight, radius);
    const text = this.scene.add.text(this.scene.game.canvas.width * posOffsetX, this.scene.game.canvas.height * posOffsetY, question, {
      wordWrap: { width: textWidth },
      align: 'center'
    });
    text.setOrigin(0.5, 0.5);
    text.setFixedSize(textWidth, 0);
  }

}
