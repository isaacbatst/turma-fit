import { UuidGeneratorMock } from "../_mocks";
import { CreateWorkoutPlanDataMock } from "./CreateWorkoutPlanDataMock";
import { CreateWorkoutPlanPortValidatorMock } from "./CreateWorkoutPlanPortValidatorMock";
import { CreateWorkoutPlanRepositoryMock } from "./CreateWorkoutPlanRepositoryMock";
import { CreateWorkoutPlanService } from "./CreateWorkoutPlanUseCase";

const makeSut = () => {
  const workoutPlanRepository = new CreateWorkoutPlanRepositoryMock();
  const uuidGenerator = new UuidGeneratorMock(CreateWorkoutPlanDataMock.WORKOUT_PLAN.getId());
  const portValidator = new CreateWorkoutPlanPortValidatorMock();
  const createWorkoutPlanUseCase = new CreateWorkoutPlanService(workoutPlanRepository, uuidGenerator, portValidator);

  return {
    createWorkoutPlanUseCase,
    uuidGenerator,
    portValidator,
    workoutPlanRepository
  }
}

describe('CreateWorkoutPlanUseCase', () => {
  it('should call port validator with port', async () => {
    const { createWorkoutPlanUseCase, portValidator } = makeSut();

    await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.DEFAULT_PORT);

    expect(portValidator.validate).toBeCalledWith(CreateWorkoutPlanDataMock.DEFAULT_PORT)
  })
  
  describe('Given workout plan type not found', () => {
    it('should throw WORKOUT_PLAN_TYPE_NOT_FOUND error', async () => {
      const { createWorkoutPlanUseCase, workoutPlanRepository } = makeSut();
      workoutPlanRepository.foundWorkoutPlanType = null;

      await expect(async () => {
        await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.DEFAULT_PORT);

      }).rejects.toThrowError('WORKOUT_PLAN_TYPE_NOT_FOUND')
    })
  })

  describe('Given validated data', () => {
    it('should call uuid generator', async () => {
      const { createWorkoutPlanUseCase, uuidGenerator } = makeSut();

      await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.DEFAULT_PORT)

      expect(uuidGenerator.generate).toBeCalled();
    })
    
    it('should call workout plan repository get plan type by id', async () => {
      const { createWorkoutPlanUseCase, workoutPlanRepository } = makeSut();
      await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.DEFAULT_PORT);

      expect(workoutPlanRepository.getWorkoutPlanTypeById).toBeCalledWith(CreateWorkoutPlanDataMock.WORKOUT_PLAN.getPlanType().id)
    })


    it('should call workout plan repository create', async () => {
      const { createWorkoutPlanUseCase, workoutPlanRepository} = makeSut();

      await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.DEFAULT_PORT);

      expect(workoutPlanRepository.create).toBeCalledWith(CreateWorkoutPlanDataMock.WORKOUT_PLAN, CreateWorkoutPlanDataMock.DEFAULT_PORT.userId)
    })

    it('should return created workout plan id', async () => {
      const { createWorkoutPlanUseCase } = makeSut();

      const { id } = await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.DEFAULT_PORT);

      expect(id).toBe(CreateWorkoutPlanDataMock.WORKOUT_PLAN.getId())
    })
  })
})