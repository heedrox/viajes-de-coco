const TIMER_CSS = { fontFamily: 'Bangers', font: '48px Bangers', fill: '#287cc4', align: 'left' };
const MAGENTA_COLOR = 'rgba(237,117,163,1)';

export default class SceneTimer {
  constructor(scene) {
    this.scene = scene;
  }

  addTimer(startDate) {
    this.startDate = startDate;

    const xPos = this.scene.game.canvas.width / 2;
    const yPos = 30;
    this.timerText = this.scene.add.text(xPos, yPos, '', TIMER_CSS);
    this.timerText.setDepth(10);
    this.timerText.setOrigin(0.5, 0.5);
    this.timerText.setAlign('center');
    this.timerText.setShadow(3, 3, MAGENTA_COLOR, 0);
    this.timerText.setFixedSize(200, 54);
    this.scene.time.addEvent({
      delay: 10,
      callback: this.updateTimer.bind(this),
      loop: true
    })
  }

  updateTimer() {
    const time = Math.floor((new Date() - this.startDate)/100)/10;
    const paddedTime = `${time}`.indexOf('.') < 0 ? `${time}.0` : `${time}`;
    this.timerText.setText(paddedTime);
  }
}
