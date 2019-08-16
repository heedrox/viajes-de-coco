import GameEngine from '../../src/app/game-engine';

describe("Game Engine", function() {
  it("builds", function() {
    const gameEngine = new GameEngine({}, {});
    expect(gameEngine).to.be.undefined;
  });
});
