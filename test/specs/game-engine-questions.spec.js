import GameEngine from '../../src/app/game-engine';

const aLevel = (id, image, cocoLeft, cocoTop, cocoRight, cocoBottom, description) =>
  ({ id, image, cocoLeft, cocoTop, cocoRight, cocoBottom, description });

const LEVELS = [
  aLevel(0, '', 0, 0, 0, 0, 'FALSE_DESCR_1'),
  aLevel(1, '', 0, 0, 0, 0, 'REAL_DESCRIPTION'),
  aLevel(2, '', 0, 0, 0, 0, 'FALSE_DESCR_2'),
  aLevel(3, '', 0, 0, 0, 0, 'FALSE_DESCR_3'),
  aLevel(4, '', 0, 0, 0, 0, 'FALSE_DESCR_4'),
];

describe("Game Engine - Questions", function() {

  const presenterMock = {
    setOnCocoClick: () => {},
    setOnMenuStartClicked: () => {},
    setMenuImages: () => {},
    showQuestion: null,
    setOnQuestionAnswered: () => {},
    showLevel: () => {},
  };

  beforeEach(() => {
    presenterMock.showQuestion = sinon.spy();
  });

  it("shows questions with real question and other 3", function() {
    const gameEngine = new GameEngine({ levels: LEVELS }, presenterMock);
    gameEngine.numLevel = 1;

    gameEngine.showQuestion();

    expect(gameEngine.presenter.showQuestion.callCount).to.equal(1);
    const otherQuestions = gameEngine.presenter.showQuestion.getCall(0).args[1];
    expect(otherQuestions.length).to.equal(4);
    expect(otherQuestions.filter(q => q.indexOf('REAL_DESCRIPTION') >= 0).length).to.equal(1);
    expect(otherQuestions.filter(q => q.indexOf('FALSE_DESC') !== -1).length).to.equal(3);
  });

  describe('when checking question', function() {
    it('checks right answer', function() {
      const gameEngine = new GameEngine({ levels: LEVELS }, presenterMock);
      gameEngine.numLevel = 1;
      gameEngine.startDate = new Date(2010, 1, 2, 17, 0, 10);

      gameEngine.onQuestionAnswered('REAL_DESCRIPTION');

      expect(gameEngine.startDate).to.eql(new Date(2010, 1, 2, 17, 0, 0));
    });

    it('checks wrong answer', function() {
      const gameEngine = new GameEngine({ levels: LEVELS }, presenterMock);
      gameEngine.numLevel = 1;
      gameEngine.startDate = new Date(2010, 1, 2, 17, 0, 10);

      gameEngine.onQuestionAnswered('FALSE_DESCR_1');

      expect(gameEngine.startDate).to.eql(new Date(2010, 1, 2, 17, 0, 10));
    });

  });
});
