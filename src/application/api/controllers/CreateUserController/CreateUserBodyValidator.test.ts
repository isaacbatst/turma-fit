import { BodyValidator } from "@application/api/interfaces";
import { CreateUserUseCasePort } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";

export class ValidationError extends Error {
  constructor(
    public message: string
  ){
    super(message);
  }

  getMessage(){
    return this.message;
  }
}

class CreateUserBodyValidator implements BodyValidator<CreateUserUseCasePort> {
  validate(body: Record<string, any>): CreateUserUseCasePort {
    const { password } = body

    if(!password || typeof password !== 'string' || password.length < 8) {
      throw new ValidationError('INVALID_PASSWORD')
    }

    return {
      password,
    }
  }
}

describe('CreateUserBodyValidator', () => {
  describe('Given it receives no password', () => {
    it('should throw INVALID_PASSWORD error', () => {
      const createUserBodyValidator = new CreateUserBodyValidator();
      
      expect(() => {
        createUserBodyValidator.validate({});
      }).toThrowError('INVALID_PASSWORD')
    })
  })

  describe('Given it receives a password that is not a string', () => {
    it('should throw INVALID_PASSWORD error', () => {
      const createUserBodyValidator = new CreateUserBodyValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: false
        });
      }).toThrowError('INVALID_PASSWORD')
    })
  })

  describe('Given it receives a password with length < 8', () => {
    it('should throw INVALID_PASSWORD error', () => {
      const createUserBodyValidator = new CreateUserBodyValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'small',
        });
      }).toThrowError('INVALID_PASSWORD')
    })
  })
})