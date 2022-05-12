import { ValidationError } from '@application/api/errors/ValidationError';
import { BodyValidator, Controller, HttpRequest, HttpResponse } from '@application/api/interfaces';
import { IGetMyWorkoutPlansUseCase, WorkoutPlanDTO } from '@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase';

export interface GetMyWorkoutPlansResponse {
  workoutPlans: WorkoutPlanDTO[]
} 

interface GetMyWorkoutPlansValidBody {
  userId: string,
  sessionToken: string
}


export class GetMyWorkoutPlansController implements Controller<GetMyWorkoutPlansResponse> {
  constructor(
    private getMyWorkoutPlansUseCase: IGetMyWorkoutPlansUseCase,
    private bodyValidator: BodyValidator<GetMyWorkoutPlansValidBody>
  ){}

  async handle(request: HttpRequest): Promise<HttpResponse<GetMyWorkoutPlansResponse>> {
    try {
      const validatedBody = this.bodyValidator.validate(request.query);

      const { workoutPlans } = await this.getMyWorkoutPlansUseCase.execute(validatedBody);

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