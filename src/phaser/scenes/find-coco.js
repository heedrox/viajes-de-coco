import Phaser from 'phaser';
import SceneTimer from './components/scene-timer';
import SceneImage from './components/scene-image';


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
    this.startDate = data.startDate;
    this.failedDate = new Date(1970, 1, 1);
    this.timer = new SceneTimer(this);
    this.backgroundImage = new SceneImage(this, data.levelData);
  }

  preload() {
    this.backgroundImage.preload();
    this.timer.addTimer(this.startDate);
  }

  create() {
    this.scale.lockOrientation('landscape-primary');
    const image = this.backgroundImage.create();
    this.listenClicks(image);
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
