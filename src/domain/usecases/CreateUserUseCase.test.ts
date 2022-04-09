import { Profile, PROFILE_TYPES } from "@domain/entities/User/Profile";
import { User } from "@domain/entities/User/User";
import CreateUserUseCase, { ProfileRepository, UserRepository } from "./CreateUserUseCase"

class UserRepositoryMock implements UserRepository {
  create: (user: User) => Promise<User> = async (user: User) => user
}

class ProfileRepositoryMock implements ProfileRepository {
  create: (profile: Profile) => Promise<Profile> = async (profile: Profile) => profile
}

const PERSONAL_USER_CREATE_DATA_MOCK = {
  age: 23,
  email: 'test@email',
  image: 'image-url',
  name: 'Tester',
  profile: PROFILE_TYPES.PERSONAL
}

describe('CreateUserUseCase', () => {
  it('should create a user with personal profile', async () => {
    const userRepository = new UserRepositoryMock();
    const profileRepository = new ProfileRepositoryMock();
    const createUserUseCase = new CreateUserUseCase(userRepository, profileRepository);

    const { profile } = await createUserUseCase.execute(PERSONAL_USER_CREATE_DATA_MOCK);
    
    expect(profile.type).toBe(PROFILE_TYPES.PERSONAL)
  })
})