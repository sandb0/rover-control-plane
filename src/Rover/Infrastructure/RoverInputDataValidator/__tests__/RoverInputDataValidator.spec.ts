import RoverInputDataValidator from '../RoverInputDataValidator';

describe('RoverInputDataValidator', () => {
  it('should throw an Error (with expected message) on empty file data', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const SUT = new RoverInputDataValidator('');
    }).toThrowError(new Error('No data has been sent'));
  });

  it('should throw an Error (with expected message) on invalid plateau size', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const SUT = new RoverInputDataValidator('INVALID PLATEAU SIZE');
    }).toThrowError(new Error(`Invalid plateau size: NaN NaN`));

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const SUT = new RoverInputDataValidator('5 INVALID');
    }).toThrowError(new Error(`Invalid plateau size: 5 NaN`));

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const SUT = new RoverInputDataValidator('INVALID 5');
    }).toThrowError(new Error(`Invalid plateau size: NaN 5`));
  });

  it('should throw an Error (with expected message) on invalid rover position', () => {
    expect(() => {
      let fileData = ``;
      fileData += `5 5\n`;
      fileData += `INVALID 1 N\n`;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const SUT = new RoverInputDataValidator(fileData);
    }).toThrowError(new Error('Invalid rover initial X-axis position: NaN'));

    expect(() => {
      let fileData = ``;
      fileData += `5 5\n`;
      fileData += `1 INVALID N\n`;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const SUT = new RoverInputDataValidator(fileData);
    }).toThrowError(new Error('Invalid rover initial Y-axis position: NaN'));

    expect(() => {
      let fileData = ``;
      fileData += `5 5\n`;
      fileData += `7 1 N\n`;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const SUT = new RoverInputDataValidator(fileData);
    }).toThrowError(new Error('Invalid rover initial X-axis position: 7'));

    expect(() => {
      let fileData = ``;
      fileData += `5 5\n`;
      fileData += `1 7 N\n`;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const SUT = new RoverInputDataValidator(fileData);
    }).toThrowError(new Error('Invalid rover initial Y-axis position: 7'));

    expect(() => {
      let fileData = ``;
      fileData += `5 5\n`;
      fileData += `1 1 INVALID\n`;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const SUT = new RoverInputDataValidator(fileData);
    }).toThrowError(new Error('Invalid rover initial direction: INVALID'));
  });

  it('should throw an Error (with expected message) on invalid rover movement instructions', () => {
    expect(() => {
      let fileData = ``;
      fileData += `5 5\n`;
      fileData += `1 1 N\n`;
      fileData += `_\n`;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const SUT = new RoverInputDataValidator(fileData);
    }).toThrowError(new Error('Invalid rover movement instructions: _'));
  });

  it('should make available the plateau size', () => {
    const plateauXAxisSize = 5;
    const plateauYAxisSize = 5;

    let fileData = ``;
    fileData += `${plateauXAxisSize} ${plateauYAxisSize}\n`;
    fileData += `1 1 N\n`;
    fileData += `LRM\n`;

    const SUT = new RoverInputDataValidator(fileData);
    expect(SUT.plateauXAxisSize).toBe(plateauXAxisSize);
    expect(SUT.plateauYAxisSize).toBe(plateauYAxisSize);
  });

  it('should make available the rover input data', () => {
    const positionXAxis = 5;
    const positionYAxis = 5;
    const direction = 'N';
    const movementInstructions = 'LRM';

    let fileData = ``;
    fileData += `5 5\n`;
    // Rover 1.
    fileData += `${positionXAxis} ${positionYAxis} ${direction}\n`;
    fileData += `${movementInstructions}\n`;
    // Rover 2.
    fileData += `${positionXAxis - 1} ${positionYAxis - 1} ${direction}\n`;
    fileData += `${movementInstructions}\n`;

    const SUT = new RoverInputDataValidator(fileData);

    expect(SUT.roversInputData[0]).toEqual({
      positionXAxis,
      positionYAxis,
      direction,
      movementInstructions,
    });

    // Test the array.
    expect(SUT.roversInputData[1]).toEqual({
      positionXAxis: positionXAxis - 1,
      positionYAxis: positionYAxis - 1,
      direction,
      movementInstructions,
    });
  });
});
