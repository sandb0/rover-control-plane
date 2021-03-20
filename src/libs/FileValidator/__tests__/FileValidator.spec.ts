import fs from 'fs';
import path, { PlatformPath } from 'path';

import {
  fileNotFoundErrorMessage,
  missingFilePathErrorMessage,
  invalidFileErrorMessage,
} from '../../../configs/ConsoleDefaultMessages';

import FileValidator from '../FileValidator';

describe('FileValidator', () => {
  /** Instantiate mocks */

  const FsMock = jest.fn<Partial<typeof fs>, []>();
  const fsMock = new FsMock() as typeof fs;

  const PathMock = jest.fn<Partial<PlatformPath>, []>();
  const pathMock = new PathMock() as PlatformPath;

  it('should throw an Error (with expected message) on missing file path', () => {
    const SUT = new FileValidator(fs, path);

    expect(SUT.readFile.bind(SUT, '')).toThrowError(
      new Error(missingFilePathErrorMessage)
    );
  });

  it('should throw an Error (with expected message) on file not found', () => {
    const filePath = 'FILE_NOT_FOUND';
    fsMock.existsSync = jest.fn().mockReturnValue(false);

    const SUT = new FileValidator(fsMock, path);

    expect(SUT.readFile.bind(SUT, filePath)).toThrowError(
      new Error(fileNotFoundErrorMessage)
    );
    expect(fsMock.existsSync).toBeCalledTimes(1);
    expect(fsMock.existsSync).toBeCalledWith(filePath);
  });

  it('should throw an Error (with expected message) on invalid file', () => {
    const filePath = 'INVALID_FILE';

    fsMock.existsSync = jest.fn().mockReturnValue(true);
    pathMock.extname = jest.fn().mockReturnValue('EXTENSION_ERROR');

    const SUT = new FileValidator(fsMock, pathMock);

    expect(SUT.readFile.bind(SUT, filePath)).toThrowError(
      new Error(invalidFileErrorMessage)
    );
    expect(pathMock.extname).toBeCalledTimes(1);
    expect(pathMock.extname).toBeCalledWith(filePath);
  });

  it('should return the file content', () => {
    const expectedFileContent = 'FILE_CONTENT';
    const filePath = 'FILE';

    fsMock.existsSync = jest.fn().mockReturnValue(true);
    fsMock.readFileSync = jest.fn().mockReturnValue(expectedFileContent);
    pathMock.extname = jest.fn().mockReturnValue('.txt');

    const SUT = new FileValidator(fsMock, pathMock);

    expect(SUT.readFile(filePath)).toBe(expectedFileContent);
    expect(fsMock.readFileSync).toBeCalledTimes(1);
    expect(fsMock.readFileSync).toBeCalledWith(filePath, {
      encoding: 'utf8',
      flag: 'r',
    });
  });
});
