import Phaser from 'phaser';

const TIMER_CSS = { fontFamily: 'Bangers', font: '48px Bangers', fill: '#287cc4', align: 'left' };

const getRatio = (image, game) => {
  if (game.scale.isGameLandscape) return game.canvas.height / image.height;
  return game.canvas.width / image.width;
};

const getClickPercent = (image, tapEvent) => {
  const imageLeft = image.x - image.displayWidth * image.originX;
  const imageTop = image.y - image.displayHeight * image.originY;

  const xPercent = (tapEvent.x - imageLeft) / image.displayWidth * 100;
  const yPercent = (tapEvent.y - imageTop) / image.displayHeight * 100;
  return { xPercent, yPercent };
};

export default class FindCoco extends Phaser.Scene {

  constructor(onCocoClick) {
    super('findCoco');
    this.onCocoClick = onCocoClick;
  }

  init(data) {
    this.levelData = data.levelData;
    this.startDate = data.startDate;
  }

  preload() {
    console.log('preloading', this.levelData.id);
    this.textures.remove('backgroundImage');
    this.load.image(`backgroundImage`, this.levelData.image);
  }

  create() {
    console.log('creating');
    this.addTimer();
    const image = this.addImage(`backgroundImage`);
    this.scale.lockOrientation('landscape-primary');

    this.allowZoomAndMove(image);
    this.listenClicks(image);
  }

  addTimer() {
    const xPos = this.game.canvas.width / 2;
    const yPos = 30;
    this.timerText = this.add.text(xPos, yPos, '10.87', TIMER_CSS);
    this.timerText.setDepth(10);
    this.timerText.setOrigin(0.5, 0.5);
    this.timerText.setAlign('center');
    this.timerText.setShadow(3, 3, 'rgba(237,117,163,1)', 0);
    this.timerText.setFixedSize(200, 54);
    this.time.addEvent({
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

  addImage(name) {
    const image = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, name);
    image.name = 'backgroundImage';
    this.game.scale.scaleMode = Phaser.Scale.RESIZE;
    this.game.scale.parentIsWindow = true;
    image.setDepth(1);
    this.setImageFitWindow(image);
    return image;
  }

  setImageFitWindow(image) {
    const ratio = getRatio(image, this.game);
    image.scale = ratio;
  }

  allowZoomAndMove(image) {
    const pinch = this.rexGestures.add.pinch({
      enable: true,
      bounds: undefined,
      threshold: 0,
    });
    this.addMoveEvent(image, pinch);
    this.addZoomEvent(image, pinch);
  }

  addMoveEvent(image, pinch) {
    pinch.on('drag1', function (pinch) {
      image.x += pinch.drag1Vector.x;
      image.y += pinch.drag1Vector.y;
    }, this);
  }

  addZoomEvent(image, pinch) {
    pinch.on('pinch', function (pinch) {
      image.scale *= pinch.scaleFactor;
    }, this);

  }

  listenClicks(image) {
    const tap = this.rexGestures.add.tap(image, {
      enable: true,

      time: 250,
      tapInterval: 200,
      threshold: 9,
      tapOffset: 10,

      taps: undefined,
      minTaps: undefined,
      maxTaps: undefined,
    });
    tap.on('tap', function (tapEvent) {
      const { xPercent, yPercent } = getClickPercent(image, tapEvent);
      this.onCocoClick(xPercent, yPercent);
    }, this);
  }

  failed(failedDate) {
    this.failedDate = failedDate;
    console.log(this);
    this.cameras.main.flash(500, 255,0, 0);
  }
}
