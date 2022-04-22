import { ValidationError } from "@application/api/controllers/CreateUserController/CreateUserBodyValidator";
import { Encrypter } from "@domain/common/Encrypter";
import { TokenGenerator } from "@domain/common/TokenGenerator";
import { PersonalProfile, Profile, ProfileType, StudentProfile } from "@domain/entities/User/Profile";
import { User } from "@domain/entities/User/User";
import { ProfileRepository } from "@domain/repositories/ProfileRepository";
import { UserRepository } from "@domain/repositories/UserRepository";
import { CreateUserPortValidator, CreateUserUseCasePort } from "./CreateUserPortValidator";

export interface CreateUserUseCaseDTO {
  user: {
    id: string,
    name: string,
    email: string
  },
  profile: {
    id: string,
    type: ProfileType
  },
  token: string
}

export interface CreateUserUseCase {
  execute(port: CreateUserUseCasePort): Promise<CreateUserUseCaseDTO>
}

export class CreateUserService implements CreateUserUseCase {
  constructor(
    private userRepository: UserRepository, 
    private profileRepository: ProfileRepository,
    private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator
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
    await this.profileRepository.create(profile, user.getId());

    const token = this.tokenGenerator.generate(user.getId(), process.env.JWT_TOKEN)

    return { 
      user: {
        email: user.getEmail(),
        id: user.getId(),
        name: user.getName()
      }, 
      profile: { 
        id: profile.getId(),
        type: profile.getType()
      },
      token
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