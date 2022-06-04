import { CreateWorkoutPlanController, CreateWorkoutPlanResponse } from "./CreateWorkoutPlanController";
import { CreateWorkoutPlanRequestMock } from "./CreateWorkoutPlanRequestMock";
import { CreateWorkoutPlanRequestValidatorMock } from "./CreateWorkoutPlanRequestValidatorMock";
import { CreateWorkoutPlanServiceMock } from "./CreateWorkoutPlanServiceMock";

const makeSut = () => {
  const requestMock = new CreateWorkoutPlanRequestMock();
  const validator = new CreateWorkoutPlanRequestValidatorMock();
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