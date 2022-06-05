import { AuthorizationError } from "@domain/errors/AuthorizationError";
import { CreateWorkoutPlanUseCase } from "@domain/usecases/CreateWorkoutPlan/CreateWorkoutPlanUseCase";
import { CreateWorkoutPlanUseCaseDTO, CreateWorkoutPlanUseCasePort } from "@domain/usecases/CreateWorkoutPlan/interfaces";

export class CreateWorkoutPlanServiceMock implements CreateWorkoutPlanUseCase {
  public createdId = 'any_id'
  public shouldThrowAuthorization = false
  public shouldThrowGeneric = false

  execute = jest.fn(async (port: CreateWorkoutPlanUseCasePort): Promise<CreateWorkoutPlanUseCaseDTO> => {
    if(this.shouldThrowAuthorization){
      throw new AuthorizationError('any_error');
    }

    if(this.shouldThrowGeneric) {
      throw new Error();
    }

    return {
      id: this.createdId
    }
  }) 
}