import { CookiesNames } from "@application/api/common/CookiesNames";
import { ValidationError } from "@application/api/errors/ValidationError";
import { BodyValidator } from "@application/api/interfaces";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { GetMyWorkoutPlansRequest, GetMyWorkoutPlansValidRequest } from "./GetMyWorkoutPlansRequest";

export class GetMyWorkoutPlansBodyValidator implements BodyValidator<GetMyWorkoutPlansValidRequest> {
  validate(request: GetMyWorkoutPlansRequest): GetMyWorkoutPlansValidRequest {
    const { query: { userId }, cookies } = request;

    if(!cookies[CookiesNames.AUTHORIZATION]) {
      throw new AuthenticationError("EMPTY_AUTHORIZATION");
    }

    if(typeof cookies[CookiesNames.AUTHORIZATION] !== "string") {
      throw new AuthenticationError("INVALID_AUTHORIZATION");
    }

    if (!userId) {
      throw new ValidationError('EMPTY_USER_ID')
    }

    if(typeof userId !== 'string') {
      throw new ValidationError('INVALID_USER_ID')
    }

    return {
      query: {
        userId
      },
      cookies: {
        [CookiesNames.AUTHORIZATION]: cookies[CookiesNames.AUTHORIZATION]
      }
    };
  }
}