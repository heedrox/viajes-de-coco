import GameEngine from '../../src/app/game-engine';

const aLevel = (id, image, cocoLeft, cocoTop, cocoRight, cocoBottom, description) =>
  ({ id, image, cocoLeft, cocoTop, cocoRight, cocoBottom, description });

const LEVELS = [
  aLevel(0, '', 0, 0, 0, 0, 'description0'),
  aLevel(1, '', 0, 0, 0, 0, 'description1'),
  aLevel(2, '', 0, 0, 0, 0, 'description2'),
  aLevel(3, '', 0, 0, 0, 0, 'description3'),
];

describe("Game Engine - Questions", function() {

  const presenterMock = {
    setOnCocoClick: () => {},
    setOnMenuStartClicked: () => {},
    setMenuImages: () => {},
    showQuestion: null,
    showLevel: () => {},
  };

  beforeEach(() => {
    presenterMock.showQuestion = sinon.spy();
  });

  it("Asks presenter to show questions with question of level", function() {
    const gameEngine = new GameEngine({ levels: LEVELS }, presenterMock);
    gameEngine.numLevel = 1;

    gameEngine.showQuestion();


    expect(gameEngine.presenter.showQuestion.callCount).to.equal(1);
    expect(gameEngine.presenter.showQuestion.getCall(0).args[0]).to.equal('description1');
  });

  it("Asks presenter to show questions with other questions", function() {
    const gameEngine = new GameEngine({ levels: LEVELS }, presenterMock);
    gameEngine.numLevel = 1;

    gameEngine.showQuestion();

    expect(gameEngine.presenter.showQuestion.callCount).to.equal(1);
    const otherQuestions = gameEngine.presenter.showQuestion.getCall(0).args[1];
    expect(otherQuestions).to.contains('description0');
    expect(otherQuestions).to.contains('description2');
    expect(otherQuestions).to.contains('description3');
    expect(otherQuestions).not.to.contains('description1');
  });
});
