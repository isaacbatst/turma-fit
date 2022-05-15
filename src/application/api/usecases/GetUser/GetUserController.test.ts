// controller recebe requisição
// controller encaminha token no cookie para o usecase
// controler retorna resposta

import { CookiesNames } from "@application/api/common/CookiesNames";
import { BodyValidator, HttpRequest } from "@application/api/interfaces";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { IGetUserUseCase, GetUserUseCaseDTO, GetUserUseCasePort } from "@domain/usecases/GetUser/GetUserUseCase";
import { GetUserController, GetUserValidRequest } from "./GetUserController"

class GetUserUserCaseMock implements  IGetUserUseCase {
  user = {
    id: 'any_id',
    name: 'any_name',
  }

  execute: (port: GetUserUseCasePort) => Promise<GetUserUseCaseDTO> = jest.fn(async () => {
    return {
      user: this.user
    } 
  });
}

class GetUserRequestValidatorMock implements BodyValidator<GetUserValidRequest> {
  validate: (request: { cookies: { [key:string]: any } }) => GetUserValidRequest = jest.fn(() => {
    return {
      cookies: {
        [CookiesNames.AUTHORIZATION]: 'any_token'
      }
    }
  });
}

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