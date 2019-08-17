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
    showWrongAnswer: () => {},
    showRightAnswer: () => {},
    setLevels: () => {}
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
    it('does not do anything when right question', function() {
      const gameEngine = new GameEngine({ levels: LEVELS }, presenterMock);
      gameEngine.numLevel = 1;
      gameEngine.startDate = new Date(2010, 1, 2, 17, 0, 10);
      gameEngine.presenter.showRightAnswer = sinon.spy();

      gameEngine.onQuestionAnswered('REAL_DESCRIPTION');

      expect(gameEngine.startDate).to.eql(new Date(2010, 1, 2, 17, 0, 10));
      expect(gameEngine.presenter.showRightAnswer.callCount).to.equal(1);
    });

    it('penalization of 10 secs when wrong answer', function() {
      const gameEngine = new GameEngine({ levels: LEVELS }, presenterMock);
      gameEngine.numLevel = 1;
      gameEngine.startDate = new Date(2010, 1, 2, 17, 0, 10);
      gameEngine.presenter.showWrongAnswer = sinon.spy();

      gameEngine.onQuestionAnswered('FALSE_DESCR_1');

      expect(gameEngine.startDate).to.eql(new Date(2010, 1, 2, 17, 0, 0));
      expect(gameEngine.presenter.showWrongAnswer.callCount).to.equal(1);
    });

    it('calls next level through answer callback', function() {
      const gameEngine = new GameEngine({ levels: LEVELS }, presenterMock);
      gameEngine.numLevel = 1;
      presenterMock.showWrongAnswer = callback => callback();
      presenterMock.showLevel = sinon.spy();
      gameEngine.startDate = new Date(2010, 1, 2, 17, 0, 10);

      gameEngine.onQuestionAnswered('XXX_IT_DOES_NOT_MATTER_XXX');

      expect(gameEngine.presenter.showLevel.callCount).to.eql(1);
      expect(gameEngine.presenter.showLevel.getCall(0).args[0]).to.eql(LEVELS[2]);
    });

  });
});
