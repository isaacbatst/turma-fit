import { Encrypter } from "@domain/common/Encrypter";
import { TokenGenerator } from "@domain/common/TokenGenerator";
import { Profile } from "@domain/entities/User/Profile";
import { User } from "@domain/entities/User/User";
import { ProfileRepository } from "@domain/repositories/ProfileRepository";
import { UserRepository } from "@domain/repositories/UserRepository";



export class UserRepositoryMock implements UserRepository {
  static readonly USER_DATA = {
    id: 'any_id',
    email: 'any_email@email',
    name: 'any_name',
    age: 23,
    image: 'any_image',
    password: 'any_hashed_password',
  };

  public foundUser: User | null = new User(UserRepositoryMock.USER_DATA)

  create: (user: User) => Promise<void> = 
    jest.fn()
  get: (id: string) => Promise<User | null> = 
    jest.fn(async (id: string) => this.foundUser)
  getByEmail: (email: string) => Promise<User | null> = 
    jest.fn(async (email: string) => this.foundUser)
}

export class ProfileRepositoryMock implements ProfileRepository {
  create: (profile: Profile) => Promise<void> = jest.fn()
  get: (id: string) => Promise<Profile | null> = async () => null;
}



export class EncrypterMock implements Encrypter {
  static readonly HASHED_VALUE = 'hashed_value';
  public compareReturn = true;

  compare: (value: string, hashedValue: string) => Promise<boolean> = 
    jest.fn(async (value, hashedValue) => {
      return this.compareReturn;
    })

  hash: (value: string) => Promise<string> = 
    async () => EncrypterMock.HASHED_VALUE;
}

export class TokenGeneratorMock implements TokenGenerator {
  static readonly GENERATED_TOKEN = 'any_token'
  static readonly DECODED_DATA = 'any_decoded'
  generate: (id: string, secret: string) => string = 
    jest.fn((id, secret) => TokenGeneratorMock.GENERATED_TOKEN);
  decode: (token: string, secret: string) => string = 
    (token, secret) => TokenGeneratorMock.DECODED_DATA
}