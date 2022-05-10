import { BodyValidator } from "@application/api/interfaces";

export interface CreateUserValidBody {
  name: string,
  email: string,
  image: string,
  age: number,
  profile: string,
  password: string,
}

export class ValidationError extends Error {
  constructor(
    public message: string
  ){
    super(message);
  }

  getMessage(){
    return this.message;
  }
}

export class CreateUserBodyValidator implements BodyValidator<CreateUserValidBody> {
  validate(body: Record<string, any>): CreateUserValidBody {
    const { password, age, email, image, name, profile } = body

    if(!password || typeof password !== 'string') {
      throw new ValidationError('INVALID_PASSWORD')
    }

    if(!age || typeof age !== 'number') {
      throw new ValidationError('INVALID_AGE')
    }

    if(!email || typeof email !== 'string') {
      throw new ValidationError('INVALID_EMAIL')
    }

    if(!image || typeof image !== 'string') {
      throw new ValidationError('INVALID_IMAGE')
    }

    if(!name || typeof name !== 'string') {
      throw new ValidationError('INVALID_NAME')
    }

    if(!profile || typeof profile !== 'string') {
      throw new ValidationError('INVALID_PROFILE')
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