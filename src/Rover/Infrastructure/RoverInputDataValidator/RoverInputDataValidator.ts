type RoverInputData = {
  positionXAxis: number;
  positionYAxis: number;
  direction: string;
  movementInstructions: string;
};

export default class RoverInputDataValidator {
  private fileData: string;
  private lines: string[] = [];
  private _plateauXAxisSize = 0;
  private _plateauYAxisSize = 0;
  private _roversInputData: RoverInputData[] = [];

  public constructor(fileData: string) {
    this.fileData = fileData;

    this.setFileData();
    this.setPlateauSize();
    this.setRoversPosition();
    this.setRoversInstructions();
  }

  get plateauXAxisSize(): number {
    return this._plateauXAxisSize;
  }

  get plateauYAxisSize(): number {
    return this._plateauYAxisSize;
  }

  get roversInputData(): RoverInputData[] {
    return this._roversInputData;
  }

  private setFileData() {
    this.fileDataCannotBeEmptyRule();
    this.lines = this.fileData.split('\n');
  }

  private setPlateauSize() {
    const plateauSize = this.lines[0];
    const plateauSizeAxis = plateauSize.split(' ');

    this._plateauXAxisSize = parseInt(plateauSizeAxis[0]);
    this._plateauYAxisSize = parseInt(plateauSizeAxis[1]);

    this.plateauSizeMustBeValidRule();
  }

  private setRoversPosition() {
    for (let index = 1; index < this.lines.length - 1; index += 2) {
      const roverPosition = this.lines[index]
        ? this.lines[index].split(' ')
        : '';

      const roverPositionXAxis = parseInt(roverPosition[0]);
      const roverPositionYAxis = parseInt(roverPosition[1]);
      const roverDirection = roverPosition[2];

      this.roverPositionXAxisMustBeValidRule(roverPositionXAxis);
      this.roverPositionYAxisMustBeValidRule(roverPositionYAxis);
      this.roverDirectionMustBeValidRule(roverDirection);

      this._roversInputData.push({
        positionXAxis: roverPositionXAxis,
        positionYAxis: roverPositionYAxis,
        direction: roverDirection,
        movementInstructions: '',
      });
    }
  }

  private setRoversInstructions() {
    for (
      let index = 2, roverOrder = 0;
      index < this.lines.length;
      index += 2, roverOrder++
    ) {
      const roverMovementInstructions = this.lines[index];

      this.roverMovementInstructionMustBeValidRule(roverMovementInstructions);

      this._roversInputData[
        roverOrder
      ].movementInstructions = roverMovementInstructions;
    }
  }

  private fileDataCannotBeEmptyRule() {
    if (!this.fileData) {
      throw new Error('No data has been sent');
    }
  }

  private plateauSizeMustBeValidRule() {
    if (
      !isFinite(this._plateauXAxisSize) ||
      !isFinite(this._plateauYAxisSize)
    ) {
      throw new Error(
        'Invalid plateau size: ' +
          this._plateauXAxisSize +
          ' ' +
          this._plateauYAxisSize
      );
    }
  }

  private roverPositionXAxisMustBeValidRule(roverPositionXAxis: number) {
    if (
      !isFinite(roverPositionXAxis) ||
      roverPositionXAxis > this._plateauXAxisSize
    ) {
      throw new Error(
        'Invalid rover initial X-axis position: ' + roverPositionXAxis
      );
    }
  }

  private roverPositionYAxisMustBeValidRule(roverPositionYAxis: number) {
    if (
      !isFinite(roverPositionYAxis) ||
      roverPositionYAxis > this._plateauYAxisSize
    ) {
      throw new Error(
        'Invalid rover initial Y-axis position: ' + roverPositionYAxis
      );
    }
  }

  private roverDirectionMustBeValidRule(roverDirection: string) {
    if (
      roverDirection !== 'N' &&
      roverDirection !== 'S' &&
      roverDirection !== 'W' &&
      roverDirection !== 'E'
    ) {
      throw new Error('Invalid rover initial direction: ' + roverDirection);
    }
  }

  private roverMovementInstructionMustBeValidRule(
    roverMovementInstructions: string
  ) {
    if (/[^LRM]/.test(roverMovementInstructions)) {
      throw new Error(
        'Invalid rover movement instructions: ' + roverMovementInstructions
      );
    }
  }
}
