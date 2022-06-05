import { RequestMock } from "@application/api/mocks";
import { GetMyWorkoutRequestValidatorMock } from "./GetMyWorkoutRequestValidatorMock";
import { GetMyWorkoutPlansController } from "./GetMyWorkoutPlansController";
import { GetMyWorkoutPlansServiceMock } from "./GetMyWorkoutPlansServiceMock";

const makeSut = () => {
  const service = new GetMyWorkoutPlansServiceMock();
  const bodyValidator = new GetMyWorkoutRequestValidatorMock();
  const controller = new GetMyWorkoutPlansController(
    service,
    bodyValidator,
  );

  return {
    controller,
    bodyValidator
  }
}

const VALID_REQUEST = { 
  query: { 
    id: 'any_id' 
  },
  headers: {
    'authorization': 'any_token'
  }
}

describe('GetMyWorkoutPlansController', () => {
  describe('Given an invalid body', () => {
    it('should return status code 400', async () => {
      const { bodyValidator, controller } = makeSut();
      bodyValidator.error = 'INVALID_USER_ID';

      const response = await controller.handle(RequestMock.make());

      expect(response.statusCode).toBe(400);
    })
  })
  describe('Given a valid body', () => {
    it('should return status code 200', async () => {
      const { controller } = makeSut();

      const response = await controller.handle(RequestMock.make(VALID_REQUEST));

      expect(response.statusCode).toBe(200);
    })
    it('should return workout plans', async () => {
      const { controller } = makeSut();

      const response = await controller.handle(RequestMock.make(VALID_REQUEST));

      expect(response.body).toEqual({ workoutPlans: GetMyWorkoutPlansServiceMock.WORKOUT_PLANS });
    })
  })
  
})