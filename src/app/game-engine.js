export default class GameEngine {
  constructor(levels, presenter) {
    this.levels = levels;
    this.presenter = presenter
  }

  start() {
    this.presenter.setOnCocoClick(this.onCocoClick.bind(this));
    this.presenter.setOnReady(this.onReady.bind(this));
    this.presenter.setLevels(this.levels);
    this.presenter.start(this.levels[0]);
  }

  onReady() {
    this.presenter.showLevel(this.levels[0])
  }

  onCocoClick(x, y) {
    console.log('coco clicked', x, y);
  }
}
