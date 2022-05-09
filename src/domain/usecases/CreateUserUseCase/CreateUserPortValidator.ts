import { ValidationError } from "@application/api/controllers/CreateUserController/CreateUserBodyValidator";
import { PortValidator } from "@domain/common/PortValidator";
import { ProfileType, PROFILE_TYPES } from "@domain/entities/User/Profile";

export interface CreateUserUseCasePortValidated {
  name: string,
  email: string,
  image: string,
  age: number,
  profile: ProfileType,
  password: string,
}

export interface CreateUserUseCasePort {
  name: string,
  email: string,
  image: string,
  age: number,
  profile: string,
  password: string,
}

export class CreateUserPortValidator implements PortValidator<CreateUserUseCasePort, CreateUserUseCasePortValidated> {
  static readonly EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  validate(port: CreateUserUseCasePort): CreateUserUseCasePortValidated {
    if(port.profile !== PROFILE_TYPES.PERSONAL && port.profile !== PROFILE_TYPES.STUDENT) {
      throw new ValidationError('UNKNOWN_PROFILE')
    }

    if(!CreateUserPortValidator.EMAIL_REGEX.test(port.email)){
      throw new ValidationError('INVALID_EMAIL')
    }

    if(port.password.length < 8){
      throw new ValidationError('INVALID_PASSWORD')
    }

    return {
      ...port,
      profile: port.profile
    };
  }
}
