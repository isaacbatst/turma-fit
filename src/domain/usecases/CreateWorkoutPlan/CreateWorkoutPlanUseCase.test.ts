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

    await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.VALID_PORT);

    expect(portValidator.validate).toBeCalledWith(CreateWorkoutPlanDataMock.VALID_PORT)
  })

  describe('Given validated data', () => {
    it('should call uuid generator', async () => {
      const { createWorkoutPlanUseCase, uuidGenerator } = makeSut();

      await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.VALID_PORT)

      expect(uuidGenerator.generate).toBeCalled();
    })
    
    it('should call workout plan repository create', async () => {
      const { createWorkoutPlanUseCase, workoutPlanRepository} = makeSut();

      await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.VALID_PORT);

      expect(workoutPlanRepository.create).toHaveBeenCalled()
    })

    it('should return created workout plan id', async () => {
      const { createWorkoutPlanUseCase } = makeSut();

      const { id } = await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.VALID_PORT);

      expect(id).toBe(CreateWorkoutPlanDataMock.WORKOUT_PLAN.getId())
    })
  })
})