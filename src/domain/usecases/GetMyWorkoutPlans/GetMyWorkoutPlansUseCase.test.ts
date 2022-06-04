import { GetMyWorkoutPlansDataMock } from "./GetMyWorkoutPlansDataMock";
import { GetMyWorkoutPlanSessionRepositoryMock, GetMyWorkoutPlansRepositoryMock } from "./GetMyWorkoutPlansRepositoryMock";
import { GetMyWorkoutPlansUseCase } from "./GetMyWorkoutPlansUseCase";

const makeSut = () => {
  const workoutPlanRepository = new GetMyWorkoutPlansRepositoryMock();
  const sessionRepository = new GetMyWorkoutPlanSessionRepositoryMock()
  const getMyWorkoutPlansUseCase = new GetMyWorkoutPlansUseCase(
    workoutPlanRepository,
    sessionRepository
  );

  return {
    getMyWorkoutPlansUseCase,
    workoutPlanRepository,
    sessionRepository
  }
}

describe('GetMyWorkoutPlansUseCase', () => {
  it('should have a execute function', () => {
    const { getMyWorkoutPlansUseCase } = makeSut();

    expect(getMyWorkoutPlansUseCase.execute).toBeDefined();
  })
  
  it('should call workout plan repository', async () => {
    const { getMyWorkoutPlansUseCase, workoutPlanRepository } = makeSut();

    await getMyWorkoutPlansUseCase.execute(GetMyWorkoutPlansDataMock.DEFAULT_PORT);

    expect(workoutPlanRepository.getByUserId).toBeCalled();
  })

  it('should call session repository with token and user id', async () => {
    const { getMyWorkoutPlansUseCase, sessionRepository } = makeSut();

    await getMyWorkoutPlansUseCase.execute(GetMyWorkoutPlansDataMock.DEFAULT_PORT);

    expect(sessionRepository.validate).toBeCalledWith(
      GetMyWorkoutPlansDataMock.DEFAULT_PORT.userId,
      GetMyWorkoutPlansDataMock.DEFAULT_PORT.sessionToken
    )
  })

  it('should return an error if session is not valid', async () => {
    const { getMyWorkoutPlansUseCase, sessionRepository } = makeSut();
    sessionRepository.isValid = false;

    expect(async () => {
      await getMyWorkoutPlansUseCase.execute(GetMyWorkoutPlansDataMock.DEFAULT_PORT)
    }).rejects.toThrowError('UNAUTHORIZED_SESSION');
  })

  it('should call workout plan repository with user id', async () => {
    const { getMyWorkoutPlansUseCase, workoutPlanRepository } = makeSut();

    await getMyWorkoutPlansUseCase.execute(GetMyWorkoutPlansDataMock.DEFAULT_PORT);

    expect(workoutPlanRepository.getByUserId).toBeCalledWith(GetMyWorkoutPlansDataMock.DEFAULT_PORT.userId);
  })

  it('should return workout plans', async () => {
    const { getMyWorkoutPlansUseCase } = makeSut();
    
    const dto = await getMyWorkoutPlansUseCase.execute(GetMyWorkoutPlansDataMock.DEFAULT_PORT);

    expect(dto.workoutPlans).toEqual([]);
  })

  
})