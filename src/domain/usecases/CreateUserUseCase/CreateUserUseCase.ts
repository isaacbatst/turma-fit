import { Encrypter } from "@domain/common/Encrypter";
import { PersonalProfile, ProfileType, PROFILE_TYPES, StudentProfile } from "@domain/entities/User/Profile";
import { User } from "@domain/entities/User/User";
import { ProfileRepository } from "@domain/repositories/ProfileRepository";
import { UserRepository } from "@domain/repositories/UserRepository";

export interface CreateUserUseCasePort {
  name: string,
  email: string,
  image: string,
  age: number,
  profile: ProfileType
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

  async execute(port: CreateUserUseCasePort): Promise<CreateUserUseCaseDTO> {
    const hashedPassword = await this.encrypter.hash(port.password);

    const user = new User({
      age: port.age,
      email: port.email,
      image: port.image,
      name: port.name,
      password: hashedPassword
    })

    await this.userRepository.create(user);

    const profile = port.profile === PROFILE_TYPES.PERSONAL
      ? new PersonalProfile()
      : new StudentProfile()
  
    await this.profileRepository.create(profile)

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
}