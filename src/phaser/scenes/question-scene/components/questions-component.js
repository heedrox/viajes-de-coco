const TEXT_COLOR = 0xed75a3;
const BACKGROUND_COLOR = 0x287cc4;

export default class QuestionsComponent {
  constructor(scene, questions) {
    this.scene = scene;
    this.questions = questions;
  }

  create() {
    const graphics = this.scene.add.graphics();
    const buttonWidth= this.scene.game.canvas.width * 0.3;
    const buttonHeight = this.scene.game.canvas.height * 0.18;
    const radius = this.scene.game.canvas.width * 0.02;

    const posX = this.scene.game.canvas.width * 0.25 - buttonWidth / 2;
    const posY = this.scene.game.canvas.height * 0.625 - buttonHeight / 2;
    graphics.fillStyle(BACKGROUND_COLOR, 1);

    //  32px radius on the corners
    const rect = graphics.fillRoundedRect(posX, posY, buttonWidth, buttonHeight, radius);
    const text = this.scene.add.text(this.scene.game.canvas.width * 0.25, this.scene.game.canvas.height * 0.625, this.questions[0]);
    text.setOrigin(0.5, 0.5);
    text.setFixedSize(buttonWidth - radius, buttonHeight - radius);
  }

}
