import RoverMovementService from '../RoverMovementService';

describe('RoverMovementService ApplicationService', () => {
  it('should return and move all rovers provided by RoverInputDataValidator', () => {
    const RoverInputDataValidatorMock = jest.fn();
    const roverInputDataValidatorMock = new RoverInputDataValidatorMock();
    roverInputDataValidatorMock.roversInputData = [
      {
        positionXAxis: 1,
        positionYAxis: 2,
        direction: 'N',
        movementInstructions: 'LMLMLMLMM',
      },
      {
        positionXAxis: 3,
        positionYAxis: 3,
        direction: 'E',
        movementInstructions: 'MMRMMRMRRM',
      },
    ];

    const expectedMovedRovers = [
      {
        _positionXAxis: 1,
        _positionYAxis: 3,
        _direction: 'N',
      },
      {
        _positionXAxis: 5,
        _positionYAxis: 1,
        _direction: 'E',
      },
    ];

    const SUT = new RoverMovementService(roverInputDataValidatorMock);
    expect(SUT.getAndMoveAllRovers()).toEqual(expectedMovedRovers);
  });
});
