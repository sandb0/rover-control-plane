import fs from 'fs';
import path, { PlatformPath } from 'path';
import {
  fileNotFoundErrorMessage,
  missingFilePathErrorMessage,
  invalidFileErrorMessage,
} from '../../../configs/ConsoleDefaultMessages';

import FileValidator from '../FileValidator';

describe('FileValidator', () => {
  it('should throw an Error (with expected message) on missing file path', () => {
    const SUT = new FileValidator(fs, path);

    expect(SUT.readFile.bind(SUT, '')).toThrowError(
      new Error(missingFilePathErrorMessage)
    );
  });

  it('should throw an Error (with expected message) on file not found', () => {
    const FsMock = jest.fn<Partial<typeof fs>, []>();
    const fsMock = new FsMock() as typeof fs;
    fsMock.existsSync = jest.fn(() => {
      return false;
    });

    const SUT = new FileValidator(fsMock, path);
    const filePath = 'FILE_NOT_FOUND';

    expect(SUT.readFile.bind(SUT, filePath)).toThrowError(
      new Error(fileNotFoundErrorMessage)
    );
    expect(fsMock.existsSync).toBeCalledTimes(1);
    expect(fsMock.existsSync).toBeCalledWith(filePath);
  });

  it('should throw an Error (with expected message) on invalid file', () => {
    const FsMock = jest.fn<Partial<typeof fs>, []>();
    const fsMock = new FsMock() as typeof fs;
    fsMock.existsSync = jest.fn(() => {
      return true;
    });

    const PathMock = jest.fn<Partial<PlatformPath>, []>();
    const pathMock = new PathMock() as PlatformPath;
    pathMock.extname = jest.fn(() => {
      return 'EXTENSION_ERROR';
    });

    const SUT = new FileValidator(fsMock, pathMock);
    const filePath = 'INVALID_FILE';

    expect(SUT.readFile.bind(SUT, filePath)).toThrowError(
      new Error(invalidFileErrorMessage)
    );
    expect(pathMock.extname).toBeCalledTimes(1);
    expect(pathMock.extname).toBeCalledWith(filePath);
  });

  it('should return the file content', () => {
    const expectedFileContent = 'FILE_CONTENT';

    const FsMock = jest.fn<Partial<typeof fs>, []>();
    const fsMock = new FsMock() as typeof fs;
    fsMock.existsSync = jest.fn(() => {
      return true;
    });
    fsMock.readFileSync = jest.fn().mockReturnValue(expectedFileContent);

    const PathMock = jest.fn<Partial<PlatformPath>, []>();
    const pathMock = new PathMock() as PlatformPath;
    pathMock.extname = jest.fn(() => {
      return '.txt';
    });

    const SUT = new FileValidator(fsMock, pathMock);
    const filePath = 'FILE';

    expect(SUT.readFile(filePath)).toBe(expectedFileContent);
    expect(fsMock.readFileSync).toBeCalledTimes(1);
    expect(fsMock.readFileSync).toBeCalledWith(filePath, {
      encoding: 'utf8',
      flag: 'r',
    });
  });
});
