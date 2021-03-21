import fs from 'fs';
import path from 'path';

import { FileValidator } from './libs';
import RoverInputDataValidator from './Rover/Infrastructure/RoverInputDataValidator/RoverInputDataValidator';

const filePath = process.argv[2];

const fileValidator = new FileValidator(fs, path);
const fileData = fileValidator.readFile(filePath);

const roverInputDataValidator = new RoverInputDataValidator(fileData);
console.log(roverInputDataValidator.plateauXAxisSize);
console.log(roverInputDataValidator.plateauYAxisSize);
console.log(roverInputDataValidator.roversInputData);
