import { CookiesNames } from "@application/api/common/CookiesNames";
import { RequestValidator } from "@application/api/interfaces";
import { GetUserValidRequest } from "./GetUserController";

export class GetUserRequestValidatorMock implements RequestValidator<GetUserValidRequest> {
  validate: (request: { cookies: { [key:string]: any } }) => GetUserValidRequest = jest.fn(() => {
    return {
      cookies: {
        [CookiesNames.AUTHORIZATION]: 'any_token'
      }
    }
  });
}