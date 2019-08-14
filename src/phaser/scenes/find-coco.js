import Phaser from 'phaser';
import SceneTimer from './components/scene-timer';

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
    this.failedDate = new Date(1970, 1, 1);
    this.timer = new SceneTimer(this);
  }

  preload() {
    this.textures.remove('backgroundImage');
    this.load.image(`backgroundImage`, this.levelData.image);
    this.timer.addTimer(this.startDate);
  }

  create() {

    const image = this.addImage(`backgroundImage`);
    this.scale.lockOrientation('landscape-primary');
    this.allowZoomAndMove(image);
    this.listenClicks(image);
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
    this.cameras.main.flash(500, 255,0, 0);
  }
}
