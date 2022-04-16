import { BodyValidatorMock, CreateUserServiceMock } from '../__mocks__';
import { CreateUserController } from './CreateUserController';

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