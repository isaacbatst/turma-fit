import { ValidationError } from "@application/api/errors/ValidationError";
import { RequestValidator } from "@application/api/interfaces";
import { CreateUserRequestErrors } from "./CreateUserRequestErrors";

export interface CreateUserValidRequest {
  name: string,
  email: string,
  image: string,
  age: number,
  profile: string,
  password: string,
}
export class CreateUserRequestValidator implements RequestValidator<CreateUserValidRequest> {
  validate(request: Record<string, any>): CreateUserValidRequest {
    const { password, age, email, image, name, profile } = request;
    
    if(!password || typeof password !== 'string') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_PASSWORD)
    }

    if(!age || typeof age !== 'number') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_AGE)
    }

    if(!email || typeof email !== 'string') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_EMAIL)
    }

    if(!image || typeof image !== 'string') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_IMAGE)
    }

    if(!name || typeof name !== 'string') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_NAME)
    }

    if(!profile || typeof profile !== 'string') {
      throw new ValidationError(CreateUserRequestErrors.INVALID_PROFILE)
    }

    return {
      password,
      age,
      email,
      image,
      name,
      profile
    }    
  }

}