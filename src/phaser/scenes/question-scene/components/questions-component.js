const SHADOW_COLOR = 0xed75a3;
const BACKGROUND_COLOR = 0x287cc4;

const BUTTON_TXT_STYLE = (width, fontHeight) => ({
  wordWrap: { width },
  align: 'center',
  fontFamily: 'Monofont',
  font: `${fontHeight}px Monofont`,
  fill: '#ffffff'
});


const getPosition = (scene, buttonSize, coords) => {
  const posOffsetX = 0.25 + 0.5 * coords.x;
  const posOffsetY = 0.625 + 0.25 * coords.y;
  const x = scene.game.canvas.width * posOffsetX  - buttonSize.w / 2;
  const y = scene.game.canvas.height * posOffsetY - buttonSize.h / 2;
  return { x, y };
};

const getButtonSize = (scene) => ({
  w: scene.game.canvas.width * 0.4,
  h: scene.game.canvas.height * 0.18,
  radius: scene.game.canvas.width * 0.02
});

export default class QuestionsComponent {
  constructor(scene, questions) {
    this.scene = scene;
    this.questions = questions;
  }

  create() {
    this.addQuestion({ x: 0, y: 0}, this.questions[0]);
    this.addQuestion({ x: 0, y: 1}, this.questions[1]);
    this.addQuestion({ x: 1, y: 0}, this.questions[2]);
    this.addQuestion({ x: 1, y: 1}, this.questions[3]);
  }

  addQuestion(coords, question) {
    const buttonSize = getButtonSize(this.scene);
    const position = getPosition(this.scene, buttonSize, coords);

    this.addShadowButton(position, buttonSize, SHADOW_COLOR);
    this.addButton(position, buttonSize, BACKGROUND_COLOR);
    this.addButtonText(coords, question, buttonSize);
  }

  addButton(position, buttonSize, color) {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(color, 1);
    graphics.fillRoundedRect(position.x, position.y, buttonSize.w, buttonSize.h, buttonSize.radius);
  }

  addShadowButton(position, buttonSize, color) {
    this.addButton({ x: position.x + 3, y: position.y + 3}, buttonSize, color);
  }

  addButtonText(coords, question, buttonSize) {
    const textWidth = buttonSize.w - buttonSize.radius * 2;
    const fontHeight = ((buttonSize.h - buttonSize.radius)*0.8)/2;
    const posX = this.scene.game.canvas.width * (0.25 + 0.5 * coords.x);
    const posY = this.scene.game.canvas.height * (0.625 + 0.25 * coords.y);
    const text = this.scene.add.text(posX, posY, question, BUTTON_TXT_STYLE(textWidth, fontHeight));
    text.setOrigin(0.5, 0.5);
    text.setFixedSize(textWidth, 0);
  }
}
