import { ValidationError } from "@application/api/errors/ValidationError";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { CreateWorkoutPlanValidRequest, ICreateWorkoutPlanRequestValidator } from "./CreateWorkoutPlanRequestValidator";

export class CreateWorkoutPlanRequestValidatorMock implements ICreateWorkoutPlanRequestValidator {
  public errorMessage = 'any_error'
  public shouldThrowValidation = false;
  public shouldThrowAuthentication = false;

  validate = jest.fn((request: Record<string, any>): CreateWorkoutPlanValidRequest => {
    if(this.shouldThrowValidation){
      throw new ValidationError(this.errorMessage);
    }

    if(this.shouldThrowAuthentication) {
      throw new AuthenticationError('any_error');
    }

    return request as CreateWorkoutPlanValidRequest;
  })
}