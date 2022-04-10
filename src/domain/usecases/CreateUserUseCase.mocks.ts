import { Profile } from "@domain/entities/User/Profile";
import { CreateUserEntityParams, User } from "@domain/entities/User/User";
import { ProfileRepository } from "@domain/repositories/ProfileRepository";
import { UserRepository } from "@domain/repositories/UserRepository";
import { Encrypter } from "./CreateUserUseCase";

const createMockedUserEntity = ({ id, email }: { id?: string, email?: string  }) => {
  const params: CreateUserEntityParams = {
    id: id || 'any_id',
    email: email || 'any_email@email',
    name: 'any_name',
    age: 23,
    image: 'any_image',
    password: 'any_hashed_password',
  }
  
  return new User(params)
}

export class UserRepositoryMock implements UserRepository {
  create: (user: User) => Promise<User> = 
    jest.fn(async (user: User) => user)
  get: (id: string) => Promise<User | null> = 
    jest.fn(async (id: string) => createMockedUserEntity({ id }))
  getByEmail: (email: string) => Promise<User | null> = 
    jest.fn(async (email: string) => createMockedUserEntity({ email }))
}

export class ProfileRepositoryMock implements ProfileRepository {
  create: (profile: Profile) => Promise<Profile> = async (profile: Profile) => profile;
  get: (id: string) => Promise<Profile | null> = async () => null;
}

export class EncrypterMock implements Encrypter {
  compare: (value: string, hashedValue: string) => Promise<boolean> = 
    async (value, hashedValue) => {
      return true;
    }

  hash: (value: string) => Promise<string> = 
    async () => 'hashed_value';
}