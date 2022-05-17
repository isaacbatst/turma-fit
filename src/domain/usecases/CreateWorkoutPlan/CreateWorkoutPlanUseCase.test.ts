import { UuidGeneratorMock } from "../_mocks"
import { CreateWorkoutPlanPortValidatorMock } from "./CreateWorkoutPlanPortValidatorMock";
import { CreateWorkoutPlanRepositoryMock } from "./CreateWorkoutPlanRepositoryMock";
import { CreateWorkoutPlanService } from "./CreateWorkoutPlanUseCase";
import { CreateWorkoutPlanDataMock } from "./CreateWorkoutPlanDataMock";

const makeSut = () => {
  const workoutPlanRepository = new CreateWorkoutPlanRepositoryMock();
  const uuidGenerator = new UuidGeneratorMock();
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

  describe('Given correct data', () => {
    it('should call uuid generator', async () => {
      const { createWorkoutPlanUseCase, uuidGenerator } = makeSut();

      await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.DEFAULT_PORT)

      expect(uuidGenerator.generate).toBeCalled();
    })

    it('should call workout plan repository create', async () => {
      const { createWorkoutPlanUseCase, workoutPlanRepository, uuidGenerator} = makeSut();
      uuidGenerator.GENERATED_ID = CreateWorkoutPlanDataMock.WORKOUT_PLAN.getId();

      await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.DEFAULT_PORT);

      expect(workoutPlanRepository.create).toBeCalledWith(CreateWorkoutPlanDataMock.WORKOUT_PLAN, CreateWorkoutPlanDataMock.DEFAULT_PORT.userId)
    })

    it('should return created workout plan id', async () => {
      const { createWorkoutPlanUseCase, uuidGenerator } = makeSut();
      uuidGenerator.GENERATED_ID = CreateWorkoutPlanDataMock.WORKOUT_PLAN.getId();

      const { id } = await createWorkoutPlanUseCase.execute(CreateWorkoutPlanDataMock.DEFAULT_PORT);

      expect(id).toBe(CreateWorkoutPlanDataMock.WORKOUT_PLAN.getId())
    })
  })
})