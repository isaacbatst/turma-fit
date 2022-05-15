import { ValidationError } from "@application/api/errors/ValidationError"
import { BodyValidator } from "@application/api/interfaces"
import { GetMyWorkoutPlansUseCasePort } from "@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase"

export class GetMyWorkoutBodyValidatorMock implements BodyValidator<GetMyWorkoutPlansUseCasePort> {
  public error: string | null = null
  
  validate = jest.fn((req: Record<string, any>): GetMyWorkoutPlansUseCasePort => {
    if(this.error){
      throw new ValidationError(this.error)
    }

    return {
      userId: 'valid_user_id',
      sessionToken: 'valid_session_token',
    }
  })
}
