import GameEngine from './app/game-engine'
import PhaserPresenter from './phaser/phaser-presenter';
import LEVELS from './app/levels';

const phaserPresenter = new PhaserPresenter();

const gameEngine = new GameEngine(LEVELS, phaserPresenter);

gameEngine.start();
