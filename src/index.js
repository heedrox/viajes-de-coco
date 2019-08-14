import GameEngine from './app/game-engine'
import PhaserPresenter from './phaser/phaser-presenter';
import gameData from './app/game-data';

const phaserPresenter = new PhaserPresenter();

const gameEngine = new GameEngine(gameData, phaserPresenter);

gameEngine.start();
