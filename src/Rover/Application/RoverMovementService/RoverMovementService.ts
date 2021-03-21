import Rover, {
  Directions,
  DIRECTION_TO_LEFT,
  DIRECTION_TO_RIGHT,
} from '../../Domain/Rover';
import { RoverInputDataValidator } from '../../Infrastructure';
import CardinalPoints from '../../../configs/CardinalPoints';

export default class RoverMovementService {
  private roverInputDataValidator: RoverInputDataValidator;

  public constructor(roverInputDataValidator: RoverInputDataValidator) {
    this.roverInputDataValidator = roverInputDataValidator;
  }

  public getAndMoveAllRovers(): Rover[] {
    const movedRovers: Rover[] = [];

    // For each rovers.
    this.roverInputDataValidator.roversInputData.forEach((roverInputData) => {
      const roverMovementInstructions = roverInputData.movementInstructions;

      const rover = new Rover(
        roverInputData.positionXAxis,
        roverInputData.positionYAxis,
        roverInputData.direction as Directions
      );

      const roverMovementInstructionsLength = roverMovementInstructions.length;

      // Apply each movement instruction on rover.
      for (
        let instructionIndex = 0;
        instructionIndex < roverMovementInstructionsLength;
        instructionIndex++
      ) {
        const instruction = roverMovementInstructions[instructionIndex];
        this.applyMovementInstructionOnRover(instruction, rover);
      }

      movedRovers.push(rover);
    });

    return movedRovers;
  }

  private applyMovementInstructionOnRover(instruction: string, rover: Rover) {
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
}
