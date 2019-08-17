import GameEngine from '../../src/app/game-engine';

const EMPTY_PRESENTER = {
  setOnCocoClick: () => {},
  setOnMenuStartClicked: () => {},
  setMenuImages: () => {},
  setOnQuestionAnswered: () => {}
};

describe("Game Engine", function() {
  it("builds", function() {
    const gameEngine = new GameEngine({}, EMPTY_PRESENTER);
    expect(gameEngine).not.to.be.undefined;
  });
});
