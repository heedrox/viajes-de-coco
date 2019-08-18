import Phaser from 'phaser';
import SceneTimer from '../common/components/scene-timer';
import SceneImage from './components/scene-image';
import { allowTap } from '../common/characteristics/allow-tap';

export default class FindCoco extends Phaser.Scene {

  constructor(onCocoClick) {
    super('findCoco');
    this.onCocoClick = onCocoClick;
    this.timer = new SceneTimer(this);
  }

  init(data) {
    this.startDate = data.startDate;
    this.backgroundImage = new SceneImage(this, data.levelData);
  }

  preload() {
    this.backgroundImage.preload();
  }

  create() {
    this.timer.addTimer(this.startDate);
    this.scale.lockOrientation('landscape-primary');
    this.backgroundImage.create();
    allowTap(this.backgroundImage.getImage(), this, (coordsPercent) => {
      this.onCocoClick(coordsPercent.xPercent, coordsPercent.yPercent);
    });
  }

  failed(failedDate) {
    this.cameras.main.flash(500, 255,0, 0);
    this.timer.setFailedDate(failedDate);
  }
}
