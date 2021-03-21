import CardinalPoints from '../../configs/CardinalPoints';

export type Directions = 'W' | 'N' | 'E' | 'S';

export const DIRECTION_TO_LEFT = 0;
export const DIRECTION_TO_RIGHT = 1;

const MOVE_NORTH = 'N';
const MOVE_SOUTH = 'S';
const MOVE_WEST = 'W';
const MOVE_EAST = 'E';

export default class Rover {
  private _positionXAxis: number;
  private _positionYAxis: number;
  private _direction: Directions;

  public constructor(
    positionXAxis: number,
    positionYAxis: number,
    direction: Directions
  ) {
    this._positionXAxis = positionXAxis;
    this._positionYAxis = positionYAxis;
    this._direction = direction;
  }

  get direction(): Directions {
    return this._direction;
  }

  get positionXAxis(): number {
    return this._positionXAxis;
  }

  get positionYAxis(): number {
    return this._positionYAxis;
  }

  /**
   * @param currentRoverDirectionIndex Current rover direction index based on cardinal points.
   */
  public changeDirection(
    direction: number,
    currentRoverDirectionIndex: number
  ): void {
    switch (direction) {
      case DIRECTION_TO_LEFT:
        this.changeDirectionToLeft(currentRoverDirectionIndex);
        break;
      case DIRECTION_TO_RIGHT:
        this.changeDirectionToRight(currentRoverDirectionIndex);
        break;
    }
  }

  public move(): void {
    switch (this._direction) {
      case MOVE_NORTH:
        this.moveToNorth();
        break;
      case MOVE_SOUTH:
        this.moveToSouth();
        break;
      case MOVE_WEST:
        this.moveToWest();
        break;
      case MOVE_EAST:
        this.moveToEast();
        break;
    }
  }

  private changeDirectionToLeft(currentRoverDirectionIndex: number) {
    if (currentRoverDirectionIndex - 1 < 0) {
      currentRoverDirectionIndex = CardinalPoints.length;
    }

    this._direction = CardinalPoints[
      currentRoverDirectionIndex - 1
    ] as Directions;
  }

  private changeDirectionToRight(currentRoverDirectionIndex: number) {
    if (currentRoverDirectionIndex + 1 > CardinalPoints.length - 1) {
      currentRoverDirectionIndex = -1;
    }

    this._direction = CardinalPoints[
      currentRoverDirectionIndex + 1
    ] as Directions;
  }

  private moveToNorth() {
    this._positionYAxis += 1;
  }

  private moveToSouth() {
    this._positionYAxis -= 1;
  }

  private moveToWest() {
    this._positionXAxis -= 1;
  }

  private moveToEast() {
    this._positionXAxis += 1;
  }
}
