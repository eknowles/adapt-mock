export interface IStage {
  name?: string,
  description?: string,
  className?: string,
  run?: string[]
}

export class Mocker {
  public static helpText = 'Use the arrow keys to navigate';
  public nextKey = 'ArrowRight';
  public prevKey = 'ArrowLeft';
  public className = 'adapt-';
  public state = {};
  private _stages: IStage[];
  private _active: number;

  constructor(private element: HTMLElement, stages: IStage[]) {
    this.stages = stages;
  }

  public get stages() {
    return this._stages;
  }

  public set stages(value: IStage[]) {
    this._stages = value;
    this.init();
  }

  public get active(): number {
    return this._active;
  }

  public set active(index: number) {
    const stage = this.stages[index];
    const isBack = index < this._active;
    const runStage = isBack ? this.stage : stage;

    if (!stage) throw new Error;

    this.element.className = this.classList(index);
    this.element.dataset.stage = `${index}`;
    this.element.dataset.stageDescription = stage.description || '';

    if (runStage.hasOwnProperty('run') && runStage.run) {
      runStage.run.forEach((fn) => {
        if (!window[fn]) throw new Error(`Run function ${fn}() not found!`);
        window[fn](isBack, this.state);
      });
    }

    this._active = index;
  }

  public get stage() {
    return this.stages[this.active];
  }

  public moveStage(inc: number): number | false {
    if (inc < 0 && this.active === 0 || inc > 0 && (this.active + inc) >= this.stages.length) {
      return false;
    }

    return this.active += inc;
  }

  private init() {
    this.element.dataset.stages = `${this.stages.length}`;
    this.stages.splice(0, 0, {description: Mocker.helpText});
    this.active = 0;
    this.element.addEventListener('keydown', this.handleKeyPress.bind(this), false);
  }

  private classList(count: number): string {
    return Array(count).fill('').map(this.classString.bind(this)).join(' ');
  }

  private classString(value: string, index: number, arr: string[]) {
    const current = `${this.className}${index + 1}`;
    const currentClass = (arr.length === index) && this.stages[index].hasOwnProperty('className');

    return currentClass ? `${this.stages[index].className} ${current}` : current;
  }

  private handleKeyPress(event: KeyboardEvent) {
    const keyName = event.key;

    if (keyName === this.nextKey) {
      return this.moveStage(1);
    } else if (keyName === this.prevKey) {
      return this.moveStage(-1);
    }
  }
}
