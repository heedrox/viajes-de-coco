const isWithinBounds = (level, xPercent, yPercent) =>
  (xPercent >= level.cocoLeft) && (xPercent <= level.cocoRight) &&
  (yPercent >= level.cocoTop) && (yPercent <= level.cocoBottom);

export default class GameEngine {
  constructor(levels, presenter) {
    this.levels = levels;
    this.presenter = presenter;
    this.presenter.setOnCocoClick(this.onCocoClick.bind(this));
    this.presenter.setOnReady(this.onReady.bind(this));
    this.presenter.setLevels(this.levels);
  }

  start() {
    this.presenter.start(this.levels[0]);
  }

  onReady() {
    this.startDate = new Date();
    this.numLevel = 0;
    this.showCurrentLevel();
  }

  onCocoClick(xPercent, yPercent) {
    if (isWithinBounds(this.levels[this.numLevel], xPercent, yPercent)) {
      this.showNextLevel();
    }
  }

  showNextLevel() {
    this.numLevel = this.numLevel + 1;
    if (this.numLevel > this.levels.length) {
      this.endGame();
    } else {
      this.showCurrentLevel();
    }
  }

  showCurrentLevel() {
    this.presenter.showLevel(this.levels[this.numLevel], this.startDate)
  }

  endGame() {
    const score = Math.round((new Date() - this.startDate)/10)/100;
    this.presenter.showScore(score);

  }
}
