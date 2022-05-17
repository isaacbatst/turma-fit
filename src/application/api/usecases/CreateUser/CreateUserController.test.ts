import { CookiesNames } from "@application/api/common/CookiesNames";
import { BodyValidatorMock } from "@application/api/mocks";
import { CreateUserController } from "./CreateUserController";
import { CreateUserServiceMock } from "./CreateUserServiceMock";

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

    it('should return body with id returned by service', async () => {
      const { createUserController } = makeSut();

      const response = await createUserController.handle({ 
        body: {}
      });

      expect(response.body).toEqual({ 
        id: CreateUserServiceMock.ID,
      })
    })

    it('should return defined cookies object', async () => {
      const { createUserController } = makeSut();

      const response = await createUserController.handle({
        body: {}
      })

      expect(response.cookies).toBeDefined(); 
    });

    it('should return authorization cookie with token returned by service', async () => {
      const { createUserController } = makeSut();

      const response = await createUserController.handle({
        body: {}
      })

      expect(response.cookies).toEqual({ [CookiesNames.AUTHORIZATION]: CreateUserServiceMock.TOKEN }) 
    });
  })
  
})