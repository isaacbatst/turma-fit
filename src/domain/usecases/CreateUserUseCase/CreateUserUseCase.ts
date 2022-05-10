import { ValidationError } from "@application/api/usecases/CreateUser/CreateUserBodyValidator";
import { Encrypter } from "@domain/common/Encrypter";
import { PortValidator } from "@domain/common/PortValidator";
import { TokenGenerator } from "@domain/common/TokenGenerator";
import { UuidGenerator } from "@domain/common/UuidGenerator";
import { PersonalProfile, Profile, ProfileType, StudentProfile } from "@domain/entities/User/Profile";
import { Session } from "@domain/entities/User/Session";
import { User } from "@domain/entities/User/User";
import { CreateProfileRepository } from "@domain/repositories/ProfileRepository";
import { SessionRepository } from "@domain/repositories/SessionRepository";
import { CreateUserRepository } from "@domain/repositories/UserRepository";
import { CreateUserUseCasePort, CreateUserUseCasePortValidated } from "./CreateUserPortValidator";

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

interface CreateUserServiceParams {
  userRepository: CreateUserRepository, 
  profileRepository: CreateProfileRepository,
  encrypter: Encrypter,
  sessionRepository: SessionRepository,
  uuidGenerator: UuidGenerator
  tokenGenerator: TokenGenerator,
  portValidator: PortValidator<CreateUserUseCasePort,CreateUserUseCasePortValidated>
}

export class CreateUserService implements CreateUserUseCase {
  private userRepository: CreateUserRepository
  private profileRepository: CreateProfileRepository
  private encrypter: Encrypter
  private sessionRepository: SessionRepository
  private uuidGenerator: UuidGenerator
  private tokenGenerator: TokenGenerator
  private portValidator: PortValidator<CreateUserUseCasePort, CreateUserUseCasePortValidated>

  constructor(
    params: CreateUserServiceParams
  ) 
  {
    this.userRepository = params.userRepository
    this.profileRepository = params.profileRepository
    this.encrypter = params.encrypter
    this.sessionRepository = params.sessionRepository,
    this.uuidGenerator = params.uuidGenerator
    this.tokenGenerator = params.tokenGenerator
    this.portValidator = params.portValidator
  }

  async execute(receivedPort: CreateUserUseCasePort): Promise<CreateUserUseCaseDTO> {
    const port = this.portValidator.validate(receivedPort)

    const isEmailRepeated = await this.userRepository.getByEmail(port.email);

    if(isEmailRepeated){
      throw new ValidationError('REPEATED_EMAIL')
    }

    const hashedPassword = await this.encrypter.hash(port.password);

    const user = new User({
      id: this.uuidGenerator.generate(),
      age: port.age,
      email: port.email,
      image: port.image,
      name: port.name,
      password: hashedPassword
    })

    await this.userRepository.create(user);

    const profile = this.getProfileInstance(port.profile);
    
    await this.profileRepository.create(profile, user.getId());

    const session = new Session(
      this.uuidGenerator.generate(),
      this.tokenGenerator.generate(),
    );
  
    await this.sessionRepository.create(session);
    
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
      token: session.getToken(),
    };
  }

  private getProfileInstance(profile: ProfileType): Profile {
    if(profile === 'PERSONAL'){
      return new PersonalProfile();
    }

    if(profile === 'STUDENT'){
      return new StudentProfile();
    }

    throw new ValidationError('UNKNOWN_PROFILE')
  }
}