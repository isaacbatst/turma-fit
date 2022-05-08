import WorkoutPlan from "@domain/entities/WorkoutPlan/WorkoutPlan";
import { GetMyWorkoutPlansUseCase } from "./GetMyWorkoutPlansUseCase";

class GetMyWorkoutPlansDataMock {
  static DEFAULT_PORT = {
    userId: 'any_user_id'
  }
}


export interface GetMyWorkoutPlansRepository {
  getByUserId(userId: string): Promise<WorkoutPlan[]>
}

class GetMyWorkoutPlansRepositoryMock implements GetMyWorkoutPlansRepository {
  getByUserId: (userId: string) => Promise<WorkoutPlan[]> = jest.fn(async () => {
    return []
  });
}

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