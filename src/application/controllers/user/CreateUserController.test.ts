import { CreateUserUseCasePort, CreateUserUseCase, CreateUserUseCaseDTO } from '@domain/usecases/CreateUserUseCase/CreateUserUseCase';
import { BodyValidator, BodyValidatorReturn, CreateUserController } from './CreateUserController';

class BodyValidatorMock implements BodyValidator<CreateUserUseCasePort> {
  public error: string | null = null
  
  validate = jest.fn((req: Record<string, any>): BodyValidatorReturn<CreateUserUseCasePort> => {
    return {
      error: this.error,
      data: {
        age: 23,
        email: 'valid_email',
        image: 'valid_image',
        name: 'valid_name',
        password: 'valid_password',
        profile: 'PERSONAL'
      }
    }
  })
}

class CreateUserServiceMock implements CreateUserUseCase {
  async execute(port: CreateUserUseCasePort): Promise<CreateUserUseCaseDTO> {
    return {
      profile: {
        id: 'any_id',
        type: port.profile
      },
      user: {
        id: 'any_id',
        email: port.email,
        name: port.name
      }
    }
  }
}

function makeSut() {
  const validator = new BodyValidatorMock();
  const createUserUseCase = new CreateUserServiceMock();
  const createUserController = new CreateUserController(validator, createUserUseCase);

  return {
    validator,
    createUserUseCase,
    createUserController
  }
}

describe('CreateUserController', () => {
  it('should call validator with req body', async () => {
    const { createUserController, validator } = makeSut();
    const body = {};
    await createUserController.handle({ body });

    expect(validator.validate).toHaveBeenCalledWith(body)
  })

  describe('Given an invalid body', () => {
    it('should return status code 400', async () => {
      const { createUserController, validator } = makeSut();
      validator.error = 'INVALID_PASSWORD'

      const response = await createUserController.handle({ 
        body: {}
      });

      expect(response.statusCode).toBe(400);
    })
  })
  describe('Given a valid body', () => {
    it('should return status code 201', async () => {
      const { createUserController } = makeSut();

      const response = await createUserController.handle({ 
        body: {}
      });

      expect(response.statusCode).toBe(201);
    })

    it('should return created user id', async () => {
      const CREATED_USER_ID = 'any_id';
      const { createUserController } = makeSut();

      const response = await createUserController.handle({ 
        body: {}
      });

      expect(response.body).toEqual({ id: CREATED_USER_ID });
    })
  })
  
})