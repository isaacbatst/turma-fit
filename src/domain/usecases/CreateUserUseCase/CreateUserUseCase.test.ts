import { PROFILE_TYPES } from "@domain/entities/User/Profile";
import { User } from "@domain/entities/User/User";
import CreateUserUseCase, { CreateUserUseCasePort } from "./CreateUserUseCase";
import { EncrypterMock, ProfileRepositoryMock, UserRepositoryMock } from "../__mocks__/";

jest.mock('uuid',  () => {
  const originalModule = jest.requireActual('uuid');

  return {
    __esModule: true,
    ...originalModule,
    v4: jest.fn(() => 'any-uuid'),
  };
})

const PERSONAL_USER_CREATE_DATA_MOCK: CreateUserUseCasePort = {
  age: 23,
  email: 'test@email',
  image: 'image-url',
  name: 'Tester',
  profile: PROFILE_TYPES.PERSONAL,
  password: 'any-password'
}

const STUDENT_USER_CREATE_DATA_MOCK: CreateUserUseCasePort = {
  age: 23,
  email: 'test@email2',
  image: 'image-url2',
  name: 'Tester2',
  profile: PROFILE_TYPES.STUDENT,
  password: 'any-password'
}

describe('CreateUserUseCase', () => {
  it('should call userRepository with proper params', async() => {
    const userRepository = new UserRepositoryMock();
    const profileRepository = new ProfileRepositoryMock();
    const encrypter = new EncrypterMock();
    const createUserUseCase = new CreateUserUseCase(userRepository, profileRepository, encrypter);

    await createUserUseCase.execute(PERSONAL_USER_CREATE_DATA_MOCK)

    const expectedUserParameter = new User({
      age: PERSONAL_USER_CREATE_DATA_MOCK.age,
      name: PERSONAL_USER_CREATE_DATA_MOCK.name,
      email: PERSONAL_USER_CREATE_DATA_MOCK.email,
      password: await encrypter.hash(PERSONAL_USER_CREATE_DATA_MOCK.password),
      image: PERSONAL_USER_CREATE_DATA_MOCK.image,
    })

    expect(userRepository.create).toHaveBeenCalledWith(expectedUserParameter)
  })

  it('should create a user with personal profile', async () => {
    const userRepository = new UserRepositoryMock();
    const profileRepository = new ProfileRepositoryMock();
    const encrypter = new EncrypterMock();
    const createUserUseCase = new CreateUserUseCase(userRepository, profileRepository, encrypter);

    const { profile } = await createUserUseCase.execute(PERSONAL_USER_CREATE_DATA_MOCK);
    
    expect(profile.type).toBe(PROFILE_TYPES.PERSONAL)
  })

  it('should create a user with student profile', async () => {
    const userRepository = new UserRepositoryMock();
    const profileRepository = new ProfileRepositoryMock();
    const encrypter = new EncrypterMock();
    const createUserUseCase = new CreateUserUseCase(userRepository, profileRepository, encrypter);

    const { profile } = await createUserUseCase.execute(STUDENT_USER_CREATE_DATA_MOCK);
    
    expect(profile.type).toBe(PROFILE_TYPES.STUDENT)
  })
})