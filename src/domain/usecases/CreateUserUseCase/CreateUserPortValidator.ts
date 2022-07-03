import { ValidationError } from "@application/api/errors/ValidationError";
import { PortValidator } from "@domain/common/PortValidator";
import { ProfileType, PROFILE_TYPES } from "@domain/entities/User/Profile";

export interface CreateUserUseCasePortValidated {
  name: string,
  email: string,
  birthdate: string,
  profile: ProfileType,
  password: string,
}

export interface CreateUserUseCasePort {
  name: string,
  email: string,
  birthdate: string,
  profile: string,
  password: string,
}

export class CreateUserPortValidator implements PortValidator<CreateUserUseCasePort, CreateUserUseCasePortValidated> {
  static readonly EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  static readonly DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
  static readonly MIN_AGE = 13;

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

    if(!CreateUserPortValidator.DATE_REGEX.test(port.birthdate)){
      throw new ValidationError('INVALID_BIRTHDATE')
    }
    const age = this.calcAge(port.birthdate);

    if(age < CreateUserPortValidator.MIN_AGE) {
      throw new ValidationError('BELOW_MIN_AGE')
    }

    return {
      ...port,
      profile: port.profile
    };
  }

  private calcAge(birthdate: string){
    const birthdateDate = new Date(birthdate);
    const diff = Date.now() - birthdateDate.getTime();
    const ageDate = new Date(diff);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
