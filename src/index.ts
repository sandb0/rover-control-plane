import fs from 'fs';
import path from 'path';

import { FileValidator } from './libs';

const filePath = process.argv[2];

const fileValidator = new FileValidator(fs, path);
const data = fileValidator.readFile(filePath);
console.log(data);
