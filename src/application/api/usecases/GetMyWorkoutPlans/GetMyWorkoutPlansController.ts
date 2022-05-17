import { CookiesNames } from '@application/api/common/CookiesNames';
import { ValidationError } from '@application/api/errors/ValidationError';
import { BodyValidator, Controller, HttpResponse } from '@application/api/interfaces';
import { IGetMyWorkoutPlansUseCase, WorkoutPlanDTO } from '@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase';
import { GetMyWorkoutPlansRequest, GetMyWorkoutPlansValidRequest } from './GetMyWorkoutPlansRequest';

export interface GetMyWorkoutPlansResponse {
  workoutPlans: WorkoutPlanDTO[]
} 

export class GetMyWorkoutPlansController implements Controller<GetMyWorkoutPlansResponse> {
  constructor(
    private getMyWorkoutPlansUseCase: IGetMyWorkoutPlansUseCase,
    private requestValidator: BodyValidator<GetMyWorkoutPlansValidRequest>
  ){}

  async handle(request: GetMyWorkoutPlansRequest): Promise<HttpResponse<GetMyWorkoutPlansResponse>> {
    try {
      const validatedBody = this.requestValidator.validate(request);

      const { workoutPlans } = await this.getMyWorkoutPlansUseCase.execute({
        sessionToken: validatedBody.cookies[CookiesNames.AUTHORIZATION],
        userId: validatedBody.query.userId
      });

      return {
        statusCode: 200,
        body: {
          workoutPlans
        }
      }
    } catch(error) {
      if(error instanceof ValidationError) {
        return {
          statusCode: 400,
          body: {
            error: error.message
          }
        }
      }

      console.error(error);

      return {
        statusCode: 500
      }
    }
  }
}