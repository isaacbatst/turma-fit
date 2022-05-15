import { CookiesNames } from "@application/api/common/CookiesNames";
import { BodyValidator } from "@application/api/interfaces";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { GetUserValidRequest } from "./GetUserController";
import { GetUserRequestValidatorErrors } from "./GetUserRequestValidatorErrors";

export class GetUserRequestValidator implements BodyValidator<GetUserValidRequest> {
  validate(request: Record<string, any>): GetUserValidRequest {
    const { cookies } = request;

    if (!cookies || !cookies[CookiesNames.AUTHORIZATION]) {
      throw new AuthenticationError(GetUserRequestValidatorErrors.TOKEN_NOT_FOUND);
    }

    return {
      cookies: {
        [CookiesNames.AUTHORIZATION]: cookies[CookiesNames.AUTHORIZATION],
      },
    };
  }
}