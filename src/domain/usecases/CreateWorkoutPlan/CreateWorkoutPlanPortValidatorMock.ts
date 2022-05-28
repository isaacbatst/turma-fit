import { ValidationError } from "@application/api/errors/ValidationError";
import { CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCasePortValidated, ICreateWorkoutPlanPortValidator } from "./interfaces";

export class CreateWorkoutPlanPortValidatorMock implements ICreateWorkoutPlanPortValidator {
  isValid = true;
 
  validate = jest.fn((port: CreateWorkoutPlanUseCasePort) => {
    if(!this.isValid){
      throw new ValidationError('ANY_ERROR')
    }
    
    return port as CreateWorkoutPlanUseCasePortValidated;
  })
}