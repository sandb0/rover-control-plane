import fs from 'fs';
import { PlatformPath } from 'path';

import {
  fileNotFoundErrorMessage,
  invalidFileErrorMessage,
  missingFilePathErrorMessage,
} from '../../configs/ConsoleDefaultMessages';

export default class FileValidator {
  private fileSystem: typeof fs;
  private path: PlatformPath;

  public constructor(fileSystem: typeof fs, path: PlatformPath) {
    this.fileSystem = fileSystem;
    this.path = path;
  }

  public readFile(filePath: string): string {
    if (this.filePathCannotBeEmptyRule(filePath)) {
      throw new Error(missingFilePathErrorMessage);
    }

    if (this.fileMustExistsRule(filePath)) {
      throw new Error(fileNotFoundErrorMessage);
    }

    if (this.fileCannotBeInvalidRule(filePath)) {
      throw new Error(invalidFileErrorMessage);
    }

    const fileContent = this.fileSystem.readFileSync(filePath, {
      encoding: 'utf8',
      flag: 'r',
    });

    return fileContent.replace(/\r\n/g, '\n');
  }

  private filePathCannotBeEmptyRule(filePath: string) {
    return !filePath;
  }

  private fileMustExistsRule(filePath: string) {
    return !this.fileSystem.existsSync(filePath);
  }

  private fileCannotBeInvalidRule(filePath: string) {
    return !(this.path.extname(filePath) === '.txt');
  }
}
