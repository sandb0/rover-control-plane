import CardinalPoints from '../../../configs/CardinalPoints';
import Rover, { DIRECTION_TO_LEFT, DIRECTION_TO_RIGHT } from '../Rover';

describe('Rover Entity', () => {
  it('should change rover direction to the left, based on `CardinalPoints`', () => {
    const roverDirection1 = 'N';
    const roverDirection2 = 'W';

    const SUT1 = new Rover(0, 0, roverDirection1);
    const SUT2 = new Rover(0, 0, roverDirection2);

    const currentRoverDirectionIndexBasedOnCardinalPoints1 = CardinalPoints.indexOf(
      roverDirection1
    );
    const currentRoverDirectionIndexBasedOnCardinalPoints2 = CardinalPoints.indexOf(
      roverDirection2
    );

    SUT1.changeDirection(
      DIRECTION_TO_LEFT,
      currentRoverDirectionIndexBasedOnCardinalPoints1
    );

    // Test first index of Cardinal Points.
    SUT2.changeDirection(
      DIRECTION_TO_LEFT,
      currentRoverDirectionIndexBasedOnCardinalPoints2
    );

    expect(SUT1.direction).toBe('W');
    expect(SUT2.direction).toBe('S');
  });

  it('should change rover direction to the right, based on `CardinalPoints`', () => {
    const roverDirection1 = 'N';
    const roverDirection2 = 'S';

    const SUT1 = new Rover(0, 0, roverDirection1);
    const SUT2 = new Rover(0, 0, roverDirection2);

    const currentRoverDirectionIndexBasedOnCardinalPoints1 = CardinalPoints.indexOf(
      roverDirection1
    );
    const currentRoverDirectionIndexBasedOnCardinalPoints2 = CardinalPoints.indexOf(
      roverDirection2
    );

    SUT1.changeDirection(
      DIRECTION_TO_RIGHT,
      currentRoverDirectionIndexBasedOnCardinalPoints1
    );

    // Test last index of Cardinal Points.
    SUT2.changeDirection(
      DIRECTION_TO_RIGHT,
      currentRoverDirectionIndexBasedOnCardinalPoints2
    );

    expect(SUT1.direction).toBe('E');
    expect(SUT2.direction).toBe('W');
  });

  it('should move (update Y-axis position) rover, based on own direction', () => {
    const SUT1 = new Rover(0, 0, 'N');
    const SUT2 = new Rover(0, 0, 'S');

    SUT1.move();
    SUT2.move();

    expect(SUT1.positionYAxis).toBe(1);
    expect(SUT2.positionYAxis).toBe(-1);
  });

  it('should move (update X-axis position) rover, based on own direction', () => {
    const SUT1 = new Rover(0, 0, 'E');
    const SUT2 = new Rover(0, 0, 'W');

    SUT1.move();
    SUT2.move();

    expect(SUT1.positionXAxis).toBe(1);
    expect(SUT2.positionXAxis).toBe(-1);
  });
});
