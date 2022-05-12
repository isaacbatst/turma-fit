import { ValidationError } from "@application/api/errors/ValidationError";
import { BodyValidator } from "@application/api/interfaces";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { GetMyWorkoutPlansUseCasePort } from "@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase";

export class GetMyWorkoutPlansBodyValidator implements BodyValidator<GetMyWorkoutPlansUseCasePort> {
  validate(body: Record<string, any>): GetMyWorkoutPlansUseCasePort {
    const { body: { id }, headers: { authorization } } = body;

    if(!authorization) {
      throw new AuthenticationError("EMPTY_AUTHORIZATION");
    }

    if (!id) {
      throw new ValidationError('EMPTY_USER_ID')
    }

    if(typeof id !== 'string') {
      throw new ValidationError('INVALID_USER_ID')
    }

    return {
      userId: id,
      sessionToken: authorization
    }
  }
}