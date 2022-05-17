import { CookiesNames } from "@application/api/common/CookiesNames"
import { ValidationError } from "@application/api/errors/ValidationError"
import { BodyValidator } from "@application/api/interfaces"
import { GetMyWorkoutPlansValidRequest } from "./GetMyWorkoutPlansRequest"

export class GetMyWorkoutBodyValidatorMock implements BodyValidator<GetMyWorkoutPlansValidRequest> {
  public error: string | null = null
  
  validate = jest.fn((req: Record<string, any>): GetMyWorkoutPlansValidRequest => {
    if(this.error){
      throw new ValidationError(this.error)
    }

    return {
      query: {
        userId: 'valid_user_id',
      },
      cookies: {
        [CookiesNames.AUTHORIZATION]: 'valid_session_token'
      }
    }
  })
}
