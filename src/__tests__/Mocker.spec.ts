import { IStage, Mocker } from '../Mocker';

const buildFakeStages = (count: number) => Array(count).fill(count).map((a, i) => ({description: `Stage ${i}`}));

describe('Mocker', () => {
  const element = document.body as any; // body doesn't have a dataset prop?
  const totalStages = 10;

  let mock: Mocker;
  let stages: IStage[];

  document.body.innerHTML = `<div></div>`;
  element.dataset = {};

  beforeEach(() => {
    stages = buildFakeStages(totalStages);
    mock = new Mocker(element, stages);
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(mock).toBeDefined();
    });

    it('should set the class of the element', () => {
      expect(element.className).toBe('');
    });

    it('should set the data-stages attribute to 3', () => {
      expect(element.dataset.stages).toBe(totalStages.toString());
    });

    it('should set the data-stage attribute to 0 on init', () => {
      expect(element.dataset.stage).toBe('0');
    });

    it('should set the data-stage-description attribute to the help text', () => {
      expect(element.dataset.stageDescription).toBe(Mocker.helpText);
    });
  });

  describe('property stages', () => {
    it('should return stages', function() {
      const getStages = mock.stages;
      expect(getStages).toBe(stages);
    });

    it('should set stages and call init', function() {
      const fakeStages = [{description: ''}];
      jest.spyOn(mock, 'init');
      mock.stages = fakeStages;
      expect(mock.init).toHaveBeenCalledTimes(1);
      expect(mock.stages).toBe(fakeStages);
    });
  });

  describe('property active', () => {
    it('should return the active stage index', () => {
      mock.active = 0;
      expect(mock.active).toEqual(0);
    });

    it('should update the element data-stage-description attribute when set', () => {
      mock.active = 1;
      expect(element.dataset.stageDescription).toEqual(stages[1].description);
    });

    it('should update the data-stage attr when set', () => {
      mock.active = 1;
      expect(element.dataset.stage).toEqual('1');
    });

    it('should update the elements className when set', () => {
      mock.active = 2;
      expect(element.className).toEqual(`${mock.className}1 ${mock.className}2`);
    });
  });

  describe('method moveStage', () => {
    const startStageIndex = 0;

    beforeEach(() => {
      mock.active = startStageIndex;
    });

    it('should not move stage when current index is 0', () => {
      expect(mock.moveStage(-1)).toBe(false);
      expect(mock.active).toBe(startStageIndex);
    });

    it('should increase the stage by the given number', () => {
      const goTo = 5;
      expect(mock.moveStage(goTo)).toBe(goTo);
      expect(mock.active).toBe(goTo);
    });

    it('should not set a stage out of range', () => {
      const goTo = 100;
      expect(mock.moveStage(goTo)).toBe(false);
      expect(mock.active).toBe(startStageIndex);
    });
  });

  describe('method classString', () => {
    it('should return a class name', function() {
      const result = `${mock.className}${totalStages + 1}`;
      expect(mock.classString('', totalStages, Array(totalStages))).toBe(result);
    });
  });

  describe('method handleKeyPress', () => {
    beforeEach(() => {
      stages = buildFakeStages(totalStages);
      mock = new Mocker(element, stages);
      jest.spyOn(mock, 'moveStage');
    });

    it('should got the next stage when pressing the ArrowRight key', function() {
      const event = {key: 'ArrowRight'} as KeyboardEvent;
      mock.handleKeyPress(event);
      expect(mock.moveStage).toHaveBeenCalledWith(1);
    });

    it('should got the previous stage when pressing the ArrowLeft key', function() {
      const event = {key: 'ArrowLeft'} as KeyboardEvent;
      mock.handleKeyPress(event);
      expect(mock.moveStage).toHaveBeenCalledWith(-1);
    });
  });
});
