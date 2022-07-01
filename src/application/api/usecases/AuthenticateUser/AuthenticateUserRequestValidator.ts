import { ValidationError } from "@application/api/errors/ValidationError";
import { HttpRequest, RequestValidator } from "@application/api/interfaces";

export interface AuthenticateUserValidRequest {
  email: string,
  password: string
}

export interface IAuthenticateUserRequestValidator {
  validate(request: HttpRequest): AuthenticateUserValidRequest
}

export class AuthenticateUserRequestValidator implements RequestValidator<AuthenticateUserValidRequest> {
  validate(request: HttpRequest): AuthenticateUserValidRequest {
    const { email, password } = request.body;

    if(!email || typeof email !== 'string'){
      throw new ValidationError('INVALID_EMAIL')
    }

    if(!password || typeof password !== 'string'){
      throw new ValidationError('INVALID_PASSWORD')
    }

    return {
      email,
      password
    }
  }
}
