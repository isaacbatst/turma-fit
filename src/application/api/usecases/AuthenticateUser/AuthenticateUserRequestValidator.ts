import { ValidationError } from "@application/api/errors/ValidationError";
import { HttpRequest, RequestValidator } from "@application/api/interfaces";

export interface AuthenticateUserValidRequest {
  email: string,
  password: string
}

export interface IAuthenticateUserRequestValidator {
  validate(request: HttpRequest): AuthenticateUserValidRequest
}

export enum AuthenticateUserRequestErrors {
  EMPTY_EMAIL = 'EMPTY_EMAIL',
  INVALID_EMAIL = 'INVALID_EMAIL',
  EMPTY_PASSWORD = 'EMPTY_PASSWORD',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
}

export class AuthenticateUserRequestValidator implements RequestValidator<AuthenticateUserValidRequest> {
  validate(request: HttpRequest): AuthenticateUserValidRequest {
    const { email, password } = request.body;

    if(!email) {
      throw new ValidationError(AuthenticateUserRequestErrors.EMPTY_EMAIL)
    }

    if(typeof email !== 'string'){
      throw new ValidationError(AuthenticateUserRequestErrors.INVALID_EMAIL)
    }

    if(!password){
      throw new ValidationError(AuthenticateUserRequestErrors.EMPTY_PASSWORD)
    }

    if(typeof password !== 'string'){
      throw new ValidationError(AuthenticateUserRequestErrors.INVALID_EMAIL)
    }

    return {
      email,
      password
    }
  }
}
