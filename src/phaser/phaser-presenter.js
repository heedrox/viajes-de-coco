import Phaser from 'phaser';
import { phaserConfig } from './phaser-config';
import SplashScreen from './scenes/splash-screen';
import FindCoco from './scenes/find-coco/';
import MainMenu from './scenes/main-menu/';
import Boot from './scenes/boot';
import QuestionScene from './scenes/question-scene';
import ScoreScene from './scenes/score-scene';

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

  setLevels(levels) {
    this.levels = levels;
  }

  setOnQuestionAnswered(onQuestionAnswered) {
    this.onQuestionAnswered = onQuestionAnswered;
  }

  start() {
    this.mainMenuScene = new MainMenu(this.menuImages, this.onMenuStartClicked);
    this.findCocoScene = new FindCoco(this.onCocoClick);
    this.splashScreen = new SplashScreen(this.mainMenuScene, this.menuImages, this.levels);
    this.bootScene = new Boot(this.splashScreen);
    this.questionScene = new QuestionScene(this.onQuestionAnswered);
    this.scoreScene = new ScoreScene(this.onClickRestart.bind(this));
    this.game = new Phaser.Game(phaserConfig([
      this.bootScene,
      this.splashScreen,
      this.mainMenuScene,
      this.findCocoScene,
      this.questionScene,
      this.scoreScene
    ]));
    this.allowScreenChange();
    window.game = this.game; //debugging purposes
  }

  showLevel(levelData, startDate) {
    getCurrentScene(this).scene.start(this.findCocoScene.scene.key, { levelData, startDate });
  }

  showQuestion(levelData, questions, startDate) {
    getCurrentScene(this).scene.start(this.questionScene.scene.key, { levelData, questions, startDate });
  }

  showWrongAnswer(callback) {
    this.questionScene.showWrongAnswer(callback);
  }

  showRightAnswer(callback) {
    this.questionScene.showRightAnswer(callback);
  }

  showScore(score) {
    getCurrentScene(this).scene.start(this.scoreScene.scene.key, { score });
  }

  showClickFailed(failedDate) {
    this.game.scene.getScene(this.findCocoScene.scene.key).failed(failedDate);
  }

  onClickRestart() {
    getCurrentScene(this).scene.start(this.mainMenuScene.key);
  }

  allowScreenChange() {
    this.game.scale.on('orientationchange', () => {
      this.restartActiveScene();
    });
    this.game.scale.on('resize', () => {
      this.restartActiveScene();
    });
  }

  restartActiveScene() {
    const currentScene = getCurrentScene(this);
    if (currentScene) {
      currentScene.scene.restart();
    }
  }

}
