import { ValidationError } from "@application/api/errors/ValidationError";
import { RequestValidator } from "@application/api/interfaces";
import { CreateUserRequestErrors } from "./CreateUserRequestErrors";

export interface CreateUserValidRequest {
  name: string,
  email: string,
  birthdate: string,
  profile: string,
  password: string,
}
export class CreateUserRequestValidator implements RequestValidator<CreateUserValidRequest> {
  validate(request: Record<string, any>): CreateUserValidRequest {
    const { password, birthdate, email, name, profile } = request;
    
    if(!password || typeof password !== 'string') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_PASSWORD)
    }

    if(!birthdate || typeof birthdate !== 'string') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_BIRTHDATE)
    }

    if(!email || typeof email !== 'string') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_EMAIL)
    }

    if(!name || typeof name !== 'string') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_NAME)
    }

    if(!profile || typeof profile !== 'string') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_PROFILE)
    }

    return {
      password,
      birthdate,
      email,
      name,
      profile
    }    
  }

}