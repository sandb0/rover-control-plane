import Rover, {
  Directions,
  DIRECTION_TO_LEFT,
  DIRECTION_TO_RIGHT,
} from '../Domain/Rover';
import RoverInputDataValidator from '../Infrastructure/RoverInputDataValidator/RoverInputDataValidator';
import CardinalPoints from '../../configs/CardinalPoints';

const roverMovement = (
  roverInputDataValidator: RoverInputDataValidator
): Rover[] => {
  const movedRovers: Rover[] = [];

  roverInputDataValidator.roversInputData.forEach((roverInputData) => {
    const roverMovementInstructions = roverInputData.movementInstructions;

    const rover = new Rover(
      roverInputData.positionXAxis,
      roverInputData.positionYAxis,
      roverInputData.direction as Directions
    );

    for (
      let instructionIndex = 0;
      instructionIndex < roverMovementInstructions.length;
      instructionIndex++
    ) {
      const instruction = roverMovementInstructions[instructionIndex];
      const roverDirection = rover.direction;

      // Current rover direction index based on cardinal points.
      const currentRoverDirectionIndex = CardinalPoints.indexOf(roverDirection);

      switch (instruction) {
        case 'L':
          rover.changeDirection(DIRECTION_TO_LEFT, currentRoverDirectionIndex);
          break;
        case 'R':
          rover.changeDirection(DIRECTION_TO_RIGHT, currentRoverDirectionIndex);
          break;
        case 'M':
          rover.move();
          break;
      }
    }

    movedRovers.push(rover);
  });

  return movedRovers;
};

export default roverMovement;
