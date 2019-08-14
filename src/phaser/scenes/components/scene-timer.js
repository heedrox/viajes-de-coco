const TIMER_CSS = { fontFamily: 'Bangers', font: '48px Bangers', fill: '#287cc4', align: 'left' };
const MAGENTA_COLOR = 'rgba(237,117,163,1)';

const CALL = fn => ({
  delay: 10,
  callback: fn,
  loop: true
});

export default class SceneTimer {
  constructor(scene) {
    this.scene = scene;
  }

  addTimer(startDate) {
    this.startDate = startDate;
    this.timerText = this.create();
    this.style();
    this.scene.time.addEvent(CALL(this.update.bind(this)));
  }

  create() {
    const xPos = this.scene.game.canvas.width / 2;
    const yPos = 30;
    return this.scene.add.text(xPos, yPos, '', TIMER_CSS);
  }

  style() {
    this.timerText.setDepth(10);
    this.timerText.setOrigin(0.5, 0.5);
    this.timerText.setAlign('center');
    this.timerText.setShadow(3, 3, MAGENTA_COLOR, 0);
    this.timerText.setFixedSize(200, 54);
  }

  update() {
    const time = Math.floor((new Date() - this.startDate)/100)/10;
    const paddedTime = `${time}`.indexOf('.') < 0 ? `${time}.0` : `${time}`;
    this.timerText.setText(paddedTime);
  }
}