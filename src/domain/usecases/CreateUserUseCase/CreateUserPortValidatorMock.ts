import { ValidationError } from "@application/api/usecases/CreateUser/CreateUserBodyValidator";
import { PortValidator } from "@domain/common/PortValidator";
import { CreateUserUseCasePort, CreateUserUseCasePortValidated } from "./CreateUserPortValidator";

export class CreateUserPortValidatorMock implements PortValidator<CreateUserUseCasePort, CreateUserUseCasePortValidated> {
  isValid = true;
 
  validate(port: CreateUserUseCasePort): CreateUserUseCasePortValidated {
    if(!this.isValid){
      throw new ValidationError('ANY_ERROR')
    }
    
    return port as CreateUserUseCasePortValidated;
  }
}