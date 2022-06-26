import { ValidationError } from "@application/api/errors/ValidationError";
import { HttpRequest } from "@application/api/interfaces";
import { AuthenticateUserUseCase } from "@domain/usecases/AuthenticateUserUseCase/AuthenticateUserUseCase";
import { AuthenticateUserController, AuthenticateUserResponse } from "./AuthenticateUserController";
import { AuthenticateUserValidRequest, IAuthenticateUserRequestValidator } from "./AuthenticateUserRequestValidator";

class AuthenticateUserServiceMock implements AuthenticateUserUseCase {
  public shouldThrow = false;
  public accessToken = 'any_access_token';

  async execute() {
    if(this.shouldThrow) {
      throw new Error('ANY_ERROR')
    }

    return {
      accessToken: this.accessToken
    }
  }
}

class AuthenticateUserRequestValidatorMock implements IAuthenticateUserRequestValidator {
  public shouldThrow = false;

  validate(request: HttpRequest) {
    if(this.shouldThrow) {
      throw new ValidationError('ANY_ERROR')
    }

    return request.body as AuthenticateUserValidRequest
  }
}

const makeSut = () => {
  const service = new AuthenticateUserServiceMock();
  const validator = new AuthenticateUserRequestValidatorMock();

  const controller = new AuthenticateUserController(
    service,
    validator,
  );

  return {
    controller,
    validator,
    service
  }
}

const createRequest = (body: Record<string, any>) => {
  return {
    body,
    cookies: {},
    headers: {},
    query: {}
  }
}

describe('AuthenticateUseController', () => {
  describe('Given a ValidationError is thrown', () => {
    it('should return 400 status code', async () => {
      const { controller, validator } = makeSut();

      const request = createRequest({});
      validator.shouldThrow = true;

      const response = await controller.handle(request);
      
      expect(response.statusCode).toBe(400);
    })
  })

  describe('Given a generic Error is thrown', () => {
    it('should return 500 status code', async () => {
      const { controller, service } = makeSut();

      const request = createRequest({});
      service.shouldThrow = true;

      const response = await controller.handle(request);
      
      expect(response.statusCode).toBe(500);
    })
  })

  describe('Given an error is not thrown', () => {
    it('should return 200 status code', async () => {
      const { controller } = makeSut();
      const request = createRequest({});

      const response = await controller.handle(request);
      
      expect(response.statusCode).toBe(200);
    })

    it('should return body with servicew accessToken', async () => {
      const { controller, service } = makeSut();
      const request = createRequest({});

      const response = await controller.handle(request);
      
      expect((response.body as AuthenticateUserResponse).accessToken).toBe(service.accessToken);
    })
  })
})