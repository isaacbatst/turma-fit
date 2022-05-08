import { ValidationError } from "@application/api/controllers/CreateUserController/CreateUserBodyValidator";
import { Encrypter } from "@domain/common/Encrypter";
import { PortValidator } from "@domain/common/PortValidator";
import { TokenGenerator } from "@domain/common/TokenGenerator";
import { UuidGenerator } from "@domain/common/UuidGenerator";
import { CreateUserUseCasePort, CreateUserUseCasePortValidated } from "../CreateUserUseCase/CreateUserPortValidator";

export class EncrypterMock implements Encrypter {
  static readonly HASHED_VALUE = 'hashed_value';
  public compareReturn = true;

  compare: (value: string, hashedValue: string) => Promise<boolean> = 
    jest.fn(async (value, hashedValue) => {
      return this.compareReturn;
    })

  hash: (value: string) => Promise<string> = 
    async () => EncrypterMock.HASHED_VALUE;
}

export class TokenGeneratorMock implements TokenGenerator {
  static readonly GENERATED_TOKEN = 'any_token'
  generate: () => string = jest.fn(() => TokenGeneratorMock.GENERATED_TOKEN);
}

export class UuidGeneratorMock implements UuidGenerator {
  static readonly GENERATED_ID = 'any_uuid'
  generate: () => string = () => UuidGeneratorMock.GENERATED_ID;
}

export class CreateUserPortValidatorMock implements PortValidator<CreateUserUseCasePort, CreateUserUseCasePortValidated> {
  isValid = true;
 
  validate(port: CreateUserUseCasePort): CreateUserUseCasePortValidated {
    if(!this.isValid){
      throw new ValidationError('ANY_ERROR')
    }
    
    return port as CreateUserUseCasePortValidated;
  }
}