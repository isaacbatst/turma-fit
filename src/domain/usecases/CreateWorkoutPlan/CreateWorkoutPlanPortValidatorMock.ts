import { ValidationError } from "@application/api/errors/ValidationError";
import { PortValidator } from "@domain/common/PortValidator";
import { CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCasePortValidated } from "./interfaces";

export class CreateWorkoutPlanPortValidatorMock implements PortValidator<CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCasePortValidated> {
  isValid = true;
 
  validate = jest.fn((port: CreateWorkoutPlanUseCasePort) => {
    if(!this.isValid){
      throw new ValidationError('ANY_ERROR')
    }
    
    return port as CreateWorkoutPlanUseCasePortValidated;
  })
}