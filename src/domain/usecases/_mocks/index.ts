import { Encrypter } from "@domain/common/Encrypter";
import { TokenGenerator } from "@domain/common/TokenGenerator";
import { Profile } from "@domain/entities/User/Profile";
import { User } from "@domain/entities/User/User";
import { ProfileRepository } from "@domain/repositories/ProfileRepository";
import { UserRepository } from "@domain/repositories/UserRepository";



export class UserRepositoryMock implements UserRepository {
  public foundUser: User | null = new User({
    id: 'any_id',
    email: 'any_email@email',
    name: 'any_name',
    age: 23,
    image: 'any_image',
    password: 'any_hashed_password',
  })

  create: (user: User) => Promise<User> = 
    jest.fn(async (user: User) => user)
  get: (id: string) => Promise<User | null> = 
    jest.fn(async (id: string) => this.foundUser)
  getByEmail: (email: string) => Promise<User | null> = 
    jest.fn(async (email: string) => this.foundUser)
}


export class ProfileRepositoryMock implements ProfileRepository {
  create: (profile: Profile) => Promise<Profile> = async (profile: Profile) => profile;
  get: (id: string) => Promise<Profile | null> = async () => null;
}

export class EncrypterMock implements Encrypter {
  public compareReturn = true;

  compare: (value: string, hashedValue: string) => Promise<boolean> = 
    jest.fn(async (value, hashedValue) => {
      return this.compareReturn;
    })

  hash: (value: string) => Promise<string> = 
    async () => 'hashed_value';
}

export class TokenGeneratorMock implements TokenGenerator {
  generate: (id: string, secret: string) => string = jest.fn((id, secret) => 'any_token');
  decode: (token: string, secret: string) => string = (token, secret) => 'any_decoded'
}