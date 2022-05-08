import { PROFILE_TYPES } from "@domain/entities/User/Profile";
import { User } from "@domain/entities/User/User";
import { CreateUserPortValidatorMock, EncrypterMock, TokenGeneratorMock, UuidGeneratorMock } from "../_mocks";
import { CreateProfileRepositoryMock } from "../_mocks/repositories/ProfileRepositoryMock";
import { SessionRepositoryMock } from "../_mocks/repositories/SessionRepositoryMock";
import { UserRepositoryMock } from "../_mocks/repositories/UserRepositoryMock";
import { CreateUserUseCasePort } from "./CreateUserPortValidator";
import { CreateUserService } from "./CreateUserUseCase";

const CREATE_PERSONAL_USER_PORT_MOCK: CreateUserUseCasePort = {
  age: 23,
  email: 'test-personal@email.com',
  image: 'image-url',
  name: 'Tester',
  profile: PROFILE_TYPES.PERSONAL,
  password: 'any-password'
}

const CREATE_STUDENT_USER_PORT_MOCK: CreateUserUseCasePort = {
  age: 23,
  email: 'test-student@email2.com',
  image: 'image-url2',
  name: 'Tester2',
  profile: PROFILE_TYPES.STUDENT,
  password: 'any-password'
}

const makeSut = () => {
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
    createUserUseCase
  }
}

describe('CreateUserUseCase', () => {
  describe('Given repeated email', () => {
    it('should throw "REPEATED_EMAIL" error', () => {
      const { createUserUseCase, userRepository } = makeSut();
      userRepository.foundUser = new User(UserRepositoryMock.USER_DATA);

      expect(async () => {
        await createUserUseCase.execute(CREATE_PERSONAL_USER_PORT_MOCK);
      }).rejects.toThrowError('REPEATED_EMAIL')
    }) 
  })

  it('should call userRepository.create with proper params', async() => {
    const { createUserUseCase, userRepository } = makeSut();
    await createUserUseCase.execute(CREATE_PERSONAL_USER_PORT_MOCK)

    const expectedUserParameter = new User({
      ...CREATE_PERSONAL_USER_PORT_MOCK,
      password: EncrypterMock.HASHED_VALUE,
      id: UuidGeneratorMock.GENERATED_ID
    })

    expect(userRepository.create).toHaveBeenCalledWith(expectedUserParameter)
  })

  it('should create a user with personal profile', async () => {
    const { createUserUseCase } = makeSut();
    const { profile } = await createUserUseCase.execute(CREATE_PERSONAL_USER_PORT_MOCK);
    
    expect(profile.type).toBe(PROFILE_TYPES.PERSONAL)
  })

  it('should create a user with student profile', async () => {
    const { createUserUseCase } = makeSut();
    const { profile } = await createUserUseCase.execute(CREATE_STUDENT_USER_PORT_MOCK);
    
    expect(profile.type).toBe(PROFILE_TYPES.STUDENT)
  })

  it('should create a user with generated uuid', async () => {
    const { createUserUseCase } = makeSut();
    const { user } = await createUserUseCase.execute(CREATE_PERSONAL_USER_PORT_MOCK);

    expect(user.id).toBe(UuidGeneratorMock.GENERATED_ID)
  })

  it('should generate a token to created user', async () => {
    const { createUserUseCase } = makeSut();
    const { token } = await createUserUseCase.execute(CREATE_PERSONAL_USER_PORT_MOCK);

    expect(token).toBe(TokenGeneratorMock.GENERATED_TOKEN);
  })
})