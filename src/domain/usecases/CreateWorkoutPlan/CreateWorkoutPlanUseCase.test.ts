import { AuthorizationError } from "@domain/errors/AuthorizationError";
import { UuidGeneratorMock } from "../_mocks";
import { CreateWorkoutPlanDataMock } from "./CreateWorkoutPlanDataMock";
import { CreateWorkoutPlanPortValidatorMock } from "./CreateWorkoutPlanPortValidatorMock";
import { CreateWorkoutPlanRepositoryMock, CreateWorkoutPlanSessionRepositoryMock } from "./CreateWorkoutPlanRepositoryMock";
import { CreateWorkoutPlanService } from "./CreateWorkoutPlanUseCase";

const makeSut = () => {
  const workoutPlanRepository = new CreateWorkoutPlanRepositoryMock();
  const dataMock = new CreateWorkoutPlanDataMock();
  const uuidGenerator = new UuidGeneratorMock(dataMock.WORKOUT_PLAN.getId());
  const portValidator = new CreateWorkoutPlanPortValidatorMock();
  const sessionRepository = new CreateWorkoutPlanSessionRepositoryMock();
  const createWorkoutPlanUseCase = new CreateWorkoutPlanService(
    workoutPlanRepository, 
    uuidGenerator, 
    portValidator,
    sessionRepository
  );

  return {
    createWorkoutPlanUseCase,
    uuidGenerator,
    portValidator,
    workoutPlanRepository,
    dataMock,
    sessionRepository
  }
}

describe('CreateWorkoutPlanUseCase', () => {
  it('should call port validator with port', async () => {
    const { createWorkoutPlanUseCase, portValidator, dataMock } = makeSut();

    await createWorkoutPlanUseCase.execute(dataMock.PORT);

    expect(portValidator.validate).toBeCalledWith(dataMock.PORT)
  })

  it('should call session validation with port token and user id', async () => {
    const { sessionRepository, createWorkoutPlanUseCase, dataMock } = makeSut();

    await createWorkoutPlanUseCase.execute(dataMock.PORT);

    expect(sessionRepository.validate).toHaveBeenCalledWith(dataMock.PORT.token, dataMock.PORT.userId);
  })

  describe('Given unauthorized session for requested user id', () => {
    it('should throw authorization error', async () => {
      const { sessionRepository, createWorkoutPlanUseCase, dataMock } = makeSut();
      sessionRepository.isValid = false;

      expect(async () => {
        await createWorkoutPlanUseCase.execute(dataMock.PORT);
      }).rejects.toThrowError(AuthorizationError)

    })
  })

  describe('Given authorized session for requested user id', () => {
    it('should call uuid generator', async () => {
      const { createWorkoutPlanUseCase, uuidGenerator, dataMock } = makeSut();

      await createWorkoutPlanUseCase.execute(dataMock.PORT)

      expect(uuidGenerator.generate).toBeCalled();
    })
    
    it('should call workout plan repository create', async () => {
      const { createWorkoutPlanUseCase, workoutPlanRepository, dataMock } = makeSut();

      await createWorkoutPlanUseCase.execute(dataMock.PORT);

      expect(workoutPlanRepository.create).toHaveBeenCalled()
    })

    it('should return created workout plan id', async () => {
      const { createWorkoutPlanUseCase, dataMock } = makeSut();

      const { id } = await createWorkoutPlanUseCase.execute(dataMock.PORT);

      expect(id).toBe(dataMock.WORKOUT_PLAN.getId())
    })
  })
})