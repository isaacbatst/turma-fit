import { GetMyWorkoutPlansDataMock } from "./GetMyWorkoutPlansDataMock";
import { GetMyWorkoutPlansRepositoryMock } from "./GetMyWorkoutPlansRepositoryMock";
import { GetMyWorkoutPlansUseCase } from "./GetMyWorkoutPlansUseCase";

const makeSut = () => {
  const workoutPlanRepository = new GetMyWorkoutPlansRepositoryMock()
  const getMyWorkoutPlansUseCase = new GetMyWorkoutPlansUseCase(workoutPlanRepository);

  return {
    getMyWorkoutPlansUseCase,
    workoutPlanRepository
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