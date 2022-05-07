import { User } from "@domain/entities/User/User";
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