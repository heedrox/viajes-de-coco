export default class GameEngine {
  constructor(levels, presenter) {
    this.levels = levels;
    this.presenter = presenter
  }

  start() {
    this.presenter.setOnCocoClick(this.onCocoClick);
    this.presenter.start(this.levels[0]);
  }

  onCocoClick() {
    console.log('coco clicked');
  }
}
