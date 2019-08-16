import { isFailed } from '../phaser/scenes/util/is-failed';

const isWithinBounds = (level, xPercent, yPercent) =>
  (xPercent >= level.cocoLeft) && (xPercent <= level.cocoRight) &&
  (yPercent >= level.cocoTop) && (yPercent <= level.cocoBottom);

export default class GameEngine {
  constructor(gameData, presenter) {
    this.levels = gameData.levels;
    this.menuImages = gameData.menuImages;
    this.presenter = presenter;
    this.presenter.setOnCocoClick(this.onCocoClick.bind(this));
    this.presenter.setOnMenuStartClicked(this.onMenuStartClicked.bind(this));
    this.presenter.setMenuImages(this.menuImages);
    this.startDate = null;
    this.lastFailedDate = null;
  }

  start() {
    this.presenter.start();
  }

  onMenuStartClicked() {
    this.startDate = new Date();
    this.numLevel = 0;
    this.showLevel(this.numLevel);
  }

  onCocoClick(xPercent, yPercent) {
    if (isFailed(this.lastFailedDate)) return;
    if (isWithinBounds(this.levels[this.numLevel], xPercent, yPercent)) {
      this.showQuestion();
    } else {
      this.showClickFailed();
    }
  }

  showQuestion() {
    // const otherQuestions = this.levels[this.numLevel]
    // this.presenter.showQuestion(this.levels[this.numLevel].question, this.startDate);
    this.showNextLevel();
  }

  showClickFailed() {
    this.lastFailedDate = new Date();
    this.presenter.showClickFailed(this.lastFailedDate);
  }

  showNextLevel() {
    this.numLevel = this.numLevel + 1;
    if (this.numLevel >= this.levels.length) {
      this.endGame();
    } else {
      this.showLevel(this.numLevel);
    }
  }

  showLevel(numLevel) {
    this.presenter.showLevel(this.levels[numLevel], this.startDate)
  }

  endGame() {
    const score = Math.round((new Date() - this.startDate)/10)/100;
    this.presenter.showScore(score);

  }
}
