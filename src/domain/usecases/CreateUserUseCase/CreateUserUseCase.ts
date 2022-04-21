import { ValidationError } from "@application/api/controllers/CreateUserController/CreateUserBodyValidator";
import { Encrypter } from "@domain/common/Encrypter";
import { PersonalProfile, Profile, ProfileType, PROFILE_TYPES, StudentProfile } from "@domain/entities/User/Profile";
import { User } from "@domain/entities/User/User";
import { ProfileRepository } from "@domain/repositories/ProfileRepository";
import { UserRepository } from "@domain/repositories/UserRepository";

export interface CreateUserUseCasePort {
  name: string,
  email: string,
  image: string,
  age: number,
  profile: string,
  password: string,
}
export interface CreateUserUseCaseDTO {
  user: {
    id: string,
    name: string,
    email: string
  },
  profile: {
    id: string,
    type: ProfileType
  }
}

interface CreateUserUseCasePortValidated {
  name: string,
  email: string,
  image: string,
  age: number,
  profile: ProfileType,
  password: string,
}
class CreateUserPortValidator {
  static readonly EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

  static validate(port: CreateUserUseCasePort): CreateUserUseCasePortValidated {
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

export interface CreateUserUseCase {
  execute(port: CreateUserUseCasePort): Promise<CreateUserUseCaseDTO>
}

export class CreateUserService implements CreateUserUseCase {
  constructor(
    private userRepository: UserRepository, 
    private profileRepository: ProfileRepository,
    private encrypter: Encrypter
  ) 
  {}

  async execute(receivedPort: CreateUserUseCasePort): Promise<CreateUserUseCaseDTO> {
    const port = CreateUserPortValidator.validate(receivedPort);
    const hashedPassword = await this.encrypter.hash(port.password);

    const user = new User({
      age: port.age,
      email: port.email,
      image: port.image,
      name: port.name,
      password: hashedPassword
    })

    const profile = this.getProfile(port.profile);

    await this.userRepository.create(user);
    await this.profileRepository.create(profile, user.getId())

    return { 
      user: {
        email: user.getEmail(),
        id: user.getId(),
        name: user.getName()
      }, 
      profile: { 
        id: profile.getId(),
        type: profile.getType()
      }
    };
  }

  private getProfile(profile: ProfileType): Profile {
    if(profile === 'PERSONAL'){
      return new PersonalProfile();
    }

    if(profile === 'STUDENT'){
      return new StudentProfile();
    }

    throw new ValidationError('UNKNOWN_PROFILE')
  }
}