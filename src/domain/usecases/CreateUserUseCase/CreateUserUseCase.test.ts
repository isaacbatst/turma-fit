import { PROFILE_TYPES } from "@domain/entities/User/Profile";
import { User } from "@domain/entities/User/User";
import { EncrypterMock, TokenGeneratorMock, UuidGeneratorMock } from "../_mocks";
import { CreateProfileRepositoryMock } from "../_mocks/repositories/ProfileRepositoryMock";
import { SessionRepositoryMock } from "../_mocks/repositories/SessionRepositoryMock";
import { UserRepositoryMock } from "../_mocks/repositories/UserRepositoryMock";
import { CreateUserUseCasePort } from "./CreateUserPortValidator";
import { CreateUserPortValidatorMock } from "./CreateUserPortValidatorMock";
import { CreateUserService } from "./CreateUserUseCase";

class PortMock {
  public email = 'test-personal@email.com';
  public name = 'Tester';
  public profile = PROFILE_TYPES.PERSONAL;
  public password = 'any-password';
  public birthdate = '2000-12-01';

  public port: CreateUserUseCasePort = {
    birthdate: this.birthdate,
    email: this.email,
    name: this.name,
    password: this.password,
    profile: this.profile
  }
}

const makeSut = () => {
  const portMock = new PortMock();
  const userRepository = new UserRepositoryMock();
  userRepository.foundUser = null;

  const profileRepository = new CreateProfileRepositoryMock();
  const sessionRepository = new SessionRepositoryMock();
  const encrypter = new EncrypterMock();
  const uuidGenerator = new UuidGeneratorMock();
  const tokenGenerator = new TokenGeneratorMock();
  const portValidator = new CreateUserPortValidatorMock()
  
  const createUserUseCase = new CreateUserService({
    userRepository, 
    profileRepository, 
    encrypter, 
    sessionRepository,
    tokenGenerator,
    uuidGenerator,
    portValidator
  });

  return {
    userRepository, 
    profileRepository,
    encrypter,
    createUserUseCase,
    uuidGenerator,
    portMock
  }
}

describe('CreateUserUseCase', () => {
  describe('Given repeated email', () => {
    it('should throw "REPEATED_EMAIL" error', () => {
      const { createUserUseCase, userRepository, portMock } = makeSut();
      userRepository.foundUser = new User(UserRepositoryMock.USER_DATA);

      expect(async () => {
        await createUserUseCase.execute(portMock.port);
      }).rejects.toThrowError('REPEATED_EMAIL')
    }) 
  })

  it('should call userRepository.create with proper params', async() => {
    const { createUserUseCase, userRepository, uuidGenerator, portMock } = makeSut();
    await createUserUseCase.execute(portMock.port)

    const expectedUserParameter = new User({
      ...portMock.port,
      password: EncrypterMock.HASHED_VALUE,
      id: uuidGenerator.GENERATED_ID
    })

    expect(userRepository.create).toHaveBeenCalledWith(expectedUserParameter)
  })

  it('should call profileRepository.create with proper params', async () => {
    const { createUserUseCase, portMock, profileRepository, uuidGenerator } = makeSut();
    
    await createUserUseCase.execute(portMock.port);
    
    expect(profileRepository.create).toHaveBeenCalledWith(
      { type: portMock.profile, id: uuidGenerator.GENERATED_ID }, 
      uuidGenerator.GENERATED_ID
    )
  })

  it('should return a user with generated uuid', async () => {
    const { createUserUseCase, uuidGenerator, portMock } = makeSut();
    const { user } = await createUserUseCase.execute(portMock.port);

    expect(user.id).toBe(uuidGenerator.GENERATED_ID)
  })

  it('should generate a token to created user', async () => {
    const { createUserUseCase, portMock } = makeSut();
    const { token } = await createUserUseCase.execute(portMock);

    expect(token).toBe(TokenGeneratorMock.GENERATED_TOKEN);
  })
})