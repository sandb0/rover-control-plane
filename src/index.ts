import fs from 'fs';
import path from 'path';

import { FileValidator } from './libs';
import { RoverInputDataValidator } from './Rover/Infrastructure';
import { RoverMovementService } from './Rover/Application';

try {
  // Get file path.
  const filePath = process.argv[2];

  // Validate file.
  const fileValidator = new FileValidator(fs, path);
  const fileData = fileValidator.readFile(filePath);

  // Validate input data.
  const roverInputDataValidator = new RoverInputDataValidator(fileData);

  // Use a movement service.
  const roverMovementService = new RoverMovementService(
    roverInputDataValidator
  );
  const movedRovers = roverMovementService.getAndMoveAllRovers();

  // Response.
  movedRovers.forEach((rover) => {
    console.log(rover.positionXAxis, rover.positionYAxis, rover.direction);
  });
} catch (error) {
  console.log(error.message);
}
