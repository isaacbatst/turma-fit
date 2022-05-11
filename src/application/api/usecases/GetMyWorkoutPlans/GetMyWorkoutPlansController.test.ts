import { GetMyWorkoutBodyValidatorMock } from "./GetMyWorkoutBodyValidatorMock";
import { GetMyWorkoutPlansController } from "./GetMyWorkoutPlansController";
import { GetMyWorkoutPlansServiceMock } from "./GetMyWorkoutPlansServiceMock";

const makeSut = () => {
  const service = new GetMyWorkoutPlansServiceMock();
  const bodyValidator = new GetMyWorkoutBodyValidatorMock();
  const controller = new GetMyWorkoutPlansController(
    service,
    bodyValidator,
  );

  return {
    controller,
    bodyValidator
  }
}

describe('GetMyWorkoutPlansController', () => {
  describe('Given an invalid body', () => {
    it('should return status code 400', async () => {
      const { bodyValidator, controller } = makeSut();
      bodyValidator.error = 'INVALID_USER_ID';

      const response = await controller.handle({ body: {} });

      expect(response.statusCode).toBe(400);
    })
  })
  describe('Given a valid body', () => {
    it('should return status code 200', async () => {
      const { controller } = makeSut();

      const response = await controller.handle({ body: { userId: 1 } });

      expect(response.statusCode).toBe(200);
    })
    it('should return workout plans', async () => {
      const { controller } = makeSut();

      const response = await controller.handle({ body: { userId: 1 } });

      expect(response.body).toEqual({ workoutPlans: GetMyWorkoutPlansServiceMock.WORKOUT_PLANS });
    })
  })
  
})