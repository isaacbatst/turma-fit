import { User } from "@domain/entities/User/User";
import { CreateUserRepository } from "@domain/repositories/UserRepository";

export class UserRepositoryMock implements CreateUserRepository {
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
  getByEmail: (email: string) => Promise<User | null> = 
    jest.fn(async (email: string) => this.foundUser)
}