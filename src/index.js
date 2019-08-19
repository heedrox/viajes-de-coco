import GameEngine from './app/game-engine'
import PhaserPresenter from './phaser/phaser-presenter';
import gameData from './app/game-data';
import { showIosNotice } from './web/show-ios-notice';

const isStandalone = () => (("standalone" in window.navigator) && (window.navigator.standalone));
const isIos = () => !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
const isSafari = () => (navigator.userAgent.toLowerCase().indexOf('safari/') > -1) &&
  (navigator.userAgent.toLowerCase().indexOf('chrome') === -1);

if (!isStandalone() && isIos() && isSafari()) {
  showIosNotice();
} else {
  const phaserPresenter = new PhaserPresenter();

  const gameEngine = new GameEngine(gameData, phaserPresenter);

  gameEngine.start();
}
