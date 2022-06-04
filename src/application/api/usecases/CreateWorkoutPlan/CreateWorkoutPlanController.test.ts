import { ValidationError } from "@application/api/errors/ValidationError";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { AuthorizationError } from "@domain/errors/AuthorizationError";
import { CreateWorkoutPlanUseCase } from "@domain/usecases/CreateWorkoutPlan/CreateWorkoutPlanUseCase";
import { CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCaseDTO } from "@domain/usecases/CreateWorkoutPlan/interfaces";
import { CreateWorkoutPlanController, CreateWorkoutPlanResponse } from "./CreateWorkoutPlanController";
import { CreateWorkoutPlanRequestMock } from "./CreateWorkoutPlanRequestMock";
import { CreateWorkoutPlanValidRequest, ICreateWorkoutPlanRequestValidator } from "./CreateWorkoutPlanRequestValidator";


class RequestValidatorMock implements ICreateWorkoutPlanRequestValidator {
  public errorMessage = 'any_error'
  public shouldThrowValidation = false;
  public shouldThrowAuthentication = false;

  validate = jest.fn((request: Record<string, any>): CreateWorkoutPlanValidRequest => {
    if(this.shouldThrowValidation){
      throw new ValidationError(this.errorMessage);
    }

    if(this.shouldThrowAuthentication) {
      throw new AuthenticationError('any_error');
    }

    return request as CreateWorkoutPlanValidRequest;
  })
}

class CreateWorkoutPlanServiceMock implements CreateWorkoutPlanUseCase {
  public createdId = 'any_id'
  public shouldThrowAuthorization = false
  public shouldThrowGeneric = false

  execute = jest.fn(async (port: CreateWorkoutPlanUseCasePort): Promise<CreateWorkoutPlanUseCaseDTO> => {
    if(this.shouldThrowAuthorization){
      throw new AuthorizationError('any_error');
    }

    if(this.shouldThrowGeneric) {
      throw new Error();
    }

    return {
      id: this.createdId
    }
  }) 
}

const makeSut = () => {
  const requestMock = new CreateWorkoutPlanRequestMock();
  const validator = new RequestValidatorMock();
  const service = new CreateWorkoutPlanServiceMock()
  const controller = new CreateWorkoutPlanController(validator, service);
  
  return { 
    requestMock,
    validator,
    service,
    controller
  }
}

describe('CreateWorkoutPlanController', () => {
  it('should call request validator', async () => {
    const { controller, validator, requestMock } = makeSut();

    await controller.handle(requestMock.REQUEST);

    expect(validator.validate).toHaveBeenCalledWith(requestMock.REQUEST);
  })

  describe('Given a valid request', () => {
    it('should call service execute', async () => {
      const { controller, service, requestMock } = makeSut();

      await controller.handle(requestMock.REQUEST);

      expect(service.execute).toHaveBeenCalled();
    })

    it('should return status code 201', async () => {
      const { controller, requestMock } = makeSut();

      const response = await controller.handle(requestMock.REQUEST);

      expect(response.statusCode).toBe(201)
    })

    it('should return created workout plan id', async () => {
      const { controller, requestMock, service } = makeSut();

      const response = await controller.handle(requestMock.REQUEST);

      expect((response.body as CreateWorkoutPlanResponse).id).toBe(service.createdId)
    })
  })

  describe('Given a validation error is thrown', () => {
    it('should return status code 400', async () => {
      const { controller, requestMock, validator } = makeSut();
      validator.shouldThrowValidation = true;

      const response = await controller.handle(requestMock.REQUEST);

      expect(response.statusCode).toBe(400)
    })

    it('should return validator error message', async () => {
      const { controller, requestMock, validator } = makeSut();
      validator.shouldThrowValidation = true;

      const response = await controller.handle(requestMock.REQUEST);

      expect(response.body).toStrictEqual({ error: validator.errorMessage })
    })
  })

  describe('Given a authentication error is thrown', () => {
    it('should return status code 401', async () => {
      const { controller, requestMock, validator } = makeSut();
      validator.shouldThrowAuthentication = true;

      const response = await controller.handle(requestMock.REQUEST);

      expect(response.statusCode).toBe(401)
    })
  })

  describe('Given an authorization error is thrown', () => {
    it('should return status code 403', async () => {
      const { controller, requestMock, service } = makeSut();
      service.shouldThrowAuthorization = true;

      const response = await controller.handle(requestMock.REQUEST);

      expect(response.statusCode).toBe(403)
    })
  })

  describe('Given a generic error is thrown', () => {
    it('should return status code 500', async () => {
      const { controller, requestMock, service } = makeSut();
      service.shouldThrowGeneric = true;

      const response = await controller.handle(requestMock.REQUEST);

      expect(response.statusCode).toBe(500)
    })
  })
})