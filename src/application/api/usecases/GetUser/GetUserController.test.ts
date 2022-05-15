import { CookiesNames } from "@application/api/common/CookiesNames";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { GetUserController } from "./GetUserController";
import { GetUserRequestValidatorMock } from "./GetUserRequestValidatorMock";
import { GetUserUserCaseMock } from "./GetUserUseCaseMock";

const makeSut = () => {
  const getUserUseCase = new GetUserUserCaseMock()
  const getUserRequestValidator = new GetUserRequestValidatorMock();
  const getUserController = new GetUserController(
    getUserUseCase, 
    getUserRequestValidator
  );

  const httpRequest = {
    cookies: {
      [CookiesNames.AUTHORIZATION]: 'any_token'
    }
  }

  return {
    getUserController,
    getUserUseCase,
    getUserRequestValidator,
    httpRequest
  }
}

describe('GetUserController', () => {
  it('should be defined', () => {
    expect(GetUserController).toBeDefined();
  })

  it('should have method handle', () => {
    const { getUserController } = makeSut();
    expect(getUserController.handle).toBeDefined();
  })

  it('should call request validator', async () => {
    const { getUserController, getUserRequestValidator, httpRequest } = makeSut();

    await getUserController.handle(httpRequest);

    expect(getUserRequestValidator.validate).toHaveBeenCalledWith(httpRequest);
  })

  describe('Given a valid request', () => {
    it('should call GetUserUseCase with correct token', async () => {
      const { getUserController, getUserUseCase, httpRequest } = makeSut();
      const token = 'any_token';
  
      await getUserController.handle(httpRequest);
  
      expect(getUserUseCase.execute).toHaveBeenCalledWith({ token });
    })

    it('should return 200 status code', async () => {
      const { getUserController, httpRequest } = makeSut();

      const httpResponse = await getUserController.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(200);
    })

    it('should return body with user', async () => {
      const { getUserController, httpRequest, getUserUseCase } = makeSut();

      const httpResponse = await getUserController.handle(httpRequest);

      expect(httpResponse.body).toEqual({
        user: getUserUseCase.user
      });
    })
  })

  describe('Given an invalid request', () => {
    it('should return 401 status code', async () => {
      const { getUserController, getUserRequestValidator } = makeSut();
      getUserRequestValidator.validate = jest.fn(() => {
        throw new AuthenticationError('TOKEN_NOT_FOUND');
      });

      const httpResponse = await getUserController.handle({
        cookies: {}
      });

      expect(httpResponse.statusCode).toBe(401);
    })
  })

  describe('Given an unknow error', () => {
    it('should return 500 status code', async () => {
      const { getUserController, getUserUseCase } = makeSut();
      getUserUseCase.execute = jest.fn(() => {
        throw new Error();
      });

      const httpResponse = await getUserController.handle({
        cookies: {}
      });

      expect(httpResponse.statusCode).toBe(500);
    })
  })
})