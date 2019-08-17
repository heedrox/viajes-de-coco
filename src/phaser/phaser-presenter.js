import Phaser from 'phaser';
import { phaserConfig } from './phaser-config';
import SplashScreen from './scenes/splash-screen';
import FindCoco from './scenes/find-coco/';
import MainMenu from './scenes/main-menu/';
import Boot from './scenes/boot';
import QuestionScene from './scenes/question-scene';

const getCurrentScene = presenter =>  presenter.game.scene.scenes.filter(x => x.scene.isActive())[0];

export default class PhaserPresenter {
  constructor() {
  }

  setOnCocoClick(onCocoClick) {
    this.onCocoClick = onCocoClick;
  }

  setOnMenuStartClicked(onMenuStartClicked) {
    this.onMenuStartClicked = onMenuStartClicked;
  }

  setMenuImages(menuImages) {
    this.menuImages = menuImages;
  }

  setOnQuestionAnswered(onQuestionAnswered) {
    this.onQuestionAnswered = onQuestionAnswered;
  }

  start() {
    this.mainMenuScene = new MainMenu(this.menuImages, this.onMenuStartClicked);
    this.findCocoScene = new FindCoco(this.onCocoClick);
    this.splashScreen = new SplashScreen(this.mainMenuScene, this.menuImages);
    this.bootScene = new Boot(this.splashScreen);
    this.questionScene = new QuestionScene(this.onQuestionAnswered);
    this.game = new Phaser.Game(phaserConfig([
      this.bootScene,
      this.splashScreen,
      this.mainMenuScene,
      this.findCocoScene,
      this.questionScene
    ]));
    window.game = this.game; //debugging purposes
  }

  showLevel(levelData, startDate) {
    getCurrentScene(this).scene.start(this.findCocoScene.scene.key, { levelData, startDate });
  }

  showQuestion(levelData, questions, startDate) {
    getCurrentScene(this).scene.start(this.questionScene.scene.key, { levelData, questions, startDate });
  }

  showWrongAnswer(callback) {
    getCurrentScene(this).cameras.main.flash(500, 255, 0, 0, false, callback);
  }

  showRightAnswer(callback) {
    getCurrentScene(this).cameras.main.flash(500, 0, 255, 0, false, callback);
  }

  showScore(score) {
    alert('score: ' + score);
  }

  showClickFailed(failedDate) {
    this.game.scene.getScene(this.findCocoScene.scene.key).failed(failedDate);
  }

}
